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
                base:               $base,
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

                //follow.empty();
                const options = await this.modules.ajax.getEquipmentCategory(e.params.data.id);
                this.addSelectOptions("categorySelect", options);
            });
            //category select
            this.doms.selects.categorySelect.on('select2:select', async (e) => {
                //clear all following selects
                this.clearFollowingSelects("categorySelect");

                const options = await this.modules.ajax.getEquipmentType($("#departmentSelect").val(),e.params.data.id);
                this.addSelectOptions("typeSelect", options);
            });
            //type select
            this.doms.selects.typeSelect.on('select2:select', async (e) => {
                //clear all following selects
                this.clearFollowingSelects("typeSelect");

                const options = await this.modules.ajax.getEquipment(e.params.data.id);
                this.addSelectOptions("equipmentSelect", options);
            });
            //equipment select
            this.doms.selects.equipmentSelect.on('select2:select', (e) => {

            });
        }

        clearFollowingSelects(select){
            //function to clear all selects that depend on the changed select
            let toDelete = false;
            for (const key in this.doms.selects) {
                if(toDelete){
                    //clear select
                    this.doms.selects[key].empty();
                }
                if(key == select)toDelete = true;
            }
        }


    }


    const init = () => {
        if ($("#scanSearch").length > 0 ) {
            new ScanSearch($("#scanSearch"));
        }
    };
    init();

})(jQuery, window, document);
