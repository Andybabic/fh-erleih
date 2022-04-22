<link rel="stylesheet" href="../js/select2/select2.min.css">

<script src="../js/select2/select2.min.js"></script>


<div  id="scanSearch">
    <div uk-grid class="selectWrapper uk-text-center">

        <div class="uk-width-1-4@l uk-width-1-1@m">
            <label for="departmentSelect">Bereich</label>
            <select  class="uk-select" id="departmentSelect"><option></option></select>
        </div>
        <div class="uk-width-1-4@l uk-width-1-1@m">
            <label for="categorySelect">Equipment Kategorie</label>
            <select  name="eqKat" id="categorySelect"><option></option></select>
        </div>

        <div class="uk-width-1-4@l uk-width-1-1@m">
            <label for="typeSelect">Equipment Typ</label>
            <select  name="eqTyp" id="typeSelect"><option></option></select>
        </div>
        <div class="uk-width-1-4@l uk-width-1-1@m">
        <label for="equipmentSelect">Equipment</label>
        <select  name="eq" id="equipmentSelect"><option></option></select>
        </div>
    </div>
    <div class="selectResultWrapper">
        
    </div>
</div>


<script type="module" src="../js/modules/ScanSearch.js"></script>
