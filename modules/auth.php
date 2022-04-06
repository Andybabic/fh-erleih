<?php

function auth($api_url,$cockie){
        $url = $url+"/util/checkAuth/";
        $options = array(
            'http' => array(
            'method'  => 'GET',
            'content' => '',
            'ignore_errors' => true,
            'header' => "Cookie: PHPSESSID=".$cockie['PHPSESSID']."\r\n"."Content-type: application/json\r\n",
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
            return false;
        }
        else {
            //set rest session to local session
            return true;
        }

    }

    ?>