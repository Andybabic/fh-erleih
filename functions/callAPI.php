<?php

// get config.php file from server
$config_file = require_once("../config.php");

//api url
$api_url = $config_api_url;


// zum beispiel $url = "util/login";
function call($api_url ,$api, $call){
    $url = $api_url . $api;
    $data = $call;
    $options = array(
            'http' => array(
            'method'  => 'GET',
            'content' => json_encode($data),
            'ignore_errors' => true,
            //"\r\n","Content-type: application/json\r\n"
            'header' => "Cookie: PHPSESSID=".$_COOKIE['PHPSESSID']."\r\n"."Content-type: application/json\r\n",
            )
    );
    
    $context  = stream_context_create($options);
    $result = file_get_contents( $url, false, $context );
    // get sassion from request
    $session = json_decode($result, true);

    $status_data = $http_response_header;
    $status_line = $http_response_header[0];

    preg_match('{HTTP\/\S*\s(\d{3})}', $status_line, $match);

    $status = $match[1];

    if ($status !== "200") {
         return "Sorry du hast keine Berechtigungen";

    }
    else {
        //set rest session to local session
        return var_dump($session);

    }

}


if(isset($_GET['r']) && isset($_GET['c'])){
    $api = $_GET['r'];
    $call = $_GET['c'];


    $result = call($api_url , $api, $call);
    echo($result);


    
    
} else {
    echo "No Data";


}







?>