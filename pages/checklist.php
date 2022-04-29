<?php
//session_start();
$headercockie=  getallheaders()["Cookie"] ;


$data = $_POST['data'];
#$data = '{"userId":"mt191075","firstName":"Babic","lastName":"Andreas","email":"mt191075@fhstp.ac.at","tel":"06641681540","date":"2022-03-31 21:01:21","reservations":[{"id":500834,"lastChange":"2022-03-31 21:01:21","userId":"mt191075","equipId":1795,"statusId":2,"from":"2022-03-31 21:01:21","to":"2022-04-02 21:01:21","userComment":"Selbststudium","assiComment":"","lendDate":"0000-00-00 00:00:00","returnDate":"0000-00-00 00:00:00","assiLend":null,"assiReturn":null,"usageId":8,"prepared":0,"departmentId":"2"},{"id":500833,"lastChange":"2022-03-31 21:01:21","userId":"mt191075","equipId":6666,"statusId":2,"from":"2022-03-31 21:01:21","to":"2022-04-02 21:01:21","userComment":"Selbststudium","assiComment":"","lendDate":"0000-00-00 00:00:00","returnDate":"0000-00-00 00:00:00","assiLend":null,"assiReturn":null,"usageId":8,"prepared":0,"departmentId":"3"}],"listType":"prepare"}';




require_once("../functions/loader.php");
?>
<?php

    function call($url,$json ){
        global $headercockie;

        $url = $url;
        $options = array(
                'http' => array(
                'header'  => "Cookie: ".$headercockie."\r\n"."Content-type: application/json\r\n",
                'method'  => 'GET',
                'content' => json_encode($json),
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
            echo( "Sorry du hast keine Berechtigungen");
            echo('<br>');
            echo($headercockie);
            echo('<br>');
            echo(var_dump($status_data[8]));
            return $session;
        }
        else {
            //set rest session to local session
            return $session;
        }
    }


function dings($id){
        $data=call('https://verleihneu.fhstp.ac.at/api/equipment/'.$id.'/','');
        return $data;
}

function packlist($id){
    $data=call('https://verleihneu.fhstp.ac.at/api/equipment/'.$id.'/packliste/','');
    return $data;
}

function timeCon($datetime){
    $date = new DateTime($datetime);
    return $date->format('d.m.Y');
}

function user($id){
    $data=call('https://verleihneu.fhstp.ac.at/api/user/'.$id.'/','');
    return $data;
}
function status($id){
    $data=call('https://verleihneu.fhstp.ac.at/api/reservierung/'.$id.'/','');
    return $data['prepared'];
}




$jsonUser =$_POST['data'];

//convert Json to Array
$jsonUser = json_decode($data, true);








?>
<!doctype html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">


    <title>Checkliste</title>

</head>

<?php getModule('menu')?>



<body>

    <body >
        <!--User Data-->

        <div class="uk-container " >
            <main>
                <article class="uk-article">
                    <h4 class="uk-text-lead"><?= $jsonUser["firstName"] ?> <?= $jsonUser["lastName"] ?>  <?= $jsonUser["userId"] ?></h4>
                    <p class="uk-text-lighter">Email: <a href= "mailto:<?= $jsonUser["email"] ?>"><?= $jsonUser["email"] ?></a>
                    <br> Tel: <a href= "tel:<?= $jsonUser["tel"] ?>"><?= $jsonUser["tel"] ?></a>
                       
                    <p class="uk-text-light uk-align-left ">am <?= $jsonUser["date"] ?></p>
                    <p class="uk-text-light uk-align-right"> Video</p>
                </article>
                <hr>
                
                <!--Start List of Equipment_interact-->
                <div id="checklist_interact" >
                <?php  include '../modules/checklist-element.php'?>
                </div>
                <!--End List of Equipment_interact-->
                 <!--Start List of Equipment_proof-->
                <div id="checklist_proof"  >
                <?php  include '../modules/checklist-element_proofing.php'?>
                </div>
                <!--End List of Equipment_proof-->

            </main>
             
        </div>


        <?php getModule('bottom-navbar')?>
       

   

    </body>
    


    


    <script >
        

        //change a text in the html
        function change_text(id, text)
        {
            document.getElementById(id).innerHTML = text;
        }



        function updateStateContent(){
            //get eventlistener to local_storage Site_state , if it 1 then show 'checklist_interact' else show 'checklist_proof'
            var local_storage = localStorage.getItem('Site_state');
            console.log("State: " + local_storage);
            if (local_storage < 0) {
                // save to local storage
                localStorage.setItem('Site_state', 0);
                //redirect to overview.php
                window.location.href = "../pages/overview.php";
            } 
            else if (local_storage == 0) {
                
                change_text("back","Zurück zur Übersicht");
                change_text("forward","Weiter");
                document.getElementById('checklist_interact').style.display = 'block';
                document.getElementById('checklist_proof').style.display = 'none';
            } 
            else if (local_storage == 1) {
                change_text("back","Bearbeiten");
                change_text("forward","Abschließen");
                document.getElementById('checklist_interact').style.display = 'none';
                document.getElementById('checklist_proof').style.display = 'block';
            }


          }
        localStorage.setItem('Site_state', 0);
        
        updateStateContent();

   

    </script>


</html>
