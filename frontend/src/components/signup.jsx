import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  FirstNameAtom,
  LastNameAtom,
  EmailAtom,
  PasswordAtom,
  DetailsSelector,
} from "../store/atoms/signup";
export function Signup() {
  const setFirstName = useSetRecoilState(FirstNameAtom);
  const setLastName = useSetRecoilState(LastNameAtom);
  const setEmail = useSetRecoilState(EmailAtom);
  const setPassword = useSetRecoilState(PasswordAtom);
  const details = useRecoilValue(DetailsSelector);
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card_signup bg-white w-[300px] p-[20px] m-auto flex flex-col gap-2 rounded mt-10 shadow-black-100 shadow-xl">
        <div className="heading text-center flex flex-col gap-1">
          <p className="font-bold text-3xl">Sign Up</p>
          <p className="text-gray-500">
            Enter your information to create an account
          </p>
        </div>
        <div className="inputs flex flex-col gap-3">
          <div className="input">
            <p className="font-semibold">First Name</p>
            <input
              type="text"
              name=""
              placeholder="John"
              className="w-full border pl-[5px] border-gray-300 rounded-md focus:border-2 outline-0 focus:border-gray-400"
              onChange={function (e) {
                const value = e.target.value;
                setFirstName(value);
              }}
            />
          </div>
          <div className="input">
            <p className="font-semibold">Last Name</p>
            <input
              type="text"
              name=""
              placeholder="Doe"
              className="w-full border pl-[5px] border-gray-300 rounded-md focus:border-2 outline-0 focus:border-gray-400"
              onChange={function (e) {
                const value = e.target.value;
                setLastName(value);
              }}
            />
          </div>
          <div className="input">
            <p className="font-semibold">Email</p>
            <input
              type="text"
              name=""
              placeholder="johndoe@example.com"
              className="w-full border pl-[5px] border-gray-300 rounded-md focus:border-2 outline-0 focus:border-gray-400"
              onChange={function (e) {
                const value = e.target.value;
                setEmail(value);
              }}
            />
          </div>
          <div className="input relative">
            <p className="font-semibold">Password</p>
            <input
              type=""
              placeholder="********"
              className="relative w-full border pl-[5px] border-gray-300 rounded-md focus:border-2 outline-0 focus:border-gray-400"
              onChange={function (e) {
                const value = e.target.value;
                setPassword(value);
              }}
            />
          </div>
        </div>
        <button
          className="btn_signup bg-black block text-white ml-auto mr-auto w-[100%] rounded pt-[1px] pb-[1px]"
          onClick={async function () {
            const res = await fetch(
              "http://localhost:3000/api/v1/user/signup",
              {
                method: "POST",
                body: JSON.stringify({
                  firstName: details.firstName,
                  lastName: details.lastName,
                  password: details.password,
                  username: details.username,
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
          Sign Up
        </button>
        <p className="error text-xs text-red-600"></p>
        <p>
          Already have an account?{" "}
          <a
            className="underline hover:no-underline cursor-pointer"
            onClick={function () {
              navigate("/signin");
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
