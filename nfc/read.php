<?php

//get variable from url if not exists, set to default
$data = isset($_GET['d']) ? $_GET['d'] : 'testID';

?>


<script>

    //save data in a cookie
    localStorage.setItem("data", "<?php echo $data; ?>");
    window.close() ;
    

</script>

