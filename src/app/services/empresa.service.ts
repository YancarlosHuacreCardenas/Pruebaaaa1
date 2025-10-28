import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private empresa: Empresa = {
    id: 1,
    nombre: 'Altavista Rooftop',
    mision: 'Brindar experiencias exclusivas con calidad y elegancia.',
    vision: 'Ser el rooftop más reconocido de la ciudad.',
    valores: ['Innovación', 'Calidad', 'Servicio', 'Exclusividad'],
    servicios: ['Cocktails Exclusivos', 'Gastronomía Gourmet', 'Eventos Privados']
  };

  getEmpresa(): Empresa {
    return this.empresa;
  }
}
