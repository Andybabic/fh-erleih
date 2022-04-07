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

        return new Promise((resolve, reject) => {
            
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                //log error header

                reject(-1);
            });
        });
    }

    async getResByDate(date){
        const api = `${this.vars.apiUrl}reservierung/byDateAusgabe/${date}/`;

        return new Promise((resolve, reject) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                reject(-1);
            });
        });
    }

    async getUserById(userId){
        const api = `${this.vars.apiUrl}user/${userId}/`;

        return new Promise((resolve, reject) => {

            fetch(api, {credentials: "include"})
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                reject(0);
            });
        });
    }



}
