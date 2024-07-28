function drawShapeClone()
{
    const mousePosition = mouse.getPosition();

    if (!mousePosition)
        return;

    const offset = {x: mousePosition.x - lastMousePos.x, y: mousePosition.y - lastMousePos.y};

    canvas.beginDraw();
    if (isCloneClicked) {
        shapeClone.getPoints().forEach(function (value, i) {
            shapeClone.updatePoint(i, {x: value.x + offset.x, y: value.y + offset.y});
        });
        translationLine.updatePoint(1, shapeClone.getCenter());
        lastMousePos = mousePosition;
    }
    shapeClone.draw(canvas);
    canvas.endDraw();
}
