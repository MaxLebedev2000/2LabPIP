<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html lang=en>


<head>
    <meta charset="UTF-8">
    <title>LebedevMElab2</title>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="js/script.js?<?=time()?>"></script>


    <link rel="stylesheet" href="styles/style.css??=time()?>">
    <style type="text/css">


        p {
            font-family: 'Times New Roman', Times, serif;
            font-style: italic;
            color: rgb(247, 170, 4);
        }

        body {
            background: #053f38;
        }

        input[type="text"] {
            border: 1px solid #98baba;
            background: transparent;
            padding: 1px 4px;
            color: #fff;
        }

        input[type="text"]::-webkit-input-placeholder {
            color: red;
        }


    </style>
    <script type="text/javascript">const jspContextPath = '${pageContext.request.contextPath}';</script>
    <script type="text/javascript">
        const controllerUrl = "<%=response.encodeURL("controller")%>";
    </script>

    <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-3.4.1.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/functions.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/canvas.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/newfunc.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>


<body onload="load()">

<script>

    const validator = new Validator(
        new CorArr([-5, -4, -3, -2, -1, 0, 1, 2, 3]),
        new CorText(-5, 3, true),
        new CorArr([1, 1.5, 2, 2.5, 3]));

    var x;
    var y;
    var r;

    const width = 320;
    const height = 320;
    const padding = 20;

</script>

<!-- Type your html here -->
<header>
    <div class="hat">
        <table class="head_table" border="3">
            <tr>
                <td rowspan="3" class="first"><h1 class="h1">Лабораторная работа №2 по Веб-программированию</h1></td>
                <td><p>Студент: Лебедев Максим </p></td>
            <tr>
                <td><p>Группа: P3211 </p></td>
            </tr>
            <tr>
                <td><p>Вариант: 523697 </p></td>
            </tr>
            </tr>
        </table>
    </div>
</header>

<table class="table_main" border="3">
    <!-- ask value -->
    <tr>
        <td class="left">
            <form>
                <table class="left_table">
                    <tr>
                        <td>Выберите значение Х: <br><br>
                            <div>
                                <select id="x" required>
                                    <script>
                                        let
                                            select = $("#x");
                                        for (let i = -5; i <= 3; i++) {
                                            let opt = document.createElement("option");
                                            opt.value = i;
                                            opt.innerHTML = i;
                                            select.append(opt);
                                        }
                                    </script>
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Введите значение Y в диапозоне (-5,3): <br><br>

                            <div class="vars" id="yField"><input type="text" id="y" autocomplete="off"
                                                                 placeholder="-2"></div>
                        </td>

                        <script>
                            let
                                el = document.getElementById("y");

                            let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "-", "Backspace", ","];

                            el.addEventListener("keypress", function (event) {
                                if (!numbers.includes(event.key)) {
                                    event.preventDefault();
                                }
                            });


                        </script>

                    </tr>
                    <tr>
                        <td>Выберите значение R:<br><br>


                            <div id="r-buttons">

                                <input onclick="checkButton(this)" type="button" value="1" name="r">
                                <input onclick="checkButton(this)" type="button" value="1.5" name="r">
                                <input onclick="checkButton(this)" type="button" value="2" name="r">
                                <input onclick="checkButton(this)" type="button" value="2.5" name="r">
                                <input onclick="checkButton(this)" type="button" value="3" name="r">
                            </div>
                            <input type="hidden" id="r-value">


                            <script>
                                function checkButton(button) {
                                    const btnColor = "#C2C0C0";
                                    let r = document.getElementById("r-value");

                                    let allButtons = document.getElementsByName("r");
                                    for (let i = 0; i < allButtons.length; i++) {
                                        allButtons[i].style.backgroundColor = btnColor;
                                    }
                                    button.style.backgroundColor = "red";
                                    r.value = button.value ;
                                    console.log(r.value);
                                    redraw();
                                }</script>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input id="submit-btn" type="button" value="Проверить" onclick="check()">
                        </td>
                    </tr>
                </table>
            </form>
        </td>

        <!-- picture and answer -->
        <td class="right">
            <table class="right-table">
                <tr style="width: inherit">
                    <td class="picture_right">
                        <div id="container">

                        <canvas id="canvas" width="320px" height="320px"></canvas>
                        <script>
                            const canvas = document.getElementById("canvas");
                            const ctx = canvas.getContext('2d');
                            canvas.addEventListener("click", listener);

                            function load() {

                                <%
                                if (request.getAttribute("storage") == null){
                                    response.sendRedirect("controller");
                                    return;
                                }


                                if (request.getAttribute("error") != null) {
                                %>
                                error.show("<%=request.getAttribute("error")%>");
                                <%
                                }
                                %>

                                let r = document.getElementById("r-value").value;
                                ctx.clearRect(0, 0, canvas.width, canvas.height);

                                drawFigure(ctx, r);
                                axises(ctx);
                                rMarks(ctx);
                                drawPoints(ctx, ${storage.json});
                            }

                            function redraw() {
                                $.ajax({
                                    method: "post",
                                    url: "${pageContext.request.contextPath}" + controllerUrl,
                                    data: {"getlist": "list"},
                                    error: function (message) {
                                        console.log(message);
                                    },
                                    success: function (data) {

                                        let r = document.getElementById("r-value").value;

                                        let json = JSON.parse(data);

                                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                                        drawFigure(ctx, r);
                                        axises(ctx);
                                        rMarks(ctx);

                                        drawPoints(ctx, json);
                                    }
                                });
                            }

                        </script>
                            <br><br>

                        <div id="reswrapper">
                            <table id="results" border="1px solid black">

                                <caption>
                                    Результаты
                                </caption>

                                <colgroup>
                                    <col class="val">
                                    <col class="val">
                                    <col class="val">
                                    <col class="res">
                                </colgroup>

                                <tr id="first">
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>R</th>
                                    <th>Результат</th>
                                </tr>

                                <tbody>
                                <c:forEach items="${storage.list}" var="check">
                                    <tr>
                                        <td>
                                            <f:formatNumber value="${check.x}" maxFractionDigits="4"/></td>
                                        <td>
                                            <f:formatNumber value="${check.y}" maxFractionDigits="4"/></td>
                                        <td>
                                            <f:formatNumber value="${check.r}" maxFractionDigits="1"/></td>
                                        <td>
                                            <c:out value="${check.result}"/></td>
                                    </tr>
                                </c:forEach>
                                </tbody>

                            </table>
                        </div>

                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        </div>

                        <div id="error-log">

                        </div>

                        <script>
                            const error = new Error();
                        </script>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>


