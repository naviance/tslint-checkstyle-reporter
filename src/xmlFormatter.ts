/// <reference path="../node_modules/tslint/typings/typescriptServices.d.ts" />
/// <reference path="../node_modules/tslint/lib/tslint.d.ts" />
/// <reference path="../typings/node.d.ts" />

var fs = require("fs");

export class Formatter extends Lint.Formatters.AbstractFormatter {
    public format(failures: Lint.RuleFailure[]): string {
        var failuresJSON = failures.map((failure: Lint.RuleFailure) => failure.toJson());

        fs.writeFileSync("outputFile.txt", JSON.stringify(failuresJSON), "utf-8", function(err){
            if (err) { throw err; }
        });

        return JSON.stringify(failuresJSON);
    }
}
