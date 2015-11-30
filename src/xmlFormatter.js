/// <reference path="../typings/node.d.ts" />
// TODO: add typings back in - https://github.com/palantir/tslint#writing-custom-formatters
var xml = require('xml');
var Formatter = (function () {
    function Formatter() {
    }
    Formatter.prototype.removeSingleQuotes = function (value) {
        var regEx = /'/g;
        if (value.match(regEx)) {
            return value.replace(regEx, "");
        }
        return value;
    };
    Formatter.prototype.format = function (failures) {
        var _this = this;
        var failuresJSON = failures.map(function (failure) { return failure.toJson(); });
        var checkstyleFileObject = { file: [{ _attr: { name: "" } }] };
        failuresJSON.forEach(function (obj) {
            checkstyleFileObject.file[0]._attr.name = obj.name;
            var err = {
                error: [
                    {
                        _attr: {
                            line: obj.startPosition.line,
                            column: obj.startPosition.position,
                            message: _this.removeSingleQuotes(obj.failure),
                            severity: "warning",
                            source: obj.ruleName,
                        }
                    }
                ]
            };
            checkstyleFileObject.file.push(err);
        });
        return xml(checkstyleFileObject);
    };
    return Formatter;
})();
exports.Formatter = Formatter;
