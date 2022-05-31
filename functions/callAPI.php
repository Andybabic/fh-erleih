<?php
// get config.php file from server
$config_file = require_once("../config.php");

//api url
$api_url = $config_api_url;
$headercockie=  getallheaders()["Cookie"] ;




// zum beispiel $url = "util/login";
function call($url,$data,$curl ){
    global $headercockie;
    //if is set Post[data] send data to api else empty data
    $encoded = json_encode($data);

    $url = $url;
    $options = array(
        'http' => array(
            'header'  => "Cookie: ".getallheaders()["Cookie"]."\r\n"."Content-type: application/json\r\n",
            'method'  => $curl,
            'content' => $encoded,
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
        header($match[0]);
       return (var_dump($encoded));
        
        return false;
    }
    else {
        //set rest session to local session
        echo(json_encode($session));
    }
}


$api = "";
if(isset($_GET['r']) ){
    $result = "get";
    $api = $_GET['r'];
}
if(isset($_POST['r']) ){
    $api = $_POST['r'];
}

$curl= isset($_GET['curl']) ? $_GET['curl'] : 'GET';
if(isset($_POST['curl']) ){
    $curl = $_POST['curl'];
}

if(isset($_POST['data']) ){
    $data = json_decode($_POST['data'], true);
    $result = call($api_url.$api,$data,$curl);
}else{
    $result = call($api_url.$api,'',$curl);
}

echo $result;
//die();






?>