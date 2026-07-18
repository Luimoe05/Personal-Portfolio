import React, { useEffect, useState } from "react";

// Live local-time readout (Miami / Eastern), inspired by the footer clock on
// aboutdariel.me. Updates every 10s so the minute stays current.
export default function LocalClock({ subtle }) {
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
    <p className={`mono-ui text-xs tracking-wide ${subtle}`}>
      Miami, FL
      <span className="mx-1.5 opacity-50">·</span>
      <span className="tabular-nums">{time}</span>
    </p>
  );
}
