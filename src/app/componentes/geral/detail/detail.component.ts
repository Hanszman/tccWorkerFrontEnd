import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../modal/modal.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() titulo: string;
  @Input() config;
  @Input() url: string;
  @Input() id;
  @Input() parametros;
  @Input() existemBotoes = true;
  @Input() existeBotaoVoltar = true;
  @Input() existeBotaoEditar = true;
  @Input() existeBotaoExcluir = true;
  @Input() existeFoto = false;
  @Input() fotoUrl;
  conjuntoDados;
  conjuntoLinks = [];
  backLink = '../../';
  traducoes;
  apiURL = environment.apiURL;

  constructor(
    private router: Router,
    private service: HttpService,
    private translate: TranslateService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.consultar();
    this.traduzir().subscribe((traducoes) => {
      this.traducoes = traducoes;
    })
  }

  consultar(){
    this.service.getDetail(this.url + '/read', this.id, this.parametros).subscribe((obj) => {
      this.mapearDados(obj.body);
    });
  }

  mapearDados(obj){
    if (obj.data) {
      this.conjuntoDados = [];
      obj.data.forEach(elemento => {
        this.config.cabecalhos.forEach(item => {
          if (!(item in elemento))
            throw "Formato incorreto de dados";
        });
        this.conjuntoDados.push(elemento);
      });
      if (this.existeFoto && this.conjuntoDados[0]['arq_foto'] !== null)
        this.fotoUrl = this.apiURL + this.conjuntoDados[0]['arq_foto'];
      if (this.config.hasOwnProperty('links')){
        if (this.config.links.hasOwnProperty('detail')) {
          if (this.config.links.detail)
            this.backLink = '../../../';
        }
        for (let i = 0; i < this.config.cabecalhos.length; i++) {
          if(this.config.links.hasOwnProperty(this.config.cabecalhos[i]))
            this.conjuntoLinks.push(this.config.links[this.config.cabecalhos[i]])
          else
            this.conjuntoLinks.push(undefined);
        }
      }
      else {
        for (let i = 0; i < this.config.cabecalhos.length; i++)
          this.conjuntoLinks.push(undefined);
      }
    }
    else
      throw "Objeto não possui conjunto de dados!"
  }

  traduzir(){
    let idioma = 'br';
    this.translate.use(idioma);
    return this.translate.get(this.config.titulo);
  }

  tradutor(chave){
    if (this.traducoes !== undefined){
      if (chave in this.traducoes)
        return this.traducoes[chave];
      return '';
    }
  }

  salvarPDF(){
    window.print();
  }

  excluir(){
    const modalRef = this.modalService.show(ModalComponent);
    modalRef.content.titulo = 'Excluir ' + this.titulo;
    modalRef.content.mensagem = 'Tem certeza que deseja excluir esse registro?';
    modalRef.content.existeMensagem = true;
    modalRef.content.existeBotaoExcluir = true;
    modalRef.content.emiteClicaBotaoExcluir.subscribe(() => {
      this.service.deleteExcluir(this.url + '/delete', this.id).subscribe(resp => {
        if (resp.body['data']['sucesso']){
          alert(resp.body['data']['mensagem']);
          this.router.navigate([this.url + '/read']);
        }
        else {
          alert(resp.body['data']['mensagem']);
        }
      });
    });
  }
}
