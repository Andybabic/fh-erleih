


<?php
//get domain name
$domain = $_SERVER['HTTP_HOST'];

?>



<div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar">
    <nav class="uk-navbar uk-navbar-container uk-margin">
        <div class="uk-navbar-left">
            <a class="uk-navbar-toggle" href="#">
               <span class="uk-margin-small-left">Username</span>
            </a>
        </div>
        <div class="uk-navbar-right">
            <a class="uk-navbar-toggle" href="<?php $domain ?>/functions/logout.php">
                <span class="uk-icon" uk-icon="sign-out"></span>

            </a>
        </div>
    </nav>
</div>