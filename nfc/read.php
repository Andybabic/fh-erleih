<?php

//get variable from url if not exists, set to default
$data = isset($_GET['d']) ? $_GET['d'] : '6267';

?>


<script>

    //get localstorage data lastinteract
    var lastinteract = localStorage.getItem('lastinteract');
    localStorage.setItem("nfcListener", "<?php echo $data; ?>");

    // if difference between lastinteract and current time is greater than 30 sekonds redirect to login page
    if (lastinteract != null) {
        var lastinteract = lastinteract;
        var now = new Date().getTime();
        var diff = now - lastinteract;
        console.log(diff);
        if (diff > 30000) {
            window.location.href = "../pages/overview.php";
        }
        else{

            window.close() ;

        }
    }else{
        window.location.href = "../pages/overview.php";
        

    }

 
    //save data in a cookie

    

</script>