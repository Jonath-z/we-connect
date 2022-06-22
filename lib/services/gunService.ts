import Gun from "gun/gun";
import { IGunChain, IGunInstance } from "gun/types";

class GunService {
  public gun: IGunInstance<any> | undefined;
  public messageListener:
    | IGunChain<any, IGunInstance<any>, IGunInstance<any>, "messages">
    | undefined;

  constructor() {
    this.gun = Gun({
      peers: ["http://localhost:4000/gun"],
      localStorage: false,
    });
    this.messageListener = this.gun.get("messages");
  }

  public sendMessage(message: any) {
    this.messageListener?.set(message);
  }
}

export const gunServices = new GunService();
