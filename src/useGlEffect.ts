import { useEffect } from "react";


export function useGlEffect(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    effect: (gl: WebGL2RenderingContext) => void,
    deps: React.DependencyList) {
    useEffect(() => {
      if (canvasRef.current == null) {
        return;
      }
  
      const gl: null | WebGL2RenderingContext = canvasRef.current.getContext('webgl2');
  
      if (gl == null) {
        console.warn('gl context is null at this time');
        return
      }
  
      effect(gl)
    }, [canvasRef.current, ...deps])
  }
  

  export function use2dEffect(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    effect: (ctx2d: CanvasRenderingContext2D, canvas: HTMLCanvasElement ) => void,
    deps: React.DependencyList) {
    useEffect(() => {
      if (canvasRef.current == null) {
        return;
      }
  
      const ctx2d: null | CanvasRenderingContext2D  = canvasRef.current.getContext('2d');
  
      if (ctx2d == null) {
        console.warn('2d context is null at this time');
        return
      }
  
      effect(ctx2d, canvasRef.current)
    }, [canvasRef.current, ...deps])
  }
  