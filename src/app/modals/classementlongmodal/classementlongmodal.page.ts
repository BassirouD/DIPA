import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Chart } from 'angular-highcharts';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-classementlongmodal',
  templateUrl: './classementlongmodal.page.html',
  styleUrls: ['./classementlongmodal.page.scss'],
})
export class ClassementlongmodalPage implements OnInit {

    mois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre'];
    produit:any;
    annee=localStorage.getItem('annee');
    periode=localStorage.getItem('periode');
    data:any;
    data1:any=[];
    moisder:any=[];
    articles:any=[];
    chartOptions:any;
    constructor(private nav:NavParams,public modal:ModalController,private manage:ManagerService) {
      this.produit=this.nav.get('value1')
     }

    ngOnInit() {
      this.parametrer();
    }



    parametrer(){
      console.log(this.produit);
      this.manage.volumeByProduct1(this.produit,this.annee)
      .subscribe(resp=>{
         this.data=resp;
         console.log(this.data);
         for(var i=0;i<this.data.length;i++){
          this.data1.push(this.data[i].total);
          this.moisder.push(this.mois[this.data[i].mois-1]);
          //this.articles.push(this.data[i].nom);
        }
        this.chartOptions =new Chart({
          chart: {
           type: 'spline'
         },
         title: {
           text: 'Valeurs des demandes concernant l"article :'+this.produit
         },
        colors:[
          '#6495ED'
       ],
         xAxis: {
           categories: this.moisder
         },
         yAxis: {
           title: {
             text: 'Volume dossier traité'
         }
         },
         series:[{
          name:'',
          type:undefined,
           data: this.data1
         }]

       });
      },err=>{
        console.log(err);
      })
    }

    close(){
      this.modal.dismiss();
      //this.setPortrait();
    }

}
