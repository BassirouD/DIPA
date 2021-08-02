import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Chart} from 'angular-highcharts';
import {ManagerService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-tendance-evolution-mois',
    templateUrl: './tendance-evolution-mois.page.html',
    styleUrls: ['./tendance-evolution-mois.page.scss'],
})
export class TendanceEvolutionMoisPage implements OnInit {
    annee = localStorage.getItem('annee');
    loadData = {annee1: '', annee2: ''};
    periode = parseInt(localStorage.getItem('periode'));
    valeurs: any;
    mode: string = '';
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    data: any;
    moisder: any = [];
    data1: any = [];
    data2: any = [];
    private selecteTextId: string = 'text1';
    diff: number;
    loadData1 = {annee1: '', annee2: ''}
    chartData: any = [];
    chartData1: any = [];
    chartOptions: any;
    mode1 = 0;

    constructor(private route: Router, public modal: ModalController, private manager: ManagerService,
                public loadingController: LoadingController, private toastController: ToastController, private alertCtrl: AlertController) {
    }

    ngOnInit() {
        //this.plotSimpleBarChart();
        //this.listJoindres();
    }

    checkannee1(event) {
        this.loadData1.annee1 = event.target.value;
        console.log(this.loadData1.annee1)
        if (this.loadData1.annee2 != '') {
            this.drawing();
        }
    }


    effacer() {
        //this.modee=0;
        //this.loadData.annee1=''
        //this.loadData.annee2=''
        this.chartData = [];
        this.chartData1 = [];
    }


    drawing() {
        this.effacer();
        this.mode1 = 1;
        this.manager.listJoindre2Months(this.loadData1.annee1, this.loadData1.annee2)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                for (var i = 0; i <= this.data.length; i++) {
                    //console.log( "anneee "+ this.data[i].annee);
                    this.moisder.push(this.mois[this.data[i]?.Periode - 1]);
                    if (this.data[i]?.annee === parseInt(this.loadData1.annee1)) {
                        this.chartData.push(this.data[i]?.count);
                        console.log(' Bon !!');
                    }
                    if (parseInt(this.data[i]?.annee) === parseInt(this.loadData1.annee2)) {
                        this.chartData1.push(this.data[i]?.count);
                    }
                }
                console.log('charting ' + this.chartData)
                console.log('charting 2 ' + this.chartData1)
                this.chartOptions = new Chart({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Tendance évolutive ' + this.loadData1.annee1 + ' et ' + this.loadData1.annee2
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
                            text: 'Volume DIPA'
                        }
                    },
                    series: [{
                        name: this.loadData1.annee1,
                        type: undefined,
                        data: this.chartData
                    }, {
                        name: this.loadData1.annee2,
                        type: undefined,
                        data: this.chartData1
                    },]

                });

            }, err => {
                console.log(err);
            })
    }

    checkannee2(event) {
        this.loadData1.annee2 = event.target.value;
        if (this.loadData1.annee1 != '') {
            this.drawing();
        }
    }

    //   setLandscape(){
    //     // set to landscape
    //     this.screen.lock(this.screen.ORIENTATIONS.LANDSCAPE);
    //   }

    //   setPortrait(){
    //     // set to portrait
    //     this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
    //   }

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

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    getTextColor(textId: string): string {
        return this.selecteTextId == textId ? "highlight-color" : "";
    }


    // async open(){
    //   let modal = await this.modal.create({
    //     component:Tendance1modalPage,
    //     componentProps:{value1:this.loadData.annee1,value2:this.loadData.annee2}
    //   });
    //   modal.present();
    // }

    async parametrer() {
        this.diff = parseInt(this.loadData.annee2) - parseInt(this.loadData.annee1);

        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        console.log(this.loadData.annee1);
        this.manager.listtendances(this.loadData.annee1, this.loadData.annee2)
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


    /*listJoindres(){
      this.manager.listJoindres(this.annee)
      .subscribe(resp=>{
        this.data=resp;
        for(var i=0;i<this.data.length;i++){
          this.data1.push(this.data[i].count);
          this.moisder.push(this.mois[this.data[i].periode-1]);
        }
        // for(var i=0;i<this.periode;i++){
        //   this.moisder.push(this.mois[i]);
        // }
       console.log(this.data);
       this.manager.dipastraites(this.annee)
      .subscribe(resp=>{
       this.valeurs=resp;
       console.log(this.valeurs)
       for(var i=0;i<this.valeurs.length;i++){
        this.data2.push(this.valeurs[i].count);
      }
      console.log(this.data2);

      var chartOptions: Highcharts.Options = {
        chart: {
         type: 'spline'
       },
       title: {
         text: 'Total demande - demandes traitées'
       },
       colors:[
        '#6495ED',
        '#FFA500',
        '#00ff00'
     ],
       xAxis: {
         categories: this.moisder
       },
       yAxis: {
         title: {
           text: 'Les demandes exigées- effectuées - traitées'
       }
       },
       series:[
        {
          name:'Exigées',
          type:undefined,
           data:this.data1
         },
         {
        name:'Total demandes effectuées',
        type:undefined,
         data: this.data1
       },
       {
        name:'demandes traitées',
        type:undefined,
         data: this.data2
       }]

     };
     var chart = Highcharts.chart("highcharts", chartOptions);

      },err=>{
        console.log(err);
      })
      //console.log(this.data2);

      },err=>{
        console.log(err);
      })
    }
    */

    doRefresh(event) {
        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

}
