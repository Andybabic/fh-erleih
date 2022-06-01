<?php
//session_start();
$headercockie=  getallheaders()["Cookie"] ;

session_start();
$data = $_POST['data']??"";

//if data is empty, then redirect to overview
if(empty($data)){
    header("Location: overview.php");
    exit();
}




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
            return $session;
        }
        else {
            //set rest session to local session
            return $session;
        }
    }


function getResdata($id ){
    $data=call('https://verleihneu.fhstp.ac.at/api/reservierung/'.$id.'/?expandKeys=true','');
    return $data;
}



function packlist($id){
    $data=call('https://verleihneu.fhstp.ac.at/api/equipment/'.$id.'/packliste/','');
    //$data= [];
    return $data;
}

function timeCon($datetime){
    $date = new DateTime($datetime);
    return $date->format('d.m.Y');
}



//convert Json to Array
$jsonUser = json_decode($data?? "{}", true);


?>
<!doctype html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">


    <title>Checkliste</title>
    <?php require_once("../functions/loader.php");?>
</head>


<script>
var checkboxes_list = []


function addCheckbox_list(resID = null, parent = null, status = false, typeData = null, resData = null) {

    // var fuckbool = (this.status === 'true')
    //    console.log(status);
    //    console.log(resID);
    checkboxes_list.push({
        value: resID,
        parent: parent,
        checked: status,
        typeData: this.typeData,
        resData: this.resData


    });
}
</script>



<body>
    <?php getModule('menu')?>
    <!--User Data-->
    <div class="uk-container ">
        <main>
            <div class="orderPersonInformation">
                <h2 ><?= $jsonUser["firstName"] ?> <?= $jsonUser["lastName"] ?>
                    <?= $jsonUser["userId"] ?></h2>
                <p >Email: <a class="contactLink"
                        href="mailto:<?= $jsonUser["email"] ?>"><?= $jsonUser["email"] ?></a>
                    <br> Tel: <a  class="contactLink" href="tel:<?= $jsonUser["tel"] ?>"><?= $jsonUser["tel"] ?></a>

                <p class=" uk-align-left ">am <?= $jsonUser["date"] ?></p>
                <p class=" uk-align-right"> Video</p>
            </div>
            <hr>

            <!--Start List of Equipment_interact-->
            <div id="checklist_interact">
                <div class="uk-container ">
                    <div role="main" class="ui-content">
                        <?php for($i = 0; $i < count($jsonUser['reservations']) ; ++$i) {
                            $json=json_encode( $jsonUser['reservations'][$i]);
                        $div = "element".$i ?>
                        <div id="<?=$div ?>">

                            <script>
                            $("#<?=$div ?>").load("../modules/checklist-element.php", {
                                'json': JSON.stringify(<?=$json?>)
                            }, function() {

                                pageLoadingState.siteloading(<?=$i ?>, <?= count($jsonUser['reservations']) ?>);
                            
                            });
                            </script>
                            <script type="module">
                            import Swipebox from '../js/swipe.js';
                            new Swipebox(document.getElementById( 
                                    'swipebox_Object<?=$jsonUser['reservations'][$i]['id']?>'));

                            
                            </script>
                        </div>
                        <?php } ?>

                    </div>
                </div>




            </div>
            <!--End List of Equipment_interact-->
            <!--Start List of Equipment_proof-->
            <div id="checklist_proof">
                <?php  include '../modules/checklist-element_proofing.php'?>
            </div>
            <!--End List of Equipment_proof-->

        </main>

    </div>
    <?php getModule('bottom-navbar')?>
</body>

<script>
// example structure checklistComponents

let checklistComponents = {};


