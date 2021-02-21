import { app, BrowserWindow } from "electron";
import Main from "./Main";
import SystemInfoChannel from "../lib/ipc/SystemInfoChannel";

Main.main(app, BrowserWindow);
Main.registerIpcChannels([new SystemInfoChannel()]);
