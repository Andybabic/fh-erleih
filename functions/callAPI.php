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

    $url = $url;
    $options = array(
            'http' => array(
            'header'  => "Cookie: ".getallheaders()["Cookie"]."\r\n"."Content-type: application/json\r\n",
            'method'  => $curl,
            'content' => $data,
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
        echo( "fuck you:");
        echo( "<br>");
        echo(var_dump($data));
        echo($status);
        echo( "<br>");
        echo($url);
        echo( "<br>");
        echo($curl);
        echo( "<br>");
        //$json = json_decode($_POST['data']);
        //var_dump($json);

        return $session;
    }
    else {
        //set rest session to local session
        echo(json_encode($session));
    }
}



if(isset($_GET['r']) ){
        $api = $_GET['r'];  
    }
if(isset($_POST['r']) ){
        $api = $_POST['r'];
    }

$curl= isset($_GET['curl']) ? $_GET['curl'] : 'GET';
if(isset($_POST['curl']) ){
    $api = $_POST['curl'];
}

if(isset($_POST['data']) ){
            $data = $_POST['data'];
            $result = call($api_url.$api,$data,$curl);      
}else{
            $result = call($api_url.$api,'',$curl);
}

// if (!$result){
//     echo "No Data";
// }else{
    echo($result);

// }
       
    


?>