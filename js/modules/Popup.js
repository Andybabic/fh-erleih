"use strict";
import Ajax from '../classes/Ajax.js';

export default class Popup{

        //CONSTRUCTOR
        constructor(object, type) {
            this.vars = {
                popupType:              type,
                resId:                  $(object.target).parent(".swipe_box_back").attr("data-resId"),
                eqId:                   $(object.target).parent(".swipe_box_back").attr("data-eqId"),
            };
            this.doms = {
                base:                   object,
                popup:                  "",
                returnButton:           "",
                proceedButton:          "",
            };
            this.modules = {
                ajax:               new Ajax()
            };

            this.initPopup();

        };

        //METHODS
        initPopup(){
            //type specific popup content
            this.createPopup();
            this.addButtonInteraction();
        };


        createPopup(){
            this.vars.modalId = "modal-"+this.vars.popupType;
            let titleTxt;
            let titleIcon;
            let content;
            let returnButtonTxt;
            let proceedButtonTxt;

            //set type specific values
            switch (this.vars.popupType){
                case "report":
                    titleTxt = "Melden";
                    titleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                    <g id="Icon_feather-alert-circle" data-name="Icon feather-alert-circle" transform="translate(1 1)">
                                        <path id="Pfad_20" data-name="Pfad 20" d="M23,13A10,10,0,1,1,13,3,10,10,0,0,1,23,13Z" transform="translate(-3 -3)" fill="none" stroke="#f80" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        <path id="Pfad_21" data-name="Pfad 21" d="M18,12v6" transform="translate(-8 -6.75)" fill="none" stroke="#f80" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                        <path id="Pfad_22" data-name="Pfad 22" d="M18,24h0" transform="translate(-8 -10)" fill="none" stroke="#f80" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                    </g>
                                </svg>`;
                    content = `
                        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            <label><input class="uk-radio" type="radio" name="modal-report-radio" value="damage" checked><span class="uk-text-default uk-margin-small-left">Schaden melden</span></label>
                            <label><input class="uk-radio" type="radio" name="modal-report-radio" value="todo"><span class="uk-text-default uk-margin-small-left">Todo vermerken</span></label>
                            <label><input class="uk-radio" type="radio" name="modal-report-radio" value="cancel"><span class="uk-text-default uk-margin-small-left">Reservierung stornieren</span> </label>                        </div>
                        <div class="modal-reportTextArea uk-align-center">
                            <p class="modal-inputDescription uk-margin-remove-bottom">Bitte beschreibe den Schaden kurz!</p>
                            <textarea class="uk-textarea uk-height-small"></textarea>
                        </div>
                        <div class="report-errorMessage"></span></div>

                    `;
                    returnButtonTxt = "Abbrechen";
                    proceedButtonTxt = "Speichern";
                    break;
                case "extend":
                    titleTxt = "Verlängern";
                    titleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path id="Pfad_23" data-name="Pfad 23" d="M2.679,39.363a.257.257,0,0,0,.439,0L5.734,35.8c.121-.165.064-.3-.128-.3H4.218a.3.3,0,0,1-.281-.379,7.487,7.487,0,0,1,7.079-6.337c4,0,7.249,3.619,7.249,8.068s-3.252,8.068-7.249,8.068a.971.971,0,0,0,0,1.932c4.954,0,8.985-4.486,8.985-10s-4.03-10-8.985-10c-4.423,0-8.107,3.576-8.847,8.266a.439.439,0,0,1-.4.382H.192c-.192,0-.249.134-.128.3Z" transform="translate(0 -26.855)" fill="#07f"/>
                                </svg>`;
                    content = `<input type="text" readonly="readonly" id="datepicker-popup" placeholder="Tag auswählen">`;
                    returnButtonTxt = "Abbrechen";
                    proceedButtonTxt = "Verlängern";
                    break;
            }

            const popup = `
                	<div id="${this.vars.modalId}" uk-modal='{"bg-close": false, "esc-close": false}'>
                        <div class="uk-modal-dialog uk-width-large uk-margin-auto-vertical">
                            <button class="uk-modal-close-default" type="button" uk-close></button>
                            <div class="uk-modal-header uk-flex uk-flex-middle">                         
                                    <h2 class="uk-modal-title uk-text-lead uk-margin-remove-bottom">${titleTxt}</h2>
                                    <span class="titleIcon uk-margin-small-left">${titleIcon}</span>
                            </div>
                            <div class="uk-modal-body">
                                ${content}                            
                            </div>
                            <div class="uk-modal-footer uk-text-right uk-flex uk-child-width-1-2">
                                <button class="uk-button  proceedButton uk-button-default colorPrimary uk-modal-close" type="button">${returnButtonTxt}</button>
                                <button class="uk-button  proceedButton uk-button-default colorPrimary  proceedButton" type="button">${proceedButtonTxt}</button>
                            </div>
                        </div>
                    </div>
            `;

            $("body").append(popup);
            UIkit.modal(`#${this.vars.modalId}`).show();

            this.doms.popup = $(`#${this.vars.modalId}`);
            this.doms.returnButton = $(".returnButton");
            this.doms.proceedButton = $(".proceedButton");

            this.addSpecificFunctions();
        }


