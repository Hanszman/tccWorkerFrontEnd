import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-setor-detail',
  templateUrl: './setor-detail.component.html',
  styleUrls: ['./setor-detail.component.css']
})
export class SetorDetailComponent implements OnInit {

  id;
  url = 'setor';
  urlProjeto = 'projeto';
  urlFuncionario = 'usuario_empresa';
  titulo = 'Setor';
  tituloProjeto = 'Projeto';
  tituloFuncionario = 'Funcionário';
  parametros;
  id_empresa = window.localStorage.getItem('id_empresa');
  ind_controle_acesso = window.localStorage.getItem('ind_controle_acesso');
  existemBotoes = false;
  @Input() config = {
    titulo: 'setor',
    cabecalhos: [
      'dsc_setor'
    ]
  };
  @Input() configProjeto = {
    titulo: 'projeto',
    cabecalhos: [
      'dsc_nome',
      'dat_inicio',
      'dat_fim'
    ],
    paginacao: 5
  };
  @Input() configFuncionario = {
    titulo: 'usuario',
    cabecalhos: [
      'dsc_nome_completo',
      'dsc_login',
      'dsc_cargo'
    ],
    paginacao: 5
  };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => this.id = params['id']);
    this.parametros = 'id_setor=' + this.id + '&id_empresa=' + this.id_empresa + '&';
    if (this.ind_controle_acesso != 'C')
      this.existemBotoes = true;
  }

  ngOnInit(): void {
  }

  emiteClicaBotaoDetalhesEspecialFuncionario(linha) {
    window.scrollTo(0,0);
    this.router.navigate(['usuario/read/'], {queryParams: {id_funcionario_parametro: linha.id_usuario}});
  }
}