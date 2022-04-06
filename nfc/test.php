<?php



?>


<script>


    var lastscan;

    //listen to an new value in localStorage every 3 seconds
    setInterval(function(){
        var nrc_Scan = localStorage.getItem("data");
        if(nrc_Scan != lastscan){
            lastscan = nrc_Scan;
            alert(nrc_Scan);
        }
    }, 3000);
    


   
    //read  value "nrc_Scan" from  localStorage
    var nrc_Scan = localStorage.getItem("data");

    alert(nrc_Scan);

</script>

