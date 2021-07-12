import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estimation-import-mois',
  templateUrl: './estimation-import-mois.page.html',
  styleUrls: ['./estimation-import-mois.page.scss'],
})
export class EstimationImportMoisPage implements OnInit {

    clicked: boolean = true;
    showLocationDetail: boolean = false;
    private selecteTextId: string = 'text1';

    constructor() { }

    ngOnInit() {
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

    getTextColor(textId: string): string{
        return this.selecteTextId == textId? "highlight-color" : "";
    }
}
