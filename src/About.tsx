import React, { ReactNode, useEffect } from 'react';
import Section from './Section';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart  } from '@fortawesome/free-regular-svg-icons'


import viteLogo from './assets/vite.svg'
import webpackLogo from './assets/webpack.svg'
import dotnetLogo from './assets/dotnet.svg'
import unityLogo from './assets/unity.svg'
import reactLogo from './assets/react.svg'
import kotlinLogo from './assets/kotlin.svg'
import tailwindLogo from './assets/tailwindcss.svg'

import cmakeLogo from './assets/cmake.svg'
import Paragraph from './Paragraph';
import Pong from './Pong';
import { PongState, useAppContext } from './AppContext';

interface Props {
    rootRef: React.RefObject<HTMLDivElement>
}

const About: React.FC<Props> = ({ rootRef }) => {
    const {pongState, setPongState} = useAppContext()

    const onIntersect = (intersecting: boolean, entry: IntersectionObserverEntry | undefined) => {
        if (!intersecting) return

        if (pongState == PongState.Initial)
            setPongState(PongState.InGame)
    }

    return <Section intersectCallback={onIntersect} className='bg-slate-300 p-16 snap-center flex flex-col h-screen'>
            <h1 className='text-5xl block mb-8'>About</h1>
            
            <article className='flex flex-col justify-center text-xl block'>
                <Paragraph>
                    Welcome to my page! I'm a software engineer with a focus on web, games and computer graphics. I like these <FontAwesomeIcon icon={faHeart} />:
                </Paragraph>
                
                <div className='flex flex-row justify-center align-center gap-x-3 pb-8'>                    
                    <img src={reactLogo} className="2xl:w-24" alt="React logo" />
                    <img src={tailwindLogo} className="2xl:w-24" alt="Tailwindcss logo" />
                    <img src={viteLogo} className="w-24" alt="Vite logo" />
                    <img src={webpackLogo} className="w-24 object-scale-down" alt="Webpack logo" />                    
                    <img src={dotnetLogo} className="w-24 object-scale-down" alt="Dotnet logo" />
                    <img src={kotlinLogo} className="w-24 object-scale-down" alt="Kotlin logo" />
                    <img src={unityLogo} className="w-24 object-scale-down" alt="Unity logo" />
                    <img src={cmakeLogo} className="w-24 object-scale-down" alt="Cmake logo" />
                </div>
            </article>

            <Pong rootRef={rootRef} className='flex-grow' />
    </Section>
};

export default About;
