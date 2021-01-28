import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../geral/http/http.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../geral/modal/modal.component';

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
    private service: HttpService,
    private modalService: BsModalService
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
        this.service.getConsultar('atividade', 'id_etapa=' + conjunto[i]['id_etapa'] + '&id_quadro=' + this.id).subscribe((innerObj) => {
          let innerConjunto = innerObj.body.data.dados;
          for (let j = 0; j < innerConjunto.length; j++) {
            this.etapaList[i]['atividade_list'][j] = new Object();
            this.etapaList[i]['atividade_list'][j]['atividade_id'] = innerConjunto[j]['id_atividade'];
            this.etapaList[i]['atividade_list'][j]['atividade_nome'] = innerConjunto[j]['dsc_nome'];
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>){
    if (event.previousContainer === event.container)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.atualizarAtividadeDrop(event.item.element.nativeElement.id, event.container.id);
    }
  }

  atualizarAtividadeDrop(id_atividade, id_etapa){
    this.service.getConsultarForm('atividade/read', id_atividade).subscribe((obj) => {
      let conjunto = obj.body.data[0];
      let dados = new Object();
      dados['dsc_nome'] = conjunto['dsc_nome'];
      dados['dsc_descricao'] = conjunto['dsc_descricao'];
      dados['dat_inicio'] = conjunto['dat_inicio'];
      dados['dat_fim'] = conjunto['dat_fim'];
      dados['id_quadro'] = this.id;
      dados['id_etapa'] = id_etapa;
      this.service.putEditar('atividade/update', id_atividade, dados).subscribe((resp) => {
        if (!resp.body['data']['sucesso'])
          alert(resp.body['data']['mensagem']);
      });
    });
  }

  criarAtividadeModal(id_etapa){
    console.log(id_etapa);
  }

  editarAtividadeModal(id_atividade, id_etapa){
    console.log(id_atividade);
    console.log(id_etapa);
  }

  detalhesAtividadeModal(id_atividade, id_etapa){
    console.log(id_atividade);
    console.log(id_etapa);
  }
}