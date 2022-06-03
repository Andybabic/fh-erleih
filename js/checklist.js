
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
            success: function(msg) {},

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
                    priv.updateaddCheckbox_list(value, this.checked)
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
        publ.updateEventListener();
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

    priv.updateaddCheckbox_list = function(value, status) {
        for (var i = 0; i < checkboxelements.length; i++) {
            if (checkboxes_list[i].value == value) {
                checkboxes_list[i].checked = status;

            }
        }
    }



    return publ;
})();