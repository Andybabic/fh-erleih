<link rel="stylesheet" href="../js/select2/select2.min.css">

<script src="../js/select2/select2.min.js"></script>


<div id="scanSearch">
    <div uk-grid class="selectWrapper uk-text-center">

        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <label for="departmentSelect">Bereich</label>
            <select class="uk-width-large " id="departmentSelect">
                <option></option>
            </select>
        </div>

        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <label for="categorySelect">Equipment Kategorie</label>
            <select name="eqKat" class="uk-width-large" id="categorySelect">
                <option></option>
            </select>
        </div>

        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <label for="typeSelect">Equipment Typ</label>
            <select name="eqTyp" class="uk-width-large" id="typeSelect">
                <option></option>
            </select>
        </div>
        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <label for="equipmentSelect">Equipment</label>
            <select name="eq" class="uk-width-large" id="equipmentSelect">
                <option></option>
            </select>
        </div>
    </div>


    <button id="writeNFC" value='69' href="#writeToNFC" uk-toggle>
    <div class="selectResultWrapper">
    </button>
    <h1 id="logtext"> Test NFC </h1>


    </div>
</div>





        <div id="writeToNFC" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

                <button class="uk-modal-close-default" id="writeNFC" type="button" uk-close></button>

                <span class="dots-cont"> <span class="dot dot-1"></span> <span class="dot dot-2"></span> <span
                        class="dot dot-3"></span> </span>

                <div id="nfcMassage" class="uk-align-center" style="text-align: center">
                    <h2>Wait for NFC Tag</h2>
                </div>



            </div>



        </div>


<script type="module" src="../js/modules/ScanSearch.js"></script>