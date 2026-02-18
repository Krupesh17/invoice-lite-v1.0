import { useState, useEffect, useRef } from "react";

function useResizeObserver() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // Ensure the browser supports ResizeObserver
    if (typeof window === "undefined" || !window.ResizeObserver) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      // We only expect one entry for our div
      if (!entries || entries.length === 0) {
        return;
      }

      // Update the state with the new width
      setWidth(entries[0].contentRect.width);
    });

    // Start observing the element once it's mounted
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Cleanup function to stop observing when the component unmounts
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
      resizeObserver.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once when mounted

  return { ref, width };
}

export default useResizeObserver;
