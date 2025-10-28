import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  // URL base apuntando al backend local
  private apiUrl = "http://localhost:8080/api/customers";

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes (activos e inactivos)
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  // Obtener un cliente por ID
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo cliente
  createCustomer(customer: Customer): Observable<Customer> {
    // POST al endpoint real de tu backend
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  // Actualizar un cliente existente
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    // PUT al endpoint real con el ID
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }

  // Desactivar cliente (eliminación lógica)
  deleteCustomer(id: number): Observable<void> {
    // PATCH al endpoint /{id}/eliminar
    return this.http.patch<void>(`${this.apiUrl}/${id}/eliminar`, {});
  }

  // Restaurar cliente eliminado
  restoreCustomer(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/restaurar`, {});
  }
}
