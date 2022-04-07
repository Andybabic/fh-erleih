<?php
session_start();


//load all CSS and JS and modules
require_once("../functions/loader.php");

//echo($_SESSION['username']);
//echo(session_id());


?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Übersicht</title>
    <?php require_once ("../modules/import-datepicker.php") ?>
    <link rel="stylesheet" href="../style/custom/overview.css">
</head>
<body id="page-overview" >
    <header>
        <?php getModule('menu')?>
    </header>
    <main>
        <?php getModule('filterableList')?>
    </main>
    <footer>
        <?php getModule('modeSwitch')?>
    </footer>
</body>



<script>
    var json = $.getJSON("/functions/callAPI.php?r=/user/&c");
    console.log(json);
</script>



</html>
