import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Transition = ({ children }) => {
    const containerRef = useRef(null);

    const { pathname } = useLocation();

    useEffect(() => {
        const container = containerRef.current;

        // console.log("current container =", container)
        if (!container) return;

        // Add initial opacity start with opacity = 0
        container.classList.add('opacity-0');

        // add opacity 
        const timer = setTimeout(() => {
            container.classList.remove('opacity-0');
            container.classList.add('opacity-100', 'transition-opacity', 'duration-300', 'slide-top' );
        }, 100);

        return () => {
            clearTimeout(timer);
            if (container) {
                container.classList.remove('opacity-100', 'transition-opacity', 'duration-300', 'slide-top');
            }
        };

    }, [pathname]);

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
};

export default Transition;