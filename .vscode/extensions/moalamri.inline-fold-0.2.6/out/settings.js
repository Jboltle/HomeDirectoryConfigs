"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtSettings = void 0;
const vscode_1 = require("vscode");
const enums_1 = require("./enums");
class ExtensionSettings {
    static get instance() {
        if (!ExtensionSettings._instance) {
            ExtensionSettings._instance = new ExtensionSettings();
        }
        return ExtensionSettings._instance;
    }
    Update(_configs) {
        this.configs = _configs;
    }
    getPerLanguage(_section, languageId) {
        const langConfig = vscode_1.workspace.getConfiguration(enums_1.Settings.identifier, { languageId });
        return langConfig.get(_section);
    }
    getLanguagesWithRegex() {
        const excludedSettings = ["inlineFold", "supportedLanguages"];
        const settings = Object.values(enums_1.Settings).filter((v) => !excludedSettings.includes(v));
        const langs = [];
        settings.forEach((v) => {
            const lang = this.configs.inspect(v).languageIds;
            if (lang) {
                langs.push(...lang);
            }
        });
        return langs;
    }
    Get(_section, langId) {
        const getGlobal = this.configs.get(enums_1.Settings.useGlobal);
        if (getGlobal || langId === undefined) {
            return this.configs.get(_section);
        }
        return this.getPerLanguage(_section, langId);
    }
    GetSupportedLanguages() {
        const langs = this.Get(enums_1.Settings.supportedLanguages);
        const withLangs = this.getLanguagesWithRegex();
        const supported = [...new Set([...langs, ...withLangs])];
        return supported;
    }
    Regex(langId) {
        return RegExp(this.Get(enums_1.Settings.regex, langId), this.Get(enums_1.Settings.regexFlags, langId));
    }
    constructor() { }
}
exports.ExtSettings = ExtensionSettings.instance;
//# sourceMappingURL=settings.js.map