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

export interface ISaveCall {
  username: number;
  userProfileUrl: string;
  date: string;
  time: string;
  missed: boolean;
  isIncoming: boolean;
  isVideo: boolean;
  calledUsername: string;
}
