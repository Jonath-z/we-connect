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

export interface ISaveStory {
  storyUrl: string;
  storyDescription: string;
  storyType: string;
  expirationDate: string;
  allowReaction?: boolean;
  storyOwner: number;
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
