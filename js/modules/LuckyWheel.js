export default class LuckyWheel {
    constructor($base) {
        this.vars = {
            value           :0,
            countClicked    :0,
            clicked         :false
        };
        this.doms = {
            base: $base,
        };

        this.checkLastInteraction();
    };

    checkLastInteraction(){
        if(localStorage.lastWheelSpin){
            const lastDate = new Date(localStorage.lastWheelSpin);
            const storedDay = lastDate.getDate();
            const storedMonth = lastDate.getMonth();
            const currentDay = new Date().getDate();
            const currentMonth = new Date().getMonth();

            if(storedMonth != currentMonth || storedDay != currentDay){
                this.displayWheel();
                this.addInteraction();
            }else{
                this.displayNoWheel();
                this.vars.clicked = true;
            }
        }else{
            this.displayWheel();
            this.addInteraction();
        }
    }

    displayWheel(){
        const wheel =  `
                <button class="showWheel uk-button">Hol dir deine tägliche Belohnung ab!</button>
                <div class="wheel">
                    <div class="wheel__inner">
                        <div class="wheel__sec">
                        </div>
                        <div class="wheel__sec">
                        </div>
                        <div class="wheel__sec">
                        </div>
                        <div class="wheel__sec">
                        </div>
                        <div class="wheel__sec">
                        </div>
                        <div class="wheel__sec">
                        </div>
                    </div>
                    <div class="wheel__arrow">
                        <button class="wheel__button">LOS!</button>
                    </div>
                </div>`;
        this.doms.base.html(wheel);
    }

    displayNoWheel(){
        const message =  `
                <p>Hab noch einen schönen Tag!</p>`;
        this.doms.base.html(message);
    }

    async initLuckyWheel(){
        const wheelData = [
            {
                name: "Kompliment",
                color: "#16a085",
                content: this.getCompliment()
            },

            {
                name: "Chuck Norris",
                color: "#c0392b",
                content: await this.getChuckNorrisJoke(),
            },
            {
                name: "Bauernweisheit",
                color: "#d35400",
                content: this.getWisdom()
            },
            {
                name: "Glückskeks",
                color: "#f39c12",
                content: this.getFortuneCookie()
            },
            {
                name: "Witz",
                color: "#34495e",
                content: await this.getJoke()
            },
            {
                name: "Entertainment",
                color: "#2980b9",
                content: ` <video autoplay>
                              <source src="../../style/video/rickRoll.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                            </video> `
            },
        ];
        this.vars.wheelData = wheelData;
    }
    getFortuneCookie(){
        const cookieText = [
            "Der Abwasch kann warten - das Leben nicht.",
            "Du solltest viel öfter einen MUTausbruch haben.",
            "Wenn du auf ein Zeichen gewartet hast, hier ist es.",
            "Sei frech, wild und wunderbar.",
            "Hinfallen, aufstehen, Krone richten, weitergehen.",
            "Sei du selbst, alle anderen gibt es schon.",
            "Wer nicht vom Fliegen träumt, dem wachsen keine Flügel.",
            "Wenn dich dein Leben nervt, streu Glitzer drauf.",
            "Wer Sahne will, muss Kühe schütteln.",
            "Dieser Keks kann Spuren von Glück enthalten.",
            "Gib alles, nur nicht auf.",
            "It’s always wine o’clock.",
            "Was du heute kannst entkorken, das verschiebe nicht auf morgen.",
            "Du solltest erst einmal eine Nacht drüber feiern.",
            "Läuft bei dir, zwar rückwärts und bergab, aber läuft.",
        ];
        const randomNumb = Math.floor(Math.random() * cookieText.length);
        return this.quoteFromText(cookieText[randomNumb]);
    }

    getCompliment(){
        const compliments = [
            "Du bist echt ein Sonnenschein, immer strahlend und gut drauf!",
            "Wenn Du lachst, geht die Sonne auf! So schön!",
            "Du hast so einen tollen Humor – das ist echt ansteckend.",
            "Mit Dir kann man gar nicht anderes, als einen schönen Tag zu haben!",
            "Wie Du immer alles auf die Reihe bekommst, Respekt!",
            "Du hast wirklich für alles ein Händchen – egal, was Du machst, es wird toll!",
            "Die Leute, die Dich zum Freund haben, können sich wirklich glücklich schätzen!",
            "Du bist ein Geschenk, für jeden, der Dich kennt!",
            "Was Du Dir alles aufgebaut hast, verdient höchsten Respekt.",
            "Du kommst einfach überall gut an! Wie machst Du das nur? Das ist echt ein Talent!"
        ];
        const randomNumb = Math.floor(Math.random() * compliments.length);
        return this.quoteFromText(compliments[randomNumb]);
    }

    getWisdom(){
        const text = [
            "Der Bauer wird sich hüten, die Eier selbst zu brüten.",
            "Der Hofhund, der die Hühner frisst, ein hundsgemeines Haustier ist.",
            "Dreht der Hahn sich auf dem Grill, macht das Wetter, was es will.",
            "Ein Huhn schminkt sich als Wiedehopf und meidet so den Suppentopf.",
            "Es kräht der Hahn auf eig'nem Mist, nur wenn er Grundbesitzer ist.",
            "Es läßt den Bauern gar nicht ruh'n, wenn morgens schon die Hähne muh'n.",
            "Föhnt der Hahn sich seinen Kamm, glüht er rot und steht ganz stramm!",
            " Ist der Bauer noch nicht satt, fährt er sich ein Hühnchen platt.",
            "Ist der Hahn erkältet, heiser, kräht er morgens etwas leiser.",
            "Kommt der Gockel untern Trecker, gibt es morgen keinen Wecker!",
            "Kräht der Hahn erst nach vier Uhr, gehört er in die Reparatur.",
            "Kräht der Maulwurf auf dem Dach, liegt der Hahn vor Lachen flach.",
            "Lässt der Hahn die Arbeit ruh'n, kriegt er's mit dem Huhn zu tun.",
            "Wär'n die Eier plötzlich eckig, ging's den Hühnern ganz schön dreckig.",
            "Wenn der Hahn kräht auf dem Mist, sind wir, wo es schöner ist.",
            "Hat der Bauer Hühneraugen, trägt er Schuhe, die nichts taugen.",
            "Hat der Bauer kalte Schuhe, steht er in der Tiefkühltruhe.",
            "Hat der Bauer kalte Socken, wird er wohl im Kühlschrank hocken.",
            "Isst der Bauer Stoppelrüben, kommt die Blähung dann in Schüben!",
            "Ist der Bauer am Verrecken, wird er wohl im Silo stecken.",
            "Ist der Bauer heut gestorben, braucht er nichts zu essen morgen.",
            "Ist der Bauer völlig blank, gehört der Hof wohl bald der Bank.",
            "Liegt der Bauer auf der Lauer, wird Herr Lauer ganz toll sauer.",
            "Liegt der Bauer grün im Schrank, ist er scheinbar krank.",
            "Liegt der Bauer tot im Zimmer, lebt er nimmer.",
            "Liegt der Bauer unterm Tisch, war das Essen nicht mehr frisch.",
            "Liegt des Bauern Uhr im Mist, weiß er nicht, wie spät es ist.",
            "Macht 'ne Dame acht Bauern schwach, ist es ganz eindeutig Schach.",
            "Mischt der Bauer Gift zur Butter, ist sie für die Schwiegermutter!",
            "Nicht nur zum Skat braucht dann und wann die Bauersfrau 'nen dritten Mann.",
            "Schlägt der Blitz den Bauer tot, spart sein Weib ein Abendbrot.",
            "Sitzt der Bauer auf dem Klo, raucht er seine Marlboro.",
            "Steht die Bäuerin am Grab und kichert, war der Bauer Allianz versichert.",
            "Stinkt der Bauer arg nach Mist, gibt's zum Nachtisch Ehezwist.",
            "Teilt er Torte mit der Säge, kriegt der Bauer furchtbar Schläge.",
            "Verliert der Bauer seine Hose, war bestimmt der Gummi lose.",
            "Liebe vergeht, Hektar besteht!"
        ]
        const randomNumb = Math.floor(Math.random() * text.length);
        return this.quoteFromText(text[randomNumb]);
    }

    async getChuckNorrisJoke(){
        const joke = await ajax.getChuckNorrisJoke();
        console.log(joke.value)
        if(joke && joke.value != undefined){
            return this.quoteFromText(joke.value);
        }else{
            return this.quoteFromText(joke.value);
        }
    }

    async getJoke(){
        const joke = await ajax.getRandomJoke();
        console.log(joke[0].text);
        if(joke[0].text != undefined && joke){
            return this.quoteFromText(joke[0].text);
        }else{
            return this.quoteFromText(joke[0].text);
        }

    }

    quoteFromText(text){
        return `
        <div class="blockquote-wrapper">
          <div class="blockquote">
            <p>
             ${text}
             </p>
          </div>
        </div>
        `;
    }

    getPosition(position){
        if (position <= 30) {
            this.createPopup(0);
        } else if (position <= 90) {
            this.createPopup(1);
        } else if (position <= 150) {
            this.createPopup(2);
        } else if (position <= 210) {
            this.createPopup(3);
        } else if (position <= 270) {
            this.createPopup(4);
        } else if (position <= 330) {
            this.createPopup(5);
        } else {
            this.createPopup(0);
        }
        $('.popup').removeClass('active');
        $('.congratulation').fadeIn();

        this.vars.clicked = false;
        this.vars.countClicked = 0;
    }

    createPopup(id){
        const dataSet = this.vars.wheelData[id];
        const popup = `
                	<div id="luckyWheel-popup" uk-modal='{"bg-close" : true, "esc-close" : true, "stack" : true}'>
                        <div class="uk-modal-dialog uk-width-large uk-margin-auto-vertical">
                            <div class="uk-modal-header"  style="background-color: ${dataSet.color}">                         
                                <h2 class="uk-modal-title uk-text-lead uk-margin-remove-bottom">${dataSet.name}</h2>
                            </div>
                            <div class="uk-modal-body">
                                <div>${dataSet.content}</div>          
                            </div>
                            <div class="uk-modal-footer uk-flex uk-flex-column uk-text-center">
                                <button class="uk-button js-initOnlyButton returnButton uk-button-default colorBackgroundGrey uk-modal-close" type="button">Fenster schließen</button>
                                ${this.vars.equipment ? `
                                    <button class="uk-button js-initOnlyButton moreInfosButton uk-button-default colorSecondary uk-margin-small-top uk-margin-small-bottom" type="button">Equipment anzeigen</button>
                                    <button class="uk-button  displayResButton uk-button-default colorPrimary" type="button">Reservierung prüfen</button>` : ""}
                            </div>
                        </div>
                    </div>
            `;

        $("body").append(popup);
        UIkit.modal('#luckyWheel-popup').show();
        this.addCloseFunction();
    }

    removeWheel(){
        this.doms.base.remove();
    }

    addCloseFunction(){
        UIkit.util.on(document, 'hidden', '#luckyWheel-popup', () => {
            $("#luckyWheel-popup").remove();
            this.displayNoWheel();
        });
    }



    addInteraction(){
        //display wheel on click
        $(".showWheel").on("click", () => {
            $(".wheel").fadeIn();
            $(".showWheel").hide();
        });

        $('.wheel__button').on("click", () => {
            if (this.vars.clicked == false) {
                localStorage.lastWheelSpin = new Date();
                this.initLuckyWheel();
                let random = Math.floor((Math.random() * 360) + 720);
                this.vars.value += random;
                $(".wheel__inner").css("transform", `rotate(${this.vars.value}deg)`);
                setTimeout(() => {
                    this.getPosition(this.vars.value % 360);
                }, 5000);
            }
            this.vars.clicked = true;
        });
    }

}