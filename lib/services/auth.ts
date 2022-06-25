import { TUser } from "lib/types";
import { gunServices } from "./gunService";

class Auth {
  onGoogleLoginSuccess(response: any) {
    console.log("login success", response);
    const user: TUser = {
      id: response.profileObj.googleId,
      username: response.profileObj.givenName,
      userAvatarUrl: response.profileObj.imageUrl,
    };
    gunServices.findUserById(user.id, (user: TUser) => {
      if (user) {
        window.location.href = `/home/${user.id}`;
      }
      gunServices.saveNewUser(user);
      window.location.href = `/home/${user.id}`;
    });
  }

  onGoogleLoginFailure(response: any) {
    console.log("login fail", response);
  }
}

const auth = new Auth();

export default auth;
