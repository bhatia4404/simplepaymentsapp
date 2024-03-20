import { useRecoilValue } from "recoil";
import { filteredUsersSelector } from "../store/atoms/users";
import { currentUserData } from "../store/atoms/currentUser";
import { useNavigate } from "react-router-dom";
export function Users() {
  const navigate = useNavigate();
  const allUsers = useRecoilValue(filteredUsersSelector);
  const curUser = useRecoilValue(currentUserData);
  const users = allUsers.filter((user) => user._id != curUser.user._id);
  return (
    <div className="ml-4 mt-2">
      <div className="users flex flex-col gap-2">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => {
            return (
              <div className="user flex justify-between " key={user._id}>
                <div className="user_details flex gap-2">
                  <div className="firstletter pl-[7px] pr-[7px] rounded-full bg-gray-300">
                    {user.firstName[0]}
                  </div>
                  <p className="font-semibold">{user.firstName}</p>
                </div>
                <button
                  className="bg-black text-white pl-2 pr-2 rounded-md"
                  onClick={function (e) {
                    const toUserId = user._id;
                    navigate(
                      `/send?name=${
                        user.firstName + " " + user.lastName
                      }&to=${toUserId}`
                    );
                  }}
                >
                  Send Money
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
