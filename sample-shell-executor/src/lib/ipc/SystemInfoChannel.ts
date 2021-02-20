import { IpcChannelInterface } from "@shared/IpcChannelInterface";
import { IpcMainEvent } from "electron";
import { IpcRequest } from "@shared/IpcRequest";
import { execSync } from "child_process";

export default class SystemInfoChannel implements IpcChannelInterface {
    getName(): string {
        return "system-info";
    }
    handle(event: IpcMainEvent, request: IpcRequest): void {
        if (!request.responseChannel) {
            request.responseChannel = `${this.getName()}_response`;
        }
        event.sender.send(request.responseChannel, {
            systemInformation: execSync("systeminfo").toString(),
        });
    }
}
