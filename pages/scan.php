<?php
session_start();

//load all CSS and JS and modules
require_once("../functions/loader.php");
?>
<!doctype html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../style/custom/style.css">
    <title>Scan</title>
</head>

<body>
<header>

    <?php getModule('menu') ?>
</header>
<main>

    <?php getModule('scanSearch') ?>

    <div class="uk-height-medium">
        <div class="uk-height-1-1 ">

        </div>
    </div>
</main>


</body>

</html>