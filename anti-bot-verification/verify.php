<?php
/*
 * This file is used for make verification.
 *
 * To verify the verification, the user must send 2 parameters and visit this page.
 *
 * First parameter "x" is the x-coordinate position of small box in large picture, usually range: 1 - 250
 * Second parameter "y" is the y-coordinate position of small box in large picture, range: 1 - 150
 *
 * For example: xxx/verify.php?x=10.1&y=10.1
 *
 * The page display 1 means verified successful.
 * The page display 0 means verified failed, and has already generate a new set of verification.
 * */

// Parameter identification
if (!isset($_GET["x"]) || !isset($_GET["y"])) {
    die("No parameters");
}
if (strlen($_GET["x"]) > 20 || strlen($_GET["y"]) > 20) {
    die("Parameters are too long");
}
if (!is_numeric($_GET["x"]) || !is_numeric($_GET["y"])) {
    die("Parameters should be numbers");
}

// ----------------

require "utility.php";
session_start();
if ($_SESSION["anti_bot_verification"] -> verify((double)$_GET["x"],(double)$_GET["y"])) {
    $_SESSION["anti_bot_verified"] = true;
    echo "1";
}else{
    $_SESSION["anti_bot_verification"] = new Verification();
    $_SESSION["anti_bot_verified"] = false;
    echo "0";
}