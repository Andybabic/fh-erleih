<?php
//get domain name
$domain = $_SERVER['HTTP_HOST'];

?>


<!-- <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky; bottom: #transparent-sticky-navbar"> -->
    <!-- <nav class="uk-navbar uk-navbar-container uk-margin">
        <div class="uk-navbar-left">


            <a class="uk-navbar-toggle" href="#">
                <span class="uk-margin-small-left">Username</span>
            </a>
        </div> -->

      
        <header>
        <nav class="navbar">
            <a  class="nav-branding"> Username</a>
            <ul class="nav-menu">
            <li class="nav-item">
                    <a href="../pages/overview.php" class="nav-link">Übersicht</a>
                </li>
                <li class="nav-item">
                    <a href="../pages/scan.php" class="nav-link">Eintragung</a>
                </li>
                           <li class="nav-item">
                    <a href="../pages/settings.php"  class="nav-link">Einstellungen</a>
                </li>
                <li class="nav-item">
                    <a href="<?php $domain ?>/functions/logout.php"  class="nav-link">Abmelden</a>
                </li>
            </ul>

            <div class="hamburger">
<span class="bar"></span>
<span class="bar"></span>
<span class="bar"></span>
            </div>
        </nav>
    </header>

    <script>
 const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  
    </script>




         
            
    <!-- </nav>

</div> -->


<!-- </nav>
</div> -->