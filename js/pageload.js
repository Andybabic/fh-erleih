class PageloaderState {

    //set local storage to false
    constructor() {
        //localStorage.setItem('siteloading', false);

    }

    
    siteloading(i,count) {
        count=count-1;
        if (i == count) {
            //save localstorage
            console.log("siteloading finished");
            localStorage.setItem('siteloading', true);
        }else(
            localStorage.setItem('siteloading', false)
        )
    }

    siteloading_check(func) {

        //set intervall
        var interval = setInterval(function() {
            func();
            if (localStorage.getItem('siteloading') == "true") {
                func();
                clearInterval(interval);
            
            }

            }
            , 1000);


        }

}
let pageLoadingState = new PageloaderState();


// save current time in local storage
function saveTime() {
    if (!document.hidden) {
        localStorage.setItem('lastinteract', new Date().getTime());
        var testvar=localStorage.getItem('lastinteract');

    }


}


