# Antiboter PHP-HTML版本
<p>Antiboter是一个界面漂亮且方便使用的PHP后台的图片人机验证</p>
<p>Antiboter不依赖于任何前端框架 (不需要导入jQure，react或者bootstrap)</p>
<p>原生JS搭建的前端</p>
<p>支持PC键鼠以及移动端的触控屏验证</p>

# 演示
<p>https://www.teenet.me/verification</p>

# 后端环境
<p>php 5 +</p>
<p>php-gd</p>

# 如何使用
<p>首先，下载Release里面的ZIP包. </p>
<p>然后，复制里面的东西到你的PHP路径里</p>
<p>按照主页index.php文件里面的指引，复制其中的代码到你的页面上</p>

# 在你的PHP后端：
<p>Antiboter会使用一个Session变量 $_SESSION["anti_bot_verified"]</p>
<p>这个变量是一个布朗型的变量（true和false）。用户请求的数据提交到后台之后，如果这个变量为true，那么人机验证通过。反之，如果为false，说明人机验证未通过。</p>
<p>例子: </p>
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

# 关于显示的图片
<p>你可以放你自己的jpg图片在文件夹：anti-bot-verification/img/</p>
<p>在这个文件夹的图片中，文件名必须是以这种格式：1.jpg, 2.jpg, 3.jpg 等等</p>
<p>图片的大小必须是宽300px，高200px (300*200)</p>

# 注意
<p>不要使用任何以anti_bot开头的变量名</p>
