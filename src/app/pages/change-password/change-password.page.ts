import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {AuthService} from 'src/app/services/auth.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

    loadData = {password: '', confirmpassword: ''}
    login = localStorage.getItem('login');
    id = localStorage.getItem('id');
    user: any;

    constructor(private authS: AuthService,
                private formBuilder: FormBuilder,
                private router: Router, public loadingController: LoadingController,
                private toastController: ToastController, public auths: AuthService, public nav: NavController,
                private alertCtrl: AlertController) {
    }

    userPassword = this.formBuilder.group({
        password: ['', Validators.required],
        confirmPass: ['', Validators.required]
    })

    ngOnInit() {
    }

    container = document.querySelector(".container")


    goToCompte() {
        this.router.navigateByUrl('/tabs/profile')
    }

    signIn(evt) {
        this.container.classList.remove("sign-up-mode");
        document.querySelector("sign-in-mode");
    }

    signUp(evt) {
        this.container.classList.add("sign-up-mode");
        document.querySelector("sign-up-mode");
    }

    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
            header: 'Alerte',
            message: mgs,
            buttons: ['OK']
        });

        await alert.present();

    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    async changePassword() {
        const loading = await this.loadingController.create({
            message: "Please wait !!!",
            duration: 3000
        });
        await loading.present()
        if (this.userPassword.value.password === this.userPassword.value.confirmPass) {
            let body = `id=${this.id}&password=${this.userPassword.value.password}`;
            this.authS.changePwd(body)
                .subscribe(data => {
                    loading.dismiss();
                    this.presentAlert("Mot de passe modifié !!");
                    this.router.navigateByUrl('/');
                }, err => {
                    console.log("error " + err);
                })
        } else {
            this.presentAlert("Mot de passe non conforme !!");
        }
    }

    getUser() {
        this.authS.getUserDetail(this.login)
            .subscribe(data => {
                this.user = data;
            })
    }


}
