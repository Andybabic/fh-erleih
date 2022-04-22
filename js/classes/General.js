"use strict";
class General{
    //CONSTRUCTOR
    constructor() {
        //code to run on every page without explicit call
        console.log("gen0");
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

}

const general = new General();
