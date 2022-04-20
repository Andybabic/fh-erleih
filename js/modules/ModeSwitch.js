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
    console.log(localStorage.overviewState);
    if(localStorage.overviewState){
        //try to get state value from localstorage
        this.modules.filterableList = new FilterableList($("#filterableList"), localStorage.overviewState);
        this.vars.currentMode = localStorage.overviewState;
    }else{
        //if no stored value -> prepared state as default
        this.modules.filterableList = new FilterableList($("#filterableList"), "prepare");
    }
    

    this.addInteraction();
    this.addActiveClass();
};

addInteraction(){
    this.doms.switchBtn.on("click", (e) => {
        const val = e.target.dataset.mode;
        //if the clicked value is different than the current state switch
        if(val != this.vars.currentMode){
            this.vars.currentMode = val;
            //store current state to localstorage
            localStorage.overviewState = val;
            this.switchMode();
            this.addActiveClass();
        }
    });
}

addActiveClass(){
    //remove active class first
    $(".modeSwitch").removeClass("uk-active");
    //add active class
    $("#modeSwitch").find(`[data-mode='${this.vars.currentMode}']`).closest("li").addClass("uk-active");
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
       
    }
}