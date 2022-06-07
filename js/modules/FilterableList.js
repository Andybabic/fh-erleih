"use strict";
import ReleasePopup from './ReleasePopup.js';
import LuckyWheel from "./LuckyWheel.js";
export default class FilterableList {

    //CONSTRUCTOR
    constructor($base, listType) {
        this.filter = {
            today: true,
            tomorrow: false,
            timespan: [],
        };
        this.vars = {
            listType: listType,
            selectionClass: "filterSelected",
            pickerHtml: ""
        };
        this.doms = {
            base: $base,
            filterWrapper: $base.find(".filterWrapper"),
            listWrapper: $base.find(".listWrapper"),
        };
        this.departments = {
            //should be created dynamically later
            1: "Fotografie",
            2: "Audio",
            3: "Video",
            5: "Interaktive Medien",
        }
        this.pageUrl = "https://verleihneu.fhstp.ac.at/fh_erleih/";


        this.initOverviewPage();

    };

    //METHODS

    //TODO: set departments function to create all departments dynamically (this.departments, whitespace entfernen bei namen)

    async initOverviewPage() {
        //check for stored settings
        if (localStorage.settings) {
            const settings = JSON.parse(localStorage.settings);
            //take stored departments
            if (settings.departments) this.departments = settings.departments;
        }

        //init filter buttons
        this.addFilter();

        if (localStorage.filterValues) {
            //if there are filter preferences stored apply them
            this.filter = JSON.parse(localStorage.filterValues);
        } else {
            //if no values are stored set all department filter
            for (const key in this.departments) {
                const filter = this.departments[key];
                this.filter[filter] = true;
            }
        }
        this.setFilterStyle();

        //add time picker wrapper
        const pickerWrapper =
            `<div class="pickerWrapper">
                    <input type="hidden" id="ranged">
                    <button id="submitSpanFilter" class="filterBtn dateFilter" data-filter="timespan">Filter setzen</button>
                </div>`
        this.doms.filterWrapper.append(pickerWrapper);

        //TODO datepicker default date from localstorage
        //init time picker
        let init = true;
        var timepicker = new Datepicker('#ranged', {
            inline: true,
            ranged: true,
            time: false,
            onChange: (date) => {
                if (date.length > 1) {
                    let arr = [];
                    arr.push(general.formatDate(date[0]));
                    arr.push(general.formatDate(date[date.length - 1]));
                    this.filter.timespan = arr;
                    console.log(date);
                } else if (date.length === 1) {
                    console.log(date);
                    this.filter.timespan = [];
                    this.filter.timespan.push(general.formatDate(date[0]));
                }
                this.addPickerStyle();
                //store current html of picker to set it again later

            },
            onInit: (e) => {
                if(this.filter.pickerHtml != "" && this.filter.pickerHtml != undefined){
                    $(".datepicker__wrapper").html(this.filter.pickerHtml);
                }
                $(".pickerWrapper").hide();
            },
            onRender: (e) => {
                if(!init){
                    this.filter.pickerHtml = e.outerHTML;
                    localStorage.filterValues = JSON.stringify(this.filter);
                }
                init = false;
            }
        });

        //init list
        this.getList();

        //add event listeners
        this.addFilterInteraction();
    };

    addFilter() {
        //generate department buttons
        let departmentFilter = `
                <div class="departmentFilter">
            `;

        for (const key in this.departments) {
            let id = key;
            let name = this.departments[key];
            departmentFilter += `<button class="filterBtn ${this.vars.selectionClass}" data-filter="${name}">${name}</button>`;
        }
        departmentFilter += '</div>';


        const timeFilter = `
                    <div class="timeFilter">
                        <button class="filterBtn ${this.vars.selectionClass}" data-filter="today">Heute</button>
                        <button class="filterBtn  ${this.vars.selectionClass}" data-filter="tomorrow">Morgen</button>
                        <button class="filterBtn " data-filter="togglePicker">Datum</button>
                    </div>
            `;
        const prepareFilters = `
                <button class="filterBtn ">Prepare</button>
            `;
        const returnFilters = `
                <button class="filterBtn">Return</button>
            `;

        const filters = `
                ${departmentFilter}
                ${timeFilter}       
            `;
        //${this.vars.listType === "prepare" ? prepareFilters : returnFilters}

        // append all filters to DOM
        this.doms.filterWrapper.append(filters);
    }

