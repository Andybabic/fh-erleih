"use strict";
export default class NFCPopup{

    //CONSTRUCTOR
    constructor(eqId) {
        this.vars = {
            eqId                : eqId,
            equipment           : "",
        };
        this.doms = {
            popup               : "",
            returnButton        : "",
            moreInfoButton      : "",
            displayResButton    : "",


        };

        this.initPopup();

    };

    //METHODS
    async initPopup(){
        this.vars.equipment = await ajax.getExpandedEquipmentById(this.vars.eqId);
        if(this.vars.equipment){

        }

        this.createPopup();
        this.addButtonInteraction();
    };


    createPopup(){
        let content;
        if(!this.vars.equipment){
            content = `<p>Leider konnten gerade keine Daten zur am NFC Tag gespeicherten ID abgerufen werden.</p>`;
        }else{
            content = `
                <h3 class="uk-text-default uk-margin-remove">Folgendes Equipment wurde erkannt:</h3>
                <p class="uk-text-large uk-margin-remove">${this.vars.equipment.typeId["nameDe"]} ${this.vars.equipment["nameDe"]}</p>
            `;
        }
        const popup = `
                	<div id="nfc-listener-popup" uk-modal='{"bg-close" : true, "esc-close" : true, "stack" : true}'>
                        <div class="uk-modal-dialog uk-width-large uk-margin-auto-vertical">
                            <button class="uk-modal-close-default" type="button" uk-close></button>
                            <div class="uk-modal-header">                         
                                <h2 class="uk-modal-title uk-text-lead uk-margin-remove-bottom">NFC Scan erkannt</h2>
                            </div>
                            <div class="uk-modal-body">
                                ${content}            
                            </div>
                            <div class="uk-modal-footer uk-flex uk-flex-column uk-text-center">
                                <button class="uk-button js-initOnlyButton returnButton uk-button-default colorBackgroundGrey uk-modal-close" type="button">Fenster schließen</button>
                                ${this.vars.equipment ? `
                                    <button class="uk-button js-initOnlyButton moreInfosButton uk-button-default colorSecondary uk-margin-small-top uk-margin-small-bottom" type="button">Equipment anzeigen</button>
                                    <button class="uk-button  displayResButton uk-button-default colorPrimary" type="button">Reservierung prüfen</button>` : ""}
                            </div>
                        </div>
                    </div>
            `;

        $("body").append(popup);
        UIkit.modal('#nfc-listener-popup').show();
        this.doms.popup = $('#nfc-listener-popup');
        this.doms.returnButton = $(".returnButton");
        this.doms.moreInfoButton = $(".moreInfosButton");
        this.doms.displayResButton = $(".displayResButton");

    }


    addButtonInteraction(){
        this.doms.moreInfoButton.on("click", () => {
            console.log("more");
            this.showMoreInfos();
        });
        this.doms.displayResButton.on("click", () => {
            this.displayReservation();
        });
        this.addCloseFunction();
    }


    async showMoreInfos(){
        //displays all important infos concerning the scanned equipment
        if(this.vars.equipment){
            general.redirectWithPost(this.vars.equipment, "equipment-detail.php");
        }

    }

    async displayReservation(){
        //request the reservation based on the scanned equipment id and redirects to checklist
        const reservations = await ajax.getResByEq(this.vars.eqId);
        if(reservations){
            const lastRes = this.getEquipment(reservations);
            if(lastRes != undefined){
                const openReservations = await ajax.getOpenResByUser(lastRes["userId"]);
                const groupedRes = general.groupResByDate(openReservations, "return");
                this.vars.data = await general.groupResByUser(groupedRes, "return");
                this.vars.reservation = this.vars.data[0].reservations[0];
                this.changeContentForDisplayResState(true);
            }else{
                this.changeContentForDisplayResState(false);
            }
        }
    }

    getEquipment(edata) {
        //alle ausgeborgten equipment auslesen
        var result = edata.filter(equipment => equipment.statusId == 3 );
        var now = new Date();

        //wenn vorhanden, dann ausgeben
        if (result.length > 0) {
            var result = result.filter(equipment => new Date(equipment.to) > now-(3 * 24 * 60 * 60 * 1000) );
            return result[0];
        }else
            {
            //alle reservierten nicht abgeholten equipment auslesen
            var result= edata.filter(equipment => equipment.statusId == 1 || equipment.statusId == 2 );

            // sortieren nach from asc

            result.sort(function(a, b) {
                return new Date(a.from) - new Date(b.from);
            });

            var twoDaysAgo = new Date(now.getTime() - (2 * 24 * 60 * 60 * 1000));
            var result = result.filter(equipment => new Date(equipment.from) > twoDaysAgo );
            result = result.filter(equipment => new Date(equipment.from) < now);

            if (result.length > 0) {
                return result;
            }
            else {
            //return first element of array
                return result[0];
            }
        }
    }

