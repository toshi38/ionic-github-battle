import { Component, Input } from '@angular/core';
import { CombatantInfo } from '../../../types';

@Component({
  selector: 'combatantdetail',
  templateUrl: 'combatant-detail.component.html',
  styleUrls: ['combatant-detail.component.scss'],
})
export class CombatantDetailComponent {
  @Input() data: CombatantInfo;
  get languageKeys() {
    const count = this.data.repos.languages;
    return Object.keys(count).sort((l1, l2) => (count[l1] > count[l2] ? -1 : 1));
  }
}
