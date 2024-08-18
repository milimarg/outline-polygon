class Mouse {
    constructor()
    {
        this.x = null;
        this.y = null;
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    onMouseMove(e)
    {
        this.x = e.clientX;
        this.y = e.clientY;
    }

    getPosition(canvas)
    {
        if (!this.x || !this.y)
            return null;
        const rect = canvas.getBoundingClientRect();
        return {x: this.x - rect.left, y: this.y - rect.top};
    }
}
