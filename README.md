# Anti-bot-verification-php
<p>Anti-bot-verification-php is a beautiful, easy, safety human-rebot php verification tool. The function is similar to reCAPTCHA</p>
<p>This is not based on any framework (such as jQure, react and bootstrap)</p>
<p>I purely use JavaScript and CSS3 to built the font-end</p>

# Demo
<p>https://www.teenet.me/verification</p>

# Based on (Environment)
<p>php 5 +</p>
<p>IE9+</p>

# How to use
<p>First, you need to download the files from recent release. </p>
<p>Second, copy the folder to your php web environment. </p>
<p>Third, according to the instraction in index.php, copy the code into your project</p>

# In your PHP back-end 
<p>In your back-end verification, please check Session variable: $_SESSION["anti_bot_verified"]</p>
<p>This variable is boolearn type. If the variable is false or the variable is not exited, the user has not verified yet (maybe this user is a robot)</p>
<p>If this variable is true, the user has verified</p>
<p>Example: </p>
<pre>
    <code>
          session_start();
          if(isset($_SESSION["anti_bot_verified"])) {
              if($_SESSION["anti_bot_verified"]) {
                  echo "Verified";
              } else {
                  echo "Not verified";
              }
          }
    </code>
</pre>

# About pictures 
<p>You can put your own verification picture into folder: anti-bot-verification/img/</p>
<p>The image files in that folder, the files name must be: 1.jpg, 2.jpg, 3.jpg and so on. </p>
<p>The image size must be width 300px and height 200px (300*200)</p>

# Be careful
<p>Do not use any variable with name start by "anti_bot" or "anti-bot"</p>

# Things I haven't done yet
<p>Now, this verification has not supported the touch-screen device</p>
<p>I am working on it now. </p>