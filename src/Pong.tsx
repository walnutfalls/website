import React, { useCallback, useEffect, useMemo, useState } from 'react';
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


let lastTouchY = 0

const Pong: React.FC<Props> = ({ className, rootRef }) => {
    const canvasContainerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const { pongState, setPongState, setScrollEnabled } = useAppContext()

    const [lastState, setLastState] = useState<PongState>(pongState)


    const resize = (entries: ResizeObserverEntry[]) => {
        const cv = canvasRef?.current;
        if (!cv) return

        const { width, height } = entries[0].contentRect

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
    }, [setPongState])

    const handleTouchMove = (event: TouchEvent) => {
        var y = event.touches[0].clientY
        var yDiff = y - lastTouchY
        lastTouchY = y
        game.accumulateWheelDelta(yDiff * 4)
    }

    const touchBegin = (event: TouchEvent) => {
        var y = event.touches[0].clientY
        lastTouchY = y
    }

    use2dEffect(canvasRef, (_ctx2d: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        if (pongState == PongState.InGame && pongState != lastState) {
            rootRef.current?.addEventListener('wheel', wheel)

            document.addEventListener("touchstart", touchBegin)
            document.addEventListener('touchmove', handleTouchMove, false)
            document.body.style.overscrollBehavior = 'none'

            canvasContainerRef?.current?.scrollIntoView({
                behavior: 'smooth',  // Smooth scrolling
                block: 'start',      // Align to the top of the viewport
            });

            game.run(canvas, () => {
                setScrollEnabled(true)
                setPongState(PongState.PostGameLose)
            })
        } else {
            rootRef.current?.removeEventListener('wheel', wheel)
            document.removeEventListener('touchmove', handleTouchMove, false)
            document.removeEventListener("touchstart", touchBegin)
            document.body.style.overscrollBehavior = 'auto'
            setScrollEnabled(true)
        }

        setLastState(pongState)
    }, [pongState])

    useEffect(() => {
        if (!canvasContainerRef?.current) return
        new ResizeObserver(resize).observe(canvasContainerRef.current)
    }, [canvasContainerRef?.current])


    const canvasStyle = useMemo(() => ({
        backgroundColor: '#000000',
        width: canvasContainerRef?.current?.getBoundingClientRect().width,
        height: canvasContainerRef?.current?.getBoundingClientRect().height,
    }), [canvasContainerRef?.current])

    return <div onClick={onClick} className={classNames(className, 'overflow-hidden')} ref={canvasContainerRef}>
        <canvas ref={canvasRef} style={canvasStyle} />
    </div>
};

export default Pong;