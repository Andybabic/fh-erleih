import Popup from './modules/Popup.js';
class Swipebox {

    // when mouse is over the swipebox object an moved to left or right, the swipebox object will be moved to the left or right
    // the max distance is limited to 300px

    constructor(element) {
        this.element = element;
        this.element.addEventListener('mousemove', this.mouseMove.bind(this));
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this));
        this.element.addEventListener('mousedown', this.mouseDown.bind(this));
        this.element.addEventListener('mouseup', this.mouseUp.bind(this));

        // adding touch events
        this.element.addEventListener('touchstart', this.touchStart.bind(this));
        this.element.addEventListener('touchmove', this.touchMove.bind(this));
        this.element.addEventListener('touchend', this.touchEnd.bind(this));
        this.element.addEventListener('touchstart', this.touchStart.bind(this));
        // maxdistance is element width/2 but not more than 300px
        this.maxdistance = Math.min(600, this.element.offsetWidth / 2);
        this.trashhold= 0.2;
        this.pos=0;
        this.state=0;
        this.fixed= true

    }   


    //check if interaction is active
    mouseDown(event) {
        this.mouseDown = true;
        this.mouseDownX = event.clientX - this.element.offsetLeft;
    }
    touchStart(event) {

        this.touchStart= true;
        this.touchStartX = event.touches[0].clientX - this.element.offsetLeft;
    }

    // is active moving
    mouseMove(event) {
        if (this.mouseDown && this.fixed) {
            let x = event.clientX - this.element.offsetLeft;
                let distance = x - this.mouseDownX;
            this.drag(event, distance);
        }
    }
    touchMove(event) {
        if(this.touchStart && this.fixed) {
            let x =  event.touches[0].clientX - this.element.offsetLeft;
            let distance = x - this.touchStartX;
            this.drag(event,distance);   
         }
    }

     //interaction stopping
    mouseLeave() {
        this.cancel();
        
    }

    mouseUp() {
        this.cancel();
        
    }
    touchEnd() {
        this.cancel();
    }

    cancel(){
        this.touchStart = false;
        this.mouseDown = false;
    }

    reset(){
            setTimeout(() => {
               this.fixed=true;
               this.pos=0;
               this.element.style.left =this.pos+ 'px';
               this.element.style.transition = 'all 0.9s ease-in-out';
          });
    }



    drag(event,distance){
        
        let maxDistance = this.maxdistance;
        this.pos=distance;
        this.element.style.left = this.pos + 'px';
        if(distance < maxDistance*this.trashhold && distance > -maxDistance*this.trashhold && this.state == 1){
            this.fixed=false;
            this.check();
            this.reset();
        }
        else if (distance > maxDistance*this.trashhold && this.state == 0) {
            this.fixed=false;
            this.check();
            this.cancel();
        } 
        else if (distance < -maxDistance*this.trashhold && this.state == 0) {    
            this.fixed=false;        
            this.check();
            this.cancel();
        }
        else {
            this.reset();
        }
       
       
    }

   

    //check current position an finish interaction
    check(){
        this.maxdistance = Math.min(600, this.element.offsetWidth / 2);
        this.fixed=false;
        this.mouseDown = false;
        this.touchStart = false;
        var distance = this.pos;
        //this.element.style.transition = 'all 0.1s ease-in-out';
        if  (this.state==1)  {
            this.state=0;
            this.movePostition(0);  
            
        } 
        else {
            if (distance < (-1* this.maxdistance * this.trashhold) && this.state == 0)   {
                this.movePostition( -1* this.maxdistance);
                this.state=1;
            }
            if (distance > (1* this.maxdistance * this.trashhold)  && this.state == 0) {
                this.movePostition( 1* this.maxdistance);
                this.state=1;
    
            }

        }

        
            
        //this.element.style.transition = 'all 0.3s ease-in-out';
        

    }

    movePostition(position){
        this.pos=position;
        this.element.style.left =this.pos+ 'px';
        this.element.style.transition = 'all 0.3s ease-in-out';
        this.fixed=true;
        this.cancel();
        


        

    }




}
function startSwipebox(){
    var swipebox_Objects = document.getElementsByClassName("swipebox_Object");
    for (var i = 0; i < swipebox_Objects.length; i++) {
        var swipebox_Object = new Swipebox(swipebox_Objects[i]);
        
        
    }
    console.log("swipebox started");

}


//if page is loaded
window.onload = function() {
    //let waitForLoading= 
    pageLoadingState.siteloading_check(startSwipebox);
}

//if document is ready, start the script
document.addEventListener('DOMContentLoaded', function () {

    // create a uniqe instance of Swipebox for every div with class swipebox_Object
    
}
);




    // create slow movement of the swipebox object
function smooth(start,end) {
        let distance = end - start;
        let speed = distance / 100;
        let step = speed / 10;
        let current = start;
        let interval = setInterval(function () {
            current += step;
            if (current > end) {
                current = end;
                clearInterval(interval);
            }
            this.element.style.left = current + 'px';
        }.bind(this), 10);
}
  

    //adding onclick dialogues
    function displaySwipeModal(){
        $(".btn-checklist").on("click", (e) => {
            const type = e.target.dataset.type;
            console.log(type);
            
            const modal = new Popup(e, type);
        });
    }
    displaySwipeModal();