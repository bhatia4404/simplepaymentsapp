export function Balance({ balance }) {
  return (
    <div className="balance ml-4">
      <p className="font-semibold">
        <span className="font-bold mr-2">Your balance {"  "}</span>
        {new Intl.NumberFormat("en-in", {
          style: "currency",
          currency: "INR",
        }).format(balance)}
      </p>
    </div>
  );
}
