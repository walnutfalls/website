import React, { useEffect, useState } from 'react';
import Section from './Section';
import classNames from 'classnames';
import { useRef, useMemo } from 'react';

interface Props {
    
}

const TitleClasses = classNames([
    'text-9xl'
])

const SubtitleClasses = classNames([
    'text-xl'
])



let once = false;
function initGame(element: HTMLCanvasElement) {
    if (once) return;    
    once = true;

    createUnityInstance(element, {
        dataUrl: "Build/build.data.br",
        frameworkUrl: "Build/build.framework.js.br",
        codeUrl: "Build/build.wasm.br",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "heroscene",
        productVersion: "0.1.0",
        // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
        // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
    });
}

const TopHeroClassesStart = 'transition duration-1000 bg-slate-100 flex-grow w-full';
const TopHeroClassesEnd = 'transition duration-1000 bg-gradient-to-b from-slate-100/10 to-slate-100/50 flex-grow w-full';

const MiddleClassesStart = 'transition duration-1000 flex flex-col items-center bg-slate-100 w-full py-8'
const MiddleClassesEnd = 'transition duration-1000 flex flex-col items-center bg-slate-100/50 w-full py-8'

const EndClassesStart = 'transition duration-1000 bg-slate-100 flex-grow w-full'
const EndClassesEnd = 'transition duration-1000 bg-gradient-to-b from-slate-100/50 to-slate-100/10 flex-grow w-full'

const Hero: React.FC<Props> = ({ }) => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [classes, setClasses] = useState({top: TopHeroClassesStart, middle: MiddleClassesStart, end: EndClassesStart})

    const [subtitle, setSubtitle] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setClasses({top: TopHeroClassesEnd, middle: MiddleClassesEnd, end: EndClassesEnd})
        }, 3800)
    }, [])

    useEffect(() => {
        setTimeout(() => setName('SAVELIY BARANOV'), 800)
        setTimeout(() => setSubtitle('GAMES'), 1600)
        setTimeout(() => setSubtitle('GAMES|WEB'), 2400)
        setTimeout(() => setSubtitle('GAMES|WEB|ANDROID'), 3200)
    }, [])

    useEffect(() => {
        if (canvasRef?.current == null || canvasContainerRef?.current == null) {
            return;
        }

        const box = canvasContainerRef.current.getBoundingClientRect();
        canvasRef.current.width = box.width
        canvasRef.current.height = box.height
        
        initGame(canvasRef.current!)
        
    }, [canvasContainerRef, canvasRef])


    return <Section className='relative'>
        <div className='relative h-full z-10 flex flex-col items-center'>
            <div className={classes.top} />
            <div className={classes.middle}>
                <div className={TitleClasses}>{name}</div>
                <div className={SubtitleClasses}>{subtitle}</div>
            </div>
            <div className={classes.end} />
        </div>
        <div ref={canvasContainerRef} className='absolute inset-0 w-full h-full'>
            <canvas ref={canvasRef} id="unity-canvas" />
        </div>
    </Section>
};

export default Hero;