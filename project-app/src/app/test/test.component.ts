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
export class TestComponent implements AfterViewInit {

  constructor(private api: ApiService) { }

  @ViewChild('f') form: NgForm | undefined;

  ngAfterViewInit(): void {
    // this.api.getProducts().subscribe((p) => {
    //   console.log(p);
    // })

    console.dir(this.form)
  }

  onSubmit() {
    const content = this.form?.value
    console.log(content);

    this.api.createProduct(content).subscribe((p) => {
      console.log(p);
      
    })
  }
}
