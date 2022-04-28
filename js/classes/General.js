"use strict";
class General{
    //CONSTRUCTOR
    constructor() {
        //code to run on every page without explicit call
        console.log("gen0");
        this.getSettingsFromLS();
    };


    formatName(string){
        //function to format Names with Umlaut
        if(string == undefined) return "";
        const badValues = {
            "Ã¼": "ü",
            "Ã-":"Ö",
            "Ãœ":"Ü",
            "Ã¤":"ä",
            "Ã¶":"ö",
            "ÃŸ":"ß",
            "Ã":"Ä"
        };
        for (const key in badValues) {
            string = string.replaceAll(key, badValues[key]);
        }
        return string;
    }

    formatDate(date){
        //formats date object to rest api standard
        const offset = date.getTimezoneOffset();
        let newDate = new Date(date.getTime() - (offset*60*1000));
        newDate = newDate.toISOString().split('T')[0];

        return newDate;
    }

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