    changeContentForDisplayResState(reservationFound){

        //head
        $("#nfc-listener-popup .uk-modal-title").html("Reservierungs Abfrage");

        if(reservationFound){
            //body
            let resList = `<ul class="uk-list uk-list-striped">`;
            //define icons
            const returnIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="19.75" height="22.571" viewBox="0 0 19.75 22.571" data-mode="return">
                    <path id="Icon_awesome-shopping-bag" data-name="Icon awesome-shopping-bag" d="M15.518,7.054V5.643a5.643,5.643,0,1,0-11.286,0V7.054H0V19.045a3.527,3.527,0,0,0,3.527,3.527h12.7a3.527,3.527,0,0,0,3.527-3.527V7.054ZM7.054,5.643a2.821,2.821,0,1,1,5.643,0V7.054H7.054Zm7.054,5.29a1.058,1.058,0,1,1,1.058-1.058A1.058,1.058,0,0,1,14.107,10.933Zm-8.464,0A1.058,1.058,0,1,1,6.7,9.875,1.058,1.058,0,0,1,5.643,10.933Z"/>
                    </svg>`;


            //iterate through days
            for (const resByDate of this.vars.data) {
                const reservations = resByDate.reservations;
                let listItem
                for (const res of reservations) {
                    //create an id for current reservation to store it and get it later on click

                    const date = new Date(res.date);
                    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    const dateStr = date.toLocaleDateString("de-DE", dateOptions);
                    //add class if reservation is in preparation or fully prepared

                    listItem = `<li class="reservation uk-flex uk-flex-between uk-flex-bottom">
                                <div>
                                    <span>${res.userId}</span>
                                    <h2>${general.formatName(res.firstName)} ${general.formatName(res.lastName)}</h2>
                                    <div class="listDateandDep">
                                        <p>${dateStr}</p>  
                                        <p class="departments">`;
                    //create list of departments
                    let departmentList = new Set();
                    console.log(res);
                    for (const subRes of res["reservations"]) {
                        console.log(subRes);
                        departmentList.add(subRes.departmentId);
                    }
                    console.log(departmentList);

                    for (const item of departmentList) {
                        listItem += `<span class="departmentLabel"></span>`;
                    }

                    listItem += `            
                                        </p>
                                    </div>  
                                </div>
                                <div class="resCircleWrapper uk-flex uk-flex-column">
                                    <div class="quantityCircle ${res.reservations.length > 25 ? ( res.reservations.length > 50 ? 'largeReservation' : 'mediumReservation') : ''}">
                                        <div class="quantityIcon"> 
                                            <p> ${res.reservations.length}</p>
                                        </div>
                                    </div>
                                    <div class="modeCircle">
                                        <div class="modeIcon">
                                            ${returnIcon}
                                        </div>
                                    </div>
                                </div>
                                
                            </li>`;
                }


                //append li to reslist or to preparedlist depending on preparedAll attribute
                resList += listItem;
            }

            resList += `</ul>`;
            let bodyContent = `
            <p>Folgende Reservierung wurde anhand des gescannten Equipments erkannt:</p>
            ${resList}
        `;

            $("#nfc-listener-popup .uk-modal-body").html(bodyContent);

        }else{
            //if no reservation was found
            $("#nfc-listener-popup .uk-modal-body").html("<p>Zu diesem Equipment konnte keine passende Reservierung gefunden werden.</p>");
        }


        //footer
        if(reservationFound){
            $("#nfc-listener-popup .uk-modal-footer").html(
                `<button class="uk-button proceedToReservation uk-button-default colorPrimary" type="button">Reservierung anzeigen</button>`
            );

            $(".proceedToReservation").on("click", () => {
                general.redirectWithPost(this.vars.reservation, "checklist.php");
            });
        }else{
            $("#nfc-listener-popup .uk-modal-footer").html(
                `<button
                class="uk-button js-initOnlyButton returnButton uk-button-default colorBackgroundGrey uk-modal-close"
                type="button">Fenster schließen</button>`
            );
        }


    }




    addCloseFunction(){
        UIkit.util.on(document, 'hidden', '#nfc-listener-popup', () => {
            this.removePopup();
        });
    }

    removePopup(){
        this.doms.popup.remove();
    }



}

