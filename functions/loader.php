<?php






//get current directory by domain relative to php file
$current_dir = dirname($_SERVER['PHP_SELF']);
//count the number of slashes in the current directory
$count_slashes = substr_count($current_dir, "/");
$path= "../";
//get the path to the root directory
for ($i = 1; $i < $count_slashes; $i++) {
    $path = $path."../";
}





//load global files
echo (  " <link rel='stylesheet' href='".$path."style/uikit/css/uikit-rtl.min.css'> ");
echo (  " <link rel='stylesheet' href='".$path."style/uikit/css/uikit.min.css'> ");
echo (  " <link rel='stylesheet' href='".$path."style/datepicker/datepicker.material.css'> ");
echo (  " <script src='".$path."/js/jquery-3.6.0.min.js'></script>");
echo (  " <script defer type='module' src='".$path."js/classes/General.js'></script> ");
echo (  " <script defer src='".$path."style/uikit/js/uikit.min.js'></script> ");
echo (  " <script defer src='".$path."style/uikit/js/uikit-icons.min.js'></script> ");
echo (  " <script src='".$path."js/pageload.js'></script> ");
echo (  " <script defer type='module' src='".$path."js/swipe.js'></script> ");

echo (  " <script defer src='".$path."style/datepicker/datepicker.js'></script> ");




///Cutom CSS
echo (  " <link rel='stylesheet' href='".$path."style/custom/style.css'> ");
//echo (" <script defer src='".$path."js/jquery-3.6.0.min.js'></script>");
//echo (" <script defer src='".$path."js/classes/Ajax.js'></script>");
echo('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>');

// use getMoldule to load 
function getModule( $modul){
    global $path;
    $load = $path."modules/".$modul.".php";
    include $load;
}


function getLink($link){
    global $path;
    return $path."functions/".$link.".php";
}



    



?>