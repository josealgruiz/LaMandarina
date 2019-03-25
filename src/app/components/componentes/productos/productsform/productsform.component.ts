import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../../../services/product.service";
import { Product } from 'src/app/models/products';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productsform',
  templateUrl: './productsform.component.html',
  styleUrls: ['./productsform.component.css']
})
export class ProductsformComponent implements OnInit {

  product = {} as Product;

  constructor(public productService: ProductService, private storage: AngularFireStorage) { }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  onUpload(e){
    console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

  }

  addProduct(){
    if(this.product.name !== '' && this.product.price != 0 && this.product.description != '') {
      this.productService.addProduct(this.product);
      this.product = {} as Product;
    }
  }
}
