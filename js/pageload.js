localStorage.setItem('siteloading', false);


function siteloading(i,count) {
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


function siteloading_check(func) {
    func();
    
    //set intervall
    var interval = setInterval(function() {
        if (localStorage.getItem('siteloading') == "true") {
            clearInterval(interval);
            func();
        }
    }
    , 1000);


}