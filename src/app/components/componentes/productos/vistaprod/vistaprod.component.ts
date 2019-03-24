import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../../services/product.service";
import { ProductInterface } from 'src/app/models/products';


@Component({
  selector: 'app-vistaprod',
  templateUrl: './vistaprod.component.html',
  styleUrls: ['./vistaprod.component.css']
})
export class VistaprodComponent implements OnInit {

  products = [];

  constructor(public productService : ProductService) { }

  ngOnInit() {
    
    this.productService.getProducts().subscribe(products => {
    this.products = products;
    });
  }

}
