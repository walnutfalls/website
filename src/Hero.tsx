import React, { useEffect, useMemo, useState } from 'react';
import Section from './Section';
import classNames from 'classnames';
import { useRef } from 'react';
import ProgressBar from './ProgressBar';
import { mobileOrTabletCheck } from './mobileCheck';

interface Props {
    onLoaded: () => void;
}

const TitleClasses = classNames([
    'text-5xl',
    '2xl:text-9xl'
])


let once = false
let unityInstance: any = null


const TopHeroClassesStart = 'transition duration-500 bg-slate-100 flex-grow w-full';
const TopHeroClassesEnd = 'transition duration-500 bg-gradient-to-b from-slate-300/0 to-slate-100/50 flex-grow w-full';

const MiddleClassesStart = 'transition duration-500 flex flex-col items-center bg-slate-100 w-full py-8'
const MiddleClassesEnd = 'transition duration-500 flex flex-col items-center bg-slate-100/50 w-full py-8 text-slate-950/25'

const EndClassesStart = 'transition duration-500 bg-slate-100 flex-grow w-full'
const EndClassesEnd = 'transition duration-500 bg-gradient-to-b from-slate-100/50 to-slate-300/80 flex-grow w-full'

const Hero: React.FC<Props> = ({ onLoaded }) => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [classes, setClasses] = useState({ top: TopHeroClassesStart, middle: MiddleClassesStart, end: EndClassesStart })

    const [progress, setProgress] = useState<number>(0)
    const [name, setName] = useState('')

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });


    // Function to handle resize
    const handleResize = () => {
        if (canvasContainerRef?.current == null || unityInstance == null || mobileOrTabletCheck()) {
            return;
        }

        const box = canvasContainerRef.current.getBoundingClientRect();
        setDimensions({ width: box.width, height: box.height })
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = dimensions.width;
            canvas.height = dimensions.height;
        }
        
        unityInstance?.Module.setCanvasSize(dimensions.width, dimensions.height)
    }, [dimensions]);

    const onIntersect = (intersecting: boolean) => {
        if (intersecting && mobileOrTabletCheck())
            handleResize()
    }


    function initGame(element: HTMLCanvasElement) {
        if (once) return;
        once = true;

        const config: UnityConfig = {
            dataUrl: "Build/build.data.br",
            frameworkUrl: "Build/build.framework.js.br",
            codeUrl: "Build/build.wasm.br",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "heroscene",
            productVersion: "0.1.0",
            // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
            // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
        };

        createUnityInstance(element, config, (progress) => {
            setProgress(progress - 0.1)
        }).then(i => {
            setClasses({ top: TopHeroClassesEnd, middle: MiddleClassesEnd, end: EndClassesEnd })
            unityInstance = i
            onLoaded()

            setProgress(1)
        });
    }

    useEffect(() => {
        setName(atob('U0FWRUxJWSBCQVJBTk9WCg=='))

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        if (canvasRef?.current == null || canvasContainerRef?.current == null) {
            return;
        }

        initGame(canvasRef.current!)

    }, [canvasContainerRef, canvasRef])

    const cls = classNames('relative h-screen snap-center')

    const canvasStyle = useMemo(() => ({
        width: canvasContainerRef?.current?.getBoundingClientRect().width,
        height: canvasContainerRef?.current?.getBoundingClientRect().height,
        backgroundColor: 'white'
    }), [canvasContainerRef?.current])

    return <Section intersectCallback={onIntersect} className={cls}>
        <div className='relative h-full z-10 flex flex-col items-center'>
            <div className={classes.top} />
            <div className={classes.middle}>
                <div className={TitleClasses}>{name}</div>
                <span className='text-xl'>GAMES|WEB|ANDROID</span>
                <ProgressBar progress={progress} className='w-96' invisible={progress >= 1} />
            </div>
            <div className={classes.end} />
        </div>
        <div ref={canvasContainerRef} className='absolute inset-0 w-full h-full'>
            <canvas ref={canvasRef} id="unity-canvas" style={canvasStyle} />
        </div>
    </Section>
};

export default Hero;
