"use strict";
import Ajax from './Ajax.js';
import NFCPopup from '../modules/NFCPopup.js';

class General {
    //CONSTRUCTOR
    constructor() {
        //code to run on every page without explicit call
        window.ajax = new Ajax();
        //applies darkmode to every page if selected
        this.addDarkmode();
        //burger button menu functionality
        this.openBurgerMenu();
        //checks on page load if there is an ID from NFC scan in localstorage
        this.checkForNFCId();
        //nfc listener
        this.nfcListener();
        //for all back buttons
        this.goPageBack();
        //opens Div of Filter Buttons
        this.openFilterButtonDiv();
    }

  //FORMAT - all functions that format something
  formatName(string) {
    //function to format Names with Umlaut
    if (string == undefined) return "";
    const badValues = {
      "Ã¼": "ü",
      "Ã-": "Ö",
      Ãœ: "Ü",
      "Ã¤": "ä",
      "Ã¶": "ö",
      ÃŸ: "ß",
      Ã: "Ä",
    };
    for (const key in badValues) {
      string = string.replaceAll(key, badValues[key]);
    }
    return string;
  }

  formatDate(date) {
    //formats date object to rest api standard
    const offset = date.getTimezoneOffset();
    let newDate = new Date(date.getTime() - offset * 60 * 1000);
    newDate = newDate.toISOString().split("T")[0];

    return newDate;
  }


  //LOADER+
  toggleLoader(DOMPos) {
    //toggles loader
    if ($(".loader-horizontal").length) {
      $(".loader-horizontal").slideToggle();
    } else {
      const loader = `
                    <div class="loader-horizontal">
                      <div class="loader-horizontal__dot"></div>
                      <div class="loader-horizontal__dot"></div>
                      <div class="loader-horizontal__dot"></div>
                    </div>
                `;

            $(loader).insertAfter(DOMPos);
        }
    }

    //DARKMODE
    addDarkmode() {
        //checks if darkmode is selected and adds it
        if (localStorage.settings) {
            let settings = JSON.parse(localStorage.settings);
            if (settings.darkMode) {
                $(":root").css("--colorBackgroundClean", "#212529");
                $(":root").css("--colorBackgroundGrey", "#495057");
                $(":root").css("--textColor", "#f8f9fa");
            }
        }
    }

    //MENU
    openBurgerMenu() {
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
    }

    //PAGE REDIRECT
    redirectWithPost(data, url) {
        const params = {
            "data": JSON.stringify(data)
        };
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", url);

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }
        document.body.appendChild(form);
        form.submit();
    }

    //NFC
    checkForNFCId() {
        //checks at pageload if there is an ID from a NFC Scan in the localstorage
        if (localStorage.nfcListener && localStorage.nfcListener != null) {
            console.log(localStorage.nfcListener);
            this.createPopupFromScannedId(localStorage.nfcListener);
        }
    }

    nfcListener() {
        //listens to changes in localstorage
        window.addEventListener('storage', (e) => {
            if (e.key == "nfcListener" && e.newValue != null) {
                this.createPopupFromScannedId(e.newValue);
            }
        });
    }

    createPopupFromScannedId(id) {
        const eqId = parseInt(id);
        if (!isNaN(eqId)) {
            localStorage.nfcListener = null;
            new NFCPopup(eqId);
        }
    }

  goPageBack(){
    $(".backButton").on("click", () =>{
      window.history.back();
    });
  }

  openFilterButtonDiv() {
      var coll = document.getElementsByClassName("aufklappen");

      $(".aufklappen").on("click", (e) => {
          if ($(".filterWrapper").is(":visible")) {
              $(".showFilterArrow").css({"transform": "rotate(180deg)"})
               $(".aufklappen").css({"background-color": "#004f94B3"})

          } else {
              $(".showFilterArrow").css({"transform": "rotate(0deg)"})
               $(".aufklappen").css({"background-color": "var(--colorPrimary)"})
          }
           $(".aufklappen").toggleClass("var--(colorPrimary)");
          $(".filterWrapper").slideToggle();


      });


  }
}


window.general = new General();

