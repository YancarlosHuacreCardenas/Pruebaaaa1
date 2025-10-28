import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "http://localhost:8080/api/products";

  constructor(private http: HttpClient) {}

  // Obtener todos los productos (activos e inactivos)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Obtener productos activos
  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/activos`);
  }

  // Obtener productos inactivos
  getInactiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/inactivos`);
  }

  // Obtener un producto por ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Crear un producto nuevo
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Actualizar un producto existente
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Eliminar un producto (soft delete)
  deleteProduct(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/eliminar`, {});
  }

  // Restaurar un producto eliminado
  restoreProduct(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/restaurar`, {});
  }
}
