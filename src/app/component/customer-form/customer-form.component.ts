import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../model/customer.interface';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export default class CustomerFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private customerService = inject(CustomerService);

  form?: FormGroup; 
  customer?: Customer;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.customerService.findById(parseInt(id)).subscribe(customer => {
        this.customer = customer;
        this.form = this.fb.group({
          firstName: [customer.firstName, [Validators.required]],
          lastName: [customer.lastName, [Validators.required]],
          email: [customer.email, [Validators.required]],
        });
      });
    }
    else {
      this.form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required]],
      });
    }
  }

  save() {
    const customerForm = this.form!.value;

    if (this.customer) {
      customerForm.id = this.customer.id;
      this.customerService.update(customerForm).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.customerService.create(customerForm).subscribe(() => {
        this.router.navigate(['/']);
      });
    }


  }
}
