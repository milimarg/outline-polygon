function drawShapeClone()
{
    let mousePosition = mouse.getPosition(canvas);

    if (!mousePosition)
        mousePosition = lastMousePos;

    const offset = {x: mousePosition.x - lastMousePos.x, y: mousePosition.y - lastMousePos.y};

    canvas.beginDraw();
    if (isCloneClicked) {
        //shapeClone.translate(offset.x, offset.y);
        lastMousePos = mousePosition;
    }
    shapeClone.draw(canvas);
    canvas.endDraw();
    canvas.stroke();
}
