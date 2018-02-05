<?php
/*
 * The utility.php stores the useful utility functions and class which would be called.
 * */
require "config.php";
function getFilesNumber ($dir) {
    /*
     * Function getFilesNumber() is used for counting how much files under a folder.
     * Parameter $directory: The directory of that folder
     * Return: Number of files under that directory.
     * */
    $file_count = 0;
    $files = glob($dir . "/*");
    if ($files){
        $file_count = count($files);
    }
    return $file_count;
}

class Verification {
    /*
     * Class Verification is used for storing the verification information.
     * The objects of this class usually would be stored in Session variable.
     *
     * The construction function would automatically generate the verification randomly.
     *
     * */
    private $img;
    private $x;
    private $y;
    private $verified;

    public function __construct() {
        $this -> img = rand(1,getFilesNumber("img"));
        $this -> x = rand(0,250);
        $this -> y = rand(0,150);
        $this -> verified = false;
    }
    public function getPositionX() {
        /*
         * function getPositionX(): Get the small box horizontal location in x-axis, from 0 - 250;
         * return integer value.
         * */
        return $this -> x;
    }
    public function getPositionY() {
        /*
         * function getPositionY(): Get the small box vertical location in y-axis, from 0 - 150;
         * return integer value.
         * */
        return $this -> y;
    }
    public function getImg() {
        /*
         * function getImg(): Get the image file name, and those file names are numbers;
         * return integer value.
         * */
        return $this -> img;
    }
    public function isVerified() {
        /*
         * function isVerified(): get the verification status.
         *
         * return true if the verification is passed.
         *
         * Usually, you can also use $_SESSION["anti_bot_verified"] value to know if the verification is passed.
         * Means:
         *     isVerified() == $_SESSION["anti_bot_verified"]
         * */
        return $this -> verified;
    }
    public function verify($inputX,$inputY) {
        /*
         * function verify(): verify the X and Y position from users and return the result.
         *
         * para $inputX: X-coordinate of the small box. Range: 1 - 250
         *
         * para $inputY: verify the Y-coordinate of the small box. Range: 1 - 150
         *
         * return true means that the user is verified and is not a robot
         *
         * return false means that the verification is not passed, and the program automatically generate a new set of verification.
         *
         * The error range which is accepted can be configured in config.php
         * */
        $error = $GLOBALS["error_allow"];
        if ($inputX < ($this -> x + $error) && $inputX > ($this -> x - $error) && $inputY < ($this -> y + $error) && $inputY > ($this -> y - $error)) {
            $this -> verified = true;
            return true;
        } else {
            return false;
        }
    }
}
