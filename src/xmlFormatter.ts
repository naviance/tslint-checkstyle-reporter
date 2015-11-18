/// <reference path='../node_modules/tslint/typings/typescriptServices.d.ts' />
/// <reference path='../node_modules/tslint/lib/tslint.d.ts' />

export class Formatter extends Lint.Formatters.AbstractFormatter {
    public format(failures: Lint.RuleFailure[]): string {
        var failuresJSON = failures.map((failure: Lint.RuleFailure) => failure.toJson());
        return JSON.stringify(failuresJSON);
    }
}
