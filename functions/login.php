
<?php

//session_start();
session_id($_COOKIE['PHPSESSID']);

// get config.php file from server
$config_file = require_once("../config.php");
//require_once("../functions/loader.php");

//api url
$api_url = $config_api_url;
$headercockie = null;


// 
// $url = "util/login";
function auth_rest($api_url , $user, $password, $cockie){
                    $url = $api_url . "util/login";
                    $data = array(
                        'usrname' => $user,
                        'pwd' => $password
                    );
                        $options = array(
                            'http' => array(
                            //'header'  => "Content-type: application/json\r\n",
                            'header'  => "Cookie: PHPSESSID=".$cockie."\r\n"."Content-type: application/json\r\n",
                            'method'  => 'POST',
                            'content' => json_encode($data),
                            'ignore_errors' => true,
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
                        //header("Location: ../pages/login.php?state=error");
                        return false;
                    }
                    else {

                        global $headercockie;
                        $headercockie= $status_data[8];
                        return $session['type'];
                        
                    }
}


//get login data from pages/login and do a rest request to the server
if(isset($_POST['username']) && isset($_POST['password'])  ){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $cockie= $_COOKIE['PHPSESSID'];
    $result = auth_rest($api_url , $username, $password, $cockie);
    
    if ($result) {
        if ($result == 1 ) {
            header($headercockie);
            session_id($_COOKIE['PHPSESSID']);
            session_start();
            //header($headercockie);
           
           
            
                echo('hallo');
                $_SESSION['username'] = $username;
                $_SESSION['login'] = 1;
                
                header("Location: ../pages/login.php");

                //echo($headercockie);
   


        }
        //placeholder
        elseif ($result == 2) {

            $_SESSION['username'] = $username;
            $_SESSION['login'] = 2;
     
            header("Location: ../pages/login.php?state=error");

        }


        else {
            //header("Location: ../index.php");
        }
       //create session

   }
    else {
        header("Location: ../pages/login.php?state=error");
        
   }

    // redirect to home page
    
    
} else {
    //echo "no login data";
    header("Location: ../pages/login.php?state=error");
    
}



?>



