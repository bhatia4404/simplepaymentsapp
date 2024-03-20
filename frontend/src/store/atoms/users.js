import { atom, selector } from "recoil";

export const filteredUsersSelector = selector({
  key: "filteredUsers",
  get: async ({ get }) => {
    const allUsers = await fetch(
      `http://localhost:3000/api/v1/user/bulk?filter=${get(usersFilterAtom)}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWY4MDJjMDQ3YThlMzYyNmU2NjI5ZjciLCJpYXQiOjE3MTA3NTI0NDh9.ia6xVaPgaGoLNaFJrTHSC_eD5bqK9nsdINGsyJNYe-A",
        },
      }
    );
    const { users: data } = await allUsers.json();

    return data;
  },
});

export const usersFilterAtom = atom({
  key: "userFilter",
  default: "",
});