    addPickerStyle() {
        //adds class to first and last element of picker span selection
        const selection = document.getElementsByClassName("is-selected");
        for (let i = 0; i < selection.length; i++) {
            if (i == 0 || i == selection.length - 1) {
                selection[i].classList.add("selected-ends");
            }
        }
    }

    addFilterInteraction() {
        //adds onclick events to all filter buttons
        //return void
        //call

        $(".filterBtn").on("click", (e) => {
            const button = $(e.target);
            const filter = e.target.dataset.filter;
            const selected = this.filter[filter];

            //define action for every filter button
            //if today or tomorrow button are selected timespan filter is unset
            //if timespan button is set today and tomorrow buttons are unset
            switch (filter) {
                case "today":
                    if (selected) {
                        this.filter.today = false;
                    } else {
                        this.filter.today = true;
                        this.filter.timespan = [];
                    }
                    break;
                case "tomorrow":
                    if (selected) {
                        this.filter.tomorrow = false;
                    } else {
                        this.filter.tomorrow = true;
                        this.filter.timespan = [];
                    }
                    break;
                case "togglePicker":
                    //display time picker
                    $(".pickerWrapper").slideToggle();
                    break;
                case "timespan":
                    if (this.filter.timespan.length > 0) {
                        //if there is a valid timespan set
                        this.filter.today = false;
                        this.filter.tomorrow = false;

                        //hide picker again
                        $(".pickerWrapper").slideToggle();
                    } else {
                        alert("please select a date");
                    }
                    break;
                default:
                    //for all other filters (currently only
                    this.filter[filter] ? this.filter[filter] = false : this.filter[filter] = true;
            }

            this.setFilterStyle();

            //get overview list based on filter settings
            localStorage.filterValues = JSON.stringify(this.filter);
            if (filter != "togglePicker") {
                //exception for toggle picker because this button only toggles date picker and doesnt trigger a list reload
                this.getList();
            }
        });
    }

    setFilterStyle() {
        //add or remove active classes
        const filterBtns = document.getElementsByClassName("filterBtn");
        for (const btn of filterBtns) {
            if (btn.dataset.filter != "togglePicker") {
                let filterType = btn.dataset.filter;
                let filterValue = this.filter[filterType];

                if (btn.classList.contains(this.vars.selectionClass)) {
                    if (filterValue == false) {
                        btn.classList.remove(this.vars.selectionClass);
                    }
                } else {
                    if (filterValue == true) {
                        btn.classList.add(this.vars.selectionClass);
                    }
                }
            } else {
                //picker toggle button
                if (!btn.classList.contains(this.vars.selectionClass) && this.filter.timespan.length > 0) {
                    btn.classList.add(this.vars.selectionClass);
                } else if (btn.classList.contains(this.vars.selectionClass) && this.filter.timespan.length == 0) {
                    btn.classList.remove(this.vars.selectionClass);
                }
            }

        }
    }

    async getList() {
        general.toggleLoader($(".filterButtonWrapper"));
        //gets the reservations (by department) from
        const dates = this.getFilterDates();
        const startDate = dates[0];
        let endDate;

        if (dates.length == 1) {
            //if there is only one date startdate = enddate
            endDate = dates[0];
        } else {
            endDate = dates[1];
        }
        //set type of list to get either prepare or return list
        let type;
        this.vars.listType == "prepare" ? type = "out" : type = "in";

        //get the reservation data by department and timespan
        //for every department that has a set filter
        let departmentData = [];
        for (const key in this.departments) {
            const name = this.departments[key];
            if (this.filter[name] != undefined && this.filter[name]) {
                //if the filter is set and true
                const data = await ajax.getResByDepartmentTimespan(key, startDate, endDate, type);
                if (!data) {
                    //if data returns false error handling
                    this.displayList("error");
                    return;
                }

                //add departmentId to every entry
                for (const d of data) {
                    d.departmentId = key;
                }
                departmentData.push(data);
            }
        }
        //merge data of every department together
        departmentData = [].concat.apply([], departmentData);

        //display list depending on received data
        if (departmentData.length == 0) {
            this.displayList("empty");
        } else {
            //group the list by day and by user
            //trim because error if whitespace is on end of userId
            for (const d of departmentData) {
                d.userId = d.userId.trim();
            }
            const groupedData = general.groupResByDate(departmentData, this.vars.listType);
            const groupedByUser = await general.groupResByUser(groupedData, this.vars.listType);
            //display list
            this.displayList(groupedByUser);
        }
    }

