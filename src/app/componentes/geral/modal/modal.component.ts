import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from '../http/http.service';
import { ValidateService } from '../../geral/validate/validate.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() titulo: string;
  @Input() existeModalForm = false;
  @Input() existeModalTable = false;
  @Input() existeModalDetalhes = false;
  @Input() existeBotaoDetalhes = false;
  @Input() existeBotaoCriar = false;
  @Input() existeBotaoEditar = false;
  @Input() existeBotaoExcluir = false;
  @Input() existeBotaoCancelar = true;
  @Input() existeSubtitulo = false;
  @Input() subtitulo: string;
  @Input() existeMensagem = false;
  @Input() mensagem: string;
  @Input() configTable;
  @Output() emiteClicaBotaoCriar = new EventEmitter();
  @Output() emiteClicaBotaoEditar = new EventEmitter();
  @Output() emiteClicaBotaoExcluir = new EventEmitter();
  config;
  url: string;
  id;
  idConsulta;
  idRelacao;
  relacao;
  dadosRelacao;
  parametros;
  traducoes;
  traducoesTable;
  registro: any = {};
  conjuntoDados: any = {};
  conjuntoDadosTable;

  constructor(
    private router: Router,
    public modalRef: BsModalRef,
    private service: HttpService,
    private validate: ValidateService
  ) { }

  ngOnInit(): void {
    if (this.idConsulta)
      this.consultasID(this.idConsulta);
    else if (this.id)
      this.consultasID(this.id);
  }

  consultasID(id){
    this.service.getConsultarForm(this.url + '/read', id, this.parametros).subscribe(resp => {
      for(let i = 0; i < this.config.cabecalhos.length; i++)
        this.registro[this.config.cabecalhos[i]] = resp.body['data'][0][this.config.cabecalhos[i]];
    });
    this.service.getDetail(this.url + '/read', id).subscribe(resp => {
      for(let i = 0; i < this.config.cabecalhos.length; i++)
        this.conjuntoDados[this.config.cabecalhos[i]] = resp.body['data'][0][this.config.cabecalhos[i]];
    });
  }

  tradutor(chave, table = false){
    if (!table) {
      if (this.traducoes !== undefined){
        if (chave in this.traducoes)
          return this.traducoes[chave];
        return '';
      }
    }
    else {
      if (this.traducoesTable !== undefined){
        if (chave in this.traducoesTable)
          return this.traducoesTable[chave];
        return '';
      }
    }
  }

  verificarResposta(resp){
    if (resp.body['data']['sucesso']){
      alert(resp.body['data']['mensagem']);
      window.location.reload();
    }
    else
      alert(resp.body['data']['mensagem']);
  }

  enviar(){
    for (let i = 0; i < this.config.obrigatorios.length; i++)
      this.validate.validaCampo(this.registro[this.config.obrigatorios[i]], this.config.obrigatorios[i], 'Informe ' + this.tradutor(this.config.obrigatorios[i]) + '!');
    
    for (let i = 0; i < this.config.obrigatorios.length; i++) {
      if (this.registro[this.config.obrigatorios[i]] == undefined || this.registro[this.config.obrigatorios[i]] == '' || this.registro[this.config.obrigatorios[i]] == 'undefined')
        return false;
    }

    for (var i in this.registro){
      if (this.registro[i] == undefined || this.registro[i] == '' || this.registro[i] == 'undefined')
        this.registro[i] = null;
    }
    
    if (this.relacao && this.idRelacao)
      this.registro['id_' + this.relacao] = this.idRelacao;
    if (this.dadosRelacao) {
      for (var i in this.dadosRelacao)
        this.registro[i] = this.dadosRelacao[i];
    }

    if (!this.id && this.existeBotaoCriar) {
      this.service.postCadastrar(this.url + '/create', this.registro).subscribe(resp => {
        this.verificarResposta(resp);
      });
    }
    else if (this.id && this.existeBotaoEditar) {
      this.service.putEditar(this.url + '/update', this.id, this.registro).subscribe(resp => {
        this.verificarResposta(resp);
      });
    }
    this.modalRef.hide();
  }

  detalhes(){
    this.router.navigate([this.url + '/read/' + this.id]);
    this.modalRef.hide();
  }

  clicaBotaoCriar(){
    this.emiteClicaBotaoCriar.emit();
    this.modalRef.hide();
  }

  clicaBotaoEditar(){
    this.emiteClicaBotaoEditar.emit();
    this.modalRef.hide();
  }

  clicaBotaoExcluir(){
    this.emiteClicaBotaoExcluir.emit();
    this.modalRef.hide();
  }

  cancelar(){
    this.modalRef.hide();
  }
}
