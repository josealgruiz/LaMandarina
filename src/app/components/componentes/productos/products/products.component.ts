import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../../services/product.service";
import { ProductInterface } from 'src/app/models/products';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  constructor(public productService : ProductService) { }
 private product: ProductInterface[];

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      console.log(products);
      this.product = products;
    });
  }

  getListProducts(){
    this.productService.getAllProducts().subscribe(products => {
      this.product = products;
    });
  }


  deleteProduct(event, product){
    if(confirm('Esta seguro que desea eliminar este producto?')){
    this.productService.deleteProduct(product);
    }
  }



}


