import { atom } from "recoil";

export const showChatAtom = atom({
  key: "showChatAtom",
  default: false,
});

export const bottomNavAtom = atom({
  key: "bottomNavAtom",
  default: {
    chat: true,
    contact: false,
    calls: false,
    profile: false,
  },
});

export const messagesAtom = atom({
  key: "messageAtom",
  default: <any[]>[],
});

export const minifyCallRoomAtom = atom({
  key: "roomCall",
  default: false,
});

export const openCallRoomAtom = atom({
  key: "openCallRoomAtom",
  default: false,
});
