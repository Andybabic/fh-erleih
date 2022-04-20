"use strict";
class General{
    //CONSTRUCTOR
    constructor() {
        //code to run on every page without explicit call
        this.getSettingsFromLS();
    };



    async getUserById(userId){
        const api = `${this.vars.apiUrl}user/${userId}/`;

        return new Promise((resolve, reject) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                reject(-1);
            });
        });
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

    formatString(string){
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
            console.log(key);
            console.log(badValues[key]);
            string = string.replaceAll(key, badValues[key]);
        }
        return string;
    }


}

const general = new General();
