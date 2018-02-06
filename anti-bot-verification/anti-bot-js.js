function anti_bot_verification_ini(path) {
    /*
    Function anti_bot_verification_ini(): initialize the verification.
    Para path: the path to php back-end folder.
    * */
    anti_bot_verification_path = path;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            anti_bot_preload();
        }
    };
    req.open("GET", anti_bot_verification_path + "/initialize.php", true);
    req.send();
}


function anti_bot_preload() {
    /*
    Function anti_bot_preload(): preload the pictures and show the pictures.
    * */

    // The innerHTML text for reload icon:
    anti_bot_icon = "<div class=\"anti-bot-loading-large-circle\"></div><div class=\"anti-bot-loading-small-circle\"></div><div class=\"anti-bot-loading-cover-1\"></div><div class=\"anti-bot-loading-arror\"></div><div class=\"anti-bot-loading-cover-2\"></div><div class=\"anti-bot-loading-cover-3\"></div>";

    // Display loading animation
    anti_bot_start_loading_status(null);

    // Prepare the main(large) picture for verification
    anti_bot_large_picture = new Image();
    anti_bot_large_picture.src = anti_bot_verification_path + "/get-image.php?type=large_picture";
    anti_bot_large_picture.setAttribute("id", "anti_bot_large_picture");
    anti_bot_large_picture.setAttribute("draggable", "false");
    anti_bot_large_picture.style.boxShadow = "0 0 2px 2px #aaa";
    anti_bot_large_picture.style.opacity = 0;
    anti_bot_large_picture.onload = function () {   // Once the main(large) picture is loaded, this function would be executed
        // Prepare for the small picture
        anti_bot_small_picture = new Image();
        anti_bot_small_picture.src = anti_bot_verification_path + "/get-image.php?type=small_picture";
        anti_bot_small_picture.setAttribute("id", "anti_bot_small_picture");
        anti_bot_small_picture.setAttribute("draggable", "false");
        anti_bot_small_picture.setAttribute("unselectable", "on");
        anti_bot_small_picture.style.opacity = 0;
        anti_bot_small_picture.onload = function () {   // Once the small picture is loaded, this function would be executed
            var frame = document.getElementById("anti_bot_frame");

            // Stop loading animation
            anti_bot_end_loading_status(function () {   // Once stoped the animation, this function would be executed.

                // -----------------------------------------------------------------------
                // Build the verification user interface, at the meantime, everthing is transparent in this process
                frame.style.boxShadow = "0 0 2px 2px #AAA";
                var icon = document.createElement("div");
                icon.setAttribute("class", "anti-bot-loading-framework");
                icon.setAttribute("id", "anti-bot-loading-framework");
                icon.innerHTML = anti_bot_icon;
                icon.style.opacity = 0;
                icon.setAttribute("onclick", "anti_bot_reload()");
                frame.appendChild(icon);
                frame.appendChild(anti_bot_large_picture);
                frame.appendChild(anti_bot_small_picture);
                anti_bot_smallpic_ini_position = {
                    left: anti_bot_small_picture.offsetLeft,
                    top: anti_bot_small_picture.offsetTop
                };

                // Start monitoring the mouse event to small picture
                anti_bot_start_mouse_monitor();

                // --------------------------------------------------------------
                // Finished building the interface, then the program start to appear the interface (Change opacity)
                var frame_opacity = 0;
                appear_frame();

                function appear_frame() {
                    frame_opacity = frame_opacity + 0.05;
                    anti_bot_large_picture.style.opacity = frame_opacity;
                    anti_bot_small_picture.style.opacity = frame_opacity * 0.7;
                    icon.style.opacity = frame_opacity;
                    if (frame_opacity < 1) {
                        window.requestAnimationFrame(appear_frame);
                    }
                }

                // Now, the verification interface is ready to use.
            });
        }
    }
}


