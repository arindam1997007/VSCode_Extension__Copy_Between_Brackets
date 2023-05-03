// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode")

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "copy-between-brackets.copy",
    function () {
      // The code you place here will be executed every time your command is executed
      const editor = vscode.window.activeTextEditor
      if (editor) {
        // Select the text between the brackets
        vscode.commands
          .executeCommand("editor.action.selectToBracket")
          .then(() => {
            const selection = editor.selection
            const text = editor.document.getText(selection)

            // Remove the first and last characters of the text
            const newText = text.substring(1, text.length - 1)
            vscode.env.clipboard.writeText(newText)
            vscode.commands.executeCommand("cursorLeft")

            vscode.window.showInformationMessage(newText)
          })
      }
    }
  )

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
