function drawShapeClone()
{
    const mousePosition = mouse.getPosition();
    const offset = {x: mousePosition.x - lastMousePos.x, y: mousePosition.y - lastMousePos.y};

    canvas.beginDraw();
    if (isCloneClicked) {
        shapeClone.getPoints().forEach(function (value, i) {
            shapeClone.updatePoint(i, {x: value.x + offset.x, y: value.y + offset.y});
        });
        lastMousePos = mousePosition;
    }
    shapeClone.draw(canvas);
    canvas.endDraw();
}

function moveShapeClone()
{
    canvas.clear();

    if (shapeClone)
        drawShapeClone();

    canvas.beginDraw();
    shape.draw(canvas);
    canvas.endDraw();
}
