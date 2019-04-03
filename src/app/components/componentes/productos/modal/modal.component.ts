import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from "../../../../services/product.service";
import { Product } from 'src/app/models/products';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private productService: ProductService, private storage: AngularFireStorage) { }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  @ViewChild('btnClose') btnClose: ElementRef;

  ngOnInit() {
  }

  onSaveProduct(productForm: NgForm): void{
    if(productForm.value.id == null){
      //new
    productForm.value.id = Math.random().toString(36).substring(2);
    this.productService.addProduct(productForm.value);
    } else {
      //update
      this.productService.updateProduct(productForm.value);
    }
    productForm.resetForm();
    this.btnClose.nativeElement.click();
  }

  onUpload(e){
    console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe( data => {
      console.log(data);
    });
  }




}
