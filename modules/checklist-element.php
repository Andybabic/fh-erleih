<!-- <?php
    // close opened html tags
    function closetags ( $html )
        {

        //remove body everzthing before and after body tag 
        //$html = str_replace(["\n","\r\n"], '', $html);
        $html = str_replace([
            "\n","\r\n", // remove real newlines 
            '\n', '\r\n' // remove escaped newlines
          ], '', $html);
        $html = preg_replace('/.*<body[^>]*>/', '', $html);
        $html = preg_replace('/<\/body>.*/', '', $html);
        
        
        // Specify configuration
        $config = array(
            'indent'         => true,
            'output-xhtml'   => true,
            'wrap'           => 200);

        // Tidy
        $tidy = new tidy;
        $tidy->parseString($html, $config, 'utf8');
        $tidy->cleanRepair();

        // return $tidy->value;
        return $tidy;
        
    }
    // close opened html tags
?> -->



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


<div class="uk-container ">
    <div role="main" class="ui-content">
        <div class="checklist" data-role="listview">
            <?php
                            
                            //generate a html element for each entry in the array
                            for($i = 0; $i < count($jsonUser['reservations']) ; ++$i) {
                                $data= getEquip($jsonUser['reservations'][$i]['equipId']);
                                //$status= ($jsonUser['reservations'][$i]["prepared"] = 1 ? 'false' : 'true');
                                $status=  json_encode(status($jsonUser['reservations'][$i]['id']));
                                $resID=$jsonUser['reservations'][$i]['id'];
                                $resData=json_encode($jsonUser['reservations'][$i]);
                                $typData= getEquipTyp($data['typeId']);
                                $equipData=json_encode($data);

                                $description=($typData["descriptionDe"]);
                                $description2=($data["descriptionDe"]);
                                //convert typData to json
                                $typDataJson=json_encode($typData);
                                $assiComment= $jsonUser['reservations'][$i]['assiComment'];
                                //echo(var_dump($data));

                                ?>

            <div class="Swipe_container  grid-100 ">
                <div class=" swipe_box_back" data-resId="<?=$jsonUser['reservations'][$i]['id']?>"
                    data-eqId="<?=$jsonUser['reservations'][$i]['equipId']?>">
                    <div class=" uk-align-right btn-checklist colorSecondary uk-animation-slide-left-small"
                        data-type="extend">
                        <span class="center-all uk-animation-slide-left-small "
                            uk-icon="icon: future; ratio: 1.5"></span>
                    </div>
                    <?php if(true) : ?>
                    <div class=" uk-align-right btn-checklist bg-orange uk-animation-slide-left-small"
                        data-type="report">
                        <span class="center-all uk-animation-slide-left-small"
                            uk-icon="icon: warning; ratio: 1.5"></span>
                    </div>
                    <?php endif; ?>
                    <div class=" uk-align-left btn-checklist colorSecondary uk-animation-slide-left-small"
                        data-type="extend">
                        <span class="center-all uk-animation-slide-left-small "
                            uk-icon="icon: future; ratio: 1.5"></span>
                    </div>
                    <div class=" uk-align-left btn-checklist bg-orange uk-animation-slide-left-small"
                        data-type="report">
                        <span class="center-all uk-animation-slide-left-small"
                            uk-icon="icon: warning; ratio: 1.5"></span>
                    </div>
                </div>


                <!--SWIPEBOX Foreground element-->
                <div class="swipebox_Object swipe_box uk-animation-slide-left" style=" z-index: 1;">

                    <!--Start Equipment Card element-->
                    <div
                        class="uk-card uk-card-body  space-between-list grid-100 uk-flex-inline colorBackgroundGrey uk-object-position-top-center">
                        <div class="checkListbutton ">

                            <script>
                            addCheckbox_list(resID = '<?=$resID?>', parent = false, status = <?=$status?>, typeData =
                                <?=$typDataJson?>, resData = <?=$equipData?>);
                            </script>

                            <input class="checklist-checkbox parent" type="checkbox" id="<?=$resID?>"
                                value="<?=$resID?>">


                        </div>
                        <div class="grid-100 ">
                            <h3>
                                <label for="<?=$resID?>">
                                    <span class="uk-text-lead  "><?=$typData["nameDe"]?></span>
                                    <span class="uk-text-lighter uk-display-inline">
                                        <?=$data["nameDe"]?></span>

                                </label>
                                <h3>

                                    <p class="uk-text-small uk-text-muted uk-text-truncate toTop"><?=$assiComment?></p>

                                    <span href="#toggle-animation<?=$i?>" uk-icon="info"
                                        uk-toggle="target: #toggle-animation<?=$i?>; animation: uk-animation-fade "
                                        style="right: 15px;top: 15px;position: absolute; "></span>

                                    <div id="toggle-animation<?=$i?>" hidden
                                        class="uk-card uk-card-default uk-card-body uk-margin-small">

                                        <?=closetags($description)?>

                                        <br>
                                        <?=closetags($description2)?>

                                        </pre>
                                    </div>




                                    <!--Packliste-->
                                    <!--Start PHP LOOP-->
                                    <?php     $packlist = packlist($data['id']);
                                                
                             if (count($packlist) == 0) {
                                 echo("<!--Nothing to see-->");

                              }
                              else {   ?>

                                    <div class="grid-100 uk-align-left toTop">
                                        <hr class="uk-divider-vertical uk-align-left custom_HR ">
                                        <div class="uk-text-large nospace-up textColor">Packliste</div>
                                        <ul>
                                            <?php  for($item = 0; $item < count($packlist) ; ++$item) { ?>
                                            <li>
                                                <label class="textColor">
                                                    <?php $listData = $packlist[$item]['nameDe']; ?>
                                                    <script>
                                                    addCheckbox_list(resID = '<?=$listData?>', parent = '<?=$resID?>',
                                                        status =
                                                        <?=$status?>);
                                                    </script>

                                                    <!--Start PHP LOOP-->
                                                    <!-- set status of checkbox to true -->
                                                    <input value="<?=$listData?>" class="checklist-checkbox child "
                                                        type="checkbox"> <?=$packlist[$item]['nameDe']?> </input>
                                                </label>
                                            </li>
                                            <?php } ?>
                                        </ul>
                                    </div>
                                    <?php  } ?>
                                    <!--End PHP LOOP-->
                                    <!--End Packliste-->
                        </div>
                    </div>
                </div>
            </div>
            <!--End Equipment Card element-->
            <div class="spacer"></div>

            <?php } ?>

        </div>
    </div>
