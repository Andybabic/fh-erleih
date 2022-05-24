"use strict";
import Ajax from '../classes/Ajax.js';
(function ($, window, document, undefined) {

    class NFCProcessing{

        //CONSTRUCTOR
        constructor($base) {
            this.vars = {
                eqId            :2833,
            };
            this.doms = {
                base            :$base,
            };
            this.modules = {
                ajax            :new Ajax()
            };

            this.initNFCProcessing();

        };

        //METHODS
        async initNFCProcessing(){
            //get reservation by equipment
            const reservation = await this.modules.ajax.getResByEq(this.vars.eqId);
            console.log(reservation);
        };


        async addInteraction(){

        }



    }


    const init = () => {
        if ($("#nfc-processing").length > 0 ) {
            new NFCProcessing($("#nfc-processing"));
        }
    };
    init();

})(jQuery, window, document);
