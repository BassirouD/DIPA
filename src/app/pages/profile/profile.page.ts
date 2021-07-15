import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  showLocationDetail = false;
  user:any;
  login=localStorage.getItem('login')
  nom:any;
  prenom:any;
  email:any;
  telepohne:any;
  constructor(private authS:AuthService,private router:Router) {}

  ngOnInit(): void {
    //console.log(this.login)
    this.chechUser();
  }

  check(){
    this.chechUser();
  }

  chechUser(){
    this.authS.getUserDetail(this.login)
    .subscribe(resp=>{
      this.user=resp;
      console.log(this.user);
      this.nom=this.user.nom
      this.prenom=this.user.prenom
      this.email=this.user.email;
      this.telepohne=this.user.telephone;

    })
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 40;
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  logOut(){
    localStorage.removeItem('annee');
   localStorage.removeItem('periode');
    this.router.navigateByUrl('/');
  }

  goToChangePassword(){
    this.router.navigateByUrl('/change-password');
  }

  goToChangeProfil(){
    this.router.navigateByUrl('/change-profil');
  }

}
