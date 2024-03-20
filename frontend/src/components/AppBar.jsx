export function Appbar({ firstName }) {
  const firstLetter = firstName[0].toUpperCase();
  return (
    <div className="appbar flex justify-between ">
      <p className="font-semibold">PayTM App</p>

      <div className="user flex gap-3">
        <p>Hello {firstName}</p>
        <div className="bg-gray-300 pl-[7px] pr-[7px] rounded-full">
          {firstLetter}
        </div>
      </div>
    </div>
  );
}
