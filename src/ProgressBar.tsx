import classNames from 'classnames';
import React, { useMemo } from 'react'


interface Props {
    progress: number;
    className?: string;
    invisible: boolean
}

const ProgressBar: React.FC<Props> = ({ progress, className, invisible }) => {
    const style = useMemo(() => ({
        width: `${Math.trunc(progress * 100)}%`
    }), [progress])

    const cls = classNames(
        "bg-gray-200 rounded-full h-2.5 dark:bg-gray-700", 
        className, 
        {'invisible': invisible})

    return <div className={cls}>
        <div className="bg-blue-600 h-2.5 rounded-full" style={style}></div>
    </div>
};

export default ProgressBar;