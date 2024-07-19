import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';

// Interface for the Product object
interface Product {
  id?: number;  
  name: string;  
  description: string;  
  price: number;  
  category: string;  
  stock: number;  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = []; //  list of products
  // Form group for add/editing product
  productForm: FormGroup; 
  editForm: FormGroup; 
  isShowEditform: boolean = false; //  to show/hide the edit form after update process
  selectedProduct: Product | null = null;  
  showAddModal = false; //  to show/hide the add product

  constructor(
    private productService: ProductService, // service for crud Operation
    private fb: FormBuilder 
  ) {
    // Initializing the add/edit product form with validation
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]]
    });

    this.editForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]]
    });
  }

   ngOnInit(): void {
    this.loadProducts(); // list of products when the component loaded
  }

   loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;  
    });
  }

   addProduct(): void {
    if (this.productForm.valid) {
       this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.loadProducts(); // reload the products list after adding a new product
        this.closeAddProduct();  
      });
    }
  }

   editProduct(product: Product): void {
    this.selectedProduct = product; 
    this.isShowEditform = true; 
    this.editForm.setValue(product); //   edit form with the selected product
  }

   updateProduct(): void {
    if (this.editForm.valid) {
       this.productService.updateProduct(this.editForm.value.id, this.editForm.value).subscribe(() => {
        this.loadProducts(); 
        this.selectedProduct = null;
        this.isShowEditform = false;  
      });
    }
  }

  deleteProduct(id: any): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();  
    });
  }

   cancelEdit(): void {
    this.selectedProduct = null; 
    this.isShowEditform = false; 
  }

  // method to open the add product modal
  openAddProduct(): void {
    this.showAddModal = true;  
  }

  // Method to close the add product modal
  closeAddProduct(): void {
    this.toggleForm(); // toggle the form visibility
    this.productForm.reset();  
  }

   toggleForm() {
    let doc: HTMLElement | null = document.querySelector('.form-body');

    if (doc) {
      doc.classList.toggle('show-form'); // toggle the 'show-form' class on the form element..
    }
  }
}
