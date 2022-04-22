<div class="uk-container uk-animation-scale-up ">
    <div id="proofing_list">

    </div>



    </div>



<script>
    // make request to callAPI.php



    for (var i = 0; i < checkboxes.length; i++) {


        var item = checkboxes[i];
        var html = '<div class="uk-card uk-card-body  space-between-list grid-100 uk-flex-inline  uk-object-position-top-center">';
        html += '<div class="checkListbutton ">';
        html += '<span class="uk-icon uk-icon-image" style="background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Yes_Check_Circle.svg/2048px-Yes_Check_Circle.svg.png);"></span>';
        html += '</div>';
        html += '<div class="grid-100 ">';
        html += '<dl class="uk-description-list uk-description-list-divider">';
        html += '<dt>' + item.nameDe + '</dt>';
        html += '<dd>' + item.damage + '</dd>';
        html += '</dl>';
        html += '</div>';
        html += '</div>';
        document.getElementById('proofing_list').innerHTML += html;
    }

    </script>