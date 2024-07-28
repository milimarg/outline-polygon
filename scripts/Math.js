class Math {
    constructor()
    {}

    static crossProduct(point, point2, p3) {
        return (point2.x - point.x) * (p3.y - point.y) - (point2.y - point.y) * (p3.x - point.x);
    }
}
