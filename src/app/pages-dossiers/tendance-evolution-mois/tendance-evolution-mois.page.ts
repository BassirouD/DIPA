import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tendance-evolution-mois',
  templateUrl: './tendance-evolution-mois.page.html',
  styleUrls: ['./tendance-evolution-mois.page.scss'],
})
export class TendanceEvolutionMoisPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

}
