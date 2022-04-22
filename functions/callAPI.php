<?php

// get config.php file from server
$config_file = require_once("../config.php");

//api url
$api_url = $config_api_url;
$headercockie=  getallheaders()["Cookie"] ;


// zum beispiel $url = "util/login";
function call($url,$data ){
    global $headercockie;

    $url = $url;
    $options = array(
            'http' => array(
            'header'  => "Cookie: ".getallheaders()["Cookie"]."\r\n"."Content-type: application/json\r\n",
            'method'  => 'GET',
            'content' => json_encode($data),
            'ignore_errors' => true,
            )
        );
    
    $context  = stream_context_create($options);
    $result = file_get_contents( $url, true, $context );
    // get sassion from request
    $session = json_decode($result, true);

    $status_data = $http_response_header;
    $status_line = $http_response_header[0];

    preg_match('{HTTP\/\S*\s(\d{3})}', $status_line, $match);

    $status = $match[1];

    if ($status !== "200") {
        echo($url);
        echo('<br>');
        echo($status);
        echo( "Sorry du hast keine Berechtigungen");
        echo('<br>');
        echo($headercockie);
        echo('<br>');
        echo(var_dump($status_data[8]));
        return $session;
    }
    else {
        //set rest session to local session
        echo(json_encode($session));
    }
}


if(isset($_GET['r']) ){
    $api = $_GET['r'];
    // if(isset($_GET['data']) ){
    //     $data = $_GET['data'];
    //     $result = call($api_url.$api,$data);
    // }
    // else{
    //     $result= call($api_url.$api, '');
    // }
    $result= call($api_url.$api, '');
    echo($result);


    
    
} else {
    echo "No Data";


}







?>