<div class="uk-container uk-animation-scale-up ">
    <div id="proofing_list">
    <p>Hallo</p>
    </div>
    <form  >
  
            <textarea id="assiCommentTextarea" class="uk-textarea" rows="5" placeholder="Assi Kommentar zu allen Reservierungen hinzufügen"></textarea>

            <button id="checklistComment" class="uk-button uk-button-default returnButton uk-align-right">Speichern</button>

    </form>

</div>



<script>







// catch the click event of the button and interupt the default action
$(document).on('click', '#checklistComment', function(e) {
    e.preventDefault();
    // get the value of the textarea
    var comment = $('textarea').val();
    console.log("start sending comment");
    console.log(checkboxes_list);
    for ( var i = 0; i < checkboxes_list.length; i++) {
        var element = checkboxes_list[i];
        console.log(element);
        if(element.checked && !element.parent){
            var data = {
                "assiComment": comment
            };
            var encoded = JSON.stringify(data);
         updateAssiComment(encoded, element.value);
        }

    }
  
});

//display save button if assi comment field contains text
$("#assiCommentTextarea").on("keyup", (e) => {
    if(e.target.value != ""){
        console.log(e.target.value);

        $("#checklistComment").slideDown();
    }else{
        console.log(e.target.value);
        $("#checklistComment").slideUp();
    }
});



function updateAssiComment(jsondata , id) {
        // make post request to url with array
       
        url = "../functions/callAPI.php?r=reservierung/"+id+"/kommentar/";


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






function build_proofing_list() {
    document.getElementById('proofing_list').innerHTML = '';

    for (var i = 0; i < checkboxes_list.length; i++) {
        var item = checkboxes_list[i];

        if (item.checked) {
            iconUrl='../style/image/HackalGruen.svg';
        }else{
            iconUrl='../style/image/RufzeichenOrange.svg';
        }
        if (!item.parent) {
            
                 
                //var proofing_list_item = document.createElement('div');
                var html =
                    '<div class="uk-card uk-card-body  space-between-list grid-100 uk-flex-inline colorBackgroundGrey uk-object-position-top-center spacelist">';
                html += '<div class="checkListbutton ">';
                html +=
                    '<span class="uk-icon uk-icon-image" style="background-image: url('+iconUrl+');"></span>';
                html += '</div>';
                html += '<div class="grid-100 ">';
                html += '<dl class="uk-description-list uk-description-list-divider">';
                html += '<dt>' + item.typeData["nameDe"] +'</dt>';
                html += '<dd>' + item.resData['damage'] + '</dd>';
                html += '<dd>' + item.resData['todo'] + '</dd>';
                html += '</dl>';
                html += '</div>';
                html += '</div>';
                document.getElementById('proofing_list').innerHTML += html;
            }

        }
    }


</script>
