class Validator {

    constructor(corx, cory, corr) {
        this.corx = corx;
        this.cory = cory;
        this.corr = corr;
    }

    validate() {

        x = document.getElementById("x").value;
        y = document.getElementById("y").value;
        r = document.getElementById("r-value").value;

        y = y.replace(/,/g, '.');
        if(y.includes('.')){

            y = y.substr(0,4);
        }

        let vars = [];

        if (!this.corx.isValid(x)) {
            vars.push("X");
        }
        if (!this.cory.isValid(y)) {
            vars.push("Y");
        }
        if (!this.corr.isValid(r)) {
            vars.push("R");
        }

        if (vars.length !== 0) {
            return "Значения " + vars.join(", ") + " некорректны";
        } else {
            return "good";
        }
    }

    isRValid(rad) {
        return this.corr.isValid(rad);
    }


}

class CorArr {

    constructor(arr) {
        this.arr = arr;
    }

    isValid(vr) {

        vr = vr.replace(/\s/g, "");

        if (vr == "" || vr == undefined) {
            return false;
        }

        for (let some of this.arr) {
            if (some == vr) return true;
        }
        return false;
    }
}

class CorText {

    constructor(from, to, include) {
        this.from = from;
        this.to = to;
        this.include = include;
    }

    isValid(vr) {

        vr = vr.replace(/\s/g, "");

        if (vr == "" || vr == undefined) {
            return false;
        }

        if (this.include) {
            return vr >= this.from && vr <= this.to;
        } else {
            return vr > this.from && vr < this.to;
        }
    }
}

class Error {

    constructor() {
        this.error = document.getElementById("error-log");
    }

    show(text) {
        this.error.innerHTML = text;
        this.error.style.display = "block";
    }

    hide() {
        this.error.innerHTML = "";
        this.error.style.display = "none";
    }

}

function check() {
    let res = validator.validate();
    if (res !== "good") {
        error.show(res);
    } else {
        error.hide();
        x = $("#x :selected").val();
        y = document.getElementById("y").value;
        y = y.replace(/,/g, '.');
        r= document.getElementById("r-value").value;
        send(x, y, r);
    }
}

function send(x, y, r) {
    $.ajax({
        method: "post",
        url: jspContextPath + controllerUrl,
        data: {x: x, y: y, r: r, async: "true"},
        error: function (message) {
            console.log(message);
        },
        success: function (data) {

            let check = JSON.parse(data);
            drawPoint(ctx, check);
            addCheck(check);

        }
    });
}

function listener(e) {

    error.hide();

    let rect = canvas.getBoundingClientRect();
    let canx = (e.clientX - rect.left - LINE_WIDTH / 2);
    let cany = (e.clientY - rect.top - LINE_WIDTH / 2);

    r = document.getElementById("r-value").value;

    if (validator.isRValid(r)) {
        error.hide();
        let res = fromCanvas({"x": canx, "y": cany, "r": r});
        send(res.x, res.y, r);
    } else {
        error.show("Радиус не указан либо не является корректным");
    }
}

function addCheck(check) {

    let r;

    if (Number.isInteger(check.r)) {
        r = check.r;
    } else {
        r = parseFloat(check.r).toFixed(1);
    }

    $('#results tr:first').after(   "<tr>" +
        "<td>" + parseFloat(check.x).toFixed(4) + "</td>" +
        "<td>" + parseFloat(check.y).toFixed(4) + "</td>" +
        "<td>" + r + "</td>" +
        "<td>" + check.result + "</td>" + "</tr>");

}
