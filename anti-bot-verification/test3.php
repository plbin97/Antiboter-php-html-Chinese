x坐标: <input id=pX name="pX" type=text >
y坐标: <input id=pY name="pY" type=text >
<div id="test" style="position: absolute;top: 200px;left: 200px">123</div>
<script>
    window.onload = function () {
        var d = document.getElementById("test");
        document.getElementById("test").innerText = d.offsetTop + " | " + d.offsetLeft;
    }
    function mouseMove(ev)
    {
        ev= ev || window.event;
        var mousePos = mouseCoords(ev);
//alert(ev.pageX);
        document.getElementById("pX").value = mousePos.x;
        document.getElementById("pY").value = mousePos.y;
    }

    function mouseCoords(ev)
    {
        if(ev.pageX || ev.pageY){
            return {x:ev.pageX, y:ev.pageY};
        }
        return {
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    }

    document.onmousemove = mouseMove;
</script>