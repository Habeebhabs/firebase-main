import { Component, OnInit } from '@angular/core';
import { Firestore,collection } from '@angular/fire/firestore'
import { getDocs } from '@firebase/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public firestore:Firestore) { }

  elementData :any[] = [];
  status :boolean = false;

  ngOnInit(): void {
    this.getFirebaseData();
  }

  getFirebaseData(){
    this.status = true;
    const dbInstance = collection(this.firestore,'elements');
    getDocs(dbInstance)
    .then((response:any) => {
      this.elementData = [...response.docs.map((item:any) => {
        return { ...item.data(), id:item.id }
      })];
      // setTimeout(() => {
      //   const elements = document.querySelectorAll('.col-12');
      //   let sample = `<p>
      //                     frfrfgtgt
      //                     <u>hi</u>
      //                     <button>get</button>
      //                   </p>`
      //   this.elementData.forEach((item) => {
      //     if(item.code == '<strong>Habeeb</strong>'){
      //       sample = item.code;
      //     }
      //   })
      //   const parser = new DOMParser();
      //   const out = parser.parseFromString(sample, 'text/html');
      //   elements.forEach((item) => {
      //     item.innerHTML = out.body.innerHTML ;
      //   });
      //   this.elementData.forEach((item) => {
      //     console.log(item.code)
      //   })
      //   this.status = false;
      // })
      if(this.elementData.length) this.status = false;
    })
    .catch((err) => {
      alert(err.message);
      this.status = false;
    })
  }

}
