<?php
//get domain name
$domain = $_SERVER['HTTP_HOST'];

?>
<header uk-sticky>
    <nav  class="navbar">
        <a class="nav-branding"> Username</a>
        <ul class="nav-menu">
            <li class="nav-item">
                <a href="../pages/overview.php" class="nav-link">Übersicht</a>
            </li>
            <li class="nav-item">
                <a href="../pages/scan.php" class="nav-link">Eintragung</a>
            </li>
            <li class="nav-item">
                <a href="../pages/settings.php" class="nav-link">Einstellungen</a>
            </li>
            <li class="nav-item">
                <a href="<?php $domain ?>/functions/logout.php" class="nav-link">Abmelden</a>
            </li>
        </ul>

        <div class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>
</header>




         
            
