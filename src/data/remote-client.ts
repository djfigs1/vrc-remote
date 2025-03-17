import { ConnectionStatus } from "@/types/remote";
import { VRChatState } from "@/types/vrc";

export class VRCRemoteClient {
  private _socket: WebSocket | null = null;
  private _status: ConnectionStatus = "disconnected";
  private _connectionStatusListeners: ((status: ConnectionStatus) => void)[] =
    [];

  async connect(address: string) {
    if (this._socket) {
      this.disconnect();
    }

    let socket = new WebSocket(address);
    this.status = "connecting";
    this._socket = socket;
    socket.addEventListener("close", this.onClose.bind(this));
    await new Promise((resolve) => {
      socket.addEventListener("open", resolve);
    });

    this.status = "connected";
  }

  disconnect() {
    if (!this._socket) {
      return;
    }

    this._socket.close();
    this.status = "disconnected";
  }

  send(address: string, ...parameters: any[]) {
    if (!this._socket || this.status !== "connected") return;

    this._socket.send(
      JSON.stringify({
        addr: address,
        params: [...parameters],
      })
    );
  }

  addConnectionStatusListener(listener: (status: ConnectionStatus) => void) {
    this._connectionStatusListeners.push(listener);
  }

  removeConnectionStatusListener(listener: (status: ConnectionStatus) => void) {
    this._connectionStatusListeners = this._connectionStatusListeners.filter(
      (l) => l !== listener
    );
  }

  get status(): ConnectionStatus {
    return this._status;
  }

  private onClose() {
    this._socket = null;
    this.status = "disconnected";
  }

  private onError() {}

  private set status(newStatus: ConnectionStatus) {
    this._status = newStatus;
    this._connectionStatusListeners.forEach((l) => l(newStatus));
  }
}
