import React, { useState } from 'react';
import Section from './Section';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Video from './Video';
import classNames from 'classnames';

interface Props {}

const ItemClasses = 'transition-all duration-75 border-solid border-2 border-slate-800 rounded-lg w-96 m-1 w-full'

const Logo = 'px-2'

interface ItemProps { 
    title: string;
    selected: boolean;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}
const Item: React.FC<ItemProps> = ({ children, selected, title, onClick }) => {
    const cls = classNames(ItemClasses, {
        'flex-grow': selected
    })

    const headerCls = classNames('p-4 w-full h-12 flex flex-col justify-center cursor-pointer', {
        'bg-stone-800 hover:bg-stone-700 active:bg-stone-950': !selected,
        'bg-stone-900': selected
    })

    return <div onClick={onClick} className={cls}>
        <div className={headerCls}>
            <h2 className='text-stone-200'>{title}</h2>
        </div>
        
        { selected &&<div className='p-4'>
             {children}
        </div>}
    </div>
}

const Demos: React.FC<Props> = ({ }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const items = [
        <Item key={0} title='This Site' onClick={() => setSelectedIndex(0)} selected={selectedIndex == 0}>
            <FontAwesomeIcon className={Logo} icon={faGithub} /> 
        </Item>,
        <Item key={1} title='Multiplayer Snake' onClick={() => setSelectedIndex(1)} selected={selectedIndex == 1}>
            <FontAwesomeIcon className={Logo} icon={faGithub} /> 
        </Item>,
        <Item key={2} title='Boomtown Showdown' onClick={() => setSelectedIndex(2)} selected={selectedIndex == 2}>
            <FontAwesomeIcon className={Logo} icon={faGithub} /> 
        </Item>,
        <Item key={3} title='Warigami' onClick={() => setSelectedIndex(3)} selected={selectedIndex == 3}>
            <Video url='warigami.mp4'/>
        </Item>
    ]

    

    return <Section className='bg-stone-300 p-16 snap-center flex flex-col'>
        <h1 className='text-5xl block mb-8'>Demos</h1>

        <div className='flex flex-col flex-grow w-full'>
            {items}
        </div>
    </Section>
};

export default Demos;
