import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';
import { useIntersectionObserver } from './useIntersectionObserver';

interface Props {
    children?: ReactNode;
    className?: string;
    intersectCallback?: (isIntersectin: boolean, entry: IntersectionObserverEntry | undefined) => void;
}

const classes: string[] = [
    'min-h-screen',
    'w-full'
]

const Section: React.FC<Props> = ({ children, className, intersectCallback }) => {
    const finalClassname = useMemo(() => classNames(className, classes), [className]);

    const { ref } = useIntersectionObserver({
        threshold: 0.5,
        onChange: intersectCallback
    })

    return <section ref={ref} className={classNames(finalClassname)}>{children}</section>;
};

export default Section;