"use strict";
import Ajax from '../classes/Ajax.js';

export default class Popup{

        //CONSTRUCTOR
        constructor(object, type) {
            this.vars = {
                popupType:              type,
            };
            this.doms = {
                base:                   object,
                bgLayer:                "",
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
            this.addInteraction();
        };


        createPopup(){
            let titleTxt;
            let titleIcon;
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
                    returnButtonTxt = "Abbrechen";
                    proceedButtonTxt = "Speichern";
                    break;
                case "extend":
                    titleTxt = "Verlängern";
                    titleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                    <path id="Pfad_23" data-name="Pfad 23" d="M2.679,39.363a.257.257,0,0,0,.439,0L5.734,35.8c.121-.165.064-.3-.128-.3H4.218a.3.3,0,0,1-.281-.379,7.487,7.487,0,0,1,7.079-6.337c4,0,7.249,3.619,7.249,8.068s-3.252,8.068-7.249,8.068a.971.971,0,0,0,0,1.932c4.954,0,8.985-4.486,8.985-10s-4.03-10-8.985-10c-4.423,0-8.107,3.576-8.847,8.266a.439.439,0,0,1-.4.382H.192c-.192,0-.249.134-.128.3Z" transform="translate(0 -26.855)" fill="#07f"/>
                                </svg>`;
                    returnButtonTxt = "Abbrechen";
                    proceedButtonTxt = "Verlängern";
                    break;
            }

            const popup = `
                <div class="popupBGLayer">
                    <div class="popup">
                        <span>
                            <h1 class="popupTitle">${titleTxt}</h1>
                            <span class="titleIcon">${titleIcon}</span>
                        </span>
                        <div class="popupContent">
                        
                        </div>
                        <div class="popupButtons">
                            <button class="returnButton">${returnButtonTxt}</button>
                            <button class="proceedButton">${proceedButtonTxt}</button>
                        </div>
                    </div>
                </div>
            `;

            $("body").append(popup);

            this.doms.bgLayer = $(".popupBGLayer");
            this.doms.popup = $(".popup");
            this.doms.returnButton = $(".returnButton");
            this.doms.proceedButton = $(".proceedButton");
        }

        setCustomContent(content){
            this.doms.popup.html(content);
        }

        setTitle(){
            //function to set title and title icon of popup
            if(title)$(".popupTitle").text(title);
            if(icon)$(".titleIcon").html(icon);
        }

        async addInteraction(){
            this.doms.returnButton.on("click", () => {
               this.closePopup();
            });

        }

        closePopup(){
            this.doms.bgLayer.remove();
        }



    }

