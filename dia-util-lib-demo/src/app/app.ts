import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Inputs , Select, Tiles, Dossier, ModelOption, DossierBloc, Table, ITableColumnDefinitionModel} from 'dia-utils-libs';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Inputs, Select, JsonPipe, Tiles, CommonModule, DossierBloc, Table],
  templateUrl: './app.html',
  styleUrl: './app.scss'

})
export class App {
  public tableSource = [
    { numeroFL: '003', name: 'Alice Smith', age: 28, status: 'Active', date: 1775025000000, checked: false },
    { numeroFL: '001', name: 'John Doe', age: 34, status: 'Pending', date: 1775012000000, checked: false },
    { numeroFL: '002', name: 'Bob Johnson', age: 45, status: 'Inactive', date: 1775018000000, checked: true },
  ];

  public tableColumns: ITableColumnDefinitionModel[] = [
    {
      columnDef: 'checkbox',
      header: 'Selection',
      checkbox: (row: any) => {
        row.checked = !row.checked;
        console.log('Row checkbox toggled:', row);
      }
    },
    {
      columnDef: 'numeroFL',
      header: 'No. FL',
      sort: true,
      cell: (row: any) => row.numeroFL
    },
    {
      columnDef: 'name',
      header: 'Name',
      sort: true,
      cell: (row: any) => row.name,
      onclick: (row: any) => {
        console.log('Row cell clicked:', row);
        alert('Clicked row for: ' + row.name);
      }
    },
    {
      columnDef: 'age',
      header: 'Age',
      sort: true,
      isNumeric: true,
      cell: (row: any) => row.age
    },
    {
      columnDef: 'status',
      header: 'Status',
      sort: true,
      cell: (row: any) => row.status
    },
    {
      columnDef: 'date',
      header: 'Creation Date',
      sort: true,
      date: true,
      cell: (row: any) => row.date
    }
  ];

  contactForm: FormGroup|undefined;
  contact: Dossier|undefined;
  constructor() {
    this.contactForm = new FormGroup({});
    this.contact = this.getContactBloc('Contact');
  }
  protected readonly title = signal('dia-util-lib-demo');
  @ViewChild('tilesOne', { static: true })
  tiles: Tiles|undefined;
  public test = 'kljoi'; // Using signal for reactivity, if needed
  public list = [
    ModelOption.setUniqueValue('option1'),
    ModelOption.setUniqueValue('option2'),
    ModelOption.setUniqueValue('option3')
  ];
  public test1 = this.list[0]; // Default value for the select component
  public test2 = [this.list[0], this.list[1]]; // Default value for the select component
  next(){
    this.tiles?.next();
  }

  prev(){
    this.tiles?.prev();
  }
  getContactBloc(title:string) {
    return Dossier.bloc(title, [
      (Dossier.set('Nom', null, {
        formGroupConfig: {
          form: this.contactForm,
          formName: 'nom',
          updateOn: 'change',
          validators: [Validators.required]
        }
      }
      )),
      (Dossier.set('Prenom', null
        , {
          isTextarea: true,
          minrows: 10,
          formGroupConfig: {
            form: this.contactForm,
            formName: 'prenom',
            updateOn: 'change',
            validators: [Validators.required]
          }
        }
      )),
      (Dossier.set('Email', null, {
        formGroupConfig: {
          form: this.contactForm,
          formName: 'email',
          updateOn: 'change',
          validators: [Validators.required]
        }
      }
      )),
      (Dossier.set('Objets', null
        , {
          selectValues:[],
          formGroupConfig: {
            form: this.contactForm,
            formName: 'objets',
            updateOn: 'change',
            validators: [Validators.required]
          }
        }
      ))
    ])
  }
}
