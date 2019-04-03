import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../../services/product.service";
import { Product } from 'src/app/models/products';
import {BsModalService, BsModalRef} from'ngx-bootstrap/modal';
import { NgForm } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  editingProduct: Product;
  editing: boolean = false;
  private products: Product[];
  constructor(public productService : ProductService) { }
  


  ngOnInit() {
    this.getListProducts();
    
  }

  getListProducts(){
    this.productService.getProducts().subscribe(products => {
    this.products = products;
  });
  }

  onDeleteProduct(idProduct: string){
    const confirmacion = confirm('Esta seguro que desea eliminar el producto?')
    if(confirmacion){
      this.productService.deleteProduct(idProduct);
    }
  }

  editProduct(event, product){
    this.editingProduct = product;
    this.editing = !this.editing;
  }


  
  onPreUpdateProduct(product: Product){
    console.log('Producto', product)
    this.productService.selectedProduct = Object.assign({}, product)
  }




}