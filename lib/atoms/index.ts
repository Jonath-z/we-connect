import { atom } from "recoil";

const showChatAtom = atom({
  key: "showChatAtom",
  default: false,
});

const bottomNavAtom = atom({
  key: "bottomNavAtom",
  default: {
    chat: true,
    contact: false,
    calls: false,
    profile: false,
  },
});

const messagesAtom = atom({
  key: "messageAtom",
  default: <any[]>[],
});

export { showChatAtom, bottomNavAtom, messagesAtom };
