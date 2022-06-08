"use strict";
export default class ReleasePopup{

    //CONSTRUCTOR
    constructor(resIds, resData) {
        this.vars = {
            resIds              : resIds,
            resData             : resData,
            resIdsLength        : resIds.length,
            equipment           : "",
        };
        this.doms = {
            popup               : "",
            reviewButton        : "",
            releaseButton       : "",
        };

        this.initPopup();

    };

    //METHODS
    async initPopup(){
        this.createPopup();
        this.addButtonInteraction();
    };


    createPopup(){
        let content;
        if(this.vars.resIdsLength == 1){
            content = `<p>Möchtest du das Element dieser Bestellung ausgeben? Der Status dieser Reservierung wird auf "Ausgeborgt" gesetzt.</p>`;
        }else{
            content = `<p>Möchtest du die ${this.vars.resIdsLength} Elemente dieser Bestellung ausgeben? Der Status dieser Reservierungen wird auf "Reserviert" gesetzt.</p>`;
        }

        const popup = `
                	<div id="release-reservation-popup" uk-modal='{"bg-close" : true, "esc-close" : true, "stack" : true}'>
                        <div class="uk-modal-dialog uk-width-large uk-margin-auto-vertical">
                            <button class="uk-modal-close-default" type="button" uk-close></button>
                            <div class="uk-modal-header">                         
                                <h2 class="uk-modal-title uk-text-lead uk-margin-remove-bottom">Bestellung ausgeben</h2>
                            </div>
                            <div class="uk-modal-body release-modal-content">
                                ${content}            
                            </div>
                            <div class="releaseButtons uk-modal-footer uk-flex uk-flex-column uk-text-center">
                                <button class="uk-button reviewButton returnButton uk-button-default colorSecondary uk-margin-small-top uk-margin-small-bottom" type="button">Reservierung prüfen</button>
                                <button class="uk-button finalReleaseButton uk-button-default colorPrimary  proceedButton" type="button">Reservierungen ausgeben</button>
                            </div>
                        </div>
                    </div>
            `;

        $("body").append(popup);
        UIkit.modal('#release-reservation-popup').show();
        this.doms.popup = $('#nfc-listener-popup');
        this.doms.reviewButton = $(".reviewButton");
        this.doms.releaseButton = $(".finalReleaseButton");

    }


    addButtonInteraction(){
        this.doms.reviewButton.on("click", () => {
            this.review();
        });
        this.doms.releaseButton.on("click", () => {
            this.release();
        });
        this.addCloseFunction();
    }

    async review(){
        //redirects to review reservation
        general.redirectWithPost(this.vars.resData, "checklist.php");
    }

    async release(){
        //release reservations
        const response = await ajax.postResRelease(this.vars.resIds);
        const answerArray = JSON.parse(response);
        /*
        const answerArray = {
            "521430": true,
            "521431": true,
            "521432": true,
            "521447": "Reservierung konnte nicht ausgegeben werden",
            "521448": "Reservierung konnte nicht ausgegeben werden"
        };*/
        //this.vars.resIdsLength = 5;
        const content = $(".release-modal-content");
        let succeeded = [];
        let failed = [];
        //iterate throug all answers to display feedback
        for (const resId in answerArray) {
            const answer = answerArray[resId];
            //get number of succeeded releases
            if(answer === true){
                succeeded.push(resId);
            }else{;
                let obj = {};
                obj[resId] = answer;
                failed.push(obj);
            }
        }


        let successList = ``;
        let errorList = ``;

        //display feedback
        if(succeeded.length > 0){
            successList += `<h3 class="uk-text-default">Erfolgreich ausgegeben:</h3>`;
            successList += `<ul class="succesList uk-padding-remove uk-margin-small-left">`;
            for (const id of succeeded) {
                successList += `<li class="uk-text-meta uk-flex uk-flex-middle">
                                        <span class="uk-margin-small-right releaseIconSuccess" uk-icon="check"></span>
                                        <span>ID ${id}</span>                      
                                </li>`;
            }
            successList += `</ul>`;
        }

        if(failed.length > 0){
            errorList += `<h3 class="uk-text-default">Fehler bei der Ausgabe:</h3>`;
            errorList += `<ul class="succesList uk-padding-remove uk-margin-small-left">`;
            for (const error of failed) {
                const id = Object.keys(error)[0];
                const message = Object.values(error)[0];

                errorList += `<li class="uk-text-meta uk-flex uk-flex-middle">
                                    <span class="uk-margin-small-right releaseIconError" uk-icon="close"></span>
                                    <span class="uk-">ID ${id} : ${message}</span>
                                </li>`;
            }
            errorList += `</ul>`;
        }

        const detailList = `
            ${successList}
            ${errorList}
        `;

        const feedback = `
            <div class="feedbackSummary">
                <p class="uk-text-default uk-margin-small-bottom">
                    <span class="uk-margin-small-right releaseIconSuccess" uk-icon="check"></span>
                    <span>${succeeded.length} / ${this.vars.resIdsLength} Reservierungen wurden erfolgreich ausgegeben!</span>
                </p>
                <p class="uk-text-bold uk-margin-small-bottom">
                    <span class="uk-margin-small-right releaseIconError" uk-icon="close"></span>
                    <span>${failed.length} / ${this.vars.resIdsLength} Reservierungen konnten nicht ausgegeben werden!</span>
                </p>
            </div>
            <div class="feedbackDetails">
                <button href="#toggle-details" class="uk-button uk-button-default  uk-width-1-1" type="button" uk-toggle="target: #feedbackDetails; animation: uk-animation-slide-top-">
                Details
                <span uk-icon="chevron-up"></span>
                </button>
                <div id="feedbackDetails" class="uk-card uk-card-default uk-card-body uk-margin-small">
                    ${detailList}
                </div>
            </div>
        `;
        content.html(feedback);
        $(".releaseButtons").html('<button class="uk-button  returnButton uk-button-default colorPrimary uk-modal-close" type="button">Fenster schließen</button>');
        UIkit.toggle("#feedbackDetails").toggle();




        /* in case we want to add another modal to check
            UIkit.modal.confirm(modalText, {"stack":"true"}).then(async () => {
                //realese all reservations

            }, function () {
                console.log('Rejected.')
            });
*/
        //this.furtherEqInfo();
    }


    getEqFromRes(resId){
        const reservations = this.vars.resData.reservations;
        for (const res of reservations) {
            if(res.id == resId){
                return res.equipId;
            }
        }
    }

    furtherEqInfo(){
        //display detail info page when summary detail info is clicked
        $(".furtherEqInfo").on("click", (e) => {
            const eqId = e.delegateTarget.dataset.eqId;
            console.log(e.delegateTarget);
            console.log(eqId);
            //general.redirectWithPost(eqId, "equipment-detail.php");
        });
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

