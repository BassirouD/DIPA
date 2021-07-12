import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  showLocationDetail = false;

  constructor(private router: Router) { }

  ngOnInit() {
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
