class PageloaderState {

    //set local storage to false
    constructor() {
        //localStorage.setItem('siteloading', false);

    }

    
    siteloading(i,count) {
        count=count-1;
        console.log("fuck"+i+"/"+count);
        if (i == count) {
            //save localstorage

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
            , 100);


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

// save time every 2 seconds
setInterval(saveTime, 2000);
