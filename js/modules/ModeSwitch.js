"use strict";

import FilterableList from './FilterableList.js';

(function ($, window, document, undefined) {

    class ModeSwitch{

        //CONSTRUCTOR
        constructor($base) {
            this.filter = {
                today:              true,
                tomorrow:           true,
                timespan:           [],
            };
            this.vars = {
                currentMode:        "prepare",
            };
            this.doms = {
                base:               $base,
                switchBtn:          $base.find(".modeSwitch"),
            };
            this.modules = {
                filterableList:     "",
            };

            this.initModeSwitch();

        };

        //METHODS

        initModeSwitch(){
            this.modules.filterableList = new FilterableList($("#filterableList"), "prepare");

            this.addInteraction();
        };

        addInteraction(){
            this.doms.switchBtn.on("click", (e) => {
                const val = e.target.dataset.mode;
                if(val != this.vars.currentMode){
                    this.vars.currentMode = val;
                    this.switchMode();
                }
            });
        }

        switchMode(){
            const mode = this.vars.currentMode;
            switch (mode){
                case "prepare":
                    this.modules.filterableList.removeList();
                    this.modules.filterableList = new FilterableList($("#filterableList"), "prepare");
                    break;
                case "return":
                    this.modules.filterableList.removeList();
                    this.modules.filterableList = new FilterableList($("#filterableList"), "return");
                    break;
                case "scan":
                    break;
            }
        }



    }


    const init = () => {
        if ($("#modeSwitch").length > 0 && $("#filterableList").length > 0) {
            new ModeSwitch($("#modeSwitch"));
        }
    };
    init();

})(jQuery, window, document);
