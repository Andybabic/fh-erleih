<div class="uk-container uk-animation-scale-up ">
    <div id="proofing_list">
    <p>Keine Daten gefunden</p>
</div>



</div>

<form class="uk-form-horizontal uk-margin-large">

    <div class="uk-margin">
        <label class="uk-form-label" for="form-horizontal-text">Kommentar</label>
        <div class="uk-margin">
            <textarea class="uk-textarea" rows="5" placeholder="..."></textarea>
        </div>
    </div>


</form>



<script>
function build_proofing_list() {
    document.getElementById('proofing_list').innerHTML = '';

    for (var i = 0; i < checkboxes_list.length; i++) {
        var item = checkboxes_list[i];
        if (item.checked){
            iconUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/2048px-Yes_Check_Circle.svg.png';
        }else{
            iconUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/No_Check_Circle.svg/2048px-No_Check_Circle.svg.png';
        }
        if (!item.parent) {

            console.log('i am working');
            console.log(item);

                //var proofing_list_item = document.createElement('div');
                var html =
                    '<div class="uk-card uk-card-body  space-between-list grid-100 uk-flex-inline  uk-object-position-top-center">';
                html += '<div class="checkListbutton ">';
                html +=
                    '<span class="uk-icon uk-icon-image" style="background-image: url('+iconUrl+');"></span>';
                html += '</div>';
                html += '<div class="grid-100 ">';
                html += '<dl class="uk-description-list uk-description-list-divider">';
                html += '<dt>' + item.typeData["nameDe"] +' '+ item.checked+ '</dt>';
                html += '<dd>' + item.typeData['damage'] + '</dd>';
                html += '<dd>' + item.resData['damage'] + '</dd>';
                html += '</dl>';
                html += '</div>';
                html += '</div>';
                document.getElementById('proofing_list').innerHTML += html;
            }

        }
    }


</script>