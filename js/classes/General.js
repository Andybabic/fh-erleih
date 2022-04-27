"use strict";
class General{
    //CONSTRUCTOR
    constructor() {
        //code to run on every page without explicit call
        console.log("gen0");
        this.getSettingsFromLS();
    };



    toggleLoader(DOMPos){
        if($(".loader-horizontal").length){
            $(".loader-horizontal").slideToggle();
        }else{
            const loader = `
                    <div class="loader-horizontal">
                      <div class="loader-horizontal__dot"></div>
                      <div class="loader-horizontal__dot"></div>
                      <div class="loader-horizontal__dot"></div>
                    </div>
                `;

            $(loader).insertAfter(DOMPos);
        }
    }

    getSettingsFromLS(setting){
        //darkmode
        if(localStorage.settings){
            let settings = JSON.parse(localStorage.settings);
            if(settings.darkMode){
                $(":root").css("--bgColor", "#212529");
                $(":root").css("--textColor", "#f8f9fa");
            }
        }
    }

}

const general = new General();
