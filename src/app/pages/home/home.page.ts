import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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


  checkcode(event){
     let periode=event.target.value;
     localStorage.setItem('periode',periode);
  }


  checkannee(event){
      let annee=event.target.value;
      localStorage.setItem('annee',annee);
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

    gotoEG(){
        this.router.navigate(['/etat-global-dossier']);
    }

    gotoCDossier(){
        this.router.navigate(['/estimation-import-article']);
    }

    gotoTE(){
        this.router.navigate(['/tendance-evolution-mois']);
    }

    gotoTM(){
        this.router.navigate(['/demandes-traitees-articles']);
    }

    gotoPC(){
        this.router.navigate(['/performance-comparee']);
    }

    gotoPT(){
        this.router.navigate(['/estimation-import-mois']);
    }

}
