<script>
    let edata=[
  {
    "id": 474363,
    "lastChange": "2020-07-20 06:23:07",
    "userId": "ptktemper",
    "bookedBy": "",
    "equipId": 3988,
    "statusId": 5,
    "from": "2020-08-19 17:00:00",
    "to": "2020-08-26 15:00:00",
    "userComment": "Inventur",
    "assiComment": "",
    "lendDate": "0000-00-00 00:00:00",
    "returnDate": "0000-00-00 00:00:00",
    "assiLend": null,
    "assiReturn": null,
    "usageId": 0,
    "prepared": false
  },
  {
    "id": 497370,
    "lastChange": "2021-07-14 14:15:41",
    "userId": "ptktemper",
    "bookedBy": "",
    "equipId": 3988,
    "statusId": 5,
    "from": "2021-07-30 18:00:00",
    "to": "2021-08-13 16:00:00",
    "userComment": "Inventur",
    "assiComment": "",
    "lendDate": "0000-00-00 00:00:00",
    "returnDate": "0000-00-00 00:00:00",
    "assiLend": null,
    "assiReturn": null,
    "usageId": 0,
    "prepared": false
  },
  {
    "id": 502778,
    "lastChange": "2021-10-14 12:44:40",
    "userId": "fblasinger",
    "bookedBy": "",
    "equipId": 3988,
    "statusId": 4,
    "from": "2021-10-14 16:30:00",
    "to": "2021-10-25 08:30:00",
    "userComment": "c-tv Dreh  ",
    "assiComment": "v",
    "lendDate": "2021-10-14 00:00:00",
    "returnDate": "2021-10-25 00:00:00",
    "assiLend": "astvideo3",
    "assiReturn": "astvideo3",
    "usageId": 10,
    "prepared": false
  },
  {
    "id": 514021,
    "lastChange": "2022-03-29 06:30:10",
    "userId": "pengl",
    "bookedBy": "",
    "equipId": 3988,
    "statusId": 4,
    "from": "2022-03-29 14:00:00",
    "to": "2022-04-12 15:30:00",
    "userComment": "Test Raummikro gr. Festsaal - res. durch: phackllehner",
    "assiComment": "",
    "lendDate": "2022-03-29 00:00:00",
    "returnDate": "2022-03-30 00:00:00",
    "assiLend": "phackllehner",
    "assiReturn": "astvideo3",
    "usageId": 10,
    "prepared": false
  },
  {
    "id": 514219,
    "lastChange": "2022-03-30 14:12:09",
    "userId": "pengl",
    "bookedBy": "",
    "equipId": 3988,
    "statusId": 3,
    "from": "2022-04-12 16:00:00",
    "to": "2022-04-13 16:00:00",
    "userComment": "Verlängerung - res. durch: astvideo3",
    "assiComment": "",
    "lendDate": "2022-03-30 00:00:00",
    "returnDate": "0000-00-00 00:00:00",
    "assiLend": "astvideo3",
    "assiReturn": null,
    "usageId": 5,
    "prepared": false
  },
  {
    "id": 520293,
    "lastChange": "2022-04-13 15:33:23",
    "userId": "pengl",
    "bookedBy": "",
    "equipId": 3988,
    "statusId": 4,
    "from": "2022-04-13 16:30:00",
    "to": "2022-04-20 15:30:00",
    "userComment": "Verlängerung - res. durch: astvideo2",
    "assiComment": "",
    "lendDate": "2022-04-13 00:00:00",
    "returnDate": "2022-04-20 00:00:00",
    "assiLend": "astvideo2",
    "assiReturn": "astvideo3",
    "usageId": 10,
    "prepared": false
  },
  {
    "id": 520601,
    "lastChange": "2022-04-20 14:14:32",
    "userId": "ptktemper",
    "bookedBy": "",
    "equipId": 3988,
    "statusId": 3,
    "from": "2022-04-20 16:30:00",
    "to": "2022-05-31 15:30:00",
    "userComment": "Verlängerung - res. durch: astvideo3",
    "assiComment": "",
    "lendDate": "2022-04-20 00:00:00",
    "returnDate": "0000-00-00 00:00:00",
    "assiLend": "astvideo3",
    "assiReturn": null,
    "usageId": 10,
    "prepared": false
  },
  {
    "id": 517684,
    "lastChange": "2022-04-11 11:23:51",
    "userId": "ptktemper",
    "bookedBy": "",
    "equipId": 3988,
    "statusId": 5,
    "from": "2022-08-17 16:30:00",
    "to": "2022-08-24 15:30:00",
    "userComment": "Inventur",
    "assiComment": "",
    "lendDate": "0000-00-00 00:00:00",
    "returnDate": "0000-00-00 00:00:00",
    "assiLend": null,
    "assiReturn": null,
    "usageId": 0,
    "prepared": false
  }
]
    </script>



<div id="contentbox">
<script>


function getEquipment() {
    //alle ausgeborgten equipment auslesen
    var result = edata.filter(equipment =>  equipment.statusId == 3  );
    var now = new Date();
    //wenn vorhanden, dann ausgeben
    if (result.length > 0) {
        var result = result.filter(equipment =>  new Date(equipment.to) > now-(3 * 24 * 60 * 60 * 1000) );
        return result[0];
    }else{
        //alle reservierten nicht abgeholten equipment auslesen
        var result= edata.filter(equipment =>  equipment.statusId == 1 || equipment.statusId == 2  );
        // sortieren nach from asc
        result.sort(function(a, b) {
            return new Date(a.from) - new Date(b.from);
        });
        var twoDaysAgo = new Date(now.getTime() - (2 * 24 * 60 * 60 * 1000));
        var result = result.filter(equipment =>  new Date(equipment.from) > twoDaysAgo );
        var result = result.filter(equipment =>  new Date(equipment.from) < now);
        if (result.length > 0) {
            return result;
        }
        else {
            //return first element of array
            return result[0];
        }
        
    }


    if (result.length == 0) {
        
    }
    

}

console.log(getEquipment());


    </script>