        addButtonInteraction(){
            this.addProceedFunction();
            this.addCloseFunction();
        }

        async addSpecificFunctions(){
            switch (this.vars.popupType){
                case "report":
                    //elements
                    const textAreaWrapper = $(".modal-reportTextArea");
                    const textArea = $(".modal-reportTextArea textarea");
                    //prepare data 
                    //new api request for equipment to get damage and todo field values
                    const equipment = await this.modules.ajax.getEquipmentById(this.vars.eqId);
                    this.vars.equipment = equipment;
                    if(this.vars.equipment.infoMail == null)this.vars.equipment.infoMail = "";
                    const reservation = await this.modules.ajax.getResById(this.vars.resId);
                    this.vars.reservation = reservation;

                    if(!equipment || !reservation){
                        this.vars.equipmentRequest = false;
                        $(".proceedButton").remove();
                    }else{
                        this.vars.equipmentRequest = true;
                        this.vars.reportDamage = equipment["damage"];
                        this.vars.reportTodo = equipment["todo"];
                    }
                
                    //for first state
                    this.vars.reportState = "damage";
                    if(this.vars.equipmentRequest){
                        //if equipment request was sucessfull insert value
                        textArea.attr("placeholder", "Schadensmeldung");
                        textArea.val(this.vars.reportDamage);
                    }else{
                        textArea.attr("placeholder", "Fehler bei der API Abfrage!");
                    }
                    
                    //on change of radio button changes state of report popup and adds funcions
                    $(".uk-modal-body .uk-radio[name='modal-report-radio']").on("change", (e) => {
                        const val = e.target.value;
                        this.vars.reportState = val;
                        
                        //actions for specific states
                        if(val == "damage"){
                            //set value to textarea
                            $(".modal-inputDescription").text("Bitte beschreibe den Schaden kurz!");
                            textArea.attr("placeholder", "Schadensmeldung");
                            if(this.vars.equipmentRequest){
                                textArea.val(this.vars.reportDamage);
                            }else{
                                textArea.attr("placeholder", "Fehler bei der API Abrage!");
                            }
                        }else if(val == "todo"){
                            //set value to textarea
                            $(".modal-inputDescription").text("Beschreibe kurz, was zu tun ist.");
                            textArea.attr("placeholder", "Todo Eintrag");
                            if(this.vars.equipmentRequest){
                                this.vars.reportTodo ? textArea.val(this.vars.reportTodo) :
                                textArea.val(this.vars.reportTodo);
                            }else{
                                textArea.attr("placeholder", "Fehler bei der API Abfrage");
                            }
                        }else if(val == "cancel"){
                            $(".modal-inputDescription").text("Diese Reservierung wird storniert. Achtung, kann nicht rückgängig gemacht werden!");
                            textArea.val("");
                            textArea.attr("placeholder", "Stornierungsgrund");
                        }
                    });
                    textArea.on("keyup touchend", (e) => {
                        if(this.vars.reportState == "damage"){
                            this.vars.reportDamage = e.target.value;
                        }else if(this.vars.reportState == "todo"){
                            this.vars.reportTodo = e.target.value;
                        }else if(this.vars.reportState == "cancel"){
                            this.vars.reportCancel = e.target.value;
                        }
                  
                    });
                    break;
                case "extend":
                    const datePicker = new Datepicker('#datepicker-popup', {
                        inline: true,
                        time: true,
                        openOn: "today",
                        min: new Date(),
                        defaultTime: { start: [8, 30]},
                        onChange: (date) => {
                            if(date){         
                                const hour = date.getHours();
                                const minutes = date.getMinutes();             
                                const dateFormated = general.formatDate(date)+` ${hour<10? "0":""}${hour}:${minutes}:00`;
                                this.vars.selectedDate = dateFormated;
                            }
                        },
                    });
                    break;
            }
            
        }

