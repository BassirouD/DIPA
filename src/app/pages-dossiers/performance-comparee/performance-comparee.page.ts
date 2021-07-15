import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Chart} from 'angular-highcharts';
import {ManagerService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-performance-comparee',
    templateUrl: './performance-comparee.page.html',
    styleUrls: ['./performance-comparee.page.scss'],
})
export class PerformanceCompareePage implements OnInit {
    annee = localStorage.getItem('annee');
    loadData = {annee1: this.annee, annee2: ''};
    periode = parseInt(localStorage.getItem('periode'));
    valeurs: any;
    mode: string = '';
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    moisder: any = [];
    chartData1: any = [];
    chartData: any = [];
    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';
    public pepperoni: boolean = false;
    public pepperoni1: boolean = false;

    constructor(private route: Router, public modal: ModalController, private manager: ManagerService,
                public loadingController: LoadingController, private toastController: ToastController, private alertCtrl: AlertController) {
        this.mode = 'nombre'
    }

    chartOptions: any;

    data: any;

    ngOnInit() {
    }


    gotoParam() {
        localStorage.removeItem('periode');
        localStorage.removeItem('annee');
        this.route.navigate(['parametrage']);
    }

    change() {
        console.log(this.pepperoni)
        if (this.pepperoni == false) {
            this.drawing()
        } else {
            this.drawing2()
        }

    }

    parametrervolume() {
        this.mode = 'nombre';
        this.parametrer();
    }

    async parametrerCA() {
        console.log('clickk !!!' + this.loadData.annee1);
        this.mode = 'valeur';
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manager.prixTwoYears(this.loadData.annee1, this.loadData.annee2)
            .subscribe(resp => {
                this.valeurs = resp;
                console.log(this.valeurs);
                if (this.valeurs.length != 0) {
                    loading.dismiss();
                } else {
                    this.presentAlert("Aucune donnée pour ce mois !!");
                }
            }, err => {
                console.log(err);
            })
    }


    gotoMenu() {
        this.route.navigate(['tabs/tab1'])
    }

    async parametrer() {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        console.log(this.loadData.annee1);
        this.manager.listJoindre2Months(this.loadData.annee1, this.loadData.annee2)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                if (this.data.length != 0) {
                    loading.dismiss();
                } else {
                    this.presentAlert("Aucune donnée pour cet intervalle !!");
                }
            }, err => {
                console.log(err);
            })

    }

    parametrer1() {
        this.parametrer();
        this.parametrerCA();
        this.drawing();
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

    effacer() {
        this.chartData = []
        this.chartData1 = []
    }

    drawing() {
        //console.log( 'aneee'+ this.loadData.annee1);
        this.effacer()
        this.manager.listJoindre2Months(parseInt(this.loadData.annee1), parseInt(this.loadData.annee2))
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                for (var i = 0; i < this.data.length; i++) {
                    //this.chartData.push(this.data[i].count);
                    this.moisder.push(this.mois[this.data[i].Periode - 1]);
                    //console.log("comparaison "+this.data[i].annee===thithis.loadData.annee1);
                    if (this.data[i].annee === parseInt(this.loadData.annee1)) {
                        this.chartData1.push(this.data[i].count)

                    }
                    if (this.data[i].annee === parseInt(this.loadData.annee2)) {
                        this.chartData.push(this.data[i].count)
                    }
                }

                console.log(this.chartData);
                console.log(this.chartData1)

                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Evolution du volume des demandes DIPA entre ' + this.loadData.annee1 + 'et ' + this.loadData.annee2
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
                            text: 'Nombre demandes'
                        }
                    },
                    series: [{
                        name: this.loadData.annee1,
                        type: undefined,
                        data: this.chartData1
                    }, {
                        name: this.loadData.annee2,
                        type: undefined,
                        data: this.chartData
                    },]

                });

            }, err => {
                console.log(err);
            })

    }


    drawing2() {
        this.effacer();
        this.manager.prixTwoYears(parseInt(this.loadData.annee1), parseInt(this.loadData.annee2))
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                for (var i = 0; i < this.data.length; i++) {
                    //this.chartData.push(this.data[i].count);
                    this.moisder.push(this.mois[this.data[i].Periode - 1]);
                    //console.log("comparaison "+this.data[i].annee===thithis.loadData.annee1);
                    if (this.data[i].annee === parseInt(this.loadData.annee1)) {
                        this.chartData1.push(this.data[i].total)

                    }
                    if (this.data[i].annee === parseInt(this.loadData.annee2)) {
                        this.chartData.push(this.data[i].total)
                    }
                }

                console.log(this.chartData);
                console.log(this.chartData1)

                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Estimation du prix total sur les articles DIPA entre ' + this.loadData.annee1 + 'et ' + this.loadData.annee2
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
                            text: 'Nombre demandes'
                        }
                    },
                    series: [{
                        name: this.loadData.annee1,
                        type: undefined,
                        data: this.chartData1
                    }, {
                        name: this.loadData.annee2,
                        type: undefined,
                        data: this.chartData
                    },]

                });

            }, err => {
                console.log(err);
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

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    getTextColor(textId: string): string {
        return this.selecteTextId == textId ? "highlight-color" : "";
    }

}
