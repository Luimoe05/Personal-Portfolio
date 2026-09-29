import React, { useEffect, useState } from "react";

// Live local-time readout (Miami / Eastern). Updates every 10s so the minute
// stays current.
export default function LocalClock({ className = "" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={className}>
      Miami, FL · <span className="tabular-nums">{time}</span>
    </p>
  );
}
