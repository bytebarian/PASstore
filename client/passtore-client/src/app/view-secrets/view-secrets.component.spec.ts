import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSecretsComponent } from './view-secrets.component';

describe('ViewSecretsComponent', () => {
  let component: ViewSecretsComponent;
  let fixture: ComponentFixture<ViewSecretsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSecretsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSecretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
