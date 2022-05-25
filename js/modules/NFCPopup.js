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
            console.log(this.vars.equipment);
        }
        console.log(this.vars.equipment)
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
                                <button class="uk-button  returnButton uk-button-default colorBackgroundGrey uk-modal-close" type="button">Fenster schließen</button>
                                ${this.vars.equipment ? `
                                    <button class="uk-button  moreInfosButton uk-button-default colorSecondary uk-margin-small-top uk-margin-small-bottom" type="button">Details anzeigen</button>
                                    <button class="uk-button  displayResButton uk-button-default colorPrimary  proceedButton" type="button">Bestellung zurücknehmen</button>` : ""}
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

