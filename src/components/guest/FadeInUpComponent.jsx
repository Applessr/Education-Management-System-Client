import React, { useEffect, useRef, useState } from 'react';

export default function FadeInUpComponent({children}) {
    // const count = React.Children.count(children);
    // console.log(count)
    return React.Children.map(children, (el) => (
        <FadeInChild>{el}</FadeInChild>
    ))
  }

function FadeInChild({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // console.log(entry)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity transform duration-800 ${
        isVisible ? 'opacity-100 scale-up-center' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
}

