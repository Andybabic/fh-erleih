"use strict";
import Ajax from '../classes/Ajax.js';


    export default class FilterableList{

        //CONSTRUCTOR
        constructor($base, listType) {
            this.filter = {
                today:              true,
                tomorrow:           false,
                timespan:           [],
            };
            this.vars = {
                listType:           listType,
                selectionClass:     "filterSelected"
            };
            this.doms = {
                base:               $base,
                filterWrapper:      $base.find(".filterWrapper"),
                listWrapper:        $base.find(".listWrapper"),
            };
            this.modules = {
                ajax:        new Ajax(),
                //reservierung:   new Reservierung(),
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

        async initOverviewPage(){
            //check for stored settings
            if(localStorage.settings){
                const settings = JSON.parse(localStorage.settings);
                //take stored departments
                if(settings.departments)this.departments = settings.departments;
            }

            //init filter buttons
            this.addFilter();

            if(localStorage.filterValues){
                //if there are filter preferences stored apply them
                this.filter = JSON.parse(localStorage.filterValues);
            }else{
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
            var timepicker = new Datepicker('#ranged', {
                inline: true,
                ranged: true,
                time: false,
                onChange: (date) => {
                    if(date.length > 1){
                        let arr = [];
                        arr.push(this.formatDate(date[0]));
                        arr.push(this.formatDate(date[date.length -1]));
                        this.filter.timespan = arr;
                    }else if(date.length === 1){
                        this.filter.timespan = [];
                        this.filter.timespan.push(this.formatDate(date[0]));
                    }
                    this.addPickerStyle();
                },
                onInit: (e) => {
                    console.log(e);
                    //console.log(new Date(this.filter.timespan[0]));
                },
                onRender: (e) => {
                    console.log(e);
                }
            });

            //init list
            this.getList();

            //add event listeners
            this.addFilterInteraction();
        };

        addFilter(){
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

        addPickerStyle(){
            //adds class to first and last element of picker span selection
            const selection = document.getElementsByClassName("is-selected");
            for (let i = 0; i < selection.length; i++) {
                if(i == 0 || i == selection.length-1){
                    selection[i].classList.add("selected-ends");
                }
            }
        }

        formatDate(date){
            //formats date object to rest api standard
            const offset = date.getTimezoneOffset();
            let newDate = new Date(date.getTime() - (offset*60*1000));
            newDate = newDate.toISOString().split('T')[0];

            return newDate;
        }


        addFilterInteraction(){
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
                switch (filter){
                    case "today":
                        if(selected){
                            this.filter.today = false;
                        }else{
                            this.filter.today = true;
                            this.filter.timespan = [];
                        }
                        break;
                    case "tomorrow":
                        if(selected){
                            this.filter.tomorrow = false;
                        }else{
                            this.filter.tomorrow = true;
                            this.filter.timespan = [];
                        }
                        break;
                    case "togglePicker":
                        //display time picker
                        $(".pickerWrapper").slideToggle();
                        break;
                    case "timespan":
                        if(this.filter.timespan.length > 0){
                            //if there is a valid timespan set
                                this.filter.today = false;
                                this.filter.tomorrow = false;

                            //hide picker again
                            $(".pickerWrapper").slideToggle();
                        }else{
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
                if(filter != "togglePicker"){
                    //exception for toggle picker because this button only toggles date picker and doesnt trigger a list reload
                    this.getList();
                }
            });
        }

        setFilterStyle(){
            //add or remove active classes
            const filterBtns = document.getElementsByClassName("filterBtn");
            for (const btn of filterBtns) {
                if(btn.dataset.filter != "togglePicker"){
                    let filterType = btn.dataset.filter;
                    let filterValue = this.filter[filterType];

                    if(btn.classList.contains(this.vars.selectionClass)){
                        if(filterValue == false){
                            btn.classList.remove(this.vars.selectionClass);
                        }
                    }else{
                        if(filterValue == true){
                            btn.classList.add(this.vars.selectionClass);
                        }
                    }
                }else{
                    //picker toggle button
                    if(!btn.classList.contains(this.vars.selectionClass) && this.filter.timespan.length > 0){
                        btn.classList.add(this.vars.selectionClass);
                    }else if(btn.classList.contains(this.vars.selectionClass) && this.filter.timespan.length == 0){
                        btn.classList.remove(this.vars.selectionClass);
                    }
                }

            }
        }

        async getList(){
            general.toggleLoader(this.doms.filterWrapper);
            //gets the reservations (by department) from
            const dates = this.getFilterDates();
            const startDate = dates[0];
            let endDate;

            if(dates.length == 1){
                //if there is only one date startdate = enddate
                endDate = dates[0];
            }else{
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
                if(this.filter[name] != undefined && this.filter[name]){
                    //if the filter is set and true
                    const data = await this.modules.ajax.getResByDepartmentTimespan(key, startDate, endDate, type);
                    if(!data){
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
            //console.log(departmentData);

            //display list depending on received data
            if(departmentData.length == 0){
                this.displayList("empty");
            }else{
                //group the list by day and by user
                const groupedData = await this.groupResByDate(departmentData);
                //console.log(groupedData);
                //display list
                this.displayList(groupedData);
            }
        }

        displayList(data){
            if(data == "error"){
                const errorMessage = `
                    <h2>Irgendwas stimmt hier nicht!</h2>
                    <p>Leider können wir die Reservierungen momentan nicht abrufen.</p>
                    
                `;
                this.doms.listWrapper.html(errorMessage);
            }
            else if(data == "empty"){
                const emptyMessage = `
                    <p>Alles erledigt!</p>
                    <img style="height: 60vh" src="../style/image/alles-erledigt.jpg" alt="alles erledigt Motivationsbild">
                `;
                this.doms.listWrapper.html(emptyMessage);
            }else{
                let resList = `<ul class="uk-list uk-list-striped">`;
                let doneList = `<ul class="doneList uk-list uk-list-striped">`;
                //iterate through days
                for (const resByDate of data) {
                    const reservations = resByDate.reservations;
                    for (const res of reservations) {
                        //create an id for current reservation to store it and get it later on click
                        const curId = `${res.userId}-${res.date.slice(0,10)}`;
                        this.vars[curId] = res;

                        const date = new Date(res.date);
                        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        const dateStr = date.toLocaleDateString("de-DE", dateOptions);
                        //add class if reservation is in preparation or fully prepared
                        let preperationClass = "";
                        if(res.inPreparation && !res.preparedAll){
                            preperationClass = "inPreparation";
                        }else if(res.preparedAll){
                            preperationClass = "preparedAll";
                        }
                        console.log(res.firstName);

                        let li = `
                            <li class="reservation ${preperationClass}" data-id = ${curId}>
                                <h2>${this.formatName(res.firstName)} ${this.formatName(res.lastName)} - ${res.userId}</h2>
                                <p>${dateStr}</p>  
                                <p>Anzahl an Equipment: ${res.reservations.length}</p>
                                <p class="departments">
                        `;

                        //create list of departments
                        let departmentList = new Set();
                        for (const subRes of res["reservations"]) {
                            departmentList.add(subRes.departmentId);
                        }
                        for (const item of departmentList) {
                            li += `<span class="departmentLabel">${this.departments[item]}</span>`;
                        }
                        li += `</p></li>`;

                        //append li to reslist or to preparedlist depending on preparedAll attribute
                        if(res.preparedAll){
                            doneList += li;
                        }else{
                            resList += li;
                        }
                    }
                }
                resList += `</ul>`;
                doneList += `</ul>`;

                //create done list with toggle if list is not empty
                let doneListWrapper;
                if($(doneList)[0].childElementCount){
                    doneListWrapper = `
                        <div class="doneListWrapper">
                            <div id="doneListToogle">
                                <h2 id="doneListHeading">Vorbereitet</h2>
                                <span class="doneListArrow"><svg xmlns="http://www.w3.org/2000/svg" width="34.875" height="34.875" viewBox="0 0 34.875 34.875">
                                  <path id="Icon_awesome-arrow-circle-down" data-name="Icon awesome-arrow-circle-down" d="M35.438,18A17.438,17.438,0,1,1,18,.563,17.434,17.434,0,0,1,35.438,18Zm-10.1-2.032L20.25,21.277V8.438A1.683,1.683,0,0,0,18.563,6.75H17.438A1.683,1.683,0,0,0,15.75,8.438V21.277l-5.091-5.309a1.689,1.689,0,0,0-2.412-.028l-.766.773a1.681,1.681,0,0,0,0,2.384l9.323,9.33a1.681,1.681,0,0,0,2.384,0l9.33-9.33a1.681,1.681,0,0,0,0-2.384l-.766-.773a1.689,1.689,0,0,0-2.412.028Z" transform="translate(-0.563 -0.563)"/>
                                </svg></span>
                            </div>
                            ${doneList}
                        </div>
                    `;
                }else{
                    doneListWrapper = "";
                }


                //clear list and add list again
                this.doms.listWrapper.html("");
                this.doms.listWrapper.append(resList);
                if(doneListWrapper != ""){
                    this.doms.listWrapper.append(doneListWrapper);
                }

            }
            this.listInteraction();
            general.toggleLoader(this.doms.filterWrapper);
        }

        listInteraction(){
            $(".reservation").on("click", (e)=>{
                const id = e.target.dataset.id
                const data = this.vars[id];
                this.nextPage(data);
            });

            //done list toggle
            $("#doneListToogle").on("click", () => {
                if($(".doneList").is(":visible")){
                    $(".doneListArrow").css({"transform":"rotate(180deg)"})
                }else{
                    $(".doneListArrow").css({"transform":"rotate(0deg)"})
                }
                $(".doneList").slideToggle();
            });
        }

        nextPage(data) {
            data.listType = this.vars.listType;
            const url = "checklist.php";
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

        async groupResByDate(resList){
            //taks all reservations from a query and groups them by user
            //calls groupByUser afterwards and returns grouped reservations
            let type;
            //group dates depending on list type by "from" or by "to" date
            this.vars.listType == "prepare" ? type = "from" : type = "to";

            const resByDates = [];

            for (const res of resList) {
                //slice to ignore time
                const date = res[type].slice(0,10);
                //check if resByDates Array already contains the date
                if(resByDates.length > 0){
                    //check if date is already in array
                    let contains = false;
                    for (const resByDate of resByDates) {
                        if(resByDate.date === date){
                            resByDate.reservations.push(res);
                            contains = true;
                        }
                    }
                    if(contains){
                        //curent date is already in resByDates array

                    }else{
                        resByDates.push({date: date, reservations: [res]});
                    }
                }else{
                    resByDates.push({date: date, reservations: [res]});
                }
            }

            //group by users afterwards
            for (const resByDate of resByDates) {
                const groupedByUser = await this.groupResByUser(resByDate.reservations);
                resByDate.reservations = groupedByUser;
            }
            return resByDates;
        }

        async groupResByUser(resList){
            //console.log(resList)
            //taks all reservations from a query and groups them by user
            let userIDs = [];
            let resByUser =[];
            for (let i = 0; i < resList.length; i++) {
                const res = resList[i];
                const userId = resList[i]["userId"];
                if(!userIDs.includes(userId)){
                    //if the current ID is not already in the userIDs array, add it
                    userIDs.push(userId);
                    //get user data for every user
                    let user = await this.modules.ajax.getUserById(userId);
                    if(!user){
                        user = {};
                        //if no userdata is available
                        user.firstName = "";
                        user.lastName = "";
                        user.mail = "";
                        user.tel = "";
                    }


                    resByUser.push(
                        {
                            "userId"            :userId,
                            "firstName"         :user["firstName"],
                            "lastName"          :user["lastName"],
                            "email"             :user["email"],
                            "tel"               :user["tel"],
                            "date"              :this.vars.listType == "prepare" ? res["from"] : res["to"],
                            "reservations"      :[res],
                            "inPreparation"     :res["prepared"],
                            "preparedAll"       :res["prepared"],
                        }
                    );
                }else{
                    for (const user of resByUser) {
                        //add all further reservations to the existing user in the resByUser array
                        if(user["userId"] == userId){
                            user["reservations"].push(res);
                            //if the prepared state of one individual reservation is not true the resbyuser object is not fully prepared
                            if(res["prepared"]==0){
                                user["preparedAll"] = 0;
                            }
                            //if prepared state of one reservation is true the resbyuser object is in preparation
                            if(res["prepared"]==1){
                                user["inPreparation"] = 1;
                            }
                        }
                    }
                }
            }
            return resByUser;
        }


        getFilterDates(){
            //returns array with one date (today & tomorrow) or start and end (timespan)
            //on basis of selected filters
            let dates = new Set();

            if(this.filter.timespan.length > 0 ){
                //if timespan is set
                if(this.filter.timespan.length == 1){
                    dates.add(this.filter.timespan[0]);
                }else{
                    dates.add(this.filter.timespan[0]);
                    dates.add(this.filter.timespan[1]);
                }
            }else{
                //if today or tomorrow is set
                if(this.filter.today)dates.add(this.getDateByValue(0));
                if(this.filter.tomorrow)dates.add(this.getDateByValue(1));
            }

            return [...dates];
        }


        getDateByValue(dateVal){
            //adds number of given days and formats it to api date standard
            //ad date
            Date.prototype.addDays = function(dateVal){
                let date = new Date(this.valueOf());
                date.setDate(date.getDate() + dateVal);
                return date;
            }
            const currentDate = new Date();
            //format and return
            return this.formatDate(currentDate.addDays(dateVal));
        }

        calculateDayNumber(date){
            //calculates the number of days relavtive to the current date (today = 0, tomorrow = 1, ...)
            const selectedStr = date.toString().substring(0,15);
            const todayStr = new Date().toString().substring(0,15);

            const dateSelected = new Date(selectedStr);
            const dateToday = new Date(todayStr);

            const diffTime = Math.abs(dateToday - dateSelected);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if(dateSelected < dateToday)diffDays *= -1;
            return diffDays;
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



        formatName(string){
            if(string == undefined) return "";
            const badValues = {
                "Ã¼": "ü",
                "Ã-":"Ö",
                "Ãœ":"Ü",
                "Ã¤":"ä",
                "Ã¶":"ö",
                "ÃŸ":"ß",
                "Ã":"Ä"
            };
            for (const key in badValues) {
                console.log(key);
                console.log(badValues[key]);
                string = string.replaceAll(key, badValues[key]);
            }
            return string;
        }

        removeList(){
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
