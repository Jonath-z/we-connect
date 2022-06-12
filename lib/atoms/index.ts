import { atom } from "recoil";

const showChatAtom = atom({
  key: "showChatAtom",
  default: false,
});

export { showChatAtom };
