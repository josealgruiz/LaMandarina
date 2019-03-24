import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { ProductInterface } from "../models/products";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<ProductInterface>;
  products: Observable<ProductInterface[]>;
  productDoc: AngularFirestoreDocument<ProductInterface>;

  constructor(public db: AngularFirestore) { 
    this.productsCollection = this.db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as ProductInterface;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  getProducts(){
    return this.products;
  }

  addProduct(product: ProductInterface): void{
    this.productsCollection.add(product);
  }

  deleteProduct(product: ProductInterface): void {
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.delete();
  }

  updateProduct(product: ProductInterface): void{
    let idproduct = product.id;    
    this.productDoc = this.db.doc<ProductInterface>(`products/${idproduct}`);
    this.productDoc.update(product);

  }
  getAllProducts() {
    this.productsCollection = this.db.collection<ProductInterface>('products');
    return this.products = this.productsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ProductInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

}
