/// <reference path="../typings/node.d.ts" />
// TODO: add typings back in - https://github.com/palantir/tslint#writing-custom-formatters
var xml = require('xml');

export class Formatter {
    removeSingleQuotes (value: string): string {
        let regEx = /'/g;
        if(value.match(regEx)) { return value.replace(regEx, ""); }

        return value;
    }

    public format(failures): string {
        let failuresJSON = failures.map((failure) => failure.toJson());
        let checkstyleFileObject: any = { file: [{ _attr: { name: "" }}] };

        failuresJSON.forEach((obj) => {
            checkstyleFileObject.file[0]._attr.name = obj.name;

            let err = {
                error: [
                    {
                        _attr: {
                            line: obj.startPosition.line,
                            column: obj.startPosition.position,
                            message: this.removeSingleQuotes(obj.failure),
                            severity: "warning",
                            source: obj.ruleName,
                        }
                    }
                ]
            };

            checkstyleFileObject.file.push(err);
        });

        return xml(checkstyleFileObject) as string;
    }
}