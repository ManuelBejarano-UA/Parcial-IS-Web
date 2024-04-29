import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  plants: Array<Plant> = [];
  insidePlants: number = 0;
  outsidePlants: number = 0;

  constructor(private plantService: PlantService) { }

  ngOnInit() {
    this.getPlants();
  }

  getPlants(): void {
    this.plantService.getPlants().subscribe((plants) => {
      this.plants = plants;
      this.calculatePlantTypes();
    });
  }

  calculatePlantTypes(): void {
    this.insidePlants = this.plants.filter(plant => plant.tipo === 'Interior').length;
    this.outsidePlants = this.plants.filter(plant => plant.tipo === 'Exterior').length;
  }

}
