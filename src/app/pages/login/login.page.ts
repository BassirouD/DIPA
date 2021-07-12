import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loadData={username:'',password:''} ;
  user:any;
  userForm:FormGroup;
  user1:any;
  constructor(public loadingController:LoadingController,
              public router:Router,
              private toastController: ToastController,
              private alertCtrl: AlertController,public nav:NavController,private formBuilder:FormBuilder) { }

  ngOnInit() {
  }

  async login1(){
    // const loading = await this.loadingController.create({
    //     message:"Please wait !!!",
    //     duration: 2000
    // });
    // await loading.present()
    // //this.userForm.value.grant_type="password"
    // let grant_type="password"
    //
    // console.log( 'loaddata '+ JSON.stringify(this.loadData));
    // let body = `username=${this.loadData.username}&password=${this.loadData.password}&grant_type=${grant_type}`;
    // console.log(body);
    // this.auths.login(body)
    //     .subscribe(resp=>{
    //         this.user=resp;
    //         console.log('user ::'+JSON.stringify(this.user))
    //         loading.dismiss();
    //         //
    //         if(this.user!=null){
    //             localStorage.setItem('loggedIn','true');
    //             localStorage.setItem('login',this.loadData.username)
    //             localStorage.setItem('token',this.user.access_token);
    //             this.presentAlert("Connexion réussie !!");
    //             //this.router.navigate(['parametrage']);
    //             this.auths.getUserbyLogin(this.loadData.username)
    //                 .subscribe(data=>{
    //                     this.user1=data;
    //                     localStorage.setItem('id',this.user1.ID);
    //                     localStorage.setItem('iden',this.user1.identreprise);
    //                     localStorage.setItem('idapp',this.user1.idapplication);
    //                     //console.log("user 1"+ JSON.stringify(this.user1))
    //                     let id = this.user1.ID;
    //                     if(this.user1.DEFAULTPWD==='0'){
    //                         this.router.navigate(['/tabs/overview',id]);
    //
    //                     }else{
    //                         this.router.navigate(['confirmpassword'])
    //                     }
    //                 })
    //         }else{
    //             this.presentAlert("Paramétre authentification non correct!!");
    //         }
    //
    //     },err=>{
    //         this.presentAlert("Erreur authentification!!");
    //     })

    this.router.navigate(['/tabs/home']);

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
