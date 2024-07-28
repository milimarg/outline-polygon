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
        this.ctx.stroke();
    }

    moveTo(x, y)
    {
        this.canvas.moveTo(x, y);
    }

    lineTo(x, y)
    {
        this.canvas.lineTo(x, y);
    }

    setColor(color)
    {
        this.canvas.strokeStyle = color;
    }
}
