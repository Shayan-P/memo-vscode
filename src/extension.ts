// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Store key-value pairs in memory
let memoryStore: Map<string, string> = new Map();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Load saved data from storage
	const savedData = context.globalState.get('memoryStore');
	if (savedData) {
		memoryStore = new Map(Object.entries(savedData));
	}

	let memorizeCommand = vscode.commands.registerCommand('memory-helper.memorize', async () => {
		// Prompt for key
		const key = await vscode.window.showInputBox({
			placeHolder: 'Enter a key to remember this by',
			prompt: 'key:'
		});

		if (!key) { return; }

		// Prompt for value
		const value = await vscode.window.showInputBox({
			placeHolder: 'Enter the value to remember',
			prompt: 'value:'
		});

		if (!value) { return; }

		// Store in memory and persistent storage
		memoryStore.set(key, value);
		await context.globalState.update('memoryStore', Object.fromEntries(memoryStore));

		vscode.window.showInformationMessage(`Memorized: ${key}`);
	});

	let rememberCommand = vscode.commands.registerCommand('memory-helper.remember', async () => {
		if (memoryStore.size === 0) {
			vscode.window.showInformationMessage('No memories stored yet!');
			return;
		}

		// Create quickpick items from stored keys
		const keys = Array.from(memoryStore.keys());
		const selected = await vscode.window.showQuickPick(keys, {
			placeHolder: 'Select a key to remember'
		});

		if (!selected) { return; }

		// Copy value to clipboard
		const value = memoryStore.get(selected);
		if (value) {
			await vscode.env.clipboard.writeText(value);
			vscode.window.showInformationMessage(`Copied "${selected}" to clipboard!`);
		}
	});

	let forgetCommand = vscode.commands.registerCommand('memory-helper.forget', async () => {
		if (memoryStore.size === 0) {
			vscode.window.showInformationMessage('No memories stored yet!');
			return;
		}
		
		const keys = Array.from(memoryStore.keys());
		const selected = await vscode.window.showQuickPick(keys, {
			placeHolder: 'Select a key to forget'
		});

		if (!selected) { return; }
		const value = memoryStore.get(selected);
		if (value) {
			memoryStore.delete(selected);
			await context.globalState.update('memoryStore', Object.fromEntries(memoryStore));
			vscode.window.showInformationMessage(`Forgot "${selected}"`);
		}
	});

	context.subscriptions.push(memorizeCommand, rememberCommand, forgetCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
