import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ManagerService} from 'src/app/services/manager.service';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-document',
    templateUrl: './document.page.html',
    styleUrls: ['./document.page.scss'],
})
export class DocumentPage implements OnInit {

    user: any;
    login = localStorage.getItem('login')
    nom: any;
    prenom: any;
    email: any;
    telepohne: any;

    showLocationDetail = false;
    annee = localStorage.getItem('annee');
    periode = parseInt(localStorage.getItem('periode'));
    data: any;
    mois: any = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aôut', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    data2: any;
    loadData = {mois1: ''};
    data3: any;
    loadData1 = {mois1: ''};
    loadData2 = {mois1: ''};
    private selecteTextId: string = 'text1';

    setSelectedText(textId: string) {
        this.selecteTextId = textId;
    }

    getTextColor(textId: string): string {
        return this.selecteTextId == textId ? "highlight-color" : "";
    }

    change1(event) {
        this.loadData.mois1 = event.target.value;
        this.allImportateurs(this.loadData.mois1);
    }

    constructor(private route: Router,
                private manage: ManagerService,
                public loadingController: LoadingController,
                private toastController: ToastController,
                private authS: AuthService,
                private alertCtrl: AlertController, private modal: ModalController) {
    }

    ngOnInit() {
        this.chechUser()
    }


    numberWithCommas(n) {
        var parts = n.toString().split(".");
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }

    async allImportateurs(mois) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manage.listImportateurs(mois, this.annee)
            .subscribe(resp => {
                this.data = resp;
                console.log(this.data);
                if (this.data.length != 0) {
                    loading.dismiss();
                } else {
                    this.presentAlert("Aucune donnée pour ce mois !!");
                }
            }, err => {
                console.log(err);
            })
    }

    gotoParam() {
        localStorage.removeItem('periode');
        localStorage.removeItem('annee');
        this.route.navigate(['parametrage']);
    }

    async parametrer(mois) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manage.listPaysOrigin(this.annee, mois)
            .subscribe(resp => {
                this.data2 = resp;
                console.log(this.data2);
                if (this.data.length != 0) {
                    loading.dismiss();
                } else {
                    this.presentAlert("Aucune donnée pour cette période !!");
                }
            }, err => {
                console.log(err);
            })
    }

//   async openImp(){
//     let modal = await this.modal.create({
//       component:ImportmodalPage,
//       componentProps:{value1:this.loadData.mois1}
//     });
//     modal.present();
//   }


    async parametrerBeneficiares(mois) {
        const loading = await this.loadingController.create({
            message: "Veuillez patienter !!!",
            duration: 3000
        });
        await loading.present()
        this.manage.beneficiaire(mois, this.annee)
            .subscribe(resp => {
                this.data3 = resp;
                console.log(this.data3);
                if (this.data3.length != 0) {
                    loading.dismiss();
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

    formatter(num) {
        const n = String(num),
            p = n.indexOf('.')
        return n.replace(
            /\d(?=(?:\d{3})+(?:\.|$))/g,
            (m, i) => p < 0 || i < p ? `${m},` : m
        )
    }

    getFormattedCurrency(num) {
        num = num.toFixed(2)
        var cents = (num - Math.floor(num)).toFixed(2);
        return Math.floor(num).toLocaleString() + '.' + cents.split('.')[1];
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

    parametrer1() {
        //this.allImportateurs);
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

    change2(event) {
        this.loadData1.mois1 = event.target.value;
        this.parametrer(this.loadData1.mois1);
    }

    change3(event) {
        this.loadData2.mois1 = event.target.value;
        this.parametrerBeneficiares(this.loadData2.mois1)
    }


    chechUser() {
        this.authS.getUserDetail(this.login)
            .subscribe(resp => {
                this.user = resp;
                console.log(this.user);
                this.nom = this.user.nom
                this.prenom = this.user.prenom
                this.email = this.user.email;
                this.telepohne = this.user.telephone;

            })

    }
}
