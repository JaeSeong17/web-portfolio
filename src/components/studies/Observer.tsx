import { useEffect, useRef } from 'react';

export default function Observer({
  handleIntersection,
}: {
  handleIntersection: () => void;
}) {
  const target = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          handleIntersection();
        }
      },
      { threshold: 1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => observer.disconnect();
  }, []);
  return <div ref={target}>보이면 다음 데이터!</div>;
}
