<script>
var checkboxes = []

function addCheckbox(checkbox, parent,checked) {
    checkboxes.push({
        value: checkbox,
        parent: parent,
        checked:checked,
       
    });
}
</script>


<div class="uk-container ">
    <div role="main" class="ui-content">
        <ul data-role="listview">
            <?php 
                            
                            //generate a html element for each entry in the array
                            for($i = 0; $i < count($jsonUser['reservations']) ; ++$i) {
                                $data= dings($jsonUser['reservations'][$i]['equipId']);
                                $status= $jsonUser['reservations'][$i]["prepared"]==1? true : false;
                                
                                
                                ?>

            <div class="Swipe_container  grid-100 ">

                <div class=" swipe_box_back" data-id="<?=$jsonUser['reservations'][$i]['equipId']?>">
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
                            addCheckbox('<?=$data['typeId']?>', false, <?=$status?> );
                            </script>
                            <input class="checklist-checkbox parent" type="checkbox" value="<?=$data['typeId']?>">

                        </div>
                        <div class="grid-100 ">
                            <h3 class="uk-text-lead  "><?=$data["nameDe"]?> <p class="uk-text-lighter uk-display-inline">
                                    id:<?=$data["typeId"]?></p>
                            </h3>
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
                                 echo("<!---Nothing to see--->");

                              }
                              else {   ?>

                            <div class="grid-100 uk-align-left">
                                <hr class="uk-divider-vertical uk-align-left custom_HR ">
                                <div class="uk-text-large nospace-up textColor">Packliste</div>
                                <ul>
                                    <?php  for($item = 0; $item < count($packlist) ; ++$item) { ?>
                                    <li>
                                        <label class="textColor">
                                            <?php $listData = $packlist[$item]['nameDe']; ?>
                                            <script>
                                            addCheckbox('<?=$listData?>', '<?=$data['typeId']?>',<?=$status?>);
                                            </script>

                                            <!---Start PHP LOOP--->
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




   priv.send = function(res,curl) {
        // make post request to url with array
        url="../functions/callAPI.php?r=reservierung/vorbereiten/&data="+res+"&curl="+curl;
        $.ajax({
            //append header cockie
            headers: {
                'Content-Type': 'application/json',
            },
            type: "POST",
            url: url,
            data: '',
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
            checkbox=checkboxelements[i];
            checkbox.checked=false;
            //checkboxelements[i].checked = getParent(value).checked;
            checkbox.addEventListener('click', function() {
                //send to api that rentry is done or not
                //ajax.postResStatus("{"+value+":"+this.checked+"}");
                // get value of clicked checkbox
                var value = this.value;
                console.log("checkbox is " + this.checked);
                
                if (this.checked) {
                    //send to api that rentry is done or not
                    priv.send(value,"POST");
                } else {
                    //send to api that rentry is done or not
                    priv.send(value,"DELETE");
                }
                var parent = getParent(value);
                if (parent) {
                    changeState(parent);
                }
            });
        }

        function getParent(value) {
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].value == value) {
                    return checkboxes[i].parent;
                }
            }
        }

        //check state of all childs
        function checkChilds(parent) {
            console.log('checkChilds with parent: ' + parent);
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].parent == parent) {
                    console.log('checkChilds with parent: ' + parent + ' and child: ' + checkboxes[i]
                        .value + ' is: ' + checkboxelements[i].checked);
                    if (checkboxelements[i].checked == false) {
                        console.log('one of them is false ');
                        return false;
                    }
                }
            }
            console.log('all boxes true ');
            return true;
        }

        //change state of checkbox with ( value )
        function changeState(value) {
            var checkboxer = getCheckbox(value);
            console.log('value=' + value + '');
            if (checkChilds(value)) {
                checkboxer.checked = true;
            } else {
                checkboxer.checked = false;
            }
        }


        // get checkboxelements with ( value )
        function getCheckbox(value) {
            for (var i = 0; i < checkboxelements.length; i++) {
                if (checkboxes[i].value == value) {
                    return checkboxelements[i];
                }
            }
        }
        console.log(checkboxes);
    }
    console.log('checklistComponents.checklist.init()');
    return publ;
})();

checklistComponents.checklist.init();

</script>