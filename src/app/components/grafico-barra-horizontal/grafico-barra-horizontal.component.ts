import {Component, Input, OnDestroy} from '@angular/core';


@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements  OnDestroy{

  @Input() results: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';
  colorScheme = 'nightLights';

  constructor() {}


  onSelect(event): void {
    console.log(event);
  }

  // Limpia la fuga de memoria en la ejecucion
  ngOnDestroy(): void {
    // clearInterval(this.intervalo);
  }

}
