import { atom, selector } from "recoil";
export const FirstNameAtom = atom({
  key: "firstName",
  default: "",
});
export const LastNameAtom = atom({
  key: "lastName",
  default: "",
});
export const EmailAtom = atom({
  key: "email",
  default: "",
});
export const PasswordAtom = atom({
  key: "password",
  default: "",
});

export const DetailsSelector = selector({
  key: "detailsSelector",
  get: ({ get }) => {
    return {
      firstName: get(FirstNameAtom),
      lastName: get(LastNameAtom),
      username: get(EmailAtom),
      password: get(PasswordAtom),
    };
  },
});
