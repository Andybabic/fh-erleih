




<div class="uk-container" style="color:withe" >

                    <div class="uk-float-left grid-50 ">
                                <a class="uk-button uk-button-default blue  uk-align-center" id="back" onclick="stateComponents.stateManager.set_state(-1) " >Return</a>
                    </div>
                    <div class="uk-float-right grid-50 ">
                            <a class="uk-button uk-button-default blue  uk-align-center"  id="forward" onclick="stateComponents.stateManager.set_state(1) ">Weiter</a>
                    </div>
                    

</div>

<script>
    // init Namespace

    let stateComponents = {};

    stateComponents.stateManager = (function() {
        let priv = {},
            publ = {};

            state=0;

        publ.set_state = function(n)
                {
                    state=state + n
                    
                    localStorage.setItem('Site_state', state);
                    updateStateContent()
                    console.log(state)
                    
                }



        publ.init = function() {
                //save all parent checkboxes in a array in local storage
                function saveCheckboxes(){
                    var checkboxes = document.getElementsByClassName('checklist-checkbox');
                    var checkboxesArray = [];
                    for(var i = 0; i < checkboxes.length; i++) {
                        if(checkboxes[i].parent==null){
                            checkboxesArray.push(checkboxes[i].value);
                        }
                    }
                localStorage.setItem('checkboxes', JSON.stringify(checkboxesArray));
                set_state(0);

                }

                

                
        }

        
        console.log('stateManager.init()');
        return publ;
    })();

    // add helper function or others to a nice namespace
    // 
    // 
    


// HTML

 var State= stateComponents.stateManager.init();

</script>