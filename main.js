const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var Menu = require('menu');
var fs = require('fs');
var shell = require('shell');
var mainWindow = null;

// register babel hook
require("babel-register")();

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false
    },
  	width: 1200,
		height: 750
  });

var template = [
		{
			label: "Application",
			submenu: [
				{label: "About", selector: "orderFrontStandardAboutPanel:"},
				{type: "separator"},
				{label: "Quit", accelerator: "Command+Q", click: app.quit}
			]
		},
		{
			label: "Edit",
			submenu: [
				{label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
				{label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
				{type: "separator"},
				{label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
				{label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
				{label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
				{label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
			]
		},
		{
			label: "Print",
			submenu: [
				{label: "Print to PDF", accelerator: "CmdOrCtrl+P", click: function () {
					var webContents = mainWindow.webContents;
					webContents.printToPDF({
							marginsType: 0,
							printBackground: true,
							printSelectionOnly: false,
							landscape: false
						}, function(error, data) {
						if (error) throw error;
						fs.writeFile("/print.pdf", data, function(error) {
							if (error)
								throw error;
							console.log("Write PDF successfully.");
						})
					})
				}}
			]
		}
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  
  require("./server").start()
  .then((app) => {
    mainWindow.loadURL('http://localhost:3000');
  }).catch((err) => {
  
  });

  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
