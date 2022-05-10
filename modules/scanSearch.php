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
    <div class="selectResultWrapper">

    </div>
</div>




<script type="module" src="../js/modules/ScanSearch.js"></script>