    displayList(data) {
        if (data == "error") {
            const errorMessage = `
                    <h2>Irgendwas stimmt hier nicht!</h2>
                    <p>Leider können wir die Reservierungen momentan nicht abrufen.</p>
                    
                `;
            this.doms.listWrapper.html(errorMessage);
        } else if (data == "empty") {
            const emptyMessage = `
                <div class="allDoneMessage uk-align-center uk-flex uk-flex-center uk-flex-column uk-flex-middle">
                    <p>Alles erledigt!</p>   
                    <div id="allDoneWrapper">
                    
                    </div>
                </div>
                `;
            this.doms.listWrapper.html(emptyMessage);
            new LuckyWheel($("#allDoneWrapper"));
        } else {
            let resList = `<ul class="uk-list uk-list-striped">`;
            let doneList = `<ul class="doneList uk-list uk-list-striped">`;
            //define icons
            const prepareIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16.929" height="22.571" viewBox="0 0 16.929 22.571">
                        <path id="Icon_awesome-clipboard-list" data-name="Icon awesome-clipboard-list" d="M14.812,2.821H11.286a2.821,2.821,0,1,0-5.643,0H2.116A2.117,2.117,0,0,0,0,4.937V20.455a2.117,2.117,0,0,0,2.116,2.116h12.7a2.117,2.117,0,0,0,2.116-2.116V4.937A2.117,2.117,0,0,0,14.812,2.821ZM4.232,18.692A1.058,1.058,0,1,1,5.29,17.634,1.055,1.055,0,0,1,4.232,18.692Zm0-4.232A1.058,1.058,0,1,1,5.29,13.4,1.055,1.055,0,0,1,4.232,14.46Zm0-4.232A1.058,1.058,0,1,1,5.29,9.17,1.055,1.055,0,0,1,4.232,10.228ZM8.464,1.763A1.058,1.058,0,1,1,7.406,2.821,1.055,1.055,0,0,1,8.464,1.763Zm5.643,16.223a.354.354,0,0,1-.353.353H7.406a.354.354,0,0,1-.353-.353v-.705a.354.354,0,0,1,.353-.353h6.348a.354.354,0,0,1,.353.353Zm0-4.232a.354.354,0,0,1-.353.353H7.406a.354.354,0,0,1-.353-.353v-.705a.354.354,0,0,1,.353-.353h6.348a.354.354,0,0,1,.353.353Zm0-4.232a.354.354,0,0,1-.353.353H7.406a.354.354,0,0,1-.353-.353V8.817a.354.354,0,0,1,.353-.353h6.348a.354.354,0,0,1,.353.353Z"/>
                    </svg>`;
            const returnIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="19.75" height="22.571" viewBox="0 0 19.75 22.571" data-mode="return">
                    <path id="Icon_awesome-shopping-bag" data-name="Icon awesome-shopping-bag" d="M15.518,7.054V5.643a5.643,5.643,0,1,0-11.286,0V7.054H0V19.045a3.527,3.527,0,0,0,3.527,3.527h12.7a3.527,3.527,0,0,0,3.527-3.527V7.054ZM7.054,5.643a2.821,2.821,0,1,1,5.643,0V7.054H7.054Zm7.054,5.29a1.058,1.058,0,1,1,1.058-1.058A1.058,1.058,0,0,1,14.107,10.933Zm-8.464,0A1.058,1.058,0,1,1,6.7,9.875,1.058,1.058,0,0,1,5.643,10.933Z"/>
                    </svg>`;
            //iterate through days
            for (const resByDate of data) {
                const reservations = resByDate.reservations;
                for (const res of reservations) {
                    //create an id for current reservation to store it and get it later on click
                    const curId = `${res.userId}-${res.date.slice(0, 10)}`;
                    this.vars[curId] = res;
                    // parse 2022-05-18 16:30:00 to format Mittwoch, 11. Mai 2022
                   
                    //replace "d" with "T"
                    const dateString = res.date.replace(" ", "T");
                    const date = new Date(dateString);
                    console.log(res.date);
                    console.log(dateString);
                    
                    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
                    //convert date to Mittwoch, 11. Mai 2022
                    const dateStr = date.toLocaleDateString("de-DE", dateOptions);
                    
                    //add class if reservation is in preparation or fully prepared
                    let preperationClass = "";
                    if(this.vars.listType == "prepare"){
                        if (res.inPreparation && !res.preparedAll) {
                            preperationClass = "inPreparation";
                        } else if (res.preparedAll) {
                            preperationClass = "preparedAll";
                        }
                    }

                    let li = `
                            <li class="reservation uk-flex uk-flex-between uk-flex-bottom ${preperationClass}" data-id = ${curId}>
                                <div>
                                    <span>${res.userId}</span>
                                    <h2>${general.formatName(res.firstName)} ${general.formatName(res.lastName)}</h2>
                                    <div class="listDateandDep">
                                        <p>${dateStr}</p>  
                                        <p class="departments">
                                
                                    
                                    
                        `;

                    //create list of departments
                    let departmentList = new Set();
                    for (const subRes of res["reservations"]) {
                        departmentList.add(subRes.departmentId);
                    }
                    console.log(departmentList);
                    for (const item of departmentList) {
                        li += `<span class="departmentLabel">${this.departments[item]}</span>`;
                    }

                    if(res.preparedAll && this.vars.listType == "prepare"){
                        li += `            
                                        </p>
                                    </div>  
                                </div>
                                <div class="buttonClickWrapper uk-flex uk-flex-column uk-flex-bottom uk-flex-right">
                                    <button class="releaseResButton uk-margin-small-bottom">Ausgeben</button>
                                    <div class="quantityCircle ${res.reservations.length > 25 ? ( res.reservations.length > 50 ? 'largeReservation' : 'mediumReservation') : ''}">
                                        <div class="quantityIcon"> 
                                            <p> ${res.reservations.length}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </li>`;
                    }else{
                        li += `            
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
                                            ${this.vars.listType == "prepare" ? prepareIcon : returnIcon}
                                        </div>
                                    </div>
                                </div>
                                
                            </li>`;
                    }


                    //append li to reslist or to preparedlist depending on preparedAll attribute
                    if (res.preparedAll && this.vars.listType == "prepare") {
                        doneList += li;
                    } else {
                        resList += li;
                    }
                }
            }
            resList += `</ul>`;
            doneList += `</ul>`;

            //create done list with toggle if list is not empty
            let doneListWrapper;
            if ($(doneList)[0].childElementCount && this.vars.listType == "prepare") {
                doneListWrapper = `
                        <div class="doneListWrapper">
                            <div class="doneListShow">
                                <p>Vorbereitet</p>
                                <span class="doneListArrow"><svg xmlns="http://www.w3.org/2000/svg" width="34.875" height="34.875" viewBox="0 0 34.875 34.875">
                                  <path id="Icon_awesome-arrow-circle-down" data-name="Icon awesome-arrow-circle-down" d="M35.438,18A17.438,17.438,0,1,1,18,.563,17.434,17.434,0,0,1,35.438,18Zm-10.1-2.032L20.25,21.277V8.438A1.683,1.683,0,0,0,18.563,6.75H17.438A1.683,1.683,0,0,0,15.75,8.438V21.277l-5.091-5.309a1.689,1.689,0,0,0-2.412-.028l-.766.773a1.681,1.681,0,0,0,0,2.384l9.323,9.33a1.681,1.681,0,0,0,2.384,0l9.33-9.33a1.681,1.681,0,0,0,0-2.384l-.766-.773a1.689,1.689,0,0,0-2.412.028Z" transform="translate(-0.563 -0.563)"/>
                                </svg></span>
                            </div>
                            ${doneList}
                        </div>
                    `;
            } else {
                doneListWrapper = "";
            }


            //clear list and add list again
            this.doms.listWrapper.html("");
            if (doneListWrapper != "") {
                this.doms.listWrapper.append(doneListWrapper);
            }
            this.doms.listWrapper.append(resList);

        }
        this.listInteraction();
        this.releaseReservation();
        general.toggleLoader(this.doms.filterWrapper);
    }

