import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-quadro-detail',
  templateUrl: './quadro-detail.component.html',
  styleUrls: ['./quadro-detail.component.css']
})
export class QuadroDetailComponent implements OnInit {

  id;
  url = 'quadro';
  titulo = 'Quadro';
  parametros;
  @Input() config = {
    titulo: 'quadro',
    cabecalhos: [
      'dsc_nome',
      'dsc_descricao',
      'dat_inicio',
      'dat_fim',
      'dsc_projeto'
    ]
  };
  todo = [
    'Get to work',
    'Pick up groceries',
  ];
  doing = [
    'Go home',
    'Fall asleep',
    'Get up'
  ];
  done = [
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_quadro=' + this.id + '&';
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>){
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
  }
}