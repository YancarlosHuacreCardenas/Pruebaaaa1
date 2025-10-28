import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerService } from "../../services/customer.service";
import { Customer } from "../../models/customer.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cliente-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./cliente-form.component.html",
  styleUrls: ["./cliente-form.component.css"],
})
export class ClienteFormComponent implements OnInit {
  form!: FormGroup;
  isEditing = false;
  customerId: number | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params["id"]) {
        this.customerId = +params["id"];
        this.isEditing = true;
        this.loadCustomer();
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required, Validators.minLength(2)]],
      phone: ["", [Validators.required, Validators.pattern(/^\d{9}$/)]],
      email: [
        "",
        [
          Validators.required,
          Validators.maxLength(35),
          Validators.pattern(/^[\w.+-]+@(vallegrande\.edu\.pe|gmail\.com)$/),
        ],
      ],
      clientType: ["A", Validators.required],
      isActive: [true],
      preferences: ["", Validators.maxLength(500)], // <-- nuevo campo preferences
    });
  }

  loadCustomer(): void {
    if (!this.customerId) return;
    this.loading = true;
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer: Customer) => {
        this.form.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          email: customer.email,
          clientType: customer.clientType,
          isActive: customer.isActive ?? true,
          preferences: customer.preferences ?? "", // <-- cargar preferences
        });
        this.loading = false;
      },
      error: (err: any) => {
        console.error("Error al cargar cliente:", err);
        this.error = "Error al cargar el cliente";
        this.loading = false;
      },
    });
  }

  onPhoneKeyPress(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const allowed = /[0-9]/;
    if (!allowed.test(event.key)) event.preventDefault();
    if (input.value.length >= 9) event.preventDefault();
  }

  onSubmit(): void {
    this.error = null;

    const phoneControl = this.form.get("phone");
    const emailControl = this.form.get("email");

    if (phoneControl?.invalid) {
      this.error = "El teléfono debe contener exactamente 9 dígitos numéricos.";
      return;
    }

    if (emailControl?.invalid) {
      const errors = emailControl.errors || {};
      if (errors['maxlength']) {
        this.error = "El correo no puede exceder 35 caracteres.";
      } else if (errors['pattern']) {
        this.error = "Solo se aceptan correos de @vallegrande.edu.pe o @gmail.com";
      } else {
        this.error = "Correo inválido.";
      }
      return;
    }

    if (this.form.invalid) {
      this.error = "Por favor, corrija los errores en el formulario.";
      return;
    }

    this.loading = true;
    const customer: Customer = this.form.value;

    const request = this.isEditing && this.customerId
      ? this.customerService.updateCustomer(this.customerId, customer)
      : this.customerService.createCustomer(customer);

    request.subscribe({
      next: () => this.router.navigate(["/admin/cliente-lista"]),
      error: (err: any) => {
        console.error("Error al guardar cliente:", err);
        this.error = "Error al guardar el cliente";
        this.loading = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(["/admin/cliente-lista"]);
  }
}