    listInteraction() {
        $(".reservation").on("click", (e) => {
            if(!e.target.classList.contains("releaseResButton")){
                //only if not release reservation button was clicked
                const id = e.target.dataset.id
                const data = this.vars[id];
                data.listType = this.vars.listType;
                general.redirectWithPost(data, "checklist.php");
            }
        });

        //done list toggle
        $(".doneListShow").on("click", () => {
            if ($(".doneList").is(":visible")) {
                $(".doneListArrow").css({"transform": "rotate(180deg)"})
            } else {
                $(".doneListArrow").css({"transform": "rotate(0deg)"})
            }
            $(".doneList").slideToggle();
        });
    }

    releaseReservation(){
        $(".releaseResButton").on("click", (e) => {
            const listEntry = e.target.parentNode.parentNode;
            const id = listEntry.dataset.id
            const data = this.vars[id];
            const reservations = data.reservations;
            let resIds = [];
            for (const res of reservations) {
                resIds.push(res.id);
            }
            if(resIds.length > 0){
               /* const dataTst = {
                    "userId": "mt191092",
                    "firstName": "Jungwirth",
                    "lastName": "Lukas",
                    "email": "mt191092@fhstp.ac.at",
                    "tel": "+436801420181",
                    "date": "2022-05-25 16:30:00",
                    "reservations": [
                        {
                            "id": 521430,
                            "lastChange": "2022-05-25 10:36:06",
                            "userId": "mt191092",
                            "bookedBy": "mt191092",
                            "equipId": 5553,
                            "statusId": 2,
                            "from": "2022-05-25 16:30:00",
                            "to": "2022-05-27 15:30:00",
                            "userComment": "test_ausgabe",
                            "assiComment": "",
                            "lendDate": "0000-00-00 00:00:00",
                            "returnDate": "0000-00-00 00:00:00",
                            "assiLend": null,
                            "assiReturn": null,
                            "usageId": 12,
                            "prepared": 1,
                            "departmentId": "3"
                        },
                        {
                            "id": 521431,
                            "lastChange": "2022-05-25 13:15:24",
                            "userId": "mt191092",
                            "bookedBy": "mt191092",
                            "equipId": 3984,
                            "statusId": 2,
                            "from": "2022-05-25 16:30:00",
                            "to": "2022-05-27 15:30:00",
                            "userComment": "testtest",
                            "assiComment": "",
                            "lendDate": "0000-00-00 00:00:00",
                            "returnDate": "0000-00-00 00:00:00",
                            "assiLend": null,
                            "assiReturn": null,
                            "usageId": 3,
                            "prepared": 1,
                            "departmentId": "3"
                        }
                    ],
                    "inPreparation": 1,
                    "preparedAll": 1
                }*/
                new ReleasePopup(resIds, data);
            }
        });
    }




