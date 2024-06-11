import { useState, useEffect } from "react";
import {
  generateOTP,
  handleAccountDelete,
  refetchAccounts,
} from "./utils/utils";
import Timer from "./components/Timer";
import AddAccount from "./pages/AddAccount";
import "./styles.css";

/*
Requirements
- Get uuid
- Generate ASCII appended ID
- Take Moduli of current epoch
- Store under OTP state
*/

export default function App() {
  const [route, setRoute] = useState("");
  const [accounts, setAccounts] = useState(
    JSON.parse(localStorage.getItem("storedAccounts")) ?? "{}"
  );
  const isAccountsEmpty = Object.keys(accounts).length === 0;
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    const updateTimestamp = () => {
      const currentEpoch = Math.floor(Date.now());
      setTimestamp(currentEpoch);
      localStorage.setItem("epochTimestamp", currentEpoch);
    };
    updateTimestamp();
    const interval = setInterval(updateTimestamp, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAccounts(() => refetchAccounts());
  }, [route]);

  return (
    <div className="App">
      <h1
        style={{
          fontFamily: "monospace",
          textDecoration: "underline",
          color: "#ff4052",
        }}
      >
        {"PlumAuthy :)"}
      </h1>
      {route === "" && (
        <>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {Object.keys(accounts).map((id) => {
                return (
                  <div
                    onClick={() => {
                      setRoute(id);
                    }}
                    style={{
                      textAlign: "left",
                      border: "1px solid black",
                      cursor: "pointer",
                      padding: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#ff4052",
                      borderRadius: "16px",
                    }}
                  >
                    <p>{accounts[id]}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccountDelete(id);
                        setAccounts(() => refetchAccounts());
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
              {isAccountsEmpty && (
                <div>
                  <h2>{"No Accounts Added Yet"}</h2>
                  <p>Click add account to get started</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {route !== "" && route !== "new" && (
        <div>
          <h1>{generateOTP(route, timestamp)}</h1>
          <h2>{accounts[route]}</h2>
          <Timer startTimestamp={timestamp} />
        </div>
      )}
      {route === "new" && (
        <AddAccount setRoute={setRoute} setAccounts={setAccounts} />
      )}
      <div style={{ marginTop: "16px" }}>
        <button
          onClick={() => {
            if (route === "") {
              setRoute("new");
            } else {
              setRoute("");
            }
          }}
        >
          {route === "" ? "Add Account" : "Back to Accounts"}
        </button>
      </div>
    </div>
  );
}
