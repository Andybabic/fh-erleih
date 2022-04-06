




<div class="uk-container" style="color:withe" >

                    <div class="uk-float-left grid-50 ">
                                <a class="uk-button uk-button-default blue  uk-align-center" onclick="set_state(-1) " >Return</a>
                    </div>
                    <div class="uk-float-right grid-50 ">
                            <a class="uk-button uk-button-default blue  uk-align-center"  onclick="set_state(1) ">Weiter</a>
                    </div>


</div>

<script>
    state=0

    function set_state(n)
    {
        state=state + n
        console.log(state)
        if (state < 0){
                //redirect to overview.php
                window.location.href = "overview.php";
        }
        
    }

    



</script>