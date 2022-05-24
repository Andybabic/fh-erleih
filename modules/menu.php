<?php
// session start


//get domain name
$domain = $_SERVER['HTTP_HOST'];
$userID = $_SESSION['username']
?>
<header uk-sticky>
    <nav  class="navbar uk-width-3-5@l  uk-align-center ">
        <a class="nav-branding">Hallo "<?=$userID ?>"</a>
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



         
            
