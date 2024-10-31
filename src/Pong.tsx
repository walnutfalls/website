import React, { useCallback, useEffect, useState } from 'react';
import { useRef } from 'react';
import { use2dEffect } from './useGlEffect';
import { PongState, useAppContext } from './AppContext';
import classNames from 'classnames';
import { Game } from './Game';


interface Props {
    className?: string,
    rootRef: React.RefObject<HTMLDivElement>
}

let game = new Game()


const Pong: React.FC<Props> = ({ className, rootRef }) => {
    const canvasContainerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const {pongState, setPongState, setScrollEnabled} = useAppContext()

    const [lastState, setLastState] = useState<PongState>(pongState)
    const [lastTouchY, setLastTouchY] = useState(0)

    const resize = (entries: ResizeObserverEntry[]) => {
        const cv = canvasRef?.current;
        if (!cv) return

        const {width, height} = entries[0].contentRect

        cv.width = width
        cv.height = height
    }

    const wheel = (event: WheelEvent) => {
        game.wheelDelta = event.deltaY
    }

   
    const onClick = useCallback(() => {
        if (!canvasRef?.current) return 

        if (pongState != PongState.InGame) {
            setPongState(PongState.InGame)
        }
    }, [setScrollEnabled])

    const handleTouchMove = (event: TouchEvent) => {
        var y = event.touches[0].clientY
        var yDiff = lastTouchY - y
        setLastTouchY(y)
        game.wheelDelta = yDiff
    }

    use2dEffect(canvasRef, (ctx2d: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        if (pongState == PongState.InGame && pongState != lastState) {
            rootRef.current?.addEventListener('wheel', wheel)
            document.addEventListener('touchmove', handleTouchMove, false);

            setScrollEnabled(false)

            game.run(canvas, () => {
                setScrollEnabled(true)
                setPongState(PongState.PostGameLose)
            })
        } else {
            rootRef.current?.removeEventListener('wheel', wheel)
            document.removeEventListener('touchmove', handleTouchMove, false);
            setScrollEnabled(true)            
        }

        setLastState(pongState)
    }, [pongState])

    useEffect(() => {
        if (!canvasContainerRef?.current) return        
        new ResizeObserver(resize).observe(canvasContainerRef.current)
    }, [canvasContainerRef?.current])


    return <div onClick={onClick} className={classNames(className, 'overflow-hidden')} ref={canvasContainerRef}>
        <canvas ref={canvasRef} style={{ backgroundColor: '#000000' }} />
    </div>
};

export default Pong;