function anti_bot_start_mouse_monitor() {
    /*
    Function anti_bot_start_mouse_monitor(): Start the mouse monitoring for small picture
    Before calling this function, make sure that the interface of verification is loaded.
    * */

    document.getElementById("anti_bot_small_picture").onmousedown = function (ev) {
        // Execute if the small picture is clicked
        // ----------------------------------------------
        // Change the shadow of the picture
        var frame = document.getElementById("anti_bot_frame");
        anti_bot_shadow_change(frame, 2, 0, 0.2, "#AAA", function () {
            frame.style.boxShadow = "0 0 0 0";
        });
        var small_pic = document.getElementById("anti_bot_small_picture");
        var large_picture = document.getElementById("anti_bot_large_picture");
        anti_bot_shadow_change(large_picture, 2, 0, 0.2, "#AAA", function () {
            large_picture.style.boxShadow = "0 0 0 0";
        });

        // --------------------------------------------
        // get the distance from the small picture borders to the center of the mouse
        var mouse_smallpic_distance_x = ev.clientX - small_pic.offsetLeft;
        var mouse_smallpic_distance_y = ev.clientY - small_pic.offsetTop;

        // ---------------------------------------------
        document.onmousemove = function (ev) {
            // Execute if the mouse is moving.
            // The small picture would change its location and tracking on the mouse.
            small_pic.style.top = ev.clientY - mouse_smallpic_distance_y + "px";
            small_pic.style.left = ev.clientX - mouse_smallpic_distance_x + "px";
        };

        document.onmouseup = function (ev) {
            // Execute if the mouse is released:
            // --------------------------------------------
            document.onmousemove = null;
            var large_picture_coordinate = anti_bot_getCoordinateByElement(large_picture);

            // Start verification if the small picture is placed in the large picture
            if (ev.clientY > large_picture_coordinate.top && ev.clientY < large_picture_coordinate.bottom && ev.clientX > large_picture_coordinate.left && ev.clientX < large_picture_coordinate.right) {
                // -----------------------------------------------------------
                // Execute if the small picture is placed inside of large picture

                // Get the coordinate
                var x_coordinate = ((small_pic.offsetLeft - large_picture.offsetLeft) * 300) / large_picture.offsetWidth;
                var y_coordinate = ((small_pic.offsetTop - large_picture.offsetTop) * 200) / large_picture.offsetHeight;

                // Send the coordinate to the back-end
                anti_bot_start_loading_status(function () {
                    anti_bot_verify(x_coordinate, y_coordinate);
                });
                // -----------------------------------------------------------
            } else {
                // ----------------------------------------------------------
                // Execute if the small picture is not placed inside of large picture

                // Move the small picture to the original position
                anti_bot_smallpic_moveback_to_original(small_pic, anti_bot_smallpic_ini_position.left, anti_bot_smallpic_ini_position.top);

                // Change back for the shadows
                anti_bot_shadow_change(frame, 0, 2, 0.1, "#AAA", null);
                anti_bot_shadow_change(large_picture, 0, 2, 0.1, "#aaa", null);
                // ----------------------------------------------------------
            }
            document.onmouseup = null;
        };
    };
}


function anti_bot_getCoordinateByElement(picture) {
    /*
    Function anti_bot_getCoordinateByElement(): Get the element's current distance between the border of element to the border of screen.

    Parameter picture is the element which you wana to get the distance between the element's border and the screen's border.
    The function would return an object with top, left, right, bottom
    * */
    var picture_top = picture.getBoundingClientRect().top;
    var picture_left = picture.getBoundingClientRect().left;
    var picture_right = picture_left + picture.offsetWidth;
    var picture_bottom = picture_top + picture.offsetHeight;
    return {
        top: picture_top,
        left: picture_left,
        right: picture_right,
        bottom: picture_bottom
    }
}


function anti_bot_smallpic_moveback_to_original(target_element, end_left, end_top) {
    /*
    Function anti_bot_smallpic_moveback_to_original(): The small picture would move back to the original if this function is called
    * */
    var start_left = target_element.offsetLeft;
    var start_top = target_element.offsetTop;
    var delta_x = 0;
    var delta_y = 0;

    // Verify if the picture is on the left or the right toward the original position.
    if (start_left < end_left) {
        // On the left
        delta_x = end_left - start_left;
        window.requestAnimationFrame(move_x_r);

        function move_x_r() {
            target_element.style.left = target_element.offsetLeft + delta_x / 5 + "px";
            delta_x = delta_x - delta_x / 5;
            if (delta_x > 0) {
                window.requestAnimationFrame(move_x_r);
            }
        }
    } else {
        // On the right
        delta_x = start_left - end_left;
        window.requestAnimationFrame(move_x_l);

        function move_x_l() {
            target_element.style.left = target_element.offsetLeft - delta_x / 5 + "px";
            delta_x = delta_x - delta_x / 5;
            if (delta_x > 0) {
                window.requestAnimationFrame(move_x_l);
            }
        }
    }

    // Verify if the picture is on the top or the bottom toward the original position.
    if (start_top < end_top) {
        // On the top
        delta_y = end_top - start_top;
        window.requestAnimationFrame(move_y_d);

        function move_y_d() {
            target_element.style.top = target_element.offsetTop + delta_y / 5 + "px";
            delta_y = delta_y - delta_y / 5;
            if (delta_y > 0) {
                window.requestAnimationFrame(move_y_d);
            }
        }
    } else {
        // On the bottom
        delta_y = start_top - end_top;
        window.requestAnimationFrame(move_y_u);

        function move_y_u() {
            target_element.style.top = target_element.offsetTop - delta_y / 5 + "px";
            delta_y = delta_y - delta_y / 5;
            if (delta_y > 0) {
                window.requestAnimationFrame(move_y_u);
            }
        }
    }
}


