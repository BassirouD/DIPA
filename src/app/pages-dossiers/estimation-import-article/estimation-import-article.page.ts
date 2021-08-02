import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ClassementlongmodalPage} from 'src/app/modals/classementlongmodal/classementlongmodal.page';
import {ManagerService} from 'src/app/services/manager.service';

@Component({
    selector: 'app-estimation-import-article',
    templateUrl: './estimation-import-article.page.html',
    styleUrls: ['./estimation-import-article.page.scss'],
})
export class EstimationImportArticlePage implements OnInit {
    loadData = {code: ''};
    annee = localStorage.getItem('annee');
    periode = parseInt(localStorage.getItem('periode'));
    data: any;
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

    constructor(public modal: ModalController,
                private route: Router, private manage: ManagerService,
                public loadingController: LoadingController, private toastController: ToastController, private alertCtrl: AlertController) {
    }

    ngOnInit() {
    }

    async parametrer() {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        console.log(this.loadData.code);
        this.manage.volumeByProduct(this.loadData.code, this.annee)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                if (this.data.length != 0) {
                    loading.dismiss();
                } else {
                    this.presentAlert("Aucune donnée pour cette sélection ");
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

    async open(article) {
        let modal = await this.modal.create({
            component: ClassementlongmodalPage,
            componentProps: {value1: article}
        });
        modal.present();
    }

    numberWithCommas(n) {
        var parts = n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
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

}
