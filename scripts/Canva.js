class Canva {
    constructor()
    {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    getCanvasSize()
    {
        return {"x": this.canvas.width, "y": this.canvas.height};
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

    getCtx()
    {
        return this.ctx;
    }

    getBoundingClientRect()
    {
        return this.canvas.getBoundingClientRect();
    }
}
