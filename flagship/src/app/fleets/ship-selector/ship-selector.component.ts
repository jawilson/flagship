import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShipFactory } from '../../domain/factories/shipFactory';
import { Ship, ShipData } from '../../domain/game/ship';
import { Fleet } from '../../domain/game/fleet';

export interface ShipSelectorData {
  fleet: Fleet;
}
@Component({
  selector: 'flagship-ship-selector',
  templateUrl: './ship-selector.component.html',
  styleUrls: ['./ship-selector.component.scss']
})
export class ShipSelectorComponent implements OnInit {

  private shipFactory = new ShipFactory();
  public ships: ShipData[] = [];

  constructor(public dialogRef: MatDialogRef<ShipSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShipSelectorData) { }

  ngOnInit() {
    //let allUpgrades = this.shipFactory.ships
    this.ships = this.shipFactory.getShips(this.data.fleet.faction, this.data.fleet.ships.filter(x => x.unique).map(x => x.name)).sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  selectShip(ship: ShipData) {
    let instantiatedShip = this.shipFactory.instantiateShip(ship.id, this.data.fleet.customCommander);
    this.dialogRef.close(instantiatedShip);
  }

}
