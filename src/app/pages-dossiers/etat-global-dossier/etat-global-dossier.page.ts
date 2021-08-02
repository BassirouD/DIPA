import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Chart} from 'angular-highcharts';
import {ManagerService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-etat-global-dossier',
    templateUrl: './etat-global-dossier.page.html',
    styleUrls: ['./etat-global-dossier.page.scss'],
})
export class EtatGlobalDossierPage implements OnInit {

    data: any;
    annee = localStorage.getItem('annee');
    periode = parseInt(localStorage.getItem('periode'));
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    etat: any;
    valeurs: any;

    moisder: any = [];
    data1: any = [];
    data2: any = [];
    chartOptions: any;

    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

    constructor(public modal: ModalController, private route: Router,
                public loadingController: LoadingController,
                private toastController: ToastController, private alertCtrl: AlertController, private manager: ManagerService) {
    }

    ngOnInit() {
        this.etat = 'total'
        this.listJoindres();
        this.listCaracteriseDIPA();
        this.listJoindresGraphiques();
    }

    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
    }

    async presentAlert(mgs) {
        const alert = await this.alertCtrl.create({
            header: 'Info',
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


    async listJoindres() {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manager.listJoindres(this.annee)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                if (this.data.length != 0) {
                    loading.dismiss();
                } else {
                    this.presentAlert("Aucune donnée pour cette période !!");
                }
            }, err => {
                console.log(err);
            })
    }

    async listCaracteriseDIPA() {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manager.dipastraites(this.annee)
            .subscribe(resp => {
                this.valeurs = resp;
                console.log(this.valeurs)
                if (this.valeurs.length != 0) {
                    loading.dismiss();
                } else {
                    this.presentAlert("Aucune donnée pour cette période !!");
                }
            }, err => {
                console.log(err);
            })
    }

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    getTextColor(textId: string): string {
        return this.selecteTextId == textId ? "highlight-color" : "";
    }

    effacer(){
        this.data1 =[];
        this.data2=[];
    }

    listJoindresGraphiques() {
        this.effacer();
        this.manager.listJoindres(this.annee)
            .subscribe(resp => {
                this.data = resp;
                for (var i = 0; i < this.data.length; i++) {
                    this.data1.push(this.data[i].count);
                    this.moisder.push(this.mois[this.data[i].Periode - 1]);
                }
                // for(var i=0;i<this.periode;i++){
                //   this.moisder.push(this.mois[i]);
                // }
                console.log(this.data);
                this.manager.dipastraites(this.annee)
                    .subscribe(resp => {
                        this.valeurs = resp;
                        console.log(this.valeurs)
                        for (var i = 0; i < this.valeurs.length; i++) {
                            this.data2.push(this.valeurs[i].count);
                        }
                        console.log(this.data2);

                        this.chartOptions = new Chart({
                            chart: {
                                type: 'spline'
                            },
                            title: {
                                text: 'Total demande - demandes traitées'
                            },
                            colors: [
                                '#6495ED',
                                '#FFA500'
                            ],
                            xAxis: {
                                categories: this.moisder
                            },
                            yAxis: {
                                title: {
                                    text: 'Les demandes'
                                }
                            },
                            series: [{
                                name: 'Total demande',
                                type: undefined,
                                data: this.data1
                            },
                                {
                                    name: 'demandes traitées',
                                    type: undefined,
                                    data: this.data2
                                }]
                        });

                    }, err => {
                        console.log(err);
                    })
                //console.log(this.data2);

            }, err => {
                console.log(err);
            })
    }


}
