import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../types/product';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  constructor(private api: ApiService) { }

  @ViewChild('f') form: NgForm | undefined;

  submitProduct() {
    const content = this.form?.value
    console.log(content);
    console.log( typeof content.sizes.split(", "));
    
    content.sizes = content.sizes.split(" ")
    content.images = content.images.split(" ")

    this.api.createProduct(content).subscribe((p) => {
      console.log(p);
      
    })
  }

  @ViewChild('userForm') userForm: NgForm | undefined;

  submitUser(){
    const content = this.userForm?.value
    console.log(content);

    this.api.register(content).subscribe((req) => {
      console.log(req);
      
    })
    
  }
}
