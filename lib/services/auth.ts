import { TUser } from "lib/types";
import { gunServices } from "./gunService";
import localStorageServices from "./localStorage";

class Auth {
  onGoogleLoginSuccess(response: any) {
    console.log("login success", response);
    const newUser: TUser = {
      id: response.profileObj.googleId,
      username: response.profileObj.givenName,
      userAvatarUrl: response.profileObj.imageUrl,
    };

    gunServices.findUserById(newUser.id, (user: TUser | null) => {
      if (user) {
        window.location.href = `/home/${user.id}`;
      } else {
        gunServices.saveNewUser(newUser);
        window.location.href = `/home/${newUser.id}`;

        localStorageServices.setItem("_we_connect_account_id", newUser.id);
      }
    });
  }

  onGoogleLoginFailure(response: any) {
    console.log("login fail", response);
  }
}

const auth = new Auth();

export default auth;
