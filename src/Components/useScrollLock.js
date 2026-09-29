import { useEffect } from "react";

// Freezes the page behind an overlay (search palette, mobile menu).
//
// The lock goes on <html>, not <body>: iOS Safari keeps scrolling the page
// when only body is `overflow: hidden`. Hiding the scrollbar would widen the
// page and nudge everything sideways on systems with classic scrollbars, so
// its width is put back as padding.
//
// Counted, because both overlays can be open at once (the search button stays
// in the nav while the menu is open) and closing one must not unlock the page
// under the other.
let locks = 0;
let saved = null;

export default function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    if (locks++ === 0) {
      saved = { overflow: root.style.overflow, paddingRight: root.style.paddingRight };
      const scrollbar = window.innerWidth - root.clientWidth;
      root.style.overflow = "hidden";
      if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    }
    return () => {
      if (--locks === 0 && saved) {
        root.style.overflow = saved.overflow;
        root.style.paddingRight = saved.paddingRight;
        saved = null;
      }
    };
  }, [active]);
}
