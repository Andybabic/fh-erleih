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
            console.log("done");
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
            console.log("init");
            }
            , 2000);


        }

}
let pageLoadingState = new PageloaderState();
