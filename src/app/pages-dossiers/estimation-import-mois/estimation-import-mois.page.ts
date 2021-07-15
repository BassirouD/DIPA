import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Chart} from 'angular-highcharts';
import {ManagerService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-estimation-import-mois',
    templateUrl: './estimation-import-mois.page.html',
    styleUrls: ['./estimation-import-mois.page.scss'],
})
export class EstimationImportMoisPage implements OnInit {

    annee = localStorage.getItem('annee');
    periode = localStorage.getItem('periode');
    data: any;
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    data1: any = [];
    moisder: any = [];
    chartOptions: any;

    //mois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre'];
    constructor(public modal: ModalController,
                private route: Router, private manager: ManagerService, public loadingController: LoadingController, private toastController: ToastController, private alertCtrl: AlertController) {
    }


    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

    ngOnInit() {
        this.sommesByMontsByYear();
    }


    async sommesByMontsByYear() {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manager.sommesArticleByMonthYear(this.annee)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                if (this.data.length != 0) {
                    loading.dismiss();

                    //chart
                    for (var i = 0; i < this.data.length; i++) {
                        this.data1.push(this.data[i].total);
                        this.moisder.push(this.mois[this.data[i].periode - 1]);
                    }

                    console.log(this.data);
                    this.chartOptions = new Chart({
                        chart: {
                            type: 'spline'
                        },
                        title: {
                            text: 'Estimation en valeur sur les articles DIPA par mois '
                        },
                        colors: [
                            '#6495ED'
                        ],
                        xAxis: {
                            categories: this.moisder
                        },
                        yAxis: {
                            title: {
                                text: 'Temps (en jours)'
                            }
                        },
                        series: [{
                            name: '',
                            type: undefined,
                            data: this.data1
                        }]

                    });

                } else {
                    this.presentAlert("Aucune donnée pour cette période !!");
                }
            }, err => {
                console.log(err);
            })
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


    onScroll(ev) {
        const offset = ev.detail.scrollTop;
        this.showLocationDetail = offset > 40;
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

    numStr(a, b) {
        //verify number is integer or not
        if (Number.isInteger(a) === false) {
            //arrondir à trois chiffres aprés la virgule
            a = a.toFixed(3);
        }

        a = '' + a;
        b = b || ' ';
        var c = '',
            d = 0;
        while (a.match(/^0[0-9]/)) {
            a = a.substr(1);
        }
        for (var i = a.length - 1; i >= 0; i--) {
            c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
            d++;
        }
        return c;
    }

    numberWithCommas(n) {
        var parts = n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
}
