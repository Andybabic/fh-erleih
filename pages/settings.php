<?php
require_once("../functions/loader.php");
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script type="module" src="../js/modules/Settings.js" defer></script>
    <link rel="stylesheet" href="../style/custom/overview.css">

    <title>Einstellungen</title>
</head>
<body>
<header>
    <?php getModule('menu')?>
</header>
<main>
    <div id="settings">
        <h1>Einstellungen</h1>
        <h2>Bereiche</h2>
        <p>Wähle aus, welche Bereiche du angezeigt haben willst.</p>
        <div class="departmentWrapper"></div>
        <h2>Darstellung</h2>
    </div>

</main>
<footer></footer>
</body>
</html>
