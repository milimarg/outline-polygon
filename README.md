# outline-polygon

This project aims to learn Canvas in Javascript. Its goal is to be able to draw a convex polygon, duplicate it and wrap them around a third polygon, dynamically.

## How to run?

```shell
git clone https://github.com/milimarg/outline-polygon
cd outline-polygon
python3 -m http.server
```

## How to use?

1. Click on the canvas to set points. If when placing a point, the shape would come up as non-convex, that point would be ignored.
2. When the shape is done, close it by clicking on the first point.
3. Click on the shape to clone it and move it around.
4. You can move it (like in step 3) as many times as you want.
