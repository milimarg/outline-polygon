class Shape {
    constructor(points, color)
    {
        this.points = !points ? [] : points;
        this.color = !color ? "#000000" : color;
        this.finished = false;
        this.offsetX = 15;
        this.offsetY = 15;
    }

    addPoint({x, y})
    {
        this.points.push({x: x, y: y});
        if (!this.isConvex())
            this.points.pop();
    }

    empty()
    {
        return this.getPointsNumber() === 0;
    }

    draw(canvas)
    {
        if (shape.empty())
            return;
        canvas.moveTo(this.points[0].x, this.points[0].y);
        this.points.slice(1).forEach(point => {
            canvas.lineTo(point.x, point.y);
        });
        canvas.setColor(this.color);
    }

    isFinished()
    {
        return this.finished;
    }

    setFinished()
    {
        this.finished = true;
    }

    isPointTheFirst({x, y})
    {
        if (this.empty())
            return false;
        return this.points[0].x >= x - this.offsetX &&
               this.points[0].x <= x + this.offsetX &&
               this.points[0].y >= y - this.offsetY &&
               this.points[0].y <= y + this.offsetY;
    }

    getPoints()
    {
        return this.points;
    }

    getPointsNumber()
    {
        return this.getPoints().length;
    }

    updatePoint(index, {x, y})
    {
        if (index > this.getPointsNumber() - 1)
            return false;
        this.points[index] = {x: x, y: y};
        return true;
    }

    isHovered(x, y)
    {
        let lastCrossProduct = null;

        for (let i = 0; i < this.getPointsNumber(); i++) {
            const point = this.points[i];
            const point2 = this.points[(i + 1) % this.getPointsNumber()];
            const crossProd = MyMath.crossProduct(point, point2, {x, y});

            if (lastCrossProduct === null) {
                lastCrossProduct = crossProd;
                continue;
            }
            if ((lastCrossProduct > 0 && crossProd < 0) || (lastCrossProduct < 0 && crossProd > 0))
                return false;
        }
        return true;
    }

    getCenter()
    {
        const n = this.getPointsNumber();
        let area = 0;
        let center = {x: 0, y: 0};

        for (let i = 0; i < n; i++) {
            const current = {x: this.points[i].x, y: this.points[i].y};
            const next = {x: this.points[(i + 1) % n].x, y: this.points[(i + 1) % n].y};
            const commonTerm = current.x * next.y - next.x * current.y;

            area += commonTerm;
            center.x += (current.x + next.x) * commonTerm;
            center.y += (current.y + next.y) * commonTerm;
        }
        area /= 2;
        center.x /= (6 * area);
        center.y /= (6 * area);
        return {x: center.x, y: center.y};
    }

    isConvex()
    {
        const n = this.getPointsNumber();
        if (n < 4)
            return true;

        let previous = 0;

        for (let i = 0; i < n; i++) {
            const next = this.points[(i + 1) % n];
            const nextAgain = this.points[(i + 2) % n];
            const d1 = {
                x: nextAgain.x - next.x,
                y: nextAgain.y - next.y
            };
            const d2 = {
                x: this.points[i].x - next.x,
                y: this.points[i].y - next.y
            };
            const zCrossProduct = d1.x * d2.y - d1.y * d2.x;

            if (zCrossProduct === 0)
                continue;
            const currentSign = Math.sign(zCrossProduct);
            if (previous === 0)
                previous = currentSign;
            else if (currentSign !== previous)
                return false;
        }
        return true;
    }
}
