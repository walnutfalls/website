import { AABB, Circle, testCircleAABB, Vector2 } from "./physics"

const MIN_X_VEL = 0.5

export class GameState{
    paddle:AABB = new AABB(new Vector2(0, 0), new Vector2(32, 128))
    ball: AABB = new AABB(new Vector2(0, 0), new Vector2(32, 32))
    ballV: Vector2 = new Vector2(0.5, 0.05) 
    bV: Vector2 = new Vector2()

    aPos: Vector2
    bPos: Vector2
    ballPos: Vector2
    
    constructor(width: number, height: number, padding: number) {
        const aX = padding
        const aY = height / 2 - this.paddle.height() / 2
        this.aPos = new Vector2(aX, aY)

        const bX = width - padding - this.paddle.width()
        this.bPos = new Vector2(bX, aY)

        this.ballPos = new Vector2(
            width / 2 - this.ball.width() / 2,
            height / 2 + this.ball.height() / 2
        )
    }
}

export class Game {
    state: GameState = new GameState(512, 512, 8)    
    lastTime: number = 0
    wheelDelta: number = 0
    done: boolean = false
    canvas: HTMLCanvasElement | null = null

    accumulateWheelDelta(val: number) {
        this.wheelDelta += val
    }

    onGameEnd: () => void = () => {}    

    run(canvas: HTMLCanvasElement, onGameEnd: () => void) {
        this.canvas = canvas
        this.onGameEnd = onGameEnd
        this.state = new GameState(canvas.width, canvas.height, 8)
        requestAnimationFrame(this.loop);
    }

    loop = (timestamp: number) => {
        if (this.done) return;
        
        const deltaTime = this.lastTime == 0 
            ? 0 
            : timestamp - this.lastTime;
            
        this.lastTime = timestamp;
        
        let dt = deltaTime / 10
        for (let i = 0; i < 10; i++) {
            this.physics(dt)
            this.oobCheck()
        }        

        this.input()
        this.ai()
        
        this.render()
        
        requestAnimationFrame(this.loop);
    }

    oobCheck() {
        if (this.state.ballPos.x < this.state.aPos.x) {            
            this.onGameEnd()
            this.canvas = null
        }

        if (this.state.ballPos.x > this.state.bPos.x) {
            this.onGameEnd()
            this.canvas = null
        }

        if (!this.canvas) return

        const oopUp = this.state.ballPos.y + this.state.ballV.y < 0
        const oopDown = this.state.ballPos.y + this.state.ball.height() + this.state.ballV.y > this.canvas.height

        if (oopUp || oopDown) {            
            this.state.ballV.y *= -1;
        }
    }

    ai() {
        const ballCenter = this.state.ballPos.y + this.state.ball.halfH()
        const bCenter = this.state.bPos.y + this.state.paddle.halfH()
        const diff = ballCenter - bCenter
        const mag = Math.abs(diff)

        if (mag > 1) {
            this.state.bV = new Vector2(0, 0.001 * diff);
        }
    }

    physics(dt: number) {
        this.state.ballV = this.state.ballV.mul(1 + (dt * .0001))

        this.state.ballPos = this.state.ballPos.add(this.state.ballV.mul(dt))
        this.state.bPos = this.state.bPos.add(this.state.bV.mul(dt))

        const c: Circle = { 
            center: this.state.ballPos.add(new Vector2(this.state.ball.halfH(), this.state.ball.halfH())), 
            radius: this.state.ball.width()/2 
        }

        const maxDeflect = Math.PI / 4

        {
            const aabb = this.state.paddle.translate(this.state.aPos)            
            const {isColliding} = testCircleAABB(c, aabb)
            if (isColliding) {
                this.state.ballV.x *= -1;
                
                const boxY = aabb.center().y                
                
                let deflect = (c.center.y - boxY) / (this.state.paddle.halfH())
                let angle = deflect * maxDeflect

                this.state.ballV = this.state.ballV.rotate(angle)

                if (this.state.ballV.x <= MIN_X_VEL) {
                    this.state.ballV.x = MIN_X_VEL
                }
            }
        }        

        {
            const aabb = this.state.paddle.translate(this.state.bPos)
            const {isColliding} = testCircleAABB(c, aabb)
            if (isColliding) {
                this.state.ballV.x *= -1;

                const boxY = aabb.center().y                
                let deflect = (c.center.y - boxY) / (this.state.paddle.halfH())
                let angle = deflect * maxDeflect
                this.state.ballV = this.state.ballV.rotate(-angle)

                if (this.state.ballV.x >= -MIN_X_VEL) {
                    this.state.ballV.x = -MIN_X_VEL
                }
            }
        }
    }

    input() {
        if (this.canvas == null) return

        this.state.aPos.y += this.canvas.height * this.wheelDelta / 2000
        this.wheelDelta = 0

        if (this.state.aPos.y < 0) {
            this.state.aPos.y = 0
        }

        if (this.state.aPos.y + this.state.paddle.height() > this.canvas.height) {
            this.state.aPos.y = this.canvas.height - this.state.paddle.height()
        }
    }
    
    render() {
        if (this.canvas == null) return
        let ctx2d = this.canvas.getContext('2d');
        if (ctx2d == null) return

        ctx2d.clearRect(0, 0, this.canvas.width, this.canvas.height);


        const drawRect = (pos: Vector2, aabb: AABB, color: string) => {
            ctx2d.fillStyle = color;
            ctx2d.fillRect(
                pos.x, 
                pos.y, 
                aabb.max.x, 
                aabb.max.y);
        }

        drawRect(this.state.aPos, this.state.paddle, 'green')
        drawRect(this.state.bPos, this.state.paddle, 'blue')
        drawRect(this.state.ballPos, this.state.ball, 'red')
    }
}