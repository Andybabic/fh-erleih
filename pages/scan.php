<?php
session_start();

//load all CSS and JS and modules
require_once("../functions/loader.php");
?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../style/custom/style.css">
    <title>Scan</title>
</head>
<body>
    <header>

            <?php getModule('menu') ?>
    </header>
    <main>
        <div uk-grid>
            <div class="uk-position-center">
                    <img src="../style/image/Scanpic.svg" >
             </div>
        </div>
    </main>
    <footer class="uk-position-bottom uk-width-1-1" >
        <?php getModule('modeSwitch')?>
    </footer>
</body>
</html>
