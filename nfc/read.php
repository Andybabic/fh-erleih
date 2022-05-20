<?php

//get variable from url if not exists, set to default
$data = isset($_GET['d']) ? $_GET['d'] : '6267';

?>


<script>
    console.log("test");
    //save data in a cookie
    localStorage.setItem("nfcListener", "<?php echo $data; ?>");
    window.close() ;
    

</script>

