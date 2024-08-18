const mouse = new Mouse;
const canvas = new Canva;

const shape = new Shape;
const translationLine = new Shape(null, "#0000FF");
const tempLine = new Shape([{x: 0, y: 0}, {x: 0, y: 0}]);
const convexHull = new Shape(null, "#FF0000");

let shapeClone = null;
let isCloneClicked = false;
let lastMousePos = {x: 0, y: 0};

let isFirstTimeDrawing = true;

const canvasObject = document.getElementById("canvas");
const infoBox = document.getElementById("info");

canvasObject.addEventListener("click", canvasOnClicked);
canvasObject.addEventListener("mousedown", canvasOnMouseDown);
canvasObject.addEventListener("mouseup", canvasOnMouseUp);
document.addEventListener("mousemove", mouseMovements, false);

let hold = false;

function canvasOnMouseDown()
{
    if (!shape.isFinished())
        return;
    const mousePosition = mouse.getPosition(canvas);
    if (shapeClone.isHovered(mousePosition))
        hold = true;
}

function canvasOnMouseUp()
{
    if (!shape.isFinished())
        return;
    hold = false;
}

function mouseMovements(e)
{
    mouse.onMouseMove(e);

    const mousePosition = mouse.getPosition(canvas);

    if (shape.isFinished() && !shapeClone)
        shapeClone = cloneObject(shape);
    if (hold) {
        const offset = {x: mousePosition.x - lastMousePos.x, y: mousePosition.y - lastMousePos.y};
        shapeClone.translatePoints(offset.x, offset.y);
        translationLine.updatePoint(1, shapeClone.getCenter());
    }
    lastMousePos = mousePosition;
    polygonDraw();
}

function cloneObject(obj)
{
    return new Shape([...obj.getPoints()]);
}

function canvasOnClicked()
{
    const mousePosition = mouse.getPosition(canvas);

    if (!shape.isFinished())
        createShape(mousePosition);
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

    if (isFirstTimeDrawing || shape.isFinished()) {
        canvas.beginDraw();
        isFirstTimeDrawing = false;
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
