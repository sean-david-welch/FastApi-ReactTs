import { useEffect, RefObject } from 'react';

const useIntersectionObserver = (ref: RefObject<HTMLElement>) => {
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });

        const target = ref.current;
        observer.observe(target);

        return () => {
            observer.unobserve(target);
        };
    }, [ref]);
};

export default useIntersectionObserver;
