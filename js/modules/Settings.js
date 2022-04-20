"use strict";
import Ajax from '../classes/Ajax.js';

(function ($, window, document, undefined) {

    class Settings{

        //CONSTRUCTOR
        constructor($base) {
            this.vars = {
                currentMode:            "prepare",
                selctedDepartments:     {
                                            1: "Fotografie",
                                            2: "Audio",
                                            3: "Video",
                                            5: "InteraktiveMedien",
                                        },
                darkMode:               false,
            };
            this.doms = {
                base:                   $base,
                departmentWrapper:      $base.find(".departmentWrapper"),
            };
            this.modules = {
                ajax:               new Ajax()
            };

            this.initSettings();

        };

        //METHODS
        async initSettings(){
            //check if settings are stored in localstorage
            if(localStorage.settings){
                const settings = JSON.parse(localStorage.settings);
                console.log(settings);
                if(settings.departments)this.vars.selctedDepartments = settings.departments;
                console.log(this.vars.selctedDepartments);
                if(settings.darkMode)this.vars.darkMode = settings.darkMode;
            }

            //init department filter
            await this.addDepartmentOptions();


            //add onchange interaction
            this.addInteraction();
        };


        async addDepartmentOptions(){
            //add empty option on order to make placeholder work
            const departments = await this.modules.ajax.getDepartments();
            //add options
            for (const dep of departments) {
                //check if department is active to add class
                let isActive = false;
                for (const key in this.vars.selctedDepartments) {
                    if(key == dep.id)isActive = true;
                }
                const btn = `<button class="js-departmentBtn filterBtn ${isActive? "filterSelected" : ""}" value="${dep.id}">${dep.nameDe}</button>`;
                this.doms.departmentWrapper.append(btn);
            }

        }

        async addInteraction(){
            //department filter
            $(".js-departmentBtn").on("click", (e) => {
                e.target.classList.toggle("filterSelected");
                //store all active filters
                let departmentArr = {};
                for (const btn of $(".js-departmentBtn")) {
                    if(btn.classList.contains("filterSelected")){
                        //console.log(btn.innerText);
                        departmentArr[btn.value] = btn.innerText;
                    }
                }
                console.log(departmentArr);
                this.vars.selctedDepartments = departmentArr;

                //store filter value to localstorage
                if(localStorage.settings){
                    let settings = JSON.parse(localStorage.settings);
                    settings.departments = this.vars.selctedDepartments;
                    localStorage.settings = JSON.stringify(settings);
                }else{
                    let settings = {"departments":this.vars.selctedDepartments}
                    localStorage.settings = JSON.stringify(settings);
                }
                //remove values of active filters to prevent errors
                localStorage.removeItem("filterValues");
            });
        }



    }


    const init = () => {
        if ($("#settings").length > 0 ) {
            new Settings($("#settings"));
        }
    };
    init();

})(jQuery, window, document);
