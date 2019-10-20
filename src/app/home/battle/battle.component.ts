/*
The Battlefield component, rendered by the App component.

Responsible for rendering two Combatant components, and listening to
their `stars` output in order to highlight the winner.
*/

import { Component } from '@angular/core';

@Component({
  selector: 'battle',
  templateUrl: 'battle.component.html',
  styleUrls: ['battle.component.scss'],
})
export class BattleComponent {
  plrs = ['FOO', null, null];
  get winner() {
    const result =
      this.plrs[1] === null || this.plrs[2] === null
        ? 0
        : this.plrs[1] === this.plrs[2]
        ? 0
        : this.plrs[1] > this.plrs[2]
        ? 1
        : 2;
    return result;
  }
  setUserStars(plr, data) {
    this.plrs[plr] = data;
  }
}
