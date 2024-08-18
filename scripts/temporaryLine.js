function drawTemporaryLine() {
    if (shape.isFinished() || shape.empty())
        return;
    const lastPoint = shape.getPoints()[shape.getPointsNumber() - 1];
    const mousePosition = mouse.getPosition();

    if (!mousePosition)
        return;

    canvas.beginDraw();
    tempLine.updatePoint(0, lastPoint);
    tempLine.updatePoint(1, mousePosition);
    tempLine.draw(canvas);
    canvas.endDraw();
    canvas.stroke();
}
