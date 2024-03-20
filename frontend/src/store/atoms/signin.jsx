import { atom, selector } from "recoil";

export const EmailAtom = atom({
  key: "Email",
  default: "",
});
export const PasswordAtom = atom({
  key: "Password",
  default: "",
});

export const DetailsSelector = selector({
  key: "DetailsSelector",
  get: ({ get }) => {
    return {
      username: get(EmailAtom),
      password: get(PasswordAtom),
    };
  },
});
