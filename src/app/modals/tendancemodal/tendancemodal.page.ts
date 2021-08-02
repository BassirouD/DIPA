import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Chart} from 'angular-highcharts';
import {ManagerService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-tendancemodal',
    templateUrl: './tendancemodal.page.html',
    styleUrls: ['./tendancemodal.page.scss'],
})
export class TendancemodalPage implements OnInit {

    annee = localStorage.getItem('annee');
    periode = parseInt(localStorage.getItem('periode'));
    data: any;
    chartData: any = [];
    moisder: any = [];
    code: any;
    mode: any;
    articles: any = [];
    nom: any;
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    chartOptions: any;

    constructor(private modal: ModalController, private nav: NavParams, private manager: ManagerService) {
        this.code = this.nav.get('value1')
        this.mode = this.nav.get('value2');
    }

    ngOnInit() {
        console.log('le mode ' + this.mode)
        if (this.mode === "demande") {
            this.listCaracteriseDIPA();
        }
        if (this.mode === "traite") {
            this.listCaracteriseDIPA1();
        }


    }

    listCaracteriseDIPA() {
        this.manager.listdemandedouane1byhcode(this.annee, this.code)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data)
                for (var i = 0; i < this.data.length; i++) {
                    this.chartData.push(this.data[i].count);
                    this.moisder.push(this.mois[this.data[i].periode - 1]);

                    //this.articles.push(this.data[i].pays);
                }
                this.nom = this.data[0].nom;
                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Volume demandes traitées certifiées sur l"article numéro :' + this.code + ' et nom :' + this.nom
                    },
                    colors: [
                        '#6495ED'
                    ],
                    xAxis: {
                        categories: this.moisder
                    },
                    yAxis: {
                        title: {
                            text: 'Volume des demandes l" article :' + this.code
                        }
                    },
                    series: [{
                        name: '',
                        type: undefined,
                        data: this.chartData
                    }]

                });

            }, err => {
                console.log(err);
            })
    }

    listCaracteriseDIPA1() {
        this.manager.listdemandedouanetraitebyhcode(this.annee, this.code)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data)
                for (var i = 0; i < this.data.length; i++) {
                    this.chartData.push(this.data[i].count);
                    this.moisder.push(this.mois[this.data[i].periode - 1]);
                }
                this.nom = this.data[0].nom;
                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Volume demandes traitées certifiées sur l"article numéro :' + this.code + ' et  nom :' + this.nom
                    },
                    colors: [
                        '#6495ED'
                    ],
                    xAxis: {
                        categories: this.moisder
                    },
                    yAxis: {
                        title: {
                            text: 'Volume des demandes traitées'
                        }
                    },
                    series: [{
                        name: '',
                        type: undefined,
                        data: this.chartData
                    }]

                });
            }, err => {
                console.log(err);
            })
    }

    // setLandscape(){
    //   // set to landscape
    //   this.screen.lock(this.screen.ORIENTATIONS.LANDSCAPE);
    // }

    // setPortrait(){
    //   // set to portrait
    //   this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
    // }

    close() {
        this.modal.dismiss();
        //this.setPortrait();
    }

}
