import { useLayoutEffect, useRef, useState } from "react";
// eslint-disable-next-line react/prop-types -- Shared wrapper for header content.
export default function FixedHeader({ children, className = "" }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const element = ref.current;
    const measure = () => setHeight(element.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className={"fixed-header-space " + className} style={{ height }}><div ref={ref} className="fixed-header-frame">{children}</div></div>;
}
