<head>
    <title>Dein Helfer</title>
</head>

<body>
    
<?php
//start sassion
session_start();
  

  
    // if user is logged in, redirect to index.php
    if(  isset( $_SESSION['login'] )  ){
        header("Location: pages/overview.php");
       }   
        //if user is not logged in, show login page
    else {

       
        header('Location: pages/login.php');
    }
        
    
?>


</body>