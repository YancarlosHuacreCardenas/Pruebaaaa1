import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-producto-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./producto-form.component.html",
  styleUrls: ["./producto-form.component.css"],
})
export class ProductoFormComponent implements OnInit {
  form!: FormGroup;
  isEditing = false;
  productId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params["id"]) {
        this.productId = +params["id"];
        this.isEditing = true;
        this.loadProduct();
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", Validators.required],
      price: ["", [Validators.required, Validators.min(0)]],
      category: ["", Validators.required],
      is_available: [true],
      image_url: [""],
      launch_date: [""],
      prep_time: [""],
      is_featured: [false],
    });
  }

  loadProduct(): void {
    if (!this.productId) return;

    this.loading = true;
    this.productService.getProduct(this.productId).subscribe({
      next: (product: Product) => {
        const formattedProduct = {
          ...product,
          launch_date: product.launch_date
            ? product.launch_date.split("T")[0]
            : "",
        };
        this.form.patchValue(formattedProduct);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al cargar el producto:", err);
        this.error = "Error al cargar el producto";
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.error = "Por favor, corrija los errores del formulario";
      return;
    }

    this.loading = true;

    const product: Product = {
      ...this.form.value,
      price: parseFloat(this.form.value.price),
      launch_date: this.form.value.launch_date
        ? new Date(this.form.value.launch_date).toISOString()
        : undefined,
    };

    const request =
      this.isEditing && this.productId
        ? this.productService.updateProduct(this.productId, product)
        : this.productService.createProduct(product);

    request.subscribe({
      next: () => {
        this.router.navigate(["/admin/producto-lista"]);
      },
      error: (err) => {
        console.error("Error al guardar producto:", err);
        this.error = err?.error?.message || "Error al guardar el producto";
        this.loading = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(["/admin/producto-lista"]);
  }
}
