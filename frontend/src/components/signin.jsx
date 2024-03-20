import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  EmailAtom,
  PasswordAtom,
  DetailsSelector,
} from "../store/atoms/signin";
import { useNavigate } from "react-router-dom";
export function Signin() {
  const setEmail = useSetRecoilState(EmailAtom);
  const setPassword = useSetRecoilState(PasswordAtom);
  const details = useRecoilValue(DetailsSelector);
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card_signin bg-white w-[300px] p-[20px] m-auto flex flex-col gap-2 rounded mt-10 shadow-black-100 shadow-xl">
        <div className="heading text-center flex flex-col gap-1">
          <p className="font-bold text-3xl">Sign In</p>
          <p className="text-gray-500 font-semibold">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="inputs flex flex-col gap-3">
          <div className="input block">
            <p className="font-semibold">Email</p>
            <input
              type="text"
              className="w-full border pl-[5px] border-gray-300 rounded-md focus:border-2 outline-0 focus:border-gray-400"
              placeholder="johndoe@example.com"
              onChange={function (e) {
                const value = e.target.value;
                setEmail(value);
              }}
            />
          </div>
          <div className="input">
            <p className="font-semibold">Password</p>
            <input
              type="password"
              className="w-full border pl-[5px] border-gray-300 rounded-md focus:border-2 outline-0 focus:border-gray-400"
              placeholder="********"
              onChange={function (e) {
                const value = e.target.value;
                setPassword(value);
              }}
            />
          </div>
        </div>
        <button
          className="btn_signin bg-black block text-white ml-auto mr-auto w-[100%] rounded pt-[2px] pb-[4px]"
          onClick={async function () {
            const res = await fetch(
              "http://localhost:3000/api/v1/user/signin",
              {
                method: "POST",
                body: JSON.stringify({
                  username: details.username,
                  password: details.password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }
            );
            const data = await res.json();

            if (data.token) {
              localStorage.setItem("token", data.token);
              navigate("/dashboard");
            } else {
              document.querySelector(".error").textContent = data.message;
              document
                .querySelectorAll("input")
                .forEach((inp) => (inp.value = ""));
            }
          }}
        >
          Sign In
        </button>
        <p>
          Don't have an account?{" "}
          <a
            className="underline hover:no-underline cursor-pointer"
            onClick={function () {
              navigate("/signup");
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
