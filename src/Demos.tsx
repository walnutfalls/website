import React, { useState } from 'react';
import Section from './Section';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Video from './Video';
import classNames from 'classnames';
import Paragraph from './Paragraph';

import snekdekimg from './assets/snekdek.png'


interface Props {}

const ItemClasses = 'transition-all duration-75 border-solid border-2 border-slate-800 rounded-lg w-96 m-1 w-full'
const HrefClasses = 'ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline'

const Logo = 'px-2'

interface ItemProps { 
    title: string;
    selected: boolean;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}

type LinkProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

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

const GithubHref: React.FC<LinkProps> = ({children, href}) => <a target='_blank' className={HrefClasses} href={href}>
    <FontAwesomeIcon className={Logo} icon={faGithub} />{children}
</a>

const Demos: React.FC<Props> = ({ }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const items = [
        <Item key={0} title='This Site' onClick={() => setSelectedIndex(0)} selected={selectedIndex == 0}>
            <Paragraph>Built with React, TailwindCSS, Vite.</Paragraph>
            <Paragraph>Hero page is a Unity WebGL scene, with Synty assets.</Paragraph>
            <Paragraph>Pong game uses Canvas.</Paragraph>
            <GithubHref href={atob('aHR0cHM6Ly9naXRodWIuY29tL3dhbG51dGZhbGxzL3dlYnNpdGU=')}>Source here</GithubHref>
        </Item>,
        <Item key={1} title='Another Site' onClick={() => setSelectedIndex(1)} selected={selectedIndex == 1}>
            A simple static site to present some findings and some gathered data. Using React, Webpack, TailwindCSS. 
            <a target='_blank' className={HrefClasses} href={atob('aHR0cHM6Ly9mYWNlYm9va3Jlc2VhcmNoLmdpdGh1Yi5pby9TUzJfSFJURi8=')}>SS2 HRTF</a>
        </Item>,
        <Item key={2} title='Multiplayer Snake' onClick={() => setSelectedIndex(2)} selected={selectedIndex == 2}>
            Quick Slither clone. Multiplayer game server written in dotnet. Frontend done using Pixi.js.
            <GithubHref href={atob('aHR0cHM6Ly9naXRodWIuY29tL3dhbG51dGZhbGxzL3NuZWtkZWsK')}>Source here</GithubHref>
            <a target='_blank' href={atob('aHR0cHM6Ly9zbmVrZGVrLnNhdmVsaXliLmNvbQo=')}><img className='w-80 mt-4' src={snekdekimg} alt="Snekdek" /></a>
        </Item>,
        <Item key={3} title='Warigami' onClick={() => setSelectedIndex(3)} selected={selectedIndex == 3}>
            <Paragraph>Grad school project at Digipen. Led team, contributed to core engine systems, memory management, ecs, sound. 
                Much of this engine became my 'grad school engine' which can be found 
                <GithubHref href={atob('aHR0cHM6Ly9naXRodWIuY29tL3dhbG51dGZhbGxzL2NzNTYyX2VuZ2luZQo=')}>here</GithubHref>.
            </Paragraph>
            <div className='my-2'>
                <Video url='warigami.mp4'/>
            </div>
        </Item>,
        <Item key={4} title='Digital Image Processing Coursework' onClick={() => setSelectedIndex(4)} selected={selectedIndex == 4}>
            <Paragraph>A C++ app built during a Digipen image processing course.</Paragraph>
            <Paragraph>Using CMake, vcpkg, OpenCV.</Paragraph>
            <GithubHref href={atob('aHR0cHM6Ly9naXRodWIuY29tL3dhbG51dGZhbGxzL2RpcA==')}>Repository here</GithubHref>.
        </Item>
    ]

    return <Section className='bg-stone-300 2xl:p-16 p-4 snap-center flex flex-col'>
        <h1 className='text-5xl block mb-8'>Samples</h1>

        <div className='flex flex-col flex-grow w-full'>
            {items}
        </div>
    </Section>
};

export default Demos;
