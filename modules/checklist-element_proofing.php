<div class="uk-container uk-animation-scale-up ">
    <div id="proofing_list">
    <p>Hallo</p>
    </div>
    <form>
  
    

            <textarea class="uk-textarea" rows="5" placeholder="Kommentieren"></textarea>
    

</form>

</div>



<script>
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
                html += '<dt>' + item.typeData["nameDe"] +' '+ item.checked+ '</dt>';
                html += '<dd>' + item.resData['damage'] + '</dd>';
                html += '</dl>';
                html += '</div>';
                html += '</div>';
                document.getElementById('proofing_list').innerHTML += html;
            }

        }
    }


</script>
