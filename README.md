# Memory Helper

Memory Helper is a VS Code extension that helps you store and recall text snippets using memorable keys. Think of it as a smart clipboard with named entries that persist between VS Code sessions.

## Features

This extension provides three main commands:

1. **Memorize: Store text** (`memory-helper.memorize`)
   - Prompts you to enter a key (like "api-key" or "greeting")
   - Prompts you to enter the text value to remember
   - Stores the key-value pair for later use

2. **Remember: Recall stored text** (`memory-helper.remember`)
   - Shows a list of all stored keys
   - When you select a key, copies its associated text to your clipboard
   - Perfect for quickly accessing frequently used text snippets

3. **Forget: Remove stored text** (`memory-helper.forget`)
   - Shows a list of all stored keys
   - Removes the selected key-value pair from storage

## Usage

You can access all commands through the Command Palette (Ctrl+Shift+P / Cmd+Shift+P):

1. To store new text:
   - Open Command Palette
   - Type "Memorize" and select "Memorize: Store text"
   - Enter a memorable key
   - Enter the text you want to store

2. To recall stored text:
   - Open Command Palette
   - Type "Remember" and select "Remember: Recall stored text"
   - Select the key from the list
   - The associated text will be copied to your clipboard

3. To remove stored text:
   - Open Command Palette
   - Type "Forget" and select "Forget: Remove stored text"
   - Select the key you want to remove

## Storage

All stored key-value pairs persist between VS Code sessions and are stored per user. The data is stored using VS Code's built-in storage API.

## Requirements

VS Code 1.60.0 or higher

## Extension Settings

This extension does not contribute any settings yet.

## Release Notes

### 0.0.1

Initial release of Memory Helper:
- Basic memorize/remember functionality
- Persistent storage
- Clipboard integration
