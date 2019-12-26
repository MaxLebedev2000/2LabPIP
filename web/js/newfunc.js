 function toCanvas(point){

    let x = point.x;
    let y = point.y;

    if (x > 0){
        x = width / 2 + x * (width - 2*padding) / 10;
    } else {
        x = width / 2 + x * (width - 2*padding) / 10;
    }

    if (y > 0){
        y = height / 2 - y * (height - 2*padding) / 10;
    } else {
        y = height / 2 - y * (height - 2*padding) / 10;
    }

    return {"x":x, "y":y, "r":r};
}

function fromCanvas(canPoint){
    let x = canPoint.x;
    let y = height - canPoint.y;

    if (x < width / 2) {
        x = -(width / 2 - x);
    } else {
        x = x - width / 2;
    }

    if (y < height / 2) {
        y = -(height / 2 - y);
    } else {
        y = y - height / 2;
    }

    x = x / ((width - 2*padding) / 10);
    y = y / ((height - 2*padding) / 10);

    return {"x":x, "y":y, "r":canPoint.r};

}