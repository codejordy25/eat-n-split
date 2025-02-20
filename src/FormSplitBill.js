import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({
  selectedFriend,
  onSplitBill,
  setSelectedFriend,
}) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPayingBill, setWhoIsPayingBill] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPayingBill === "user" ? paidByFriend : -paidByUser);
    setSelectedFriend(null);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split bill whith {selectedFriend.name}</h2>
      <label> 💰Bill value </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🧍🏽‍♂️Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>👫{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🤑Who is paying the Bill</label>
      <select
        value={whoIsPayingBill}
        onChange={(e) => setWhoIsPayingBill(Number(e.target.value))}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