function anti_bot_verify(x, y) {
    /*
    Function anti_bot_verify(): verifying the x and y coordinate by sending the data to php back-end
    Parameter x is the x-coordinate of the small box.
    Parameter y is the y-coordingate of the small box.
    * */
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var frame = document.getElementById("anti_bot_frame");
            if (this.responseText === "1") {
                // ----------------------------------------
                // Execute if verified successful (the user maybe is not a robot)
                var original_picture = new Image();
                original_picture.src = anti_bot_verification_path + "/get-image.php?type=original_picture";
                original_picture.setAttribute("id", "anti_bot_large_picture");
                original_picture.onload = function () { // Loading the original image(large image without box)

                    // Remove all the previous image, and put the original image
                    frame.removeChild(document.getElementById("anti-bot-loading-framework"));
                    frame.removeChild(document.getElementById("anti_bot_large_picture"));
                    frame.appendChild(original_picture);
                    frame.removeChild(document.getElementById("anti_bot_small_picture"));

                    // Building a huge tick on the page
                    var tick_area = document.createElement("div");
                    tick_area.setAttribute("id", "anti_bot_tick_area");
                    var tick = document.createElement("div");
                    tick.setAttribute("class", "anti-bot-tick-framework");
                    tick.innerHTML = "<div class=\"anti-bot-tick-left\"></div><div class=\"anti-bot-tick-right\"></div><div class=\"anti-bot-tick-cover\"></div>\n";
                    tick_area.appendChild(tick);
                    frame.appendChild(tick_area);
                    var tick_opacity = 0;
                    appear_tick();

                    function appear_tick() {
                        tick_area.style.opacity = tick_opacity;
                        tick_opacity = tick_opacity + 0.05;
                        if (tick_opacity < 1) {
                            window.requestAnimationFrame(appear_tick);
                        }
                    }

                    // Stop loading animation
                    anti_bot_end_loading_status(null);
                }
            } else {
                // -----------------------------------------------------
                // Execute if verification failure ( the user maybe is a robot)

                // Move the small picture to the origional location
                anti_bot_smallpic_moveback_to_original(anti_bot_small_picture, anti_bot_smallpic_ini_position.left, anti_bot_smallpic_ini_position.top);

                // Change the shadow of the pictures
                anti_bot_shadow_change(frame, 0, 2, 0.1, "#AAA", null);
                anti_bot_shadow_change(anti_bot_large_picture, 0, 2, 0.1, "#aaa", null);

                // Load the new pictures
                anti_bot_large_picture.src = anti_bot_verification_path + "/get-image.php?type=large_picture&nothing=" + Math.random();
                anti_bot_small_picture.src = anti_bot_verification_path + "/get-image.php?type=small_picture&nothing=" + Math.random();
                anti_bot_large_picture.onload = function () {
                    anti_bot_small_picture.onload = function () {
                        // While pictures are loaded, stop loading animation.
                        anti_bot_end_loading_status(null);
                    };
                };
            }
        }
    };
    req.open("GET", anti_bot_verification_path + "/verify.php?x=" + x + "&y=" + y, true);
    req.send();
}


function anti_bot_reload() {
    /*
    Function anti_bot_reload(): used for reload the verification interface.
    * */

    var frame_opacity = 1;
    var frame = document.getElementById("anti_bot_frame");
    // Disappearing the interface
    disappear_frame();

    function disappear_frame() {
        frame_opacity = frame_opacity - 0.05;
        frame.style.opacity = frame_opacity;
        if (frame_opacity > 0) {
            window.requestAnimationFrame(disappear_frame)
        } else {
            // Remove all the elements of the interface
            frame.innerHTML = "";
            frame.style = "";

            // Initialize the interface
            anti_bot_verification_ini(anti_bot_verification_path);
        }
    }
}


