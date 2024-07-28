const mouse = new Mouse;
const shape = new ConvexShape;
const canvas = new Canva;
let shapeClone = null;
let isCloneClicked = false;
let lastMousePos = {x: 0, y: 0};
let hover = null;

document.addEventListener("mousemove", mouseMovements, false);

function mouseMovements(e)
{
    mouse.onMouseMove(e);
    moveShapeClone();
}

function cloneObject(obj)
{
    return new ConvexShape([...obj.getPoints()]);
}

function canvasOnClicked()
{
    const mousePosition = mouse.getPosition();

    if (!shape.isFinished()) {
        createConvexShape(mousePosition);
        return;
    }

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

function createConvexShape(mousePosition)
{
    if (!mousePosition)
        return;

    if (shape.isPointTheFirst(mousePosition)) {
        shape.setFinished();
        return;
    }

    shape.addPoint(mousePosition);
}
