$(document).ready(() => {
   function getSettingsFromLS(setting){
       //darkmode
       if(localStorage.settings){
           let settings = JSON.parse(localStorage.settings);
           if(settings.darkMode){
               $(":root").css("--bgColor", "#212529");
               $(":root").css("--textColor", "#f8f9fa");
           }
       }
   }
   getSettingsFromLS();
});