        async addProceedFunction(){
            //if proceed button is clicked
            $(".proceedButton").on("click", async () => {
                const errorText = $(".report-errorMessage");
                let empty = true;
                let apiAnswer = false;
                switch (this.vars.popupType){
                    case "report":
                        if(this.vars.reportState == "damage"){
                            if(this.vars.reportDamage != "" && this.vars.reportTodo != undefined){
                                empty = false;
                                this.vars.equipment.damage = this.vars.reportDamage;
                                apiAnswer = await this.modules.ajax.putEquipment(this.vars.eqId, this.vars.equipment);
                            }
                        }else if(this.vars.reportState == "todo"){
                            if(this.vars.reportTodo != "" && this.vars.reportTodo != undefined){
                                empty = false;
                                this.vars.equipment.todo = this.vars.reportTodo;
                                apiAnswer = await this.modules.ajax.putEquipment(this.vars.eqId, this.vars.equipment);
                            }
                        }else if(this.vars.reportState == "cancel"){
                            if(this.vars.reportCancel != "" && this.vars.reportCancel != undefined){
                                empty = false;
                                const cancelMessage = `<h2 class="uk-text-large">Wirklich stornieren?</h2><p>Bist du sicher, dass du diese Reservierung stornieren möchtest? Das kann später nicht mehr rückgängig gemacht werden!</p>`
                                UIkit.modal.confirm(cancelMessage, {stack:true}).then(async () => {
                                    const cancelValue = [{
                                        "id": this.vars.resId*1,
                                        "grund": this.vars.reportCancel
                                    }];
                                    apiAnswer = await this.modules.ajax.deleteReservation(cancelValue);
                                    console.log(apiAnswer);
                                }, function () {
                                    console.log('Rejected.');
                                });
                            }
                        }
                        break;
                    case "extend":
                        if(this.vars.selectedDate){
                            apiAnswer = this.modules.ajax.extendReservation(this.vars.resId, this.vars.selectedDate);
                        }else{
                          $("#datepicker-popup").val("Kein gültiges Datum!");
                          const d = new Date(this.vars.selectedDate);
                        }
                        break;
                }
                if(apiAnswer){
                    UIkit.modal(`#${this.vars.modalId}`).hide();
                    this.removePopup();
                    //change damage to cancel later
                    if(this.vars.reportState == "cancel"){
                        const resContainer = $("body").find(`[data-resid='${this.vars.resId}']`).parent(".Swipe_container");

                        //remove deleted element & display undo button
                        resContainer.hide();
                        this.displayUndoCancel(resContainer, this.vars.resId);
                    }
                }else{
                    if(empty){
                        errorText.html("<span uk-icon=\"icon: warning\"></span><span>Das Textfeld darf nicht leer bleiben!</span>");
                    }else{
                        errorText.html("<span uk-icon=\"icon: warning\"></span><span>Leider konnte die Änderung gerade nicht durchgeführt werden!</span>");
                    }
                }
            });
        }

        addCloseFunction(){
            UIkit.util.on(document, 'hidden', `#${this.vars.modalId}`, () => {
                this.removePopup();
            });
        }

        displayUndoCancel(resObject){
            const body = `
                <h2 class="uk-text-default">Das Element mit der ID ${this.vars.resId} wurde entfernt.</h2>
                <button id="undoCancel" class="uk-button uk-button-default">Rückgängig machen</button>
            `;
            UIkit.notification({
                message: body,
                status: 'primary',
                pos: 'bottom-center',
                timeout: 8000
            });
            $("#undoCancel").on("click", () => {
                this.vars.reservation.statusId = this.vars.originalResStatus;
                let changeResStatus = false;
                if(this.vars.originalResStatus == 2){
                    changeResStatus = this.modules.ajax.bookReservation(this.vars.resId);
                }else if(this.vars.originalResStatus == 3){
                    changeResStatus = this.modules.ajax.handOverReservation(this.vars.resId);
                }else if(this.vars.originalResStatus == 4){
                    changeResStatus = this.modules.ajax.takeBackReservation(this.vars.resId);
                }
                if(changeResStatus){
                    resObject.show();
                }else{
                    UIkit.notification({
                        message: 'Wiederherstellung war leider nicht möglich',
                        status: 'primary',
                        pos: 'bottom-center',
                        timeout: 8000
                    });
                }

            });
        }


        extendFunction(){
            //functions for popup type extend

            

            this.doms.proceedButton.on("click", () => {
                
            });
        }

        reportFunctions(){

        }

        removePopup(){
            this.doms.popup.remove();
        }



    }

