import React, { useState, useEffect } from "react";
import "./CurrentDateTime.css";

function CurrentDateTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      <p className="date">{formatDate(currentTime)}</p>
      <p className="time">{formatTime(currentTime)}</p>
    </div>
  );
}

export default CurrentDateTime;
