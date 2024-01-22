import { useRef } from "react";

const useIntersectionObserver = <T>(callback: () => T) => {
  const obeserver = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 0.5 },
    ),
  );

  const observe = (element: HTMLElement | null) => {
    if (element) {
      obeserver.current.observe(element);
    }
  };
  const unobserve = (element: HTMLElement | null) => {
    if (element) {
      obeserver.current.unobserve(element);
    }
  };

  return [observe, unobserve];
};

export default useIntersectionObserver;
