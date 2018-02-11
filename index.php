<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Anti-bot-verification</title>
    <!--------------------------------------------------------------------->
    <!-- 这里导入两个文件  -->
    <link href="anti-bot-verification/anti-bot-style.css" rel="stylesheet"/>
    <script type="text/javascript" src="anti-bot-verification/anti-bot-js.js"></script>
    <!--------------------------------------------------------------------->
</head>
<script>
</script>
<body>
<!--------------------------------------------------------------------->
<!--
千万不要放置两个图像验证在同一个页面上

如果你想要不同大小的图像验证界面，请把标签修改成：

<div id="anti_bot_frame" class="anti-bot-frame-verylarge">
<div id="anti_bot_frame" class="anti-bot-frame-large">
<div id="anti_bot_frame" class="anti-bot-frame-medium">
<div id="anti_bot_frame" class="anti-bot-frame-small">
<div id="anti_bot_frame" class="anti-bot-frame-verysmall">

如果你想要自定义大小的话，请务必把宽高比例设置为310:240。
-->

<div id="anti_bot_frame" class="anti-bot-frame-large"></div>

<!--------------------------------------------------------------------->
</body>



<!--------------------------------------------------------------------->
<!-- 在界面尾部，运行JS -->
<script>anti_bot_verification_ini("anti-bot-verification");</script>
<!-- 其参数 "anti-bot-verification" 是这个页面到后台目录的路径，必要时修改 -->
<!--------------------------------------------------------------------->
</html>
