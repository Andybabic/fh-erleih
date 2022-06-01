<?php
// session start


//get domain name
$domain = $_SERVER['HTTP_HOST'];
$userID = $_SESSION['username']
?>
<header>
    <nav  class="navbar uk-width-3-5@l uk-width-4-5@m uk-align-center">
        <a class="nav-branding"></a>
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

        <button class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
    </nav>
</header>



         
            
