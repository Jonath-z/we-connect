import { io } from "socket.io-client";
import Peer from "simple-peer";

class CallService {
  public socket;

  constructor() {
    this.socket = io("http://localhost:3300");
  }

  public requestCall(from: string, to: string, stream: any) {
    const peer = new Peer({ initiator: true, stream });

    peer.on("signal", (data) => {
      this.socket.emit("requestCall", { from, to, signal: data });
    });
  }

  public cancelCall(from: string, to: string) {
    this.socket.emit("cancelCall", { from, to });
  }

  //   public answerCall(): Peer.Instance {
  //     const peer = new Peer({ initiator: false, stream });

  //     this.socket.emit("answerCall", { from, to, stream });

  //     return peer;
  //   }
}

const callServices = new CallService();
export default callServices;
