import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer } from '../model/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);

  list() {
    return this.http.get<Customer[]>('http://localhost:8080/api/customers');
  }

  findById(id: number) {
    return this.http.get<Customer>(`http://localhost:8080/api/customers/${id}`);
  }

  create(customer: Customer) {
    return this.http.post<Customer>('http://localhost:8080/api/customers', customer);
  }

  update(customer: Customer) {
    return this.http.put<Customer>(`http://localhost:8080/api/customers`, customer);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/api/customers/${id}`);
  }
}
