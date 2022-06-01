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

        this.initLuckyWheel();
    };

    initLuckyWheel(){
        this.addInteraction();
        const wheelData = [
            {
                name: "Kompliment",
                color: "#16a085",
                message: "Ein Kompliment hat noch nie geschadet!",
                content: this.getCompliment()
            },

            {
                name: "Geld",
                color: "#c0392b",
                message: "Gratuliere zum Hauptgewinn!",
                content: this.getMoney(),
            },
            {
                name: "Meme",
                color: "#d35400",
                message: "Ein tägliches Meme für dich!",
                content: `<a href="https://www.youtube.com/watch?v=xvFZjo5PgG0">Link</a>`
            },
            {
                name: "Glückskeks",
                color: "#f39c12",
                message: "Ein täglicher Glückskeks für dich!",
                content: this.getFortuneCookie()
            },
            {
                name: "Witz",
                color: "#34495e",
                message: "Ein täglicher Witz für dich!",
                content: this.getJoke()
            },
            {
                name: "Rickroll",
                color: "#2980b9",
                message: "Pure entertainment",
                content: `<a href="https://www.youtube.com/watch?v=xvFZjo5PgG0">Link</a>`
            },
        ];
        this.vars.wheelData = wheelData;
        console.log(this.vars.wheelData[0]);
    }

    getRandomMessage(){}

    getFortuneCookie(){
        return "Heute wird alles gut";
    }

    getCompliment(){
        return "Du bist so wunderschön!";
    }

    getMoney(){
        return `<p>Du hast 254 Euro gewonnen!</p>`;
    }

    getJoke(){
        return "Geht ein Kaugummi um die Ecke und bleibt kleben.";
    }


    getPosition(position){
        console.log(position);
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
                                <p>${dataSet.message}</p>
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

    addCloseFunction(){
        UIkit.util.on(document, 'hidden', '#luckyWheel-popup', () => {
            $("#luckyWheel-popup").remove();
        });
    }



    addInteraction(){
        $('.wheel__button').on("click", () => {
            if (this.vars.clicked == true) {
                this.vars.countClicked++;
                if (this.vars.countClicked <= 2) {
                    $('.popup__note').text("NGỪNG PHÁ ĐI MEN!");
                } else if (this.vars.countClicked <= 4)
                    $('.popup__note').text("LÌ QUÁ NGHEN!");
                else
                    $('.popup__note').text("BÓ TAY, RÁNG PHÁ BANH NÚT NHA!");
                if (!$('.popup').hasClass('active'))
                    $('.popup').addClass('active');
            } else {
                let random = Math.floor((Math.random() * 360) + 720);
                this.vars.value += random;
                $(".wheel__inner").css("transform", `rotate(${this.vars.value}deg)`);
                setTimeout(() => {
                    //Chia lấy dư cho 360 để lấy lượng quay không hoàn thành một vòng 360deg
                    this.getPosition(this.vars.value % 360);
                }, 5000);
            }
            this.vars.clicked = true;
        })
    }

}