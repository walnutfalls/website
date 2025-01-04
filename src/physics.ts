export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    at(index: number): number {
        if (index === 0) return this.x;
        if (index === 1) return this.y;
        throw new RangeError();
    }

    set(index: number, value: number): void {
        if (index === 0) this.x = value;
        else if (index === 1) this.y = value;
    }

    sub(other: Vector2): Vector2 {
        return new Vector2(
            this.x - other.x,
            this.y - other.y
        )
    }

    add(other: Vector2): Vector2 {
        return new Vector2(
            this.x + other.x,
            this.y + other.y
        )
    }

    mul(other: number): Vector2 {
        return new Vector2(
            this.x * other,
            this.y * other
        )
    }

    dot(other: Vector2): number {
        return this.x * other.x + this.y * other.y
    }

    len() {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }

    normalize() {
        const L = this.len()
        this.x /= L
        this.y /= L
    }

    rotate(radians: number) {
        if (radians < 0) {
            radians = 2 * Math.PI + radians 
        }

        const cosTheta = Math.cos(radians);
        const sinTheta = Math.sin(radians);
    
        const rotatedX = this.x * cosTheta - this.y * sinTheta;
        const rotatedY = this.x * sinTheta + this.y * cosTheta;
    
        return new Vector2 (rotatedX, rotatedY);
    }
}

export class AABB {
    min: Vector2;
    max: Vector2;

    constructor(min: Vector2, max: Vector2) {
        this.min = min;
        this.max = max;
    }

    height() {
        return this.max.y - this.min.y
    }

    halfH() {
        return this.height() / 2
    }

    width() {
        return this.max.x - this.min.x
    }

    center() {
        return this.min.add(this.max.sub(this.min).mul(0.5))
    }

    translate(displacement: Vector2) {
        return new AABB(this.min.add(displacement), this.max.add(displacement))
    }
}

export interface Circle {
    center: Vector2;
    radius: number;
}


export function createAABB(center: Vector2, halfSize: Vector2): AABB {
    return new AABB(
        new Vector2(center.x - halfSize.x, center.y - halfSize.y),
        new Vector2(center.x + halfSize.x, center.y + halfSize.y));
}

export function sqDistancePointAabb(p: Vector2, b: AABB): number {
    let sqDist: number = 0;

    for (let i = 0; i < 2; i++) {
        const v = p.at(i)

        if (v < b.min.at(i))
            sqDist += (b.min.at(i) - v) * (b.min.at(i) - v)

        if (v > b.max.at(i))
            sqDist += (v - b.max.at(i)) * (v - b.max.at(i))
    }

    return sqDist
}

export function closestPtPointAABB(p: Vector2, b: AABB): Vector2 {
    let q: Vector2 = new Vector2(0, 0)

    for (let i = 0; i < 2; i++) {
        let v = p.at(i)

        if (v < b.min.at(i))
            v = b.min.at(i)

        if (v > b.max.at(i))
            v = b.max.at(i)

        q.set(i, v)
    }

    return q
}

export interface PointCollision{
    isColliding: boolean,
    closest?: Vector2
}

export function testCircleAABB(c: Circle, b: AABB,): PointCollision {
    const closest = closestPtPointAABB(c.center, b)
    
    let v = closest.sub(c.center)
    let isColliding = v.dot(v) <= (c.radius * c.radius)
    
    return {isColliding, closest}
}

