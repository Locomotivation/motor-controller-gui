import { App, BrowserWindow, ipcMain } from "electron";
import { IpcChannelInterface } from "@shared/IpcChannelInterface";
import { join } from "path";

export default class Main {
    private static mainWindow: BrowserWindow;
    private static application: App;
    private static BrowserWindow: typeof BrowserWindow;

    public static main(app: App, browserWindow: typeof BrowserWindow): void {
        Main.application = app;
        Main.BrowserWindow = browserWindow;
        Main.application.on("ready", Main.onReady);
        Main.application.on("window-all-closed", Main.onWindowsAllClosed);
    }

    public static registerIpcChannels(
        ipcChannels: IpcChannelInterface[]
    ): void {
        ipcChannels.forEach((channel) =>
            ipcMain.on(channel.getName(), (event, request) =>
                channel.handle(event, request)
            )
        );
    }

    private static onClose(): void {
        Main.mainWindow = null;
    }

    private static onReady(): void {
        Main.mainWindow = new Main.BrowserWindow({
            width: 800,
            height: 600,
            title: "Sample Application",
            webPreferences: {
                contextIsolation: true,
                enableRemoteModule: false,
                nodeIntegration: false,
                preload: join(__dirname, "Preload.js"),
            },
        });
        Main.mainWindow.loadFile(join(process.cwd(), "index.html"));
        Main.mainWindow.on("closed", Main.onClose);
    }

    private static onWindowsAllClosed(): void {
        if (process.platform !== "darwin") {
            Main.application.quit();
        }
    }
}
