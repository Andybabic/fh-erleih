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
    <title>Scan</title>
</head>
<body>
    <header></header>
    <main>
        <button type="button">Hallo bitte mich drücken für einen neuen NFC-Tag, danke bussi und baba. LG</button>
    </main>
    <footer>
        <?php getModule('modeSwitch')?>
    </footer>
</body>
</html>
