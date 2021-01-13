import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() id;
  objetoFormGroup: any

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.objetoFormGroup = this.formBuilder.group({});
  }

  enviar(){

  }
}
