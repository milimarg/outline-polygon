class Canva {
    constructor()
    {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    getCanvasSize()
    {
        return {x: this.canvas.width, y: this.canvas.height};
    }

    clear()
    {
        this.ctx.clearRect(0, 0, this.getCanvasSize().x, this.getCanvasSize().y);
    }

    beginDraw()
    {
        this.ctx.beginPath();
    }

    endDraw()
    {
        this.ctx.closePath();
    }

    stroke()
    {
        this.ctx.stroke();
    }

    moveTo(x, y)
    {
        this.ctx.moveTo(x, y);
    }

    lineTo(x, y)
    {
        this.ctx.lineTo(x, y);
    }

    setColor(color)
    {
        this.ctx.strokeStyle = color;
    }

    getBoundingClientRect()
    {
        return this.canvas.getBoundingClientRect();
    }
}
