<?php
session_start();


//load all CSS and JS and modules
require_once("../functions/loader.php");

//echo($_SESSION['username']);
//echo(session_id());


?>
<!doctype html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Test NFC Dummy</title>
    <link rel="stylesheet" href="../style/custom/overview.css">
</head>

<body id="page-overview">
    <header>
        <?php getModule('menu')?>
    </header>
    <main>

        <button id="writeNFC" value='69' href="#writeToNFC" uk-toggle>Open >Write </button>
        <h1 id="logtext"> Test NFC </h1>

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



    </main>
    <footer>

    </footer>
</body>



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






</script>

<style id="compiled-css" type="text/css">
.dots-cont {
    position: absolute;
    left: 45%;


}

.dot {
    width: 12px;
    height: 12px;
    background: #22303e;
    display: inline-block;
    border-radius: 50%;
    right: 0px;
    bottom: 0px;
    margin: 0px 2.5px;
    position: relative;
    animation: jump 1s infinite;
}

.dots-cont:hover>.dot {
    position: relative;
    /* bottom: 0px; */
    animation: none;
}

.dots-cont .dot-1 {
    -webkit-animation-delay: 100ms;
    animation-delay: 100ms;
}

.dots-cont .dot-2 {
    -webkit-animation-delay: 200ms;
    animation-delay: 200ms;
}

.dots-cont .dot-3 {
    -webkit-animation-delay: 300ms;
    animation-delay: 300ms;
}

@keyframes jump {
    0% {
        bottom: 0px;
    }

    20% {
        bottom: 5px;
    }

    40% {
        bottom: 0px;
    }
}
</style>

</html>