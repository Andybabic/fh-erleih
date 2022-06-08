<div class="checklist" data-role="listview">
    <?php
    $headercockie = getallheaders()["Cookie"];
    function call($url, $json)
    {

        global $headercockie;


        $url = $url;
        $options = array(
            'http' => array(
                'header' => "Cookie: " . $headercockie . "\r\n" . "Content-type: application/json\r\n",
                'method' => 'GET',
                'content' => json_encode($json),
                'ignore_errors' => true,
            )
        );

        $context = stream_context_create($options);
        $result = file_get_contents($url, true, $context);
        // get sassion from request
        $session = json_decode($result, true);

        $status_data = $http_response_header;
        $status_line = $http_response_header[0];

        preg_match('{HTTP\/\S*\s(\d{3})}', $status_line, $match);

        $status = $match[1];

        if ($status !== "200") {
            return $session;
        } else {
            //set rest session to local session
            return $session;
        }
    }

    function getResdata($id)
    {
        $data = call('https://verleihneu.fhstp.ac.at/api/reservierung/' . $id . '/?expandKeys=true', '');
        return $data;
    }

    function packlist($id)
    {
        $data = call('https://verleihneu.fhstp.ac.at/api/equipment/' . $id . '/packliste/', '');
        //$data= [];
        return $data;
    }


    $jsonUser = json_decode($_POST['json'], true);


    //generate a html element for each entry in the array

    $resData = getResdata($jsonUser['id']);
    $data = $resData['equipId'];
    $status = ($resData['prepared']);
    $resID = $jsonUser['id'];
    $typData = $resData['equipId']['typeId'];
    $equipData = json_encode($data);
    $description = $typData["descriptionDe"];
    $description2 = ($data["descriptionDe"]);
    //convert typData to json
    $typDataJson = json_encode($typData);
    $assiComment = $resData['assiComment'];

    ?>


    <div class="Swipe_container  grid-100 ">
        <div class=" swipe_box_back" data-resId="<?= $resID ?>" data-eqId="<?= $jsonUser['equipId'] ?>">
            <div class=" uk-align-right btn-checklist colorSecondary uk-animation-slide-left-small" data-type="extend">
                <span class="center-all uk-animation-slide-left-small " uk-icon="icon: future; ratio: 1.5"></span>
            </div>
            <?php if (true) : ?>
            <div class=" uk-align-right btn-checklist bg-orange uk-animation-slide-left-small" data-type="report">
                <span class="center-all uk-animation-slide-left-small" uk-icon="icon:  comments; ratio: 1.5"></span>
            </div>
            <?php endif; ?>
            <div class=" uk-align-left btn-checklist colorSecondary uk-animation-slide-left-small" data-type="extend">
                <span class="center-all uk-animation-slide-left-small " uk-icon="icon: future; ratio: 1.5"></span>
            </div>
            <div class=" uk-align-left btn-checklist bg-orange uk-animation-slide-left-small" data-type="report">
                <span class="center-all uk-animation-slide-left-small" uk-icon="icon: comments; ratio: 1.5"></span>
            </div>
        </div>


        <!--SWIPEBOX Foreground element-->
        <div id="swipebox_Object<?= $resID ?>" class="swipebox_Object  swipe_box uk-animation-slide-left"
            style=" z-index: 1;">

            <!--Start Equipment Card element-->
            <div
                class="uk-card uk-card-body space-between-list grid-100 uk-flex-inline colorBackgroundGrey uk-object-position-top-center uk-padding-small">
                <div class="checkListbutton ">

                    <script>
                    addCheckbox_list(resID = '<?=$resID?>', parent = false, status = <?=$status ? 'true' : 'false'?>,
                        typeData =
                        <?=$typDataJson?>, resData = <?=$equipData?>);
                    </script>
                    <!-- set state of checkbox -->

                    <input class="checklist-checkbox parent" type="checkbox" <?= ($status) ? "checked" : "" ?>
                        id="<?= $resID ?>" value="<?= $resID ?>">


                </div>
                <div class="grid-100 ">

                    <label for="<?= $resID ?>">
                        <h4 class="uk-margin-remove-bottom"><?= $typData["nameDe"] ?><span> [<?= $data["nameDe"] ?>]</span></h4>

                    </label>


                    <p class="uk-text-small uk-text-muted  toTop"><?= $assiComment ?></p>

                    <button href="#toggle-animation<?= $resID ?>" class="iconInformation toggleHandle" uk-toggle="target: #toggle-animation<?= $resID ?>; animation: uk-animation-fade">
                        <span class="showDetailText turnToggleButton">Details anzeigen
                            <span class="showDetailButton"><svg xmlns="http://www.w3.org/2000/svg" width="34.875" height="34.875" viewBox="0 0 34.875 34.875">
                            <path id="Icon_awesome-arrow-circle-down" data-name="Icon awesome-arrow-circle-down" d="M35.438,18A17.438,17.438,0,1,1,18,.563,17.434,17.434,0,0,1,35.438,18Zm-10.1-2.032L20.25,21.277V8.438A1.683,1.683,0,0,0,18.563,6.75H17.438A1.683,1.683,0,0,0,15.75,8.438V21.277l-5.091-5.309a1.689,1.689,0,0,0-2.412-.028l-.766.773a1.681,1.681,0,0,0,0,2.384l9.323,9.33a1.681,1.681,0,0,0,2.384,0l9.33-9.33a1.681,1.681,0,0,0,0-2.384l-.766-.773a1.689,1.689,0,0,0-2.412.028Z" transform="translate(-0.563 -0.563)"/>
                        </svg></span>

                        </span>
                    </button>
                    <script>
                        UIkit.toggle("#toggle-animation<?= $resID ?>").bef
                    </script>

                    <div id="toggle-animation<?= $resID ?>" hidden class="equpimentInformation">
                        <?= $description2 ?>
                        <br>
                        <?= $description ?>
                    </div>


                    <!--Packliste-->
                    <!--Start PHP LOOP-->
                    <?php $packlist = packlist($data['id']);

                    if (count($packlist) == 0) {
                        echo("<!--Nothing to see-->");

                    } else { ?>

                    <div class="grid-100 uk-align-left toTop">
                        <hr class="uk-divider-vertical uk-align-left custom_HR ">
                        <div class="uk-text-large nospace-up textColor">Packliste</div>
                        <ul>
                            <?php for ($item = 0; $item < count($packlist); ++$item) { ?>
                            <li>
                                <label class="textColor">
                                    <?php $listData = $packlist[$item]['nameDe']; ?>
                                    <script>
                                    // get swipebox_Object 

                                    addCheckbox_list(resID = '<?=$listData?>', parent = '<?=$resID?>',
                                        //swipebox_Object


                                        status =
                                        <?=$status?>);
                                    </script>

                                    <!--Start PHP LOOP-->
                                    <!-- set status of checkbox to true -->
                                    <input value="<?= $listData ?>" class="checklist-checkbox child " type="checkbox">
                                    <?= $packlist[$item]['nameDe'] ?> </input>
                                </label>
                            </li>
                            <?php } ?>
                        </ul>
                    </div>
                    <?php } ?>
                    <!--End PHP LOOP-->
                    <!--End Packliste-->
                </div>
            </div>
        </div>
    </div>


    <!--End Equipment Card element-->
    <div class="spacer"></div>


</div>

