<?php
/*
 * Page get-image.php can generate the images which is needed.
 * There are three kinds of image which can be generated, the large image(300*200) with small box(50*50), large original image, and the small image(50*50).
 * The large image(300*200) is the image with a small box(50*50)
 * The large original image is the image directly from the folder
 * The small image is the image which is appeared in the small box in the large image.
 *
 * With Get parameter "get-image.php?type=large_picture", this page would generate the large image with box.
 * With Get parameter "get-image.php?type=original_picture", this page would generate the large original image.
 * With Get parameter "get-image.php?type=small_picture", this page would generate the small image.
 * */


// parameter identification
if (!isset($_GET["type"])) {
    die("No parameter");
}
if (strlen($_GET["type"]) > 20) {
    die("Parameter is too long");
}

// -----------------------------

require "utility.php";

// Start Session
session_start();
// Make sure that php-gd has already installed
if (!function_exists("imagecreatefromjpeg")) {
    die("Required php-gd");
}

// Make sure that session variable existed
if (!isset($_SESSION["anti_bot_verification"])) {
    die("Session expired");
}

// Get the X and Y coordinate  from Session variables
$position_x_1 = $_SESSION["anti_bot_verification"] -> getPositionX();
$position_y_1 = $_SESSION["anti_bot_verification"] -> getPositionY();

// Calculate the diagonal coordinate for that square
$position_x_2 = $position_x_1 + 50;
$position_y_2 = $position_y_1 + 50;

// Get the image from local file. The image must be 300*200 size.
$img_path = "img/" . $_SESSION["anti_bot_verification"] -> getImg() . ".jpg";
$img = imagecreatefromjpeg($img_path) or die("No such image in that folder");
$image_size = getimagesize($img_path);

// Make sure that image size must be 300*200
if ($image_size[0] != 300 || $image_size[1] != 200) {
    die("image size must be 300*200");
}

if ($_GET["type"] == "large_picture") {  // Generate large image with box


    // Draw the square with shadow
    $i = 57;
    while ($i < 127) {
        imagerectangle($img, $position_x_1, $position_y_1, $position_x_2, $position_y_2, imagecolorallocatealpha($img, 0, 0, 0, $i));
        $position_x_1 = $position_x_1 + 1;
        $position_y_1 = $position_y_1 + 1;
        $position_x_2 = $position_x_2 - 1;
        $position_y_2 = $position_y_2 - 1;
        $i = $i + 10;
    }


    // Set header in type jpg
    header("Content-type: image/jpg");

    // Generate image
    imagejpeg($img);

    // Release memory
    imagedestroy($img);

}else if($_GET["type"] == "small_picture"){ // Generate small image

    // Create a small image with height 50 and width 50
    $img_small = imagecreatetruecolor(50,50);

    // Copy one part of the large image (the image with size 300*200) to small part of image
    imagecopy($img_small,$img,0,0,$position_x_1,$position_y_1,50,50);

    // Change brightness of the picture
    imagefilter($img_small, IMG_FILTER_BRIGHTNESS, 1000);

    $position_1= 0;
    $position_2 = 50;

    // Adding some blur in to small picture
    for ($i = 50; $i < 120; $i = $i + 6) {
        imagerectangle($img_small, $position_1, $position_1, $position_2, $position_2, imagecolorallocatealpha($img_small, 255, 255, 255, $i));
        $position_1 = $position_1 + 1;
        $position_2 = $position_2 - 1;
    }

    // Set header in type jpg
    header("Content-type: image/jpg");

    // Generate image
    imagejpeg($img_small);

    // Release memory
    imagedestroy($img_small);
    imagedestroy($img);
} else if($_GET["type"] == "original_picture") {  // Generate original image
    // Set header in type jpg
    header("Content-type: image/jpg");

    // Generate image
    imagejpeg($img);

    // Release memory
    imagedestroy($img);
} else {

    // If there is no parameter matched
    // Destroy the image
    imagedestroy($img);
    echo "Invalid parameters";
}