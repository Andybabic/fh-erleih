<script>
var checkboxes_list = []


function addCheckbox_list(resID = null, parent = null, status = null, typeData = null, resData = null) {
    checkboxes_list.push({
        value: resID,
        parent: parent,
        checked: this.status,
        typeData: this.typeData,
        resData: this.resData


    });
}
</script>


<div class="uk-container ">
    <div role="main" class="ui-content">
        <ul data-role="listview">
            <?php 
                            //generate a html element for each entry in the array
                            for($i = 0; $i < count($jsonUser['reservations']) ; ++$i) {
                                $data= getEquip($jsonUser['reservations'][$i]['equipId']);
                                //$status= ($jsonUser['reservations'][$i]["prepared"] = 1 ? 'false' : 'true');
                                $status= status($jsonUser['reservations'][$i]['id']);
                                $resID=$jsonUser['reservations'][$i]['id'];
                                $resData=json_encode($jsonUser['reservations'][$i]);
                                $typData= getEquipTyp($data['typeId']);
                                $equipData=json_encode($data);
                                $description=$typData["descriptionDe"];
                                $description=str_replace("<p>", "", $description);
                                $description=str_replace("</p>", "", $description);
                                //convert typData to json
                                $typDataJson=json_encode($typData);
                                $assiComment= $jsonUser['reservations'][$i]['assiComment'];
                                //echo(var_dump($jsonUser['reservations'][$i]));
                                ?>

            <div class="Swipe_container  grid-100 ">


                <div class=" swipe_box_back" data-resId="<?=$jsonUser['reservations'][$i]['id']?>"
                    data-eqId="<?=$jsonUser['reservations'][$i]['equipId']?>">
                    <div class=" uk-align-right btn-checklist colorSecondary uk-animation-scale-up" data-type="extend">
                        <span class="center-all uk-animation-scale-down " uk-icon="icon: future; ratio: 1.5"></span>
                    </div>
                    <div class=" uk-align-right btn-checklist bg-orange uk-animation-scale-up" data-type="report">
                        <span class="center-all uk-animation-scale-down" uk-icon="icon: warning; ratio: 1.5"></span>
                    </div>
                    <div class=" uk-align-left btn-checklist colorSecondary uk-animation-scale-up" data-type="extend">
                        <span class="center-all uk-animation-scale-down " uk-icon="icon: future; ratio: 1.5"></span>
                    </div>
                    <div class=" uk-align-left btn-checklist bg-orange uk-animation-scale-up" data-type="report">
                        <span class="center-all uk-animation-scale-down" uk-icon="icon: warning; ratio: 1.5"></span>
                    </div>
                </div>


                <!---SWIPEBOX Foreground element--->
                <div class="swipebox_Object swipe_box uk-animation-slide-left" style=" z-index: 1;">

                    <!---Start Equipment Card element--->
                    <div
                        class="uk-card uk-card-body  space-between-list grid-100 uk-flex-inline colorBackgroundGrey uk-object-position-top-center">
                        <div class="checkListbutton ">

                            <script>
                            addCheckbox_list(resID = '<?=$resID?>', parent = false, status = <?=$status?>, typeData =
                                <?=$typDataJson?>, resData = <?=$equipData?>);
                            </script>

                            <input class="checklist-checkbox parent" type="checkbox" id="<?=$resID?>"
                                value="<?=$resID?>">

                            <!-- <label for="option1">
                                Option 1
                                <input type="checkbox" id="option1">
                            </label> -->

                        </div>
                        <div class="grid-100 ">
                            <label for="<?=$resID?>">
                                <h3 class="uk-text-lead  "><?=$typData["nameDe"]?> <p
                                        class="uk-text-lighter uk-display-inline">
                                        id:<?=$data["id"]?></p>
                                </h3>
                            </label>
                            <p class="uk-text-small uk-text-muted uk-text-truncate toTop"><?=$assiComment?></p>
                            <span href="#toggle-animation<?=$i?>" uk-icon="info"
                                uk-toggle="target: #toggle-animation<?=$i?>; animation: uk-animation-fade "
                                style="right: 10px;top: 10px;position: absolute;"></span>

                            <div id="toggle-animation<?=$i?>" hidden
                                class="uk-card uk-card-default uk-card-body uk-margin-small"><?=$description?></div>




                            <!---Packliste--->
                            <!---Start PHP LOOP--->
                            <?php     $packlist = packlist($data['id']);
                                                
                             if (count($packlist) == 0) {
                                 echo("<!---Nothing to see--->");

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
                                            addCheckbox_list(resID = '<?=$listData?>', parent = '<?=$resID?>', status =
                                                <?=$status?>);
                                            </script>

                                            <!---Start PHP LOOP--->
                                            <!-- set status of checkbox to true -->
                                            <input value="<?=$listData?>" class="checklist-checkbox child "
                                                type="checkbox"> <?=$packlist[$item]['nameDe']?> </input>
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
                </div>
            </div>
            <!---End Equipment Card element--->
            <div class="spacer"></div>

            <?php } ?>

        </ul>
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
        console.log(jsondata);
        jsondata = JSON.stringify([jsondata]);
        $.ajax({
            type: 'POST',
            url: url,
            dataType: "JSON",
            data: {
                curl: 'POST',
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
            status = getCheckbox_array(checkbox.value).checked;
            //change status of checkbox
            if (status == "true") {
                checkbox.checked = true;
            }else{
                checkbox.checked = false;
            }
            checkbox.addEventListener('click', function() {
                //add data post request
                var value = this.value;
                jsondata = value;
                if (status) {
                    //send to api that rentry is done or not
                    priv.send(jsondata, "POST");
                } else {
                    //send to api that rentry is done or not
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
                checkboxes_list[i].checked = checkboxelements[i].checked;
            }
        }


        //check state of all childs
        function checkChilds(parent) {
            for (var i = 0; i < checkboxes_list.length; i++) {
                if (checkboxes_list[i].parent == parent) {
                    console.log('checkChilds with parent: ' + parent + ' and child: ' + checkboxes_list[i]);
                    if (checkboxelements[i].checked == false) {
                        return false;
                    }
                }
            }
            return true;
        }

        //change state of checkbox with ( value )
        function changeState(value) {
            var thisCheckbox = getCheckbox(value);
            if (checkChilds(value)) {
                //set checkbox to true
                thisCheckbox.checked = true;
            } else {
                thisCheckbox.checked = false;
            }
        }

        // get checkboxes with ( value )
        function getCheckbox_array(value) {
            for (var i = 0; i < checkboxelements.length; i++) {
                if (checkboxes_list[i].value == value) {
                    return checkboxes_list[i];
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
        console.log(checkboxes_list);
    }
    return publ;
})();

checklistComponents.checklist.init();
</script>