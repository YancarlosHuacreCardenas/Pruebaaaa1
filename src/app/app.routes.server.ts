import { RenderMode, ServerRoute } from '@angular/ssr';

// Función para prerenderizar clientes
const getClientePrerenderParams = async () => {
  const clienteIds = ['1', '2', '3']; // reemplazar por IDs reales
  return clienteIds.map(id => ({ id }));
};

// Función para prerenderizar productos
const getProductoPrerenderParams = async () => {
  const productoIds = ['a1', 'b2', 'c3']; // reemplazar por IDs reales
  return productoIds.map(id => ({ id }));
};

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin/cliente-form/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getClientePrerenderParams,
  },
  {
    path: 'admin/producto-form/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getProductoPrerenderParams,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];

