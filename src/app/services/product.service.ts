import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Product } from "../models/products";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { userInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private carrito: Observable<Product[]>;
  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;
  product: Observable<Product>;
  public selectedProduct: Product = {
    id: null
  };
  private idUser:string='zecw4Ud9cMUdDdXI0aPqnlpHC4q1';
  private WishList: Observable<Product[]>;
  

  constructor(public db: AngularFirestore) { 
    this.productsCollection = db.collection<Product>('products');
    this.products = this.productsCollection.valueChanges();}
    /*this.carrito = this.db.doc(this.idUser).collection<Product>('carrito').valueChanges();
  

  mandarCarrito(idProduct:any){
    var messageRef = this.db.doc(this.idUser).collection('carrito').add(idProduct);
  }
  mandarWishList(idProduct:any){
    var messageRef = this.db.doc(this.idUser).collection('deseos').add(idProduct);
  }

  getCarrito(){
  
    return this.carrito = this.db.doc(this.idUser).collection('carrito').snapshotChanges()
    .pipe(map(changes=>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as Product;
        data.id = action.payload.doc.id;
        return data;
      })
  
    }));
  }
  getWishList(){
    
    return this.WishList = this.db.doc(this.idUser).collection('deseos').snapshotChanges()
    .pipe(map(changes=>{
      return changes.map(action =>{
        const data = action.payload.doc.data() as Product;
        data.id = action.payload.doc.id;
        return data;
      })
  
    }));
  }
  deleteProductCarrito(idProduct: string): void{
    this.productDoc = this.db.collection<userInterface>('users').doc(this.idUser).collection('carrito').doc(idProduct);
    this.productDoc.delete();
  }
  
  deleteProductDeseos(idProduct: string): void{
    this.productDoc = this.db.collection<userInterface>('users').doc(this.idUser).collection('deseos').doc(idProduct);
    this.productDoc.delete();
  }*/

  

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

