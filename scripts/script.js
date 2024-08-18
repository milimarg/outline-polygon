const mouse = new Mouse;
const canvas = new Canva;

const shape = new Shape;
const translationLine = new Shape(null, "#0000FF");
const tempLine = new Shape([{x: 0, y: 0}, {x: 0, y: 0}]);
const convexHull = new Shape(null, "#FF0000");

let shapeClone = null;
let isCloneClicked = false;
let lastMousePos = {x: 0, y: 0};
let hover = null;

let a = false;

const canvasObject = document.getElementById("canvas");
const infoBox = document.getElementById("info");

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
        hover = shape.isHovered(mousePosition);
    else
        hover = shapeClone.isHovered(mousePosition);

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
        infoBox.innerText = "Shape is finished.";
        canvas.endDraw();
        return;
    }

    if (shape.addPoint(mousePosition))
        infoBox.innerText = `You added a point at (${mousePosition.x}, ${mousePosition.y}).`;
    else
        infoBox.innerText = "";
}

function polygonDraw()
{
    canvas.clear();

    if (!a || shape.isFinished()) {
        canvas.beginDraw();
        a = true;
    }

    shape.draw(canvas);
    if (shape.isFinished())
        canvas.endDraw();
    canvas.stroke();

    drawTemporaryLine();

    if (shapeClone) {
        drawShapeClone();
        convexHull.clear();
        const points = calculateConvexHull([...shape.getPoints(), ...shapeClone.getPoints()]);
        points.forEach(point => {
            convexHull.addPoint(point);
        });
    }

    if (!translationLine.empty()) {
        canvas.beginDraw();
        translationLine.draw(canvas);
        canvas.endDraw();
        canvas.stroke();
    }

    if (!convexHull.empty()) {
        canvas.beginDraw();
        convexHull.draw(canvas);
        canvas.endDraw();
        canvas.stroke();
    }
}
