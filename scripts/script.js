const mouse = new Mouse;
const canvas = new Canva;

const shape = new Shape;
const translationLine = new Shape(null, "#0000FF");
const convexHull = new Shape(null, "#FF0000");

let shapeClone = null;
let isCloneClicked = false;
let lastMousePos = {x: 0, y: 0};
let hover = null;

const canvasObject = document.getElementById("canvas");

canvasObject.addEventListener("click", canvasOnClicked);
document.addEventListener("mousemove", mouseMovements, false);

function mouseMovements(e)
{
    mouse.onMouseMove(e);
    polygonDraw();
}

function cloneObject(obj)
{
    return new Shape([...obj.getPoints()]);
}

function canvasOnClicked()
{
    const mousePosition = mouse.getPosition();

    if (!shape.isFinished()) {
        createShape(mousePosition);
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

function createShape(mousePosition)
{
    if (!mousePosition)
        return;

    if (shape.isPointTheFirst(mousePosition)) {
        const center = shape.getCenter();

        shape.setFinished();
        translationLine.addPoint(center);
        translationLine.addPoint(center);
        return;
    }

    shape.addPoint(mousePosition);
}

function polygonDraw()
{
    canvas.clear();

    canvas.beginDraw();
    shape.draw(canvas);
    canvas.endDraw();

    if (shapeClone)
        drawShapeClone();

    if (!translationLine.empty()) {
        canvas.beginDraw();
        translationLine.draw(canvas);
        canvas.endDraw();
    }

    if (shapeClone) {
        const points = calculateConvexHull([...shape.getPoints(), ...shapeClone.getPoints()]);
        points.forEach(function (point, i) {
            if (!convexHull.updatePoint(i, point))
                convexHull.addPoint(point);
        });
    }

    if (!convexHull.empty()) {
        canvas.beginDraw();
        convexHull.draw(canvas);
        canvas.endDraw();
    }
}
