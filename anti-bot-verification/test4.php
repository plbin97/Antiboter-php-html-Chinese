<div id='box' style="position:absolute;width:100px;height:100px;background-color:'#ee735c'">
    <div>可拖动div元素</div>
</div>
<script>
    var oDiv=document.getElementById('box');
    oDiv.onmousedown=function(ev){
        var disX=ev.clientX-oDiv.offsetLeft;
        var disY=ev.clientY-oDiv.offsetTop;

        document.onmousemove=function(ev){
            oDiv.style.left=ev.clientX-disX+'px';
            oDiv.style.top=ev.clientY-disY+'px';
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null
        }
    }
</script>