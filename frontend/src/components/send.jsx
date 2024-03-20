import { useSearchParams } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { amountAtom } from "../store/atoms/amount";
export function SendMoney() {
  const [searchParams] = useSearchParams();
  const toId = searchParams.get("to");
  const name = searchParams.get("name");

  const [amount, setAmount] = useRecoilState(amountAtom);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="  w-[300px] p-5 shadow-gray shadow-xl flex flex-col gap-3 h-fit">
        <p className="text-center block font-semibold mb-[50px]">Send Money</p>

        <div className="user_details flex items-center gap-3">
          <p className="bg-[#21c55d] pl-[11px] pr-[11px]  text-white text-[24px] rounded-full ">
            {name[0]}
          </p>
          <p className="font-semibold text-[18px]">{name}</p>
        </div>
        <p className="text-sm font-semibold">Amount (In Rs)</p>
        <input
          type="number"
          placeholder="Enter anount"
          className="input_amount w-full outline-0 border border-gray-300 pl-2 rounded"
          onChange={function (e) {
            setAmount(Number(e.target.value));
          }}
        />
        <button
          className="bg-[#21c55d] rounded text-white font-semibold pt-1 pb-1"
          onClick={async function () {
            const send = await fetch(
              "http://localhost:3000/api/v1/account/transfer",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  amount,
                  to: toId,
                }),
              }
            );
            const { message } = await send.json();
            document.querySelector(".statusText").innerHTML = message;
          }}
        >
          Initiate Transfer
        </button>
        <p className="statusText"></p>
      </div>
    </div>
  );
}
