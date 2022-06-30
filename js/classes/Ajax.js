"use strict";
export default class Ajax{
    //class for all functions that interact with API from the frontend
    constructor() {
        this.vars = {
            apiUrl:     "/functions/callAPI.php?r=",
        };
    };

    async getResByDepartmentTimespan (departmentID, start, end, type){
        //GET all reservations by department in the given timespan
        const api = `${this.vars.apiUrl}reservierung/byBereichDateType/${departmentID}/${start}/${start}/${type}`;

        return new Promise((resolve) => {

            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });

        });
    }

    async getUserById(userId){
        //GET userdata by user id
        const api = `${this.vars.apiUrl}user/${userId}/`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                console.log(err);
                resolve(false);
            });
        });
    }

    async getDepartments(){
        //GET all departments
        const api = `${this.vars.apiUrl}bereich/`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                    console.log(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getEquipmentCategory(departmentId){
        const api = `${this.vars.apiUrl}eqKat/byBereich/${departmentId}/`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getEquipmentType(departmentId, eqKatId){
        const api = `${this.vars.apiUrl}eqTyp/byBereichKat/${departmentId}/${eqKatId}/`;

        return new Promise((resolve, reject) => {

            fetch(api, {credentials: "include"})
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getEquipmentTypeById(eqTypId){
        const api = `${this.vars.apiUrl}eqTyp/${eqTypId}/`;

        return new Promise((resolve, reject) => {

            fetch(api, {credentials: "include"})
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }




    async getEquipment(eqTypeId){
        const api = `${this.vars.apiUrl}equipment/byTyp/${eqTypeId}/`;

        return new Promise((resolve, reject) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getEquipmentById(eqId){
        console.log(eqId);
        const api = `${this.vars.apiUrl}equipment/${eqId}/`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getExpandedEquipmentById(eqId){
        console.log(eqId);
        const api = `${this.vars.apiUrl}equipment/${eqId}?expandKeys=true`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getResById(resId){
        const api = `${this.vars.apiUrl}reservierung/${resId}/`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getResByEq(eqId){
        const api = `${this.vars.apiUrl}reservierung/byEq/${eqId}/`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getOpenResByUser(userId){
        const api = `${this.vars.apiUrl}reservierung/byUserOffen/${userId}/`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }



    async postResRelease(resIds){
        const api = `${this.vars.apiUrl}reservierung/ausgabe/`;
        console.log(resIds);
        return new Promise((resolve) => {
            $.ajax({
                url: api,
                method: "POST",
                data: {
                    data: JSON.stringify(resIds),
                    curl: "POST"
                }
            }).done(function(answer) {
                resolve(answer);
            }).fail(function (){
                resolve(false);
            });
        });
    }

    async putEquipment(eqId, updateValue){
        const api = `${this.vars.apiUrl}equipment/${eqId}/`;

        return new Promise((resolve) => {
            $.ajax({
                url: api,
                method: "POST",
                data: {
                    data: JSON.stringify(updateValue),
                    curl: "PUT"
                }
            }).done(function(answer) {
                resolve(answer);
            }).fail(function (){
                resolve(false);
            });
        });

    }


    async deleteReservation(cancelValue){
        const jsonVal = JSON.stringify(cancelValue);
        const api = `${this.vars.apiUrl}reservierung/loeschen/`;

        return new Promise((resolve) => {
            $.ajax({
                url: api,
                method: "POST",
                data: {
                    data: jsonVal,
                    curl: "DELETE"
                }
            }).done(function(answer) {
                resolve(answer);
            }).fail(function(error){
                resolve(false);
            });
        });
    }

    async extendReservation(resId, toDate){
        const api = `${this.vars.apiUrl}reservierung/${resId}/verlaengern`;

        return new Promise((resolve) => {
            $.ajax({
                url: api,
                method: "POST",
                data: {
                    data: JSON.stringify({"to": toDate}),
                    curl: "POST"
                }
            }).done(function(answer) {
                resolve(answer);
            }).fail(function(error){
                resolve(false);
            });
        });
    }

    async takeBackRes(jsondata){
        const api = `${this.vars.apiUrl}reservierung/ruecknahme/`;
        console.log(api);
        console.log(jsondata);
        return new Promise((resolve) => {
            $.ajax({
                url: api,
                method: "POST",
                data: {
                    data: jsondata,
                    curl: "POST"
                }
            }).done(function(answer) {
                resolve(answer);
            }).fail(function(error){
                resolve(false);
            });
        });
    }

    async getRandomJoke(){
        const api = `https://witzapi.de/api/joke`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

    async getChuckNorrisJoke(){
        const api = `https://api.chucknorris.io/jokes/random`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                resolve(false);
            });
        });
    }

}
