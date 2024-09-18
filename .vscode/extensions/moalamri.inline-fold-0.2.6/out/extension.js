"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const decorator_1 = require("./decorator");
const enums_1 = require("./enums");
const utils_1 = require("./utils");
const cache_1 = require("./cache");
function activate(context) {
    const config = vscode_1.workspace.getConfiguration(enums_1.Settings.identifier);
    const decorator = new decorator_1.Decorator();
    const elimit = new utils_1.EventsLimit();
    decorator.updateConfigs(config);
    elimit.Register(triggerUpdateDecorations);
    elimit.Lead();
    function triggerUpdateDecorations() {
        for (const textEditor of vscode_1.window.visibleTextEditors) {
            decorator.editor(textEditor);
        }
    }
    const toggleCommand = vscode_1.commands.registerCommand(enums_1.Commands.InlineFoldToggle, () => {
        var _a, _b;
        cache_1.Cache.ToggleShouldFold((_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.path, (_b = vscode_1.window.activeTextEditor) === null || _b === void 0 ? void 0 : _b.document.languageId);
        triggerUpdateDecorations();
    });
    const clearCacheCommand = vscode_1.commands.registerCommand(enums_1.Commands.InlineFoldClearCache, () => {
        cache_1.Cache.Clear();
    });
    const changeVisibleTextEditors = vscode_1.window.onDidChangeVisibleTextEditors((editors) => {
        if (editors.length < 1)
            return;
        elimit.Trail();
    });
    const changeSelection = vscode_1.window.onDidChangeTextEditorSelection((e) => {
        elimit.Lead();
    });
    const changeVisibleRange = vscode_1.window.onDidChangeTextEditorVisibleRanges((e) => {
        if (!e.textEditor)
            return;
        elimit.Trail();
    });
    const changeText = vscode_1.workspace.onDidChangeTextDocument((e) => {
        if (e.reason !== 1 && e.reason !== 2)
            return;
        elimit.Trail();
    });
    const changeConfiguration = vscode_1.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration(enums_1.Settings.identifier)) {
            if (!event.affectsConfiguration(enums_1.Settings.autoFold)) {
                cache_1.Cache.Clear();
            }
            decorator.updateConfigs(vscode_1.workspace.getConfiguration(enums_1.Settings.identifier));
        }
    });
    context.subscriptions.push(changeText);
    context.subscriptions.push(toggleCommand);
    context.subscriptions.push(changeSelection);
    context.subscriptions.push(changeVisibleTextEditors);
    context.subscriptions.push(clearCacheCommand);
    context.subscriptions.push(changeVisibleRange);
    context.subscriptions.push(changeConfiguration);
}
exports.activate = activate;
function deactivate(context) {
    context.subscriptions.forEach((d) => d.dispose());
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map