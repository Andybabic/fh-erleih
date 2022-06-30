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
if ($jsonUser["listType"]== "prepare"){
    $StateIsPrepare=true;
}
else{
    $StateIsPrepare=false;
}


?>
<!doctype html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="../style/image/favIcon.svg">
    <title>Checkliste</title>
    <?php require_once("../functions/loader.php");
    getchecklistJS();
    ?>
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
    <div class="uk-container checklistWrapper ">
        <main>
            <div class="orderPersonInformation">
                <h2><?= $jsonUser["firstName"] ?> <?= $jsonUser["lastName"] ?><br> [<span><?= $jsonUser["userId"] ?></span>]</h2>

                <p>Email: <a class="contactLink" href="mailto:<?= $jsonUser["email"] ?>"><?= $jsonUser["email"] ?></a>
                    <br> Tel: <a class="contactLink" href="tel:<?= $jsonUser["tel"] ?>"><?= $jsonUser["tel"] ?></a>

                <p class=" uk-align-left ">am <?= $jsonUser["date"] ?></p>

            </div>
            <hr>

            <!--Start List of Equipment_interact-->
            <div id="checklist_interact">
                <h3> <?=  $StateIsPrepare? "Vorbereitung" : "Rücknahme" ?> </h3>
                <div class="uk-container ">
                    <div role="main" class="ui-content">
                        <?php for($i = 0; $i < count($jsonUser['reservations']) ; ++$i) {
                            $json=json_encode( $jsonUser['reservations'][$i]);
                        $div = "element".$i ?>
                        <div id="<?=$div ?>">

                            <script type="module">
                            import Swipebox from '../js/swipe.js';
                            $("#<?=$div ?>").load("../modules/checklist-element.php", {
                                'json': JSON.stringify(<?=$json?>)
                            }, function() {
                                pageLoadingState.siteloading(<?=$i ?>, <?= count($jsonUser['reservations']) ?>);
                                new Swipebox(document.getElementById(
                                    'swipebox_Object<?=$jsonUser['reservations'][$i]['id']?>'));

                            });
                            </script>
                        </div>
                        <?php } ?>
                    </div>
                </div>
                <button class="uk-button uk-align-right buttonAllObjects returnButton" onclick="checkAllBoxes()">
                <?=  $StateIsPrepare? "Alle Artikel Vorbereiten" : "Alle Artikel Zurücknehmen" ?>
                </button>
                <script>
                function checkAllBoxes() {
                    //set all checkbosex dom  to true
                    for (var i = 0; i < checkboxes_list.length; i++) {
                        checkboxes_list[i].checked = true;

                    }
                    stateComponents.stateManager.set_state(1);
                }
                </script>
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
//init checklist logic
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
        change_text("back", "Zurück");
        change_text("forward", "Abschließen");
        document.getElementById('checklist_interact').style.display = 'none';
        document.getElementById('checklist_proof').style.display = 'block';

    } else if (local_storage == 2) {
        //redirect to overview.php
        if(<?= $StateIsPrepare ? "false" : "true" ?>){
            console.log("true");
            //modal dialog to check if use really wants to take back reservations
            const cancelMessage = `<h2 class="uk-text-large">Markierte Elemente zurücknehmen</h2><p>Bist du sicher, dass du alle ausgewählten Elemente zurücknehmen möchtest?</p>`

            const modal = UIkit.modal.confirm(cancelMessage, {"stack":true});
            const element = modal.dialog.$el;
            const cancelButton = element.querySelector(".uk-modal-close");
            const proceedButton = element.querySelector(".uk-button-primary");
            cancelButton.innerText = "Abbrechen";
            proceedButton.innerText = "Zurücknehmen";
            element.querySelector(".uk-modal-footer").classList.add("footerBtnWrapper");
            modal.then(async (e) => {

                await closeReservation();
                localStorage.setItem('Site_state', 0);
                window.location.href = "../pages/overview.php";

            }, function () {
                stateComponents.stateManager.set_state(-1);
                console.log('Rejected.');
            });
        }


    }


}
localStorage.setItem('Site_state', 0);

updateStateContent();
build_proofing_list();

async function closeReservation(isReturn, allItems) {

    //for all addCheckbox_list.checked = true
    let answers = [];
    for (var i = 0; i < checkboxes_list.length; i++) {
        // if checkboxes_list[i].checked or !allItems
        console.log("checkbox",checkboxes_list[i]);

        if (checkboxes_list[i].checked) {
            // make post request to url with array


            jsondata = JSON.stringify([checkboxes_list[i].value]);
            const apianswer = await ajax.takeBackRes(jsondata);
            answers.push(apianswer);
        }

    }
    localStorage.takeBackAnswer = JSON.stringify(answers);
}


// replace html 
</script>


</html>