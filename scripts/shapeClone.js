function drawShapeClone()
{
    let mousePosition = mouse.getPosition(canvas);

    if (!mousePosition)
        mousePosition = lastMousePos;

    const offset = {x: mousePosition.x - lastMousePos.x, y: mousePosition.y - lastMousePos.y};

    canvas.beginDraw();
    if (isCloneClicked) {
        shapeClone.translate(offset.x, offset.y);
        translationLine.updatePoint(1, shapeClone.getCenter());
        lastMousePos = mousePosition;
    }
    shapeClone.draw(canvas);
    canvas.endDraw();
    canvas.stroke();
}
