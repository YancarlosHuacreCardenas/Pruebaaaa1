import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ClienteListaComponent } from './admin/cliente-lista/cliente-lista.component';
import { ClienteFormComponent } from './admin/cliente-form/cliente-form.component';
import { ProductoListaComponent } from './admin/producto-lista/producto-lista.component';
import { ProductoFormComponent } from './admin/producto-form/producto-form.component';

export const routes: Routes = [
  // 👇 Página principal (inicio)
  { path: '', component: HomeComponent, pathMatch: 'full' },

  // 👇 Panel de administración
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'cliente-lista', component: ClienteListaComponent },
      { path: 'cliente-form', component: ClienteFormComponent },
      { path: 'cliente-form/:id', component: ClienteFormComponent },
      { path: 'producto-lista', component: ProductoListaComponent },
      { path: 'producto-form', component: ProductoFormComponent },
      { path: 'producto-form/:id', component: ProductoFormComponent },
      { path: '', redirectTo: 'cliente-lista', pathMatch: 'full' },
    ],
  },

  // 👇 Si la ruta no existe, redirige al inicio
  { path: '**', redirectTo: '' },
];
