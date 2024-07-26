class ConvexShape {
    constructor()
    {
        this.points = [];
        this.finished = false;
        this.offsetX = 10;
        this.offsetY = 10;
    }

    addPoint({x, y})
    {
        this.points.push({"x": x, "y": y});
    }

    empty()
    {
        return this.points.length === 0;
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
}
