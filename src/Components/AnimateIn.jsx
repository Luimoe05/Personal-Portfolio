import React, { useEffect, useRef, useState } from "react";

// Apple-style scroll reveal: a short fade-and-rise the first time the block
// enters the viewport. Pure CSS transition toggled by an IntersectionObserver,
// so it resolves to fully visible even if the observer is unavailable.
// Reduced motion skips the movement and shows the content immediately.
export default function AnimateIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition duration-1000 ease-apple motion-reduce:transition-none ${
        shown
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 motion-reduce:opacity-100 motion-reduce:translate-y-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
