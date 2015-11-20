/// <reference path="../node_modules/tslint/typings/typescriptServices.d.ts" />
/// <reference path="../node_modules/tslint/lib/tslint.d.ts" />

var xml = require('xml');

interface XmlObjectFormat {
    file: [
        { _attr: { name: string } },
        { error: [
            {_attr: {
                line: string;
                column: string;
                message: string;
                severity: string;
                source: string;
            }}
        ]}
    ];
}

interface jsonObj {
    name: string;
    startPosition: { line: string, position: string };
    ruleName: string;
    failure: string;
}

export class Formatter extends Lint.Formatters.AbstractFormatter {
    xmlObjFormat: XmlObjectFormat = {
        file: [
            { _attr: { name: "" } },
            {
                error: [
                    {
                        _attr: {
                            line: "",
                            column: "",
                            message: "",
                            severity: "warning",
                            source: ""
                        }
                    }
                    ]
            }
            ]
    };

    returnWithNoStrings (value: string): string { return value.replace(/'/g, ""); }

    public format(failures: Lint.RuleFailure[]): string {
        let failuresJSON = failures.map((failure: Lint.RuleFailure) => failure.toJson());

        failuresJSON.forEach((obj: jsonObj) => {
            this.xmlObjFormat.file[0]._attr.name                 = obj.name;
            this.xmlObjFormat.file[1].error[0]._attr.line        = obj.startPosition.line;
            this.xmlObjFormat.file[1].error[0]._attr.column      = obj.startPosition.position;
            this.xmlObjFormat.file[1].error[0]._attr.source      = obj.ruleName;
            this.xmlObjFormat.file[1].error[0]._attr.message     = this.returnWithNoStrings(obj.failure);
        });

        return xml(this.xmlObjFormat);
    }
}
