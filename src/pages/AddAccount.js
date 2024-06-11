import { useState } from "react";
export default function AddAccount({ setRoute, setAccounts }) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const accounts = JSON.parse(localStorage.getItem("storedAccounts") ?? "{}");

  const handleAddAccount = () => {
    if (code === "" || name === "") return;
    localStorage.setItem(
      "storedAccounts",
      JSON.stringify({ ...accounts, [code]: name })
    );
    setRoute("");
  };

  return (
    <div>
      <div>
        <p>Account Code</p>
        <input
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
      </div>
      <div>
        <p>Account Name</p>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button
        style={{ marginTop: "16px" }}
        onClick={() => {
          handleAddAccount();
        }}
      >
        Add New Account
      </button>
    </div>
  );
}
