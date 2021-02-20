import { IpcRenderer } from "electron";
import { IpcRequest } from "@shared/IpcRequest";

export class IpcService {
    private ipcRenderer?: IpcRenderer;

    public send<T>(channel: string, request: IpcRequest = {}): Promise<T> {
        if (!this.ipcRenderer) {
            this.initializeIpcRenderer();
        }

        if (!request.responseChannel) {
            request.responseChannel = `${channel}_response_${new Date().getTime()}`;
        }

        const ipcRenderer = this.ipcRenderer;
        ipcRenderer.send(channel, request);

        return new Promise((resolve) => {
            ipcRenderer.once(request.responseChannel, (event, response) =>
                resolve(response)
            );
        });
    }

    private initializeIpcRenderer(): void {
        if (!window || !window.process || !window.require) {
            throw new Error("Unable to require renderer process.");
        }
        this.ipcRenderer = window.require("electron").ipcRenderer;
    }
}
