import React, {  } from 'react';
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
import { mobileOrTabletCheck } from './mobileCheck';


interface Props {
    rootRef: React.RefObject<HTMLDivElement>
}

const About: React.FC<Props> = ({ rootRef }) => {
    const {pongState, setPongState} = useAppContext()

    // haven't figured out yet how to make dragging work for game input on mobile - 
    // draggin up and down on mobile does various things like hide/show address bar, refresh...etc,
    const isMobile = mobileOrTabletCheck()

    const onIntersect = (intersecting: boolean) => {
        if (!intersecting || isMobile) return

        if (pongState == PongState.Initial)
            setPongState(PongState.InGame)
    }

    

    return <Section intersectCallback={onIntersect} className='bg-slate-300 2xl:p-16 p-4 snap-center flex flex-col h-screen'>
            <h1 className='text-5xl block mb-8'>About</h1>
            
            <article className='flex flex-col justify-center text-xl block'>
                <Paragraph>
                    Welcome to my page! I'm a software engineer with a focus on web, games and computer graphics. I like these <FontAwesomeIcon icon={faHeart} />:
                </Paragraph>
                
                <div className='flex flex-row justify-center align-center gap-x-3 pb-8 overflow-hidden'>
                    <img src={reactLogo} className="2xl:w-24 l:w-12" alt="React logo" />
                    <img src={tailwindLogo} className="2xl:w-24 w-6" alt="Tailwindcss logo" />
                    <img src={viteLogo} className="2xl:w-24 w-6" alt="Vite logo" />
                    <img src={webpackLogo} className="2xl:w-24 w-6 object-scale-down" alt="Webpack logo" />                    
                    <img src={dotnetLogo} className="2xl:w-24 w-6 object-scale-down" alt="Dotnet logo" />
                    <img src={kotlinLogo} className="2xl:w-24 w-6 object-scale-down" alt="Kotlin logo" />
                    <img src={unityLogo} className="2xl:w-24 w-6 object-scale-down" alt="Unity logo" />
                    <img src={cmakeLogo} className="2xl:w-24 w-6 object-scale-down" alt="Cmake logo" />
                </div>

                {!isMobile && <Paragraph>
                    A little pong for you:
                </Paragraph> }
            </article>

            {!isMobile && <Pong rootRef={rootRef} className='flex-grow' /> }
    </Section>
};

export default About;
