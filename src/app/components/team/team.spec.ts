import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Team } from './team.component';

describe('Team', () => {
  let component: Team;
  let fixture: ComponentFixture<Team>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Team]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Team);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
