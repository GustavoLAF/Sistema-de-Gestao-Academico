import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../_models/usuario';
import { Cargos } from '../../../_enums/cargos.enum';
import { UsuarioService } from '../../../_services/usuario.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

  usuario: Usuario;
  senhaVerificacao: string;
  cargos = Cargos;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  criar(): void {
    //this.usuario.cargo = Cargos.coordenador;
    //this.usuarioService.criar(this.usuario)
    //  .subscribe(
    //    id => {
    //      console.log(id);
    //    }
    //  );

    console.log(this.usuario);
  }


  brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];

  filteredBrands: any[];


  filterBrands(event) {
    this.filteredBrands = [];
    for (let i = 0; i < this.brands.length; i++) {
      let brand = this.brands[i];
      if (brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filteredBrands.push(brand);
      }
    }
  }

}