function anti_bot_start_loading_status(complete) {
    /*
    Function anti_bot_start_loading_status(): Start the loading animation.

    During the animation, the user is not allow to do anything.

    After anti_bot_start_loading_status() is called, if you want to stop animation, call anti_bot_end_loading_status()

    10 second after calling the anti_bot_start_loading_status(), if the program still has not called anti_bot_end_loading_status(),
    the animation would stop, and replaced by a refresh sign.

    Parameter complete should be an function which carry the action that would be execute after the animation is started.
    If you do not want any action after the animation is started, please put null in parameter.
    * */

    // Building the animation
    var loading_area = document.createElement("div");
    loading_area.setAttribute("id", "anti_bot_loading_area");
    var loading = document.createElement("div");
    loading.setAttribute("class", "anti_bot_loading_circle");
    loading.setAttribute("id", "anti_bot_loading");
    loading.appendChild(document.createElement("div"));
    loading.appendChild(document.createElement("div"));
    document.getElementById("anti_bot_frame").appendChild(loading_area);
    loading_area.appendChild(loading);

    // Hide the refresh button
    var icon = document.getElementById("anti-bot-loading-framework");
    if (document.getElementById("anti_bot_frame").contains(icon)) {
        icon.style.opacity = 0;
    }
    var opacity = 0;
    // Appearing the animation
    appear_loading();

    function appear_loading() {
        opacity = opacity + 0.02;
        loading_area.style.opacity = opacity;
        if (opacity < 0.6) {
            window.requestAnimationFrame(appear_loading);
        } else {
            // Execute if the animation is started.
            setTimeout(function () {
                // If it is still loading after 10 second, the animation would be replaced by a reload button.
                loading_area.removeChild(loading);
                var refresh = document.createElement("div");
                refresh.setAttribute("class", "anti-bot-loading-framework-large");
                refresh.innerHTML = anti_bot_icon;
                refresh.setAttribute("onclick", "anti_bot_reload()");
                loading_area.appendChild(refresh);
            }, 10000);
            if (complete !== null) {
                complete();
            }
        }
    }
}

function anti_bot_end_loading_status(complete) {
    /*
    After calling the function anti_bot_start_loading_status(), this function is used for stops the animation and allows user control the interface.

    Parameter complete should be an function which carry the action that would be execute after the animation is ended.
    If you do not want any action after the animation is started, please put null in parameter.
    * */
    var loading_area = document.getElementById("anti_bot_loading_area");
    var opacity = 0.6;
    var icon = document.getElementById("anti-bot-loading-framework");

    // Appear the small refresh button
    if (document.getElementById("anti_bot_frame").contains(icon)) {
        icon.style.opacity = 1;
    }

    // Remove loading animation
    disappear_loading();

    function disappear_loading() {
        opacity = opacity - 0.02;
        loading_area.style.opacity = opacity;
        if (opacity > 0) {
            window.requestAnimationFrame(disappear_loading);
        } else {
            document.getElementById("anti_bot_frame").removeChild(loading_area);
            if (complete !== null) {
                complete();
            }
        }
    }
}


function anti_bot_shadow_change(item, shadow_size_ini, shadow_size_fin, length_change_for_each_frame, color, complete) {
    /*
    Function anti_bot_shadow_change(): used for change the shadow size for an element.

    Parameter: item is the element which the shadow is going to be change.
    Parameter: shadow_size_ini is the initial size of the shadow, integer type, in px unit.
    Parameter: shadow_size_fin is the final size of the shadow, integer type, in px unit.
    Parameter: length_change_for_each_frame is the length of shadow changed in each frame, integer type, in px unit.
    Parameter: color is the color of the shadow, string type. For example: "#FFF".
    Parameter: complete is the function which would be execute after the shadow is changed. If you don't need this function, please put null.
    * */

    // Store the boolean value into variable.
    var is_increase = shadow_size_ini < shadow_size_fin;

    shadow_down();

    function shadow_down() {
        item.style.boxShadow = "0px 0px " + shadow_size_ini + "px " + shadow_size_ini + "px " + color;
        if (is_increase) {
            // Execute if the shadow needs to be increase the size.
            shadow_size_ini = shadow_size_ini + length_change_for_each_frame;
            if (shadow_size_ini < shadow_size_fin) {
                window.requestAnimationFrame(shadow_down);
            } else {
                if (complete !== null) {
                    complete();
                }
            }
        } else {
            // Execute if the shadow needs to be decrease the size.
            shadow_size_ini = shadow_size_ini - length_change_for_each_frame;
            if (shadow_size_ini > shadow_size_fin) {
                window.requestAnimationFrame(shadow_down);
            } else {
                if (complete !== null) {
                    complete();
                }
            }
        }
    }
}