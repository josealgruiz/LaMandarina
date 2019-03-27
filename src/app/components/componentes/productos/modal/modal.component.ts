import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from "../../../../services/product.service";
import { Product } from 'src/app/models/products';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private productService: ProductService) { }

  @ViewChild('btnClose') btnClose: ElementRef;

  ngOnInit() {
  }

  onSaveProduct(productForm: NgForm): void{
    if(productForm.value.id == null){
      //new
    this.productService.addProduct(productForm.value);
    } else {
      //update
      this.productService.updateProduct(productForm.value);
    }
    productForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
