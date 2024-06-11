import { useState, useEffect } from "react";

const CountdownTimer = ({ startTimestamp }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // Function to update the remaining time
    const updateTimeLeft = () => {
      const currentTime = Date.now(); // Get current time in milliseconds
      const timeElapsed = Math.floor((currentTime - startTimestamp) / 1000); // Convert to seconds
      const newTimeLeft = 30 - timeElapsed;
      setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
    };

    // Update immediately and then every second
    updateTimeLeft();
    const intervalId = setInterval(updateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [startTimestamp]);

  return (
    <div>
      <h4
        style={{
          textDecoration: "underline",
          color: timeLeft < 10 ? "red" : "green",
        }}
      >
        {timeLeft} seconds left
      </h4>
    </div>
  );
};

export default CountdownTimer;