</div>



<script>
// example structure checklistComponents

let checklistComponents = {};


checklistComponents.checklist = (function() {
    let priv = {},
        publ = {};




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
                console.log("Update success");
            },

        });
    }


    publ.init = function() {
        //collect all checkboxes
        var checkboxelements = document.getElementsByClassName('checklist-checkbox');


        // add listener to all checkboxes ( clicked )
        for (var i = 0; i < checkboxelements.length; i++) {
            checkbox = checkboxelements[i];
            var value = this.value;
            var checklistelement = getCheckbox_array(checkbox.value)
            var checkstatus = checklistelement;
            checkbox.checked = checkstatus;


            checkbox.addEventListener('click', function() {

                //add data post request
                var value = this.value;
                jsondata = value;
                if (this.checked) {
                    //send to api that rentry is done or not
                    console.log('post');
                    priv.send(jsondata, "POST");
                } else {
                    //send to api that rentry is done or not
                    console.log('delete');
                    priv.send(jsondata, "DELETE");
                }
                var parent = getParent(value);
                if (parent) {
                    changeState(parent);
                }
                update()
            });
        }

        function getParent(value) {
            for (var i = 0; i < checkboxes_list.length; i++) {
                if (checkboxes_list[i].value == value) {
                    return checkboxes_list[i].parent;
                }
            }
        }

        function update() {
            for (var i = 0; i < checkboxelements.length; i++) {
                // checkboxes_list[i].checked = checkboxelements[i].checked;
            }
        }


        //check state of all childs
        function checkChilds(parent) {
            for (var i = 0; i < checkboxes_list.length; i++) {
                if (checkboxes_list[i].parent == parent) {
                    if (checkboxelements[i].checked == false) {
                        return false;
                    }
                }
            }
            return true;
        }

        //change state of checkbox with ( value )
        function changeState(value) {
            // var thisCheckbox = getCheckbox(value);
            // if (checkChilds(value)) {
            //     //set checkbox to true
            //     thisCheckbox.checked = true;
            // } else {
            //     thisCheckbox.checked = false;
            // }
        }

        // get checkboxes with ( value )
        function getCheckbox_array(value) {

            for (var i = 0; i < checkboxelements.length; i++) {
                if (checkboxes_list[i].value == value) {
                    return checkboxes_list[i].checked;

                }
            }
        }


        // get checkboxelements with ( value )
        function getCheckbox(value) {
            for (var i = 0; i < checkboxelements.length; i++) {
                if (checkboxes_list[i].value == value) {
                    return checkboxelements[i];
                }
            }
        }

    }
    return publ;
})();
checklistComponents.checklist.init();
</script>