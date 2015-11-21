/// <reference path="../typings/node.d.ts" />
import * as ts from "typescript";
import * as Lint from "tslint/lib/lint";

var xml = require('xml');

interface Attr {
    _attr: {
        line: string;
        column: string;
        message: string;
        severity: string;
        source: string;
    }
}

interface TslintErrors { error: Attr[] }

interface CheckstyleFileObject {
    file: [ { _attr: { name: string } } ];
}

interface TslintXmlParams {
    name: string;
    startPosition: { line: string, position: string };
    ruleName: string;
    failure: string;
}

export class Formatter extends Lint.Formatters.AbstractFormatter {
    returnWithNoStrings (value: string): string {
        let regEx = /'/g;
        if(value.match(regEx)) { return value.replace(regEx, ""); }

        return value;
    }

    public format(failures: Lint.RuleFailure[]): string {
        let failuresJSON = failures.map((failure: Lint.RuleFailure) => failure.toJson());

        let checkstyleFileObject: CheckstyleFileObject = { file: [{ _attr: { name: "" }}] };

        failuresJSON.forEach((obj: TslintXmlParams) => {
            checkstyleFileObject.file[0]._attr.name = obj.name;

            let err: TslintErrors = {
                error: [
                    {
                        _attr: {
                            line: obj.startPosition.line,
                            column: obj.startPosition.position,
                            message: this.returnWithNoStrings(obj.failure),
                            severity: "warning",
                            source: obj.ruleName,
                        }
                    }
                ]
            };

            checkstyleFileObject.file.push(err);
        });

        return xml(checkstyleFileObject);
    }
}
