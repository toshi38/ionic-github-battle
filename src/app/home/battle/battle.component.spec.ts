/******************************************
Unit tests for the Battle component. We need to test...

 * template
 * correct appliance of the `winner` class depending on `Combatant` outputs

/*******************************************/

// --------------- Test config ---------------

import { CommonModule } from '@angular/common';
import { MockComponent, MockedComponent } from 'ng-mocks';

import { BattleComponent } from '../battle/battle.component';
import { CombatantComponent } from '../combatant/combatant.component';

const testModuleConfig = {
  imports: [CommonModule],
  declarations: [BattleComponent, MockComponent(CombatantComponent)],
};

// --------------- Test suite ---------------

import { TestBed, getTestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

let fixture: ComponentFixture<BattleComponent>;
let instance: BattleComponent;
let debugElement: DebugElement;
let nativeElement: HTMLElement;

describe('BattleComponent', () => {
  beforeEach(() => TestBed.configureTestingModule(testModuleConfig));
  afterEach(() => getTestBed().resetTestingModule());

  beforeEach(() => {
    fixture = TestBed.createComponent(BattleComponent);
    debugElement = fixture.debugElement;
    instance = debugElement.componentInstance;
    nativeElement = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should instantiate ok', () => {
    expect(instance).toBeTruthy();
  });

  it('should render two combatants', () => {
    expect(nativeElement.querySelectorAll('combatant').length).toBe(2);
  });

  describe('the winner class', () => {
    let combatant1: MockedComponent<CombatantComponent>,
      combatant2: MockedComponent<CombatantComponent>,
      combatantElement1: HTMLElement,
      combatantElement2: HTMLElement;
    beforeEach(() => {
      [combatant1, combatant2] = debugElement.queryAll(By.css('combatant')).map(el => el.componentInstance);
      [combatantElement1, combatantElement2] = Array.from(nativeElement.querySelectorAll('combatant'));
    });
    it('should not be initially applied', () => {
      expect(nativeElement.querySelector('.winner')).not.toBeTruthy();
    });
    it('should not be applied after we have just one count', () => {
      combatant1.stars.emit(456);
      fixture.detectChanges();
      expect(nativeElement.querySelector('.winner')).not.toBeTruthy();
    });
    it('should be applied to combatant1 when count exceeds combatant2', () => {
      combatant1.stars.emit(5);
      combatant2.stars.emit(4);
      fixture.detectChanges();
      expect(combatantElement1.classList.contains('winner')).toBe(true);
      expect(combatantElement2.classList.contains('winner')).toBe(false);
    });
    it('should be applied to combatant2 when count exceeds combatant1', () => {
      combatant1.stars.emit(1);
      combatant2.stars.emit(8);
      fixture.detectChanges();
      expect(combatantElement1.classList.contains('winner')).toBe(false);
      expect(combatantElement2.classList.contains('winner')).toBe(true);
    });
    it('should not be applied when counts are equal', () => {
      combatant1.stars.emit(7);
      combatant2.stars.emit(7);
      fixture.detectChanges();
      expect(nativeElement.querySelector('.winner')).not.toBeTruthy();
    });
    it('should be removed again if opponent becomes null', () => {
      combatant1.stars.emit(5);
      combatant2.stars.emit(4);
      combatant2.stars.emit(null);
      fixture.detectChanges();
      expect(nativeElement.querySelector('.winner')).not.toBeTruthy();
    });
    it('should move if loser gets more', () => {
      combatant1.stars.emit(5);
      combatant2.stars.emit(4);
      combatant2.stars.emit(6);
      fixture.detectChanges();
      expect(combatantElement1.classList.contains('winner')).toBe(false);
      expect(combatantElement2.classList.contains('winner')).toBe(true);
    });
  });
});
