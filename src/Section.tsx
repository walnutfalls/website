import React, { ReactNode, useMemo } from 'react';
import classNames from 'classnames';

interface Props {
    children?: ReactNode;
    className?: string;
}

const classes: string[] = [
    'h-screen',
    'w-full'
]

const Section: React.FC<Props> = ({ children, className }) => {
    const finalClassname = useMemo(() => classNames(className, classes), [className]);

    return <section className={classNames(finalClassname)}>{children}</section>;
};

export default Section;