import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { RouterModule } from '@angular/router';
import { Customer } from '../../model/customer.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export default class CustomerListComponent implements OnInit {

  private customerService = inject(CustomerService);

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.customerService.list().subscribe(customers => {
      this.customers = customers;
    });
  }

  loadAll() {
    this.customerService.list().subscribe(customers => {
      this.customers = customers;
    });
  }

  deleteCustomer(customer: Customer) {
    this.customerService.delete(customer.id).subscribe(() => {
      this.loadAll();
    });
  }
}
