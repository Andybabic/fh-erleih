"use strict";
export default class Reservierung{
    //CONSTRUCTOR
    constructor() {

        //calculate date of tomorrow
        let nextDate = new Date();
        nextDate.setDate(nextDate.getDate()+1);
        nextDate = nextDate.toISOString().slice(0,10);

        this.vars = {
            apiUrl:         "http://localhost:3000/functions/callAPI.php?r=",
            today:    new Date().toISOString().slice(0,10),
            tomorrow:       nextDate,
        };
    };


    //METHODS

    async getUserById(userId){
        const api = `${this.vars.apiUrl}user/${userId}/`;

        return new Promise((resolve, reject) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                }).catch(err => {
                reject(0);
            });
        });
    }

    //TODO: groupResByTime

    async groupResByUser(resList){
        //taks all reservations from a query and groups them by user
        let userIDs = [];
        let resByUser =[];
        for (let i = 0; i < resList.length; i++) {
            const res = resList[i];
            const userId = resList[i]["userId"];
            if(!userIDs.includes(userId)){
                //if the current ID is not already in the userIDs array add it
                userIDs.push(userId);
                const user = await this.getUserById(userId);
                resByUser.push(
                    {
                        "userId":       userId,
                        "firstName":    user["firstName"],
                        "lastName":     user["lastName"],
                        "userComment":  res["userComment"],
                        "dateFrom":     res["from"],
                        "dateTo":       res["to"],
                        "size":  1,
                    }
                );
            }else{
                //count of reservations per user
                resByUser.forEach(res => {
                    if(res["userId"]==userId){
                        res["size"]++;
                    }
                });
            }
        }
        return resByUser;
    }



    /*
    async getTestData (){
        //const api = `${this.vars.apiUrl}reservierung/byDateAusgabe/${date}/`;
        const api = `${this.vars.apiUrl}equipment/`;

        return new Promise((resolve, reject) => {
            fetch(api)
                .then(res => res.json())
                .then(data => {
                    let arr = [];
                    for (let i = 5000; i < 5020; i++) {
                        arr.push(data[i]);
                    }
                    resolve(arr);
                }).catch(err => {
                reject(0);
            });
        });

    };*/

}
