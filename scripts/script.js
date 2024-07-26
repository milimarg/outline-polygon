const mouse = new Mouse;
const shape = new ConvexShape;
const canvas = new Canva; // TODO: need to 'delete'?

document.addEventListener("mousemove", mouse.onMouseMove, false);

function canvasOnClicked()
{
    if (!shape.isFinished())
        createConvexShape();
    else
        translatePolygon();
}

function createConvexShape()
{
    const position = mouse.getPosition();

    if (!position)
        return;

    if (shape.isPointTheFirst(position)) {
        console.log("shape is finished");
        shape.setFinished();
        return;
    }

    canvas.beginDraw();
    shape.addPoint(position);
    shape.draw(canvas);
    canvas.endDraw();
}

function translatePolygon()
{

}
