<?php
if(isset($_POST["data"])){
    session_start();


    $equipmentData = json_decode($_POST["data"]);
    $typeData = clone $equipmentData->typeId;

    unset($equipmentData->typeId);
    $equipmentData = $equipmentData;
}else{
    header("Location:overview.php");
    exit();
}

//print jason as table

function phpObjToTable ($data)
{
    $table = '
    <table class="uk-table uk-table-divider">
    ';
    foreach ($data as $key => $value) {
        $table .= '
        <tr>
        ';
        if ( ! is_numeric($key)) {
            $table .= '
            <td> '. $key .' </td>
            <td>
            ';
        } else {
            $table .= '
            <td>
            ';
        }
        if (is_object($value) || is_array($value)) {
            $table .= phpObjToTable($value);
        } else {
            $table .= $value;
        }
        $table .= '
            </td>
        </tr>
        ';
    }
    $table .= '
    </table>
    ';
    return $table;
}

?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Equipment Details</title>
    <?php require_once("../functions/loader.php");?>
</head>
<body>
    <header>
        <?php getModule('menu')?>
    </header>
    <main class="uk-padding-small backButton uk-width-3-5@l uk-width-4-5@m uk-width-4-5@s uk-align-center">
        <button class="uk-button colorSecondary">Zurück</button>
        <h1 class="uk-text-large"><?= $typeData->nameDe . " " . $equipmentData->nameDe ?></h1>
        <h2 class="uk-heading-bullet uk-text-large">Typ</h2>
        <?=phpObjToTable($typeData)?>
        <h2 class="uk-heading-bullet uk-text-large"><span></span>Equipment</h2>
        <?=phpObjToTable($equipmentData)?>
    </main>
</body>
</html>
