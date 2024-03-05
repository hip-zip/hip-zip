import { useEffect, useRef, RefObject } from "react";

type IntersectionCallback = () => void;

const useIntersectionObserver = (
  callback: () => void,
): [
  (element: HTMLElement | null) => void,
  (element: HTMLElement | null) => void,
] => {
  const observer = useRef<IntersectionObserver | null>(null);

  const observe = (element: HTMLElement | null) => {
    if (element && observer.current) {
      observer.current.observe(element);
    }
  };

  const unobserve = (element: HTMLElement | null) => {
    if (element && observer.current) {
      observer.current.unobserve(element);
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 0.5 },
    );

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []); // 빈 의존성 배열을 사용하여 한 번만 실행되도록 설정

  return [observe, unobserve];
};

export default useIntersectionObserver;
