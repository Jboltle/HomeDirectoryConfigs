"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = exports.Commands = void 0;
var Commands;
(function (Commands) {
    Commands["InlineFoldToggle"] = "inlineFold.toggle";
    Commands["InlineFoldClearCache"] = "inlineFold.clearCache";
})(Commands = exports.Commands || (exports.Commands = {}));
var Settings;
(function (Settings) {
    Settings["identifier"] = "inlineFold";
    Settings["autoFold"] = "autoFold";
    Settings["regex"] = "regex";
    Settings["regexFlags"] = "regexFlags";
    Settings["regexGroup"] = "regexGroup";
    Settings["maskChar"] = "maskChar";
    Settings["maskColor"] = "maskColor";
    Settings["unfoldedOpacity"] = "unfoldedOpacity";
    Settings["after"] = "after";
    Settings["supportedLanguages"] = "supportedLanguages";
    Settings["unfoldOnLineSelect"] = "unfoldOnLineSelect";
    Settings["useGlobal"] = "useGlobal";
    Settings["togglePerFile"] = "togglePerFile";
    Settings["disableInDiffEditor"] = "disableInDiffEditor";
})(Settings = exports.Settings || (exports.Settings = {}));
//# sourceMappingURL=enums.js.map