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

            <ul class="uk-navbar-nav" uk-navbar="mode:hover">
                <li>
                    <a href="#" uk-icon="icon: menu; ratio:2;"></a>
                    <div class="uk-navbar-dropdown">
                        <ul class="uk-nav uk-navbar-dropdown-nav">
                            <li><a href="../pages/scan.php" class="uk-align-right">Eintragung</a></li>
                            <li><a href="../pages/settings.php" class="uk-align-right">Einstellungen</a></li>
                            <li><a href="<?php $domain ?>/functions/logout.php" class="uk-align-right"> Abmelden</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>


    </nav>
</div>