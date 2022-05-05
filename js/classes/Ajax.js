"use strict";
export default class Ajax{
    //CONSTRUCTOR
    constructor() {
        this.vars = {
            apiUrl:     "/functions/callAPI.php?r=",
        };
    };

    async getResByDepartmentTimespan (departmentID, start, end, type){
        const api = `${this.vars.apiUrl}reservierung/byBereichDateType/${departmentID}/${start}/${end}/${type}`;

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
        const api = `${this.vars.apiUrl}user/${userId}/`;

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

    async getDepartments(){
        const api = `${this.vars.apiUrl}bereich/`;

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

    async getEquipment(eqTypeId){
        console.log(eqTypeId);
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

    async postResStatus(id){
        const api = `${this.vars.apiUrl}/reservierung/vorbereiten/`;

        return new Promise((resolve) => {
            fetch(api)
                .then(res => res.json(id))
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    resolve(false);
            });
        });
    }

    async putEquipment(eqId, updateValue){

        // TODO: replace as soon as API allows 0 for 0.0
        const cleared = JSON.stringify(updateValue)
            .replaceAll('"price":"0",', '"price":0.0,')
            .replaceAll('"price":0,', '"price":0.0,');
        // ---------------------------------------------

        const api = `${this.vars.apiUrl}equipment/${eqId}/`;

        $.ajax({
            url: api,
            method: "POST",
            data: {
                data: cleared,
                curl: "PUT"
            }
        }).done(function(answer) {
            console.log(answer);
        });

        /*
        return new Promise((resolve) => {
            fetch(api, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    resolve(err);
            });
        });*/


    }

    async deleteReservation(resId){
        const api = `${this.vars.apiUrl}/reservierung/loeschen/`;
        const options = {
            method: 'POST',
            data: {data:updateValue,
                    curl:'DELETE'},
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        return new Promise((resolve) => {
            fetch(api, options)
                .then(res => res.json(resId))
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    resolve(false);
            });
        });
    }

    async extendReservation(resId, toDate){
        const api = `${this.vars.apiUrl}/reservierung/${resId}/verlaengern`;
        const options = {
            method: 'POST',
            body: JSON.stringify(toDate),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return new Promise((resolve) => {
            fetch(api, options)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                    resolve(false);
            });
        });
    }

}
