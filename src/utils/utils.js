export const generateOTP = (uuid, time) => {
  const uuidArr = uuid.split("");
  const sixDigitTime = time % 1000000;
  const uuidAscii = [];
  uuidArr.forEach((item) => {
    return uuidAscii.push(item.charCodeAt(0));
  });
  const asciiString = uuidAscii.join("");
  return (asciiString % sixDigitTime).toString().padStart(6, 0);
};

export const handleAccountDelete = (uuid) => {
  const accounts = JSON.parse(localStorage.getItem("storedAccounts") ?? {});
  const filteredAccounts = Object.keys(accounts).reduce((acc, id) => {
    if (id !== uuid) {
      acc[id] = accounts[id];
    }
    return acc;
  }, {});
  localStorage.setItem("storedAccounts", JSON.stringify(filteredAccounts));
};

export const refetchAccounts = () => {
  return JSON.parse(localStorage.getItem("storedAccounts") ?? "{}");
};
