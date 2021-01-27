import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';
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
  id_empresa = window.localStorage.getItem('id_empresa');
  etapaList = [];
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

  constructor(
    private route: ActivatedRoute,
    private service: HttpService
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_empresa=' + this.id_empresa + '&ordenarPor=ind_sequencia&direcao=asc&';
    this.service.getConsultar('etapa', this.parametros).subscribe((obj) => {
      let conjunto = obj.body.data.dados;
      for (let i = 0; i < conjunto.length; i++) {
        this.etapaList[i] = new Object();
        this.etapaList[i]['id_etapa'] = conjunto[i]['id_etapa'];
        this.etapaList[i]['dsc_etapa'] = conjunto[i]['dsc_etapa'];
        this.etapaList[i]['atividade_list'] = [];
        this.service.getConsultar('atividade', 'id_etapa=' + conjunto[i]['id_etapa']).subscribe((innerObj) => {
          let innerConjunto = innerObj.body.data.dados;
          for (let j = 0; j < innerConjunto.length; j++)
            this.etapaList[i]['atividade_list'].push(innerConjunto[j]['dsc_nome']);
        });
      }
    });
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