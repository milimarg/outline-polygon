const mouse = new Mouse;
const shape = new ConvexShape;
const canvas = new Canva;
let shapeClone = null;
let isCloneClicked = false;
let lastMousePos = {"x": 0, "y": 0};
let hover = null;

document.addEventListener("mousemove", mouse.onMouseMove, false);
document.addEventListener("mousemove", moveShapeClone, false);

function cloneObject(obj)
{
    return new ConvexShape([...obj.getPoints()]);
}

function moveShapeClone()
{
    const mousePosition = mouse.getPosition();

    canvas.clear();

    if (shapeClone) {
        canvas.beginDraw();
        if (isCloneClicked) {
            const offset = {"x": mousePosition.x - lastMousePos.x, "y": mousePosition.y - lastMousePos.y};

            shapeClone.getPoints().forEach(function (value, i) {
                shapeClone.updatePoint(i, {"x": value.x + offset.x, "y": value.y + offset.y});
            });
            lastMousePos = mousePosition;

            shapeClone.draw(canvas);
        }
        else
            shapeClone.draw(canvas);
        canvas.endDraw();
    }

    canvas.beginDraw();
    shape.draw(canvas);
    canvas.endDraw();
}

function canvasOnClicked()
{
    if (!shape.isFinished()) {
        createConvexShape();
        return;
    }

    const mousePosition = mouse.getPosition();

    if (!shapeClone)
        hover = shape.isHovered(mousePosition.x, mousePosition.y);
    else
        hover = shapeClone.isHovered(mousePosition.x, mousePosition.y);

    if (!isCloneClicked && hover) {
        if (!shapeClone)
            shapeClone = cloneObject(shape);
        isCloneClicked = true;
        lastMousePos = mousePosition;
        return;
    }
    if (isCloneClicked && hover) {
        isCloneClicked = false;
        lastMousePos = mousePosition;
    }
}

function createConvexShape()
{
    const position = mouse.getPosition();

    if (!position)
        return;

    if (shape.isPointTheFirst(position)) {
        shape.setFinished();
        return;
    }

    shape.addPoint(position);
}
