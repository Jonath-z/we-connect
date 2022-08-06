import Gun from "gun/gun";
import { IGunChain, IGunInstance } from "gun/types";
import { TUser } from "lib/types";

class GunService {
  public gun: IGunInstance<any> | undefined;
  public messageListener:
    | IGunChain<any, IGunInstance<any>, IGunInstance<any>, "messages">
    | undefined;
  public usersListener;

  constructor() {
    this.gun = Gun({
      peers: ["http://localhost:4000/gun"],
      localStorage: false,
    });
    this.messageListener = this.gun.get("messages");
    this.usersListener = this.gun.get("users");
  }

  public sendMessage(message: any) {
    this.messageListener?.set(message);
  }

  public saveNewUser(user: TUser) {
    this.usersListener?.set(user);
  }

  public findUserById(userId: string, callback: (user: TUser | null) => void) {
    this.usersListener.map((user: TUser) => {
      if (user.id === userId) {
        callback(user);
      } else {
        callback(null);
      }
    });
  }

  public findUsers() {
    this.usersListener.map((user) => {
      console.log("user authenticated", user);
    });
  }
}

export const gunServices = new GunService();
