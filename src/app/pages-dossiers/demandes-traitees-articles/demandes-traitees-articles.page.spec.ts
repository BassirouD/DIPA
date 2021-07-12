import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemandesTraiteesArticlesPage } from './demandes-traitees-articles.page';

describe('DemandesTraiteesArticlesPage', () => {
  let component: DemandesTraiteesArticlesPage;
  let fixture: ComponentFixture<DemandesTraiteesArticlesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandesTraiteesArticlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemandesTraiteesArticlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
