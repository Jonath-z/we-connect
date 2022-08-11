export type TMessage = {
  id?: number;
  sender?: string;
  senderId: number;
  receiver: string;
  receiverId: number;
  message: string;
  date: string;
  time: string;
  isVideo: boolean;
  isImage: boolean;
};

export type TStory = {
  id: string;
  storyUrl: string;
  storyDescription?: string;
  storyType?: string;
  expirationDate: string;
  filter: null;
  allowReaction?: boolean;
};

export type TCall = {
  id: number;
  usernameId: number;
  userProfileUrl: string;
  date: string;
  time: string;
  missed: boolean;
  isIncoming: boolean;
  isVideo: boolean;
};

export type TContact = {
  id: number;
  username: string;
  userAvatartUrl?: string;
  userCoverUrl?: string;
};

export type TUser = {
  id: number;
  username: string;
  usernameLowerCase: string;
  userPassword?: string;
  userToken?: string;
  userSocketId?: string;
  userProfileUrl?: string;
  userCoverUrl: string;
  online: boolean;
  allMessages?: TMessage[];
  stories?: TStory[];
  calls?: TCall[];
};
