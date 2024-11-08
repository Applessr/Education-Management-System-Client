import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const TransitionOutletContent = ({ children }) => {
    const containerRef = useRef(null);

    const { pathname } = useLocation();

    useEffect(() => {
        const container = containerRef.current;

        console.log("current container =", container)
        if (!container) return;

        // add opacity 
        const timer = setTimeout(() => {
            container.classList.add( 'scale-up-tl');
        }, 100);

        return () => {
            clearTimeout(timer);
            if (container) {
                container.classList.remove('scale-up-tl');
            }
        };

    }, [pathname]);

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
};

export default TransitionOutletContent;