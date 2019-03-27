import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Product } from "../models/products";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;
  product: Observable<Product>;
  public selectedProduct: Product = {
    id: null
  };

  constructor(public db: AngularFirestore) { 
    this.productsCollection = db.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();
  }

  getProducts(){
    return this.products = this.productsCollection.snapshotChanges()
    .pipe(map( changes => {
     return changes.map(action => {
       const data = action.payload.doc.data() as Product;
       data.id = action.payload.doc.id;
       return data;
     }) ;
    }));
  }

  addProduct(product: Product): void{
    this.productsCollection.add(product);
  }

  deleteProduct(idProduct: string): void {
    this.productDoc = this.db.doc<Product>(`products/${idProduct}`);
    this.productDoc.delete();
  }

  updateProduct(product: Product): void{
    let idProduct = product.id;
    this.productDoc = this.db.doc(`products/${idProduct}`);
    this.productDoc.update(product);

  }

  getOneProduct(idProduct: string){
    this.productDoc = this.db.doc<Product>(`products/${idProduct}`);
    return this.product = this.productDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null
      } else {
        const data = action.payload.data() as Product;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

}

