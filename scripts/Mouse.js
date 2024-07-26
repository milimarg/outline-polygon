class Mouse {
    constructor()
    {
        this.x = null;
        this.y = null;
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    onMouseMove(e) // TODO: set as private
    {
        this.x = e.clientX;
        this.y = e.clientY;
    }

    getPosition()
    {
        if (!this.x || !this.y)
            return null;
        return {"x": this.x, "y": this.y};
    }
}
