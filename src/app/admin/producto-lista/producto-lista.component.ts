import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";

@Component({
  selector: "app-producto-lista",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./producto-lista.component.html",
  styleUrls: ["./producto-lista.component.css"],
})
export class ProductoListaComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = "Error al cargar los productos";
        this.loading = false;
      },
    });
  }

  // Eliminar producto (cambia is_available a false)
  deleteProduct(id: number | undefined): void {
    if (!id || !confirm("¿Está seguro de que desea eliminar este producto?")) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        const product = this.products.find(p => p.product_id === id);
        if (product) product.is_available = false;
      },
      error: () => {
        this.error = "Error al eliminar el producto";
      },
    });
  }

  // Restaurar producto (cambia is_available a true)
  restoreProduct(id: number | undefined): void {
    if (!id) return;

    this.productService.restoreProduct(id).subscribe({
      next: (_) => { // Ignoramos el valor devuelto
        const product = this.products.find(p => p.product_id === id);
        if (product) product.is_available = true;
      },
      error: () => {
        this.error = "Error al restaurar el producto";
      },
    });
  }

  getCategoryLabel(category: string | undefined): string {
    const categories: { [key: string]: string } = {
      HAM: "Hamburguesas",
      PIZ: "Pizzas",
      ENS: "Ensaladas",
      BEB: "Bebidas",
      POS: "Postres",
    };
    return category ? categories[category] || category : "";
  }
}
