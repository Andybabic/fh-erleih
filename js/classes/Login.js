"use strict";
import Ajax from './Ajax.js';

(function ($, window, document, undefined) {

            class LoginPage{

                //CONSTRUCTOR
                constructor($base) {
                    this.doms = {
                        base:           $base,
                        form:           $base.find(".form-login"),
                        inputUsername:  $base.find("#input-username"),
                        inputPassword:  $base.find("#input-password"),
                        feedback:       $base.find(".wrapper-feedback-login"),
                    };
                    this.request = new Ajax();
                    this.pageUrl = "https://verleihneu.fhstp.ac.at/fh_erleih/";

                    this.initLogin();

                };

                //METHODS
                async initLogin () {
                    if(await this.request.checkAuth()){
                        //there is a valid session
                        window.location.replace(this.pageUrl+"pages/overview.php");
                    }else{
                        //setup login page
                        this.setupLogin();
                    }
                }; // initLogin()

                setupLogin (){
                    this.doms.form.on("submit", (e) => {
                        //initially remove feedback
                        this.doms.form.find("input").removeClass("feedback-input-empty");
                        //e.target.preventDefault();
                        e.preventDefault();
                        if(this.doms.inputUsername === ""){
                            this.doms.inputUsername.addClass("feedback-input-empty");
                        }else if(this.doms.inputPassword === ""){
                            this.doms.inputPassword.addClass("feedback-input-empty");
                        }else{
                            //login if username and password are both set
                            this.login();
                        }
                    });
                }; //addInteraction

                async login(){
                    const loginResult = await this.request.login(this.doms.inputUsername.val(), this.doms.inputPassword.val());
                    if(loginResult.success == true){
                        window.location.replace(this.pageUrl+"pages/overview.php");
                    }else{
                        alert(loginResult.errorCode);
                    }
                };

            }


            const init = () => {
                if ($(".wrapper-login").length > 0) {
                    new LoginPage($(".wrapper-login"));
                }
            };
            init();

})(jQuery, window, document);