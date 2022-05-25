<link rel="stylesheet" href="../js/select2/select2.min.css">

<script src="../js/select2/select2.min.js"></script>


<div id="scanSearch">
    <div uk-grid class="selectWrapper uk-text-center">

        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <label for="departmentSelect">Bereich</label>
            <select class="uk-width-large " id="departmentSelect">
                <option></option>
            </select>
        </div>

        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <label for="categorySelect">Equipment Kategorie</label>
            <select name="eqKat" class="uk-width-large" id="categorySelect">
                <option></option>
            </select>
        </div>

        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <label for="typeSelect">Equipment Typ</label>
            <select name="eqTyp" class="uk-width-large" id="typeSelect">
                <option></option>
            </select>
        </div>
        <div class="uk-width-1-1 uk-flex uk-flex-column uk-flex-center uk-flex-middle">
            <label for="equipmentSelect">Equipment</label>
            <select name="eq" class="uk-width-large" id="equipmentSelect">
                <option></option>
            </select>
        </div>
    </div>


    <button id="writeNFC" value='69' href="#writeToNFC" uk-toggle>
    <div class="selectResultWrapper">
    </button>
    <h1 id="logtext"> Test NFC </h1>


    </div>
</div>





        <div id="writeToNFC" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

                <button class="uk-modal-close-default" id="writeNFC" type="button" uk-close></button>

                <span class="dots-cont"> <span class="dot dot-1"></span> <span class="dot dot-2"></span> <span
                        class="dot dot-3"></span> </span>

                <div id="nfcMassage" class="uk-align-center" style="text-align: center">
                    <h2>Wait for NFC Tag</h2>
                </div>



            </div>



        </div>


<script type="module" src="../js/modules/ScanSearch.js"></script>

<script>
// if (!("NDEFReader" in window)) nfcMassage.innerHTML = "Web NFC is not available. Use Chrome on Android.";


let nfc = {};


nfc.do = (function() {
    let priv = {},
        publ = {};
    let ignoreRead = false;


    publ.init = async function() {

        if (!("NDEFReader" in window)) {
            document.getElementById("nfcMassage").innerHTML =
                "Web NFC is not available. Use Chrome on Android.";
            document.getElementById("logtext").innerHTML =
                "Web NFC is not available. Use Chrome on Android.";
        } else {
            const ndef = new NDEFReader();
            //ignoreRead=true;

            document.getElementById("nfcMassage").innerHTML = "Web NFC is available. Ready to write ";

            document.getElementById("logtext").innerHTML = "Web NFC is available. Ready to write ";
            ndef.scan().then(() => {
                ndef.onreading = event => {
                    const message = event.message;
                    for (const record of message.records) {
                        //get record as string
                        const recordString = record.data;
                        

                        switch (record.recordType) {
                            
                            case "text":
                                document.getElementById("logtext").innerHTML =
                                    "NFC Text found: " + recordString;
                                break;
                            case "url":
                                document.getElementById("logtext").innerHTML =
                                    "new NFC url found: " + recordString;
                                break;
                            default:
                                document.getElementById("logtext").innerHTML =
                                    "NFC ??? found: " + recordString ;
                                // TODO: Handle other records with record data.
                        }
                    }
                };


                if (ignoreRead) {
                    return; // write pending, ignore read.
                }

            });

        }

        // if mousedown touchstart then write

        //get value of button
        var nfcBTN = document.getElementById("writeNFC");

        nfcBTN.onmousedown = function() {
            console.log("touchstart mousedown");

            priv.write(nfcBTN.value);
            // initialize mouse interface
        }
        nfcBTN.ontouchstart = function() {
            document.getElementById("logtext").innerHTML = "touched";
            nfcBTN.onmousedown = null;
            console.log("touchstart mousedown");

            priv.write(nfcBTN.value);

        }


    }

    priv.write = async function(data) {

        ignoreRead = true;
        document.getElementById("logtext").innerHTML = ignoreRead + "";
        //get value of button
        var id = document.getElementById("writeNFC").value;
        try {
            const ndef = new NDEFReader();
            var stringData = "https://verleihneu.fhstp.ac.at/fh_erleih/nfc/read.php?d=" + id;
            await ndef.write({
                records: [{
                    recordType: "url",
                    data: stringData
                }]
            })
            document.getElementById("nfcMassage").innerHTML =
                "Successfully written to NFC Tag";
        } catch (error) {
            document.getElementById("nfcMassage").innerHTML = "Error writing to NFC Tag-" +
                error;
        }
        //wait 3 seconds
        setTimeout(function() {
            ignoreRead = false;
        }, 3000);

        document.getElementById("logtext").innerHTML = ignoreRead + "";
    }




    return publ;
})();
nfc.do.init();
</script>


