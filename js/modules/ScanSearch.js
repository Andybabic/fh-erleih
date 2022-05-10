"use strict";
import Ajax from '../classes/Ajax.js';

(function ($, window, document, undefined) {

    class ScanSearch {

        //CONSTRUCTOR
        constructor($base) {
            this.vars = {
                currentMode: "prepare",
            };
            this.doms = {
                base: $base,
                resultWrapper: $base.find(".selectResultWrapper"),
                selects: {
                    "departmentSelect": $base.find("#departmentSelect"),
                    "categorySelect": $base.find("#categorySelect"),
                    "typeSelect": $base.find("#typeSelect"),
                    "equipmentSelect": $base.find("#equipmentSelect"),
                }
            };
            this.modules = {
                ajax: new Ajax()
            };

            this.initScanSearch();

        };

        //METHODS
        async initScanSearch() {
            //init department select first
            const departmentOptions = await this.modules.ajax.getDepartments();
            if (!departmentOptions) {
                this.requestError();
                return;
            }
            this.sortAlphabetically(departmentOptions);
            this.addSelectOptions("departmentSelect", departmentOptions);

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


        addSelectOptions(select, options) {
            //add empty option on order to make placeholder work
            const ph = `<option></option>`;
            this.doms.selects[select].append(ph);

            //add options
            for (const option of options) {
                const opt = `<option value="${option.id}">${option.nameDe}</option>`;
                this.doms.selects[select].append(opt);
            }
            general.toggleLoader();
        }

        async getOptions(clickedSelect) {
            const id = clickedSelect.currentTarget.id;
            const val = clickedSelect.params.data.id;

            //get options data based on clicked select and apply them to following select
            let options = false;
            switch (id) {
                case "departmentSelect":
                    options = await this.modules.ajax.getEquipmentCategory(val);
                    break;
                case "categorySelect":
                    options = await this.modules.ajax.getEquipmentType($("#departmentSelect").val(), val);
                    break
                case "typeSelect":
                    options = await this.modules.ajax.getEquipment(val);
                    break;
            }
            return options;
        }

        async addInteraction() {
            //get name of all selects
            let selectArr = [];
            for (const key in this.doms.selects) {
                selectArr.push(key);
            }
            //department select
            for (const key in this.doms.selects) {
                this.doms.selects[key].on('select2:select', async (e) => {
                    console.log(this.doms.selects[e.currentTarget.id]);
                    if (key != "equipmentSelect") {
                        //display loader
                        general.toggleLoader(this.doms.selects[e.currentTarget.id]);
                        //not for last select
                        const nextSelect = selectArr[selectArr.indexOf(key) + 1];
                        //remove options for all following select
                        this.clearFollowingSelects(key);
                        const options = await this.getOptions(e, nextSelect);
                        console.log(options);
                        if(options){
                            this.addSelectOptions(nextSelect, options);
                        }else{
                            this.requestError();
                        }

                    } else {
                        //output which id will put on nfc tag
                        const result = `
                           <div class="selectResult outerbox">
                            <div class="innerbox">
                                <h2>ID</h2>
                                <p>${$("#equipmentSelect").val()}</p>
                            </div>
                            </div>
                            <p>${$("#typeSelect")
                            .children(":selected")
                            .text()} - ${$("#equipmentSelect")
                            .children(":selected")
                            .text()}</p>
                    `;
                        this.doms.resultWrapper.html(result);
                    }
                });
            }

        }

        clearFollowingSelects(select) {
            console.log(select);
            //function to clear all selects that depend on the changed select
            let toDelete = false;
            for (const key in this.doms.selects) {
                if (toDelete) {
                    //clear select
                    this.doms.selects[key].empty();
                    //clear result if the equipmentselect is empty
                    if (key == "equipmentSelect") {
                        this.doms.resultWrapper.html("");
                    }
                }
                if (key == select) toDelete = true;
            }
        }

        removeDuplicates(options) {
            //function to remove duplicates espeially for eqTyp
            let uniqueIds = [];
            let uniqueOptions = [];
            for (const option of options) {
                if (!uniqueIds.includes(option.id)) {
                    uniqueIds.push(option.id);
                    uniqueOptions.push(option);
                }
            }
            return uniqueOptions;
        }

        sortAlphabetically(options) {
            const sortedOptions = options.sort(function (a, b) {
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

        requestError() {
            //function to call if the api request returns error
            const error = `
                    <div class="selectResult">
                        <h2>API Error</h2>
                        <p>Leider konnten die Equipment Daten gerade nicht abgefragt werden</p>
                    </div>
                `;
            this.doms.resultWrapper.html(error);
        }


    }


    const init = () => {
        if ($("#scanSearch").length > 0) {
            new ScanSearch($("#scanSearch"));
        }
    };
    init();

})(jQuery, window, document);
