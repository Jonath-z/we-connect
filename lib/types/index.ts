export type TMessage = {
  id?: number;
  sender?: string;
  senderId: string;
  receiver: string;
  receiverId: string;
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
  id: string;
  username: string;
  userAvatarUrl: string;
  Date: string;
  time: string;
  missed: boolean;
  isVideo: boolean;
};

export type TContact = {
  id: string;
  username: string;
  userAvatartUrl?: string;
  userCoverUrl?: string;
  lastMessage: TMessage;
  status?: {
    viewed?: boolean;
  };
};

export type TUser = {
  id: string;
  username: string;
  userAvatarUrl?: string;
  userCoverUrl?: string;
  userToken?: string;
  userSocketId?: string;
  password?: string;
  online?: boolean;
  lastConnexion?: string;
  allMessages?: TMessage[];
  stories?: TStory[];
  calls?: TCall[];
};
