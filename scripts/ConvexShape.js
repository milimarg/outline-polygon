function crossProduct(point, point2, p3) {
    return (point2.x - point.x) * (p3.y - point.y) - (point2.y - point.y) * (p3.x - point.x);
}

class ConvexShape {
    constructor(points)
    {
        this.points = !points ? [] : points;
        this.finished = false;
        this.offsetX = 15;
        this.offsetY = 15;
    }

    addPoint({x, y})
    {
        this.points.push({x: x, y: y});
    }

    empty()
    {
        return this.getPointsNumber() === 0;
    }

    draw(canvas)
    {
        if (shape.empty())
            return;
        canvas.getCtx().moveTo(this.points[0].x, this.points[0].y);
        this.points.slice(1).forEach(point => {
            canvas.getCtx().lineTo(point.x, point.y);
        });
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
        return this.points.length;
    }

    updatePoint(index, {x, y})
    {
        if (index > this.getPointsNumber() - 1)
            return false;
        this.points[index] = {"x": x, "y": y};
        return true;
    }

    isHovered(x, y)
    {
        let lastCrossProduct = null;

        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            const point2 = this.points[(i + 1) % this.points.length];

            const crossProd = crossProduct(point, point2, {x, y});

            if (lastCrossProduct === null) {
                lastCrossProduct = crossProd;
                continue;
            }
            if ((lastCrossProduct > 0 && crossProd < 0) || (lastCrossProduct < 0 && crossProd > 0))
                return false;
        }
        return true;
    }
}
