function orientation(p, q, r)
{
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0)
        return 0;
    return val > 0 ? 1 : 2;
}

function calculateConvexHull(points)
{
    const n = points.length;
    const hull = [];
    let l = 0;
    let q = 0;

    if (n < 3)
        return points;

    for (let i = 1; i < n; i++)
        if (points[i].x < points[l].x)
            l = i;

    let p = l;
    do {
        hull.push(points[p]);
        q = (p + 1) % n;
        for (let i = 0; i < n; i++)
            if (orientation(points[p], points[i], points[q]) === 2)
                q = i;
        p = q;
    } while (p !== l);
    return hull;
}
