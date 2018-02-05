<?php
/*
 * This page is used for initializing the verification.
 * If someone visit this page, the verification would be initialized. 
 * */
require "utility.php";
session_start();
$_SESSION["anti_bot_verification"] = new Verification();
$_SESSION["anti_bot_verified"] = false;