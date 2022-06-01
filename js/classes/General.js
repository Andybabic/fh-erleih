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



  groupResByDate(resList, listType) {
        //taks all reservations from a query and groups them by user
        //calls groupByUser afterwards and returns grouped reservations
        let type;
        //group dates depending on list type by "from" or by "to" date
        listType == "prepare" ? type = "from" : type = "to";

        const resByDates = [];

        for (const res of resList) {
            //slice to ignore time
            const date = res[type].slice(0, 10);
            //check if resByDates Array already contains the date
            if (resByDates.length > 0) {
                //check if date is already in array
                let contains = false;
                for (const resByDate of resByDates) {
                    if (resByDate.date === date) {
                        resByDate.reservations.push(res);
                        contains = true;
                    }
                }
                if (contains) {
                    //curent date is already in resByDates array

                } else {
                    resByDates.push({date: date, reservations: [res]});
                }
            } else {
                resByDates.push({date: date, reservations: [res]});
            }
        }

        return resByDates;
    }

    async groupResByUser(resByDates, listType) {
        for (const resByDate of resByDates) {
            const groupedByUser = await this.groupByUserHelper(resByDate.reservations, listType);
            resByDate.reservations = groupedByUser;
        }

        return resByDates;
    }

    async groupByUserHelper(resList, listType){
        //taks all reservations from a query and groups them by user
        let userIDs = [];
        let resByUser = [];
        for (let i = 0; i < resList.length; i++) {
            const res = resList[i];
            const userId = resList[i]["userId"];
            if (!userIDs.includes(userId)) {
                //if the current ID is not already in the userIDs array, add it
                userIDs.push(userId);
                //get user data for every user
                let user = await ajax.getUserById(userId);
                if (!user) {
                    user = {};
                    //if no userdata is available
                    user.firstName = "";
                    user.lastName = "";
                    user.mail = "";
                    user.tel = "";
                }


                resByUser.push(
                    {
                        "userId": userId,
                        "firstName": user["firstName"],
                        "lastName": user["lastName"],
                        "email": user["email"],
                        "tel": user["tel"],
                        "date": listType == "prepare" ? res["from"] : res["to"],
                        "reservations": [res],
                        "inPreparation": res["prepared"],
                        "preparedAll": res["prepared"],
                    }
                );
            } else {
                for (const user of resByUser) {
                    //add all further reservations to the existing user in the resByUser array
                    if (user["userId"] == userId) {
                        user["reservations"].push(res);
                        //if the prepared state of one individual reservation is not true the resbyuser object is not fully prepared
                        if (res["prepared"] == 0) {
                            user["preparedAll"] = 0;
                        }
                        //if prepared state of one reservation is true the resbyuser object is in preparation
                        if (res["prepared"] == 1) {
                            user["inPreparation"] = 1;
                        }
                    }
                }
            }
        }
        return resByUser;
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
                $(":root").css("--preparedAllColor", "#024a07");
                $(":root").css("--filterWrapperColor", "#003265")
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

          } else {
              $(".showFilterArrow").css({"transform": "rotate(0deg)"})
          }
          $(".filterWrapper").slideToggle();
      });


  }
}


window.general = new General();

