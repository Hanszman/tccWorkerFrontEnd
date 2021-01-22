import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DetailService } from './detail.service';
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
  @Input() existeBotaoVoltar = true;
  @Input() existeBotaoExcluir = true;
  @Input() existeFoto = false;
  @Input() fotoUrl;
  conjuntoDados;
  traducoes;
  apiURL = environment.apiURL;

  constructor(
    private router: Router,
    private service: DetailService,
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
    this.service.getDetail(this.url + '/read', this.id).subscribe((obj) => {
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
