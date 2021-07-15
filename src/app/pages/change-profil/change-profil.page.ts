import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-change-profil',
    templateUrl: './change-profil.page.html',
    styleUrls: ['./change-profil.page.scss'],
})
export class ChangeProfilPage implements OnInit {

    userForm:FormGroup;
    login=localStorage.getItem('login')
    id=localStorage.getItem('id');
    user:any;
    loadData={nom:'',prenom:'',email:'',telephone:''}
    constructor(public loadingController:LoadingController,public router:Router,
                private toastController: ToastController,public nav:NavController,
                private alertCtrl: AlertController,private formBuilder:FormBuilder,private auths:AuthService) {

        this.userForm=this.formBuilder.group({
            nom:['',Validators.required],
            prenom:['',Validators.required],
            telephone:['',Validators.required],
            email: ['',Validators.required]
        });
    }


    ngOnInit() {
        this.auths.getUserDetail(this.login)
    .subscribe(data=>{
      this.user=data;
       this.loadData.nom=this.user.nom
       this.loadData.prenom=this.user.prenom
       this.loadData.telephone=this.user.telephone
       this.loadData.email=this.user.email
    })

    }


    async updateUser(){
        const loading = await this.loadingController.create({
          message:"Please wait !!!",
          duration:3000
        });
        await loading.present()
        let body = `ID=${this.id}&nom=${this.userForm.value.nom}&prenom=${this.userForm.value.prenom}&telephone=${this.userForm.value.telephone}&email=${this.userForm.value.email}`;
        this.auths.updateUser(body)
          .subscribe(data=>{
           loading.dismiss();
            this.presentAlert("Profil modifié !!");
            this.router.navigate(['tabs/profile'])
          },err=>{
            console.log("error "+err);
          })
      }




    gotoMenu(){
        //console.log('verif')
        this.router.navigate(['tabs/tab3']);
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

    getUser(){
        // this.authS.getUserbyLogin(this.login)
        //     .subscribe(data=>{
        //         this.user=data;
        //     })
    }


}
