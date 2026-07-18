import React from "react";

// CSS-driven mount entrance (fade + rise). A CSS animation advances on the
// document timeline and always resolves to its end state, so content can never
// get stuck invisible the way a throttled rAF/JS reveal (e.g. framer-motion in
// a hidden/backgrounded tab) can.
const AnimateIn = ({ children, delay = 0, duration = 0.5 }) => (
  <div
    className="anim-rise"
    style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
  >
    {children}
  </div>
);

export default AnimateIn;
