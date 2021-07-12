import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TendanceEvolutionMoisPage } from './tendance-evolution-mois.page';

describe('TendanceEvolutionMoisPage', () => {
  let component: TendanceEvolutionMoisPage;
  let fixture: ComponentFixture<TendanceEvolutionMoisPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TendanceEvolutionMoisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TendanceEvolutionMoisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
