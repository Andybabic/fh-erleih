<?php
//session_start();
$headercockie=  getallheaders()["Cookie"] ;


//$data = $_POST['data'];
$data = '{"userId":"mt191075","firstName":"Babic","lastName":"Andreas","email":"mt191075@fhstp.ac.at","tel":"06641681540","date":"2022-03-31 21:01:21","reservations":[{"id":500834,"lastChange":"2022-03-31 21:01:21","userId":"mt191075","equipId":1795,"statusId":2,"from":"2022-03-31 21:01:21","to":"2022-04-02 21:01:21","userComment":"Selbststudium","assiComment":"","lendDate":"0000-00-00 00:00:00","returnDate":"0000-00-00 00:00:00","assiLend":null,"assiReturn":null,"usageId":8,"prepared":0,"departmentId":"2"},{"id":500833,"lastChange":"2022-03-31 21:01:21","userId":"mt191075","equipId":6666,"statusId":2,"from":"2022-03-31 21:01:21","to":"2022-04-02 21:01:21","userComment":"Selbststudium","assiComment":"","lendDate":"0000-00-00 00:00:00","returnDate":"0000-00-00 00:00:00","assiLend":null,"assiReturn":null,"usageId":8,"prepared":0,"departmentId":"3"}],"listType":"prepare"}';




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

    <body>
        <!--User Data-->

        <div class="uk-container">
            <main>
                <article class="uk-article">
                    <h4 class="uk-text-lead"><?= $jsonUser["firstName"] ?> <?= $jsonUser["lastName"] ?>  <?= $jsonUser["userId"] ?></h4>
                    <p class="uk-text-lighter">Email: <a href= "mailto:<?= $jsonUser["email"] ?>"><?= $jsonUser["email"] ?></a>
                    <br> Tel: <a href= "tel:<?= $jsonUser["tel"] ?>"><?= $jsonUser["tel"] ?></a>
                       
                    <p class="uk-text-light uk-align-left ">am <?= $jsonUser["date"] ?></p>
                    <p class="uk-text-light uk-align-right"> Video</p>
                </article>
                <hr>
                <!--Start List of Equipment-->
                <div class="uk-container ">
                    <div role="main" class="ui-content">
                        <ul data-role="listview">
                            <?php 
                            
                            //generate a html element for each entry in the array
                            for($i = 0; $i < count($jsonUser['reservations']) ; ++$i) {
                                $data= dings($jsonUser['reservations'][$i]['equipId']);
                               
                                ?>
                     
                                    <!---Start Equipment Card element--->
                                    <div  class="uk-card uk-card-body  space-between-list grid-100 uk-flex-inline blue-20 swipebox" >
                                        <div class="checkListbutton">
                                            <input class="checklist-checkbox" type="checkbox" value="<?=$data['typeId']?>" >
                                        </div>
                                        <div class="grid-100 ">
                                            <h3 class="uk-text-lead "><?=$data["nameDe"]?> <p class="uk-text-lighter uk-display-inline"> id:<?=$data["typeId"]?></p></h3>
                                            <div class="uk-align-left ">
                                                <p><?=$data["damage"]?></p>
                                            </div>
                                            <div class="uk-align-left ">
                                                <p><?=$data["nameDe"]?></p>
                                            </div>


                                                <!---Packliste--->
                                                    <!---Start PHP LOOP--->  
                                                    <?php     $packlist = packlist($data['id']);
                                    
                                                        if (count($packlist) == 0) {

                                                        }
                                                        else {?>
                                                                <div class="grid-100 uk-align-left"   >
                                                                        <hr class="uk-divider-vertical uk-align-left custom_HR ">
                                                                            <div class="uk-text-large nospace-up">Packliste</div>
                                                                            <ul>
                                                                            
                                                                                <?php  for($item = 0; $item < count($packlist) ; ++$item) { ?>
                                                                                        <li>
                                                                                            <label>
                                                                                                <input value="<?=$packlist[$item]['nameDe']?>" class="checklist-checkbox" type="checkbox"> <?=$packlist[$item]['nameDe']?> </input>
                                                                                            </label>
                                                                                        </li>
                                                                                        <?php } ?>
                                                                            </ul>
                                                                </div>                
                                                    <?php  } ?>
                                                    <!---End PHP LOOP--->
                                                <!---End Packliste--->
                                            
                                        </div>
                                    </div>
                                    <!---End Equipment Card element--->

                            <?php } ?>
                        </ul>
                    </div>
                </div>
                
            </main>
             
        </div>


        <?php getModule('bottom-navbar')?>
       

   

    </body>
    


    


    <script >
        var done = [];
        var checkboxesArray = document.querySelectorAll('.checklist-checkbox');
        //create a list of all checkboxes
        var checkboxes = document.querySelectorAll('.checklist-checkbox');
        // print value of checkbox
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('change', function() {
                console.log(this.value);
                //check if checkbox is checked whenn false, add to done array
                if (!this.checked) {
                    done.push(this.value);
                }
                //check if checkbox is unchecked whenn true, remove from done array
                else {
                    var index = done.indexOf(this.value);
                    if (index > -1) {
                        done.splice(index, 1);
                    }
                }
                console.log(checkboxesArray);
                console.log(done);

            });
        }



        //redirect to next page with post parameters
        function nextPage(params) {
            var url = "checklist-2.php";
            var params = {
                "data": 'Hallo Welt'
            };
            var form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", url);

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", params[key]);

                    form.appendChild(hiddenField);
                }
            }
            document.body.appendChild(form);
            form.submit();
        }
   
        //create a box that can be swipe to the left
        var box = document.querySelector('.swipebox');
        var hammertime = new Hammer(box);

 
   

    </script>


</html>
