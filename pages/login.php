<?php
session_start();

//load all CSS and JS and modules
require_once("../functions/loader.php");

//create sassion
//destroy_start();

if (isset($_SESSION['login'])) {
    header("Location: ../index.php");
}
//get 
$state = $_GET['state'] ?? null;

if ($state == "error") {
    $massage = '<div class="uk-alert-danger"><p > wrong username or password </p></div>';
} else {
    $massage = '';
}


?>


<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Assi Login</title>
</head>
<body>

<div class="uk-section uk-section-muted uk-flex uk-flex-middle uk-animation-fade uk-background-cover"
     data-src="https://www.st-poelten.at/images/stpimport/articles/2019_11/1786-fhstp-martin-lifka-photography-3.jpg"
     uk-img="loading: eager" uk-height-viewport>

    <div class="uk-width-1-1 login">
        <div class="uk-container">
            <div class="uk-width-1-1@m">
                <div class="wrapper-login uk-margin uk-width-large uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large">


                    <img src="../style/image/logo.png" class="logo uk-align-center">

                    <?php echo $massage; ?>
                    <!-- Login -->
                    <form class="form-login" method="POST" action="../functions/login.php">
                        <div class="uk-margin">
                            <div class="uk-inline uk-width-1-1">
                                <span class="uk-form-icon" uk-icon="icon: mail"></span>
                                <input name="username" placeholder="Benutzername" class="uk-input uk-form-large"
                                       type="text" id="input-username" required/>
                            </div>
                        </div>
                        <div class="uk-margin">
                            <div class="uk-inline uk-width-1-1">
                                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                                <input name="password" placeholder="Passwort " class="uk-input uk-form-large"
                                       type="password" id="input-password" required/>
                            </div>
                        </div>
                        <div class="uk-margin">
                            <button type="sumbit" class="uk-button uk-button-primary uk-button-large uk-width-1-1">
                                Login
                            </button>
                        </div>
                    </form>
                    <div class="wrapper-feedback-login">

                    </div>
                    <div class="uk-text-small uk-text-center">

                        <p class="text-footer-top">
                        <p> Bei Problemen wenden Sie sich bitte an den Support unter: <br>
                            <a href="mailto:support@fhstp.ac.at">support@fhstp.ac.at</a> oder <br>
                            <a href="tel:+43 2742 313 228 111">+43 2742 313 228 111</a><br>
                        </p>
                        <p class="text-footer-bottom">
                            <span class="icon-copyright">&copy;</span>
                            Fachhochschule St. Pölten
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>

