<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Anti-bot-verification</title>
    <!--------------------------------------------------------------------->
    <!-- You need those two files:  -->
    <link href="anti-bot-verification/anti-bot-style.css" rel="stylesheet"/>
    <script type="text/javascript" src="anti-bot-verification/anti-bot-js.js"></script>
    <!--------------------------------------------------------------------->
</head>
<script>
</script>
<body>
<!--------------------------------------------------------------------->
<!--
Do not put two or more varification interface in same page

If you want to have different size of verification interface:

please change the div tag below into:

<div id="anti_bot_frame" class="anti-bot-frame-verylarge">
<div id="anti_bot_frame" class="anti-bot-frame-large">
<div id="anti_bot_frame" class="anti-bot-frame-medium">
<div id="anti_bot_frame" class="anti-bot-frame-small">
<div id="anti_bot_frame" class="anti-bot-frame-verysmall">

-->

<div id="anti_bot_frame" class="anti-bot-frame-large"></div>
<!-- If you want to add some style to that div, please make sure that the width:height ratio is 310:240 -->

<!--------------------------------------------------------------------->
</body>



<!--------------------------------------------------------------------->
<!-- Run this javascript at the end of the page -->
<script>anti_bot_verification_ini("anti-bot-verification");</script>
<!-- The parameter "anti-bot-verification" is the path to the anti-bot-verification folder. You have to change it if needed -->
<!--------------------------------------------------------------------->
</html>