checklistComponents.checklist = (function() {
    let priv = {},
        publ = {};

    var checkboxelementsAdded = [];
    var checkboxelements;


    priv.send = function(jsondata, curl) {
        // make post request to url with array
        url = "../functions/callAPI.php?r=reservierung/vorbereiten/";

        jsondata = JSON.stringify([jsondata]);
        $.ajax({
            type: 'POST',
            url: url,
            dataType: "JSON",
            data: {
                curl: curl,
                data: jsondata
            },
            success: function(msg) {
            },

        });
    }



    publ.updateEventListener = function() {
        checkboxelements = document.getElementsByClassName('checklist-checkbox');
        for (var i = 0; i < checkboxelements.length; i++) {
            //if checkboxelements not in checkboxelementsAdded do
            if (!checkboxelementsAdded.includes(checkboxelements[i])) {
                //add checkboxelements to checkboxelementsAdded
                checkboxelementsAdded.push(checkboxelements[i]);
                checkbox = checkboxelements[i];
                var value = this.value;
                var checklistelement = priv.getCheckbox_array(checkbox.value)
                var checkstatus = checklistelement;
                checkbox.checked = checkstatus;
                checkbox.addEventListener('click', function() {

                    //add data post request
                    var value = this.value;

                    jsondata = value;
                    priv.updateaddCheckbox_list(value,this.checked)
                    if (this.checked) {
                        //send to api that rentry is done or not
                        console.log('post');
                        priv.send(jsondata, "POST");
                    } else {
                        //send to api that rentry is done or not
                        console.log('delete');
                        priv.send(jsondata, "DELETE");
                    }
                    var parent = priv.getParent(value);
                    if (parent) {
                        priv.changeState(parent);
                    }
                    priv.update()
                });
            }
        }
    }



    publ.init = function() {

    }
    priv.getParent = function(value) {
        for (var i = 0; i < checkboxes_list.length; i++) {
            if (checkboxes_list[i].value == value) {
                return checkboxes_list[i].parent;
            }
        }
    }
    priv.update = function() {
        for (var i = 0; i < checkboxelements.length; i++) {
            checkboxes_list[i].checked = checkboxelements[i].checked;
        }
    }


    //check state of all childs
    priv.checkChilds = function(parent) {
        for (var i = 0; i < checkboxes_list.length; i++) {
            if (checkboxes_list[i].parent == parent) {
                if (checkboxelements[i].checked == false) {
                    return false;
                }
            }
        }
        return true;
    }


    priv.getCheckbox_array = function(value) {

        for (var i = 0; i < checkboxelements.length; i++) {
            if (checkboxes_list[i].value == value) {
                return checkboxes_list[i].checked;

            }
        }
    }


    // get checkboxelements with ( value )
    priv.getCheckbox = function(value) {
        for (var i = 0; i < checkboxelements.length; i++) {
            if (checkboxes_list[i].value == value) {
                return checkboxelements[i];
            }
        }
    }

    priv.updateaddCheckbox_list = function(value,status) {
        for (var i = 0; i < checkboxelements.length; i++) {
            if (checkboxes_list[i].value == value) {
                checkboxes_list[i].checked = status;
                
            }
        }
    }

    

    return publ;
})();


checklistComponents.checklist.init();
pageLoadingState.siteloading_check(checklistComponents.checklist.updateEventListener);
</script>





<script>
//change a text in the html
function change_text(id, text) {
    document.getElementById(id).innerHTML = text;
}

function updateStateContent() {
    //get eventlistener to local_storage Site_state , if it 1 then show 'checklist_interact' else show 'checklist_proof'
    var local_storage = localStorage.getItem('Site_state');
    if (local_storage < 0) {
        // save to local storage
        localStorage.setItem('Site_state', 0);
        //redirect to overview.php
        window.location.href = "../pages/overview.php";
    } else if (local_storage == 0) {

        change_text("back", "Übersicht");
        change_text("forward", "Weiter");
        document.getElementById('checklist_interact').style.display = 'block';
        document.getElementById('checklist_proof').style.display = 'none';
    } else if (local_storage == 1) {
        build_proofing_list();
        change_text("back", "Bearbeiten");
        change_text("forward", "Abschließen");
        document.getElementById('checklist_interact').style.display = 'none';
        document.getElementById('checklist_proof').style.display = 'block';

    } else if (local_storage == 2) {
        localStorage.setItem('Site_state', 0);
        //redirect to overview.php
        window.location.href = "../pages/overview.php";

    }


}
localStorage.setItem('Site_state', 0);

updateStateContent();
build_proofing_list();



// replace html 
</script>


</html>