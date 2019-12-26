const LINE_WIDTH = 2;

function drawArrow(ctx, from, to, headlen = 10) {

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.lineWidth = LINE_WIDTH;
    let angle = Math.atan2(to.y - from.y, to.x - from.x);
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.lineTo(to.x - headlen * Math.cos(angle - Math.PI / 6), to.y - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(to.x - headlen * Math.cos(angle + Math.PI / 6), to.y - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();

}

function axises(ctx, color = "rgb(0, 0, 0)") {
    let center = {
        x: width / 2,
        y: height / 2
    };

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(center.x, center.y, width / 200 < 5 ? width / 200 : 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = "bold 13px Courier";
    ctx.fillText("Y", width / 2 - 15, 10);
    ctx.fillText("X", width - 10, height / 2 - 8);

    drawArrow(ctx, {x: 0, y: center.y}, {x: width, y: center.y});
    drawArrow(ctx, {x: center.x, y: height}, {x: center.x, y: 0});

}

function drawMark(ctx, from, to) {

    ctx.fillStyle = "rgb(0, 0, 0)";

    let horizontal = from.x === to.x;
    ctx.lineWidth = 2;
    ctx.beginPath();

    if (horizontal) {
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    } else {
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }
}
function rMarks(ctx) {

    let size;
    let maxR = 5;

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "normal 10px Courier";

    let xMark = padding;
    let stepx = (width - 2 * padding) / (maxR * 2 * 2);
    let xLine = height / 2;

    let yMark = padding;
    let stepy = (height - 2 * padding) / (maxR * 2 * 2);
    let yLine = width / 2;

    for (let i = -maxR; i <= maxR; i += 0.5) {

        if (i % 1 === 0) {
            size = 3;
        } else {
            size = 1.5;
        }

        drawMark(ctx, {x: xMark, y: (xLine - size)}, {x: xMark, y: (xLine + size)});
        if (i !== 0 && i % 1 === 0) {
            ctx.fillText(i.toString(), xMark - 6, xLine + size + 10);
        }
        xMark += stepx;
    }

    for (let i = maxR; i >= -maxR; i -= 0.5) {

        if (i % 1 === 0) {
            size = 3;
        } else {
            size = 1.5;
        }


        drawMark(ctx, {x: yLine - size, y: yMark}, {x: yLine + size, y: yMark});
        if (i !== 0 && i % 1 === 0) {
            ctx.fillText(i.toString(), yLine + size + 10, yMark);
        }
        yMark += stepy;
    }
}

function drawFigure(ctx, r ) {

    let pd = padding + ((5 - r) * ((width - 2 * padding) / 10));

    ctx.beginPath();
    ctx.fillStyle = "rgb(30, 144, 255)";

    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.arc(width / 2, height / 2,
        (width - 2 * pd) / 2, 3*Math.PI / 2, Math.PI,true );
    ctx.lineTo( pd, (height - 2 * pd) / 4 * 3 + pd);
    ctx.lineTo(width / 2, (height - 2 * pd) / 4 * 3 + pd);
    ctx.lineTo((width - 2 * pd) / 4 * 3 + pd, height / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();

}

function drawPoints(ctx, jsonlist) {
    for (let check of jsonlist) {
        drawPoint(ctx, check);
    }
}

function drawPoint(ctx, check) {

    //new
    let cnv = toCanvas(check);

    let tr = parseFloat(check.r) !== parseFloat(document.getElementById("r-value").value);

    if (tr) {

        ctx.fillStyle = "#000000";

    } else {

        if (JSON.parse(check.result)) {

            ctx.fillStyle = "#00FF00";
        } else {

            ctx.fillStyle = "#FF0000";
        }
    }
    ctx.beginPath();
    ctx.arc(cnv.x, cnv.y, 2, 0, 2 * Math.PI);
    ctx.fill();

}