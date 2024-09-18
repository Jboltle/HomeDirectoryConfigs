"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decorator = void 0;
const vscode_1 = require("vscode");
const cache_1 = require("./cache");
const decoration_1 = require("./decoration");
const enums_1 = require("./enums");
const settings_1 = require("./settings");
const utils_1 = require("./utils");
class Decorator {
    editor(textEditor) {
        if (!textEditor)
            return;
        this.CurrentEditor = textEditor;
        this.startLine(textEditor.visibleRanges[0].start.line);
        this.endLine(textEditor.visibleRanges[0].end.line);
        this.updateDecorations();
    }
    startLine(n) {
        if (n - this.Offset < 0) {
            this.StartLine = 0;
        }
        else {
            this.StartLine = n - this.Offset;
        }
    }
    endLine(n) {
        if (n + this.Offset > this.CurrentEditor.document.lineCount) {
            this.EndLine = this.CurrentEditor.document.lineCount;
        }
        else {
            this.EndLine = n + this.Offset;
        }
    }
    updateConfigs(extConfs) {
        settings_1.ExtSettings.Update(extConfs);
        this.SupportedLanguages = settings_1.ExtSettings.GetSupportedLanguages();
        this.DTOs.ClearCache();
    }
    updateDecorations() {
        const currentLangId = this.CurrentEditor.document.languageId;
        if (!this.SupportedLanguages.includes(currentLangId)) {
            return;
        }
        const disableInDiffEditor = settings_1.ExtSettings.Get(enums_1.Settings.disableInDiffEditor, currentLangId);
        if (disableInDiffEditor) {
            if (!(0, utils_1.isMainEditor)(this.CurrentEditor)
                && (0, utils_1.isOpenedWithDiffEditor)(this.CurrentEditor.document.uri)) {
                return;
            }
        }
        const regEx = settings_1.ExtSettings.Regex(currentLangId);
        const unFoldOnLineSelect = settings_1.ExtSettings.Get(enums_1.Settings.unfoldOnLineSelect, currentLangId);
        const text = this.CurrentEditor.document.getText();
        const regexGroup = settings_1.ExtSettings.Get(enums_1.Settings.regexGroup, currentLangId);
        const matchDecorationType = this.DTOs.MaskDecorationTypeCache(currentLangId);
        const plainDecorationType = this.DTOs.PlainDecorationType();
        const unfoldDecorationType = this.DTOs.UnfoldDecorationType(currentLangId);
        const foldRanges = [];
        const unfoldRanges = [];
        let match;
        while (match = regEx.exec(text)) {
            if (match && !match[regexGroup])
                continue;
            const matched = match[regexGroup];
            const foldIndex = match[0].lastIndexOf(matched);
            const startPosition = this.startPositionLine(match.index, foldIndex);
            const endPosition = this.endPositionLine(match.index, foldIndex, matched.length);
            const range = new vscode_1.Range(startPosition, endPosition);
            if (!cache_1.Cache.ShouldFold(this.CurrentEditor.document.uri.path, currentLangId)) {
                this.CurrentEditor.setDecorations(plainDecorationType, []);
                break;
            }
            if (!(this.StartLine <= range.start.line && range.end.line <= this.EndLine)) {
                continue;
            }
            if (this.CurrentEditor.selection.contains(range) ||
                this.CurrentEditor.selections.find(s => range.contains(s)) ||
                unFoldOnLineSelect && this.CurrentEditor.selections.find(s => s.start.line === range.start.line)) {
                unfoldRanges.push(range);
            }
            else {
                foldRanges.push({ range, hoverMessage: "Content **" + matched + "**" });
            }
        }
        this.CurrentEditor.setDecorations(unfoldDecorationType, unfoldRanges);
        this.CurrentEditor.setDecorations(matchDecorationType, foldRanges);
    }
    startPositionLine(matchIndex, startIndex) {
        return this.CurrentEditor.document.positionAt(matchIndex + startIndex);
    }
    endPositionLine(matchIndex, startIndex, length) {
        return this.CurrentEditor.document.positionAt(matchIndex + startIndex + length);
    }
    constructor() {
        this.DTOs = new decoration_1.DecoratorTypeOptions();
        this.SupportedLanguages = [];
        this.Offset = 50;
        this.StartLine = 0;
        this.EndLine = 0;
    }
}
exports.Decorator = Decorator;
//# sourceMappingURL=decorator.js.map