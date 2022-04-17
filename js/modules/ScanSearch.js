"use strict";
import Ajax from '../classes/Ajax.js';

(function ($, window, document, undefined) {

    class ScanSearch{

        //CONSTRUCTOR
        constructor($base) {
            this.vars = {
                currentMode:        "prepare",
            };
            this.doms = {
                base:                   $base,
                resultWrapper:          $base.find(".selectResultWrapper"),
                selects: {
                    departmentSelect:   $base.find("#departmentSelect"),
                    categorySelect:     $base.find("#categorySelect"),
                    typeSelect:         $base.find("#typeSelect"),
                    equipmentSelect:    $base.find("#equipmentSelect"),
                }
            };
            this.modules = {
                ajax:               new Ajax()
            };

            this.initScanSearch();

        };

        //METHODS
        async initScanSearch(){
            //init department select first
            const departmentOptions = await this.modules.ajax.getDepartments();
            this.sortAlphabetically(departmentOptions);
            await this.addSelectOptions("departmentSelect", departmentOptions);

            //init select2
            for (const key in this.doms.selects) {
                const select = this.doms.selects[key];
                select.select2({
                    placeholder: "Filter wählen ...",
                });
            }

            //add onchange interaction
            this.addInteraction();
        };


        addSelectOptions(select, options){
            //add empty option on order to make placeholder work
            const ph = `<option></option>`;
            this.doms.selects[select].append(ph);

            //add options
            for (const option of options) {
                const opt = `<option value="${option.id}">${option.nameDe}</option>`;
                this.doms.selects[select].append(opt);
            }

        }

        async addInteraction(){
            //department select
            this.doms.selects.departmentSelect.on('select2:select', async (e) => {
                //clear all following selects
                this.clearFollowingSelects("departmentSelect");

                const options = await this.modules.ajax.getEquipmentCategory(e.params.data.id);
                this.sortAlphabetically(options);
                this.addSelectOptions("categorySelect", options);
            });
            //category select
            this.doms.selects.categorySelect.on('select2:select', async (e) => {
                //clear all following selects
                this.clearFollowingSelects("categorySelect");

                const options = await this.modules.ajax.getEquipmentType($("#departmentSelect").val(),e.params.data.id);
                const uniqueOptions = this.removeDuplicates(options);
                console.log(uniqueOptions);
                this.sortAlphabetically(uniqueOptions);
                this.addSelectOptions("typeSelect", uniqueOptions);
            });
            //type select
            this.doms.selects.typeSelect.on('select2:select', async (e) => {
                console.log("selected");
                //clear all following selects
                this.clearFollowingSelects("typeSelect");
                const options = await this.modules.ajax.getEquipment(e.params.data.id);
                console.log(options);
                this.sortAlphabetically(options);
                this.addSelectOptions("equipmentSelect", options);
            });
            //equipment select
            this.doms.selects.equipmentSelect.on('select2:select', (e) => {
                //output which id will put on nfc tag
                const result = `
                    <div class="selectResult">
                        <h2>Objekt</h2>
                        <p>${$("#typeSelect").children(':selected').text()} - ${$("#equipmentSelect").children(':selected').text()}</p>
                        <h2>ID</h2>
                        <p>${$("#equipmentSelect").val()}</p>
                    </div>
                `;
                this.doms.resultWrapper.html(result);
            });
        }

        clearFollowingSelects(select){
            //function to clear all selects that depend on the changed select
            let toDelete = false;
            for (const key in this.doms.selects) {
                if(toDelete){
                    //clear select
                    this.doms.selects[key].empty();
                    //clear result if the equipmentselect is empty
                    console.log(key);
                    if(key == "equipmentSelect"){
                        this.doms.resultWrapper.html("");
                    }
                }
                if(key == select)toDelete = true;
            }
        }

        removeDuplicates(options){
            //function to remove duplicates espeially for eqTyp
            let uniqueIds = [];
            let uniqueOptions = [];
            for (const option of options) {
                if(!uniqueIds.includes(option.id)){
                    uniqueIds.push(option.id);
                    uniqueOptions.push(option);
                }
            }
            return uniqueOptions;
        }

        sortAlphabetically(options){
            const sortedOptions = options.sort(function(a, b) {
                var nameA = a.nameDe.toUpperCase(); // ignore upper and lowercase
                var nameB = b.nameDe.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1; //nameA comes first
                }
                if (nameA > nameB) {
                    return 1; // nameB comes first
                }
                return 0;  // names must be equal
            });
            return sortedOptions;
        }


    }


    const init = () => {
        if ($("#scanSearch").length > 0 ) {
            new ScanSearch($("#scanSearch"));
        }
    };
    init();

})(jQuery, window, document);
