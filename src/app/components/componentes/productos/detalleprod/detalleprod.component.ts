import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../../services/product.service";
import { Product } from "../../../../models/products";
import { ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-detalleprod',
  templateUrl: './detalleprod.component.html',
  styleUrls: ['./detalleprod.component.css']
})
export class DetalleprodComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  public product: Product = {};
  ngOnInit() {
    const idProduct = this.route.snapshot.params['id'];
    this.getDetails(idProduct);
  }

  getDetails(idProduct: string): void{
    this.productService.getOneProduct(idProduct).subscribe( product => {
    this.product = product;
    });
  }
}
