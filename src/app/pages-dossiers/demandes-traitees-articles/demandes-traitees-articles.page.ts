import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TendancemodalPage } from 'src/app/modals/tendancemodal/tendancemodal.page';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-demandes-traitees-articles',
  templateUrl: './demandes-traitees-articles.page.html',
  styleUrls: ['./demandes-traitees-articles.page.scss'],
})
export class DemandesTraiteesArticlesPage implements OnInit {
    annee=localStorage.getItem('annee');
  periode=parseInt(localStorage.getItem('periode'));
  mois:any=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aôut','Septembre','Octobre','Novembre','Décembre'];
  data:any;
  loadData={code:''};
  mode:any='';
  valeurs:any;

    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

    constructor(private modal:ModalController,private route:Router,private manage:ManagerService) { }

    ngOnInit() {
        this.mode='demande'
        //this.listCaracteriseDIPA();
      }

    loadTmt1(){
        //this.mode="demande"
        this.manage.listDemandesByHCode(this.annee,this.loadData.code)
         .subscribe(resp=>{
           this.data=resp;
           console.log(this.data);
         },err=>{
           console.log(err);
         })
      }

      loadTmt2(){
        //this.mode="traite"
        this.manage.listDemandeHcodeTraites(this.annee,this.loadData.code)
        .subscribe(resp=>{
          this.valeurs=resp;
        },err=>{
          console.log(err);
        })
      }

      parametrer(){
        this.loadTmt1();
        this.loadTmt2();
     }

     async open(article){
        let modal = await this.modal.create({
           component:TendancemodalPage,
           componentProps:{value1:article,value2:this.mode}
         });
         modal.present();
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
        console.log(textId)
        if(this.selecteTextId==='text1'){
            this.mode='demande'
        }else{
            this.mode='traite'
        }

    }

    getTextColor(textId: string): string{
        return this.selecteTextId == textId? "highlight-color" : "";
    }

}
