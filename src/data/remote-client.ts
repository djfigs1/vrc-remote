export class VRCRemoteClient {
  private _socket: WebSocket | undefined;

  async connect(address: string) {
    if (this._socket) {
      this.disconnect();
    }

    let socket = new WebSocket(address);
    this._socket = socket;
    await new Promise((resolve) => {
      socket.addEventListener("open", resolve);
    });
  }
  disconnect() {
    if (!this._socket) {
      return;
    }
  }
  send(address: string, parameters: any[]) {
    if (!this._socket || this._socket.readyState !== WebSocket.OPEN) return;

    this._socket.send(
      JSON.stringify({
        addr: address,
        params: parameters,
      })
    );
  }
}
