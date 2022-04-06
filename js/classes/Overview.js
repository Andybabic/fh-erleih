"use strict";
import Reservierung from './Reservierung.js';
import {createResList as UIresList, createFilter as UIfilters} from '../modules/overview-modules.js';
import Ajax from './Ajax.js';

(function ($, window, document, undefined) {

    class OverviePage{

        //CONSTRUCTOR
        constructor($base) {
            this.doms = {
            base:                   $base,
            filterWrapper:          $base.find(".wrapper-filter"),
            listWrapper:            $base.find(".wrapper-list-res"),
            };
            this.modules = {
                request:        new Ajax(),
                reservierung:   new Reservierung(),
            };
            this.pageUrl = "https://verleihneu.fhstp.ac.at/fh_erleih/";


            this.initOverviewPage();

        };

        //METHODS

        async initOverviewPage(){
            if(await this.modules.request.checkAuth()){
                //there is a valid session
                this.setupOverviewPage();
            }else{
                //setup login page
                window.location.replace(this.pageUrl+"pages/login.php");
            }


        };

        async setupOverviewPage(){

            //setup components
            //addfilters
            this.doms.filterWrapper.append(UIfilters());
            //this.addDatePicker();

            //inital list request
            const initalResData = await this.modules.reservierung.getResByFilter(false,true,false);
            if(initalResData != -1){
                //if there is no error in promise
                this.doms.listWrapper.append(UIresList(initalResData));
            }

            //add interaction
            this.addInteraction();
            //TODO: add interaction for filter change and button click
        }

        addInteraction(){
            $(".btn-filter").on("click", (e) => {
                this.filterResList(e);
            });

        }

        async filterResList(e){
                const filter = $(e.target);
                if(filter.hasClass("filter-selected")){
                    filter.removeClass("filter-selected");
                    e.target.value = 0;
                }else{
                    filter.addClass("filter-selected");
                    e.target.value = 1;
                }
                const resData = await this.modules.reservierung.getResByFilter(Boolean($("#filter-today").val()*1), Boolean($("#filter-tomorrow").val()*1), Boolean($("#filter-timespan").val()*1));
                if(resData != -1){
                    //note: -1 not possible yet
                    const lastList = this.doms.listWrapper.children()[0];
                    const newList = UIresList(resData);
                    const newListDOM = newList.get(0);

                    if(!newListDOM.isEqualNode(lastList)){
                        //if new filter settings return a different list
                        this.doms.listWrapper.html(newList);
                        console.log("changed");
                    }else{
                        console.log("not changed");
                    }

                }

        }

        addDatePicker(){
            const datepicker = new Datepicker('#page-overview', {
                inline: true,
                ranged: true,
                time: false,
                weekStart: 1,
                yearRange: 1,
                openOn: "today",
                min: "today",
                onchange: (date) => {
                    alert(date);
                },
            });
        };

    }


    const init = () => {
        if ($("#page-overview").length > 0) {
            new OverviePage($("#page-overview"));
        }
    };
    init();

})(jQuery, window, document);