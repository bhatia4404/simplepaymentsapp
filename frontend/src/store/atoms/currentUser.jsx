import { selector } from "recoil";

export const currentUserData = selector({
  key: "currentUser",
  get: async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:3000/api/v1/user/find?token=${token}`
    );
    const { user, balance } = await res.json();

    return { user, balance };
  },
});