    getFilterDates() {
        //returns array with one date (today & tomorrow) or start and end (timespan)
        //on basis of selected filters
        let dates = new Set();

        if (this.filter.timespan.length > 0) {
            //if timespan is set
            if (this.filter.timespan.length == 1) {
                dates.add(this.filter.timespan[0]);
            } else {
                dates.add(this.filter.timespan[0]);
                dates.add(this.filter.timespan[1]);
            }
        } else {
            //if today or tomorrow is set
            if (this.filter.today) dates.add(this.getDateByValue(0));
            if (this.filter.tomorrow) dates.add(this.getDateByValue(1));
        }

        return [...dates];
    }


    getDateByValue(dateVal) {
        //adds number of given days and formats it to api date standard
        //ad date
        Date.prototype.addDays = function (dateVal) {
            let date = new Date(this.valueOf());
            date.setDate(date.getDate() + dateVal);
            return date;
        }
        const currentDate = new Date();
        //format and return
        return general.formatDate(currentDate.addDays(dateVal));
    }

    calculateDayNumber(date) {
        //calculates the number of days relavtive to the current date (today = 0, tomorrow = 1, ...)
        const selectedStr = date.toString().substring(0, 15);
        const todayStr = new Date().toString().substring(0, 15);

        const dateSelected = new Date(selectedStr);
        const dateToday = new Date(todayStr);

        const diffTime = Math.abs(dateToday - dateSelected);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dateSelected < dateToday) diffDays *= -1;
        return diffDays;
    }


    removeList() {
        //to call from modeSwitch
        this.doms.listWrapper.html("");
        this.doms.filterWrapper.html("");
        $(".pickerWrapper").remove();
        $("#submitSpanFilter").remove();
    }

}

/*
    const init = () => {
        if ($("#filterableList").length > 0) {
            new FilterableList($("#filterableList"), "prepare");
        }
    };
    init();

*/
