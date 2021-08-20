import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthService} from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loadData = {login: '', password: ''};
    user: any;
    userForm: FormGroup;
    user1: any;

    constructor(public loadingController: LoadingController,
                public router: Router,
                private toastController: ToastController,
                private alertCtrl: AlertController,
                public nav: NavController,
                private formBuilder: FormBuilder, private auths: AuthService) {
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }


    async login1() {
        const loading = await this.loadingController.create({
            message: "Please wait !!!",
            duration: 3000
        });
        await loading.present()

        //console.log(this.userForm.value);
        let body = `login=${this.userForm.value.login}&password=${this.userForm.value.password}`;

        this.auths.login1(body)
            .subscribe(resp => {
                this.user = resp;
                //console.log('user ::'+JSON.stringify(this.user))
                loading.dismiss();
                //
                if (this.user != null) {
                    localStorage.setItem('loggedIn', 'true');
                    localStorage.setItem('login', this.user.login)
                    localStorage.setItem('id', this.user.ID);
                    // this.presentAlert("Connexion réussie !!");
                    console.log('default ' + this.user.DEFAULTPWD)
                    if (this.user.DEFAULTPWD === '0') {
                        this.router.navigate(['tabs/home']);
                    } else {
                        this.router.navigate(['change-password'])
                    }
                } else {
                    this.presentAlert("Paramétre authentification non correct!!");
                }

            }, err => {
                this.presentAlert("Erreur authentification!!");
            })

    }

    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
            header: 'Alert',
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

}
