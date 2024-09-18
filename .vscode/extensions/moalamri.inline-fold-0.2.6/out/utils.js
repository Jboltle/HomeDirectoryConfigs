"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOpenedWithDiffEditor = exports.isMainEditor = exports.EventsLimit = void 0;
const vscode_1 = require("vscode");
class EventsLimit {
    constructor(_trailTimer = 100, _leadTimer = 100) {
        this.trailTimer = undefined;
        this.leadTimer = undefined;
        this.isCalled = false;
        this.func = undefined;
        this.Register = (func) => {
            this.func = func;
        };
        this.Lead = () => {
            if (!this.isCalled) {
                this.isCalled = true;
                this.func();
            }
            setTimeout(() => {
                this.isCalled = false;
            }, this.leadTimer);
        };
        this.Trail = () => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.func(), this.trailTimer);
        };
        this.trailTimer = _trailTimer;
        this.leadTimer = _leadTimer;
    }
}
exports.EventsLimit = EventsLimit;
function isMainEditor(editor) {
    return editor.viewColumn !== undefined;
}
exports.isMainEditor = isMainEditor;
function isOpenedWithDiffEditor(uri) {
    const tabs = vscode_1.window.tabGroups.all.flatMap((tabGroup) => tabGroup.tabs);
    return tabs.some((tab) => tab.input instanceof vscode_1.TabInputTextDiff &&
        (tab.input.modified.path === uri.path ||
            tab.input.original.path === uri.path));
}
exports.isOpenedWithDiffEditor = isOpenedWithDiffEditor;
//# sourceMappingURL=utils.js.map