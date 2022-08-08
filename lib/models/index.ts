export interface ICreateUser {
  username: string;
  userPassword?: string;
  userToken: string;
  userProfileUrl?: string;
}

export interface IUpdateUser {
  username?: string;
  userPassword?: string;
  userToken: string;
  userProfileUrl?: string;
  userSocketId?: string;
  userCoverUrl?: string;
}
