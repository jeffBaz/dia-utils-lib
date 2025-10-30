import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Inputs , Select, Tiles, Dossier, ModelOption, DossierBloc} from 'dia-utils-libs';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Inputs, Select, JsonPipe, Tiles, CommonModule, DossierBloc],
  templateUrl: './app.html',
  styleUrl: './app.scss'

})
export class App {
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
      )),
      (Dossier.set('Roots', null
        , {
          isCheckbox: true,
          sizeColumn: 2,
          formGroupConfig: {
            form: this.contactForm,
            formName: 'roots',
            updateOn: 'change',
            validators: [Validators.required]
          }
        }
      )),
      (Dossier.set('textarea', null
        , {
          isTextarea: true,
          fill: true,
          sizeColumn: 2,
          formGroupConfig: {
            form: this.contactForm,
            formName: 'txtArea',
            updateOn: 'change',
            validators: [Validators.required]
          }
        }
      ))
    ])
  }
}
