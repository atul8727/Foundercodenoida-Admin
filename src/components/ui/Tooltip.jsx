import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GAP = 8;
const EDGE = 8;

export default function Tooltip({ children, content, position = "top", delay = 150, className = "" }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  const wrapRef = useRef(null);
  const tipRef = useRef(null);
  const timer = useRef(null);

  const show = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    clearTimeout(timer.current);
    setVisible(false);
  };

  useLayoutEffect(() => {
    if (!visible || !wrapRef.current || !tipRef.current) return;
    const t = wrapRef.current.getBoundingClientRect();
    const tip = tipRef.current.getBoundingClientRect();
    let top;
    let left;
    if (position === "bottom") { top = t.bottom + GAP; left = t.left + t.width / 2 - tip.width / 2; }
    else if (position === "left") { top = t.top + t.height / 2 - tip.height / 2; left = t.left - tip.width - GAP; }
    else if (position === "right") { top = t.top + t.height / 2 - tip.height / 2; left = t.right + GAP; }
    else { top = t.top - tip.height - GAP; left = t.left + t.width / 2 - tip.width / 2; }
    setCoords({
      top: Math.max(EDGE, Math.min(top, window.innerHeight - tip.height - EDGE)),
      left: Math.max(EDGE, Math.min(left, window.innerWidth - tip.width - EDGE)),
    });
  }, [visible, position, content]);

  useEffect(() => {
    if (!visible) return undefined;
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, [visible]);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (!content) return children;
  return (
    <div ref={wrapRef} className={`relative inline-flex items-center ${className}`} onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {visible &&
        createPortal(
          <div ref={tipRef} role="tooltip" style={{ position: "fixed", top: coords.top, left: coords.left }}
            className="pointer-events-none z-[100] whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-xs font-medium text-page shadow-pop">
            {content}
          </div>,
          document.body
        )}
    </div>
  );
}
