import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from 'src/app/services/auth.service';
import {ActionSheetController} from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    showLocationDetail = false;
    user: any;
    login = localStorage.getItem('login')
    nom: any;
    prenom: any;
    email: any;
    telepohne: any;
    toDay;
    mouth;

    constructor(private authS: AuthService, private router: Router, public actionSheetController: ActionSheetController) {

    }

    ngOnInit(): void {
        //console.log(this.login)
        this.chechUser();
        this.getInit();
    }

    getInit(){
        let date = new Date();
        this.mouth=date.getMonth() + 1;
        this.toDay = Date().substr(11, 4);
        localStorage.setItem('annee', this.toDay);
        localStorage.setItem('periode', this.mouth);
    }

    check() {
        this.chechUser();
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


    checkcode(event) {
        let periode = event.target.value;
        localStorage.setItem('periode', periode);
    }

    async presentActionSheet(event) {
        const actionSheet = await this.actionSheetController.create({
            header: 'Albums',
            cssClass: 'my-custom-class',
            buttons: [{
                text: 'Janvier',
                handler: () => {
                    console.log('Delete clicked');
                }
            }, {
                text: 'Février',
                handler: () => {
                    console.log('Share clicked');
                }
            }, {
                text: 'Mars',
                handler: () => {
                    console.log('Play clicked');
                }
            }, {
                text: 'Avril',
                handler: () => {
                    console.log('Favorite clicked');
                }
            },
                {
                    text: 'Mai',
                    handler: () => {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Juin',
                    handler: () => {
                        console.log('Share clicked');
                    },
                },
                {
                    text: 'Juillet',
                    handler: () => {
                        console.log('Share clicked');
                    }
                }, {
                    text: 'Aout',
                    handler: () => {
                        console.log('Share clicked');
                    }
                }, {
                    text: 'Septembre',
                    handler: () => {
                        console.log('Share clicked');
                    }
                }, {
                    text: 'Octombre',
                    handler: () => {
                        console.log('Share clicked');
                    }
                }, {
                    text: 'Novembre',
                    handler: () => {
                        console.log('Share clicked');
                    }
                }, {
                    text: 'Decembre',
                    handler: () => {
                        console.log('Share clicked');
                    }
                },]
        });
        await actionSheet.present();

        const {role} = await actionSheet.onDidDismiss();
        console.log('onDidDismiss resolved with role', role);
    }


    checkannee(event) {
        let annee = event.target.value;
        localStorage.setItem('annee', annee);
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

    gotoEG() {
        this.router.navigate(['/etat-global-dossier']);
    }

    gotoCDossier() {
        this.router.navigate(['/estimation-import-article']);
    }

    gotoTE() {
        this.router.navigate(['/tendance-evolution-mois']);
    }

    gotoTM() {
        this.router.navigate(['/demandes-traitees-articles']);
    }

    gotoPC() {
        this.router.navigate(['/performance-comparee']);
    }

    gotoPT() {
        this.router.navigate(['/estimation-import-mois']);
    }

}
