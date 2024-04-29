/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlantListComponent } from './plant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { el, faker } from '@faker-js/faker';
import { Plant } from '../plant';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PlantListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 3; i++) {
      const plant = new Plant(
        faker.number.int(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.number.int(),
        faker.lorem.sentence(),
        faker.lorem.sentence()
      );
      component.plants.push(plant);
    }
      fixture.detectChanges();
      debug = fixture.debugElement;
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table with 4 <tr> elements, one for theader and three for the plant list', () => {
    expect(debug.queryAll(By.css('table'))).toHaveSize(1)
    expect(debug.queryAll(By.css('tr'))).toHaveSize(4)
    debug.queryAll(By.css('tr')).forEach((element, i) => {
      if (i === 0) {
        expect(element.nativeElement.textContent).toContain('#');
        expect(element.nativeElement.textContent).toContain('Nombre común');
        expect(element.nativeElement.textContent).toContain('Tipo');
        expect(element.nativeElement.textContent).toContain('Clima');
      } else {
        expect(element.nativeElement.textContent).toContain(component.plants[i - 1].id.toString());
        expect(element.nativeElement.textContent).toContain(component.plants[i - 1].nombre_comun);
        expect(element.nativeElement.textContent).toContain(component.plants[i - 1].tipo);
        expect(element.nativeElement.textContent).toContain(component.plants[i - 1].clima);
      }
    });
  });

});
