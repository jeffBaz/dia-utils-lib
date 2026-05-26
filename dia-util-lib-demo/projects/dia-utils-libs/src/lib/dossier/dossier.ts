import { CommonModule } from "@angular/common";
import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { IFormatInput } from "../common/IFormatInput";
import { Dossier } from "../common/Dossier";
import { ModelOption } from "../common/model-option";
import { Inputs} from "../input/input";
import { InputDatePicker } from "../input-date-picker/input-date-picker";
import { IsNumericDirective } from "../directives/is-numeric.directive";
import { Select } from "../select/select";
import { Textarea } from "../textarea/textarea";

@Component({
    selector: 'dia-dossier',
    standalone: true,
    templateUrl: './dossier.html',
    styleUrls: ['./dossier.css'],
    imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule, Inputs, Select, IsNumericDirective, Textarea, InputDatePicker   ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DossierBloc)
        }
    ]
})
export class DossierBloc implements OnInit, OnChanges {
    amountFormat: IFormatInput|undefined;
    @Input()
    disabled= false;
    @Input()
    modifiable = false;
    @Input()
    translateSuffix: string = '';
    @Input()
    nbColumns: number=2;
    @Input()
    items: Dossier[]=[];
    @Input()
    ratifiable: any;
    @Input()
    minrows: number=2;
    @Input()
    public transServ: any;
    @Input()
    debug: boolean=false;

    emptyfn = () => {};
    constructor() {
        //this.transServ = new Translate();
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['items'] && changes['items'].currentValue) {
            if (this.items ) {
                //this.transServ.get(this.translateSuffix + 'SIREN').subscribe((t:any) => {
                    this.items.forEach(it => {
                        //it = this.translator(it);
                        let sum_sizeColumn = 0;
                        if (this.nbColumns && this.nbColumns > 0 && it.list) {
                            it.list = it.list.filter(entity => entity.hide !== true);

                            // fix JIRA 1060
                            it.list.map(res => {
                                if (res.sizeColumn && res.sizeColumn > 1) {
                                    sum_sizeColumn = sum_sizeColumn + res.sizeColumn - 1;
                                }
                            });

                            while ((it.list.length + sum_sizeColumn) % this.nbColumns !== 0) {
                                it.list.push(Dossier.getEmptyDossier() as Dossier);
                            }

                            // fix JIRA 1060
                            let index_column = 0;
                            it.list.map(res => {
                                if (res.sizeColumn && res.sizeColumn > 1) {
                                    index_column = index_column + 1 + res.sizeColumn - 1;
                                } else {
                                    index_column = index_column + 1;
                                }
                                res.indexColumn = index_column;
                            });
                        }
                        if (it.list) {
                            it.list.forEach(item => (item = this.translator(item)));
                        }
                    });
                //});
            }
        }
    }
    translateTitle(it: string) {
        if (
            it &&
            Dossier.isDefined(this.getIntName(it)) &&
            this.translateSuffix && this.transServ &&
            this.transServ.instant(this.getIntName(it)) &&
            this.getIntName(it) !==
            this.transServ.instant(this.getIntName(it))
        ) {
            return this.transServ.instant(this.getIntName(it));
        }
        return it;
    }
    translator(it: Dossier) {
        if (
            it.title &&
            Dossier.isDefined(this.getIntName(it.title)) &&
            this.translateSuffix && this.transServ &&
            this.transServ.instant(this.getIntName(it.title)) &&
            this.getIntName(it.title) !==
            this.transServ.instant(this.getIntName(it.title))
        ) {
            it.title = this.transServ.instant(this.getIntName(it.title));
        }
        return it;
    }
    mapTimestampToDate(timestamp:number) {
        if (timestamp) {
            const dateObject = new Date(+timestamp);
            return (
                (dateObject.getDate() < 10
                    ? '0' + dateObject.getDate()
                    : dateObject.getDate()) +
                '/' +
                (dateObject.getMonth() + 1 < 10
                    ? '0' + (dateObject.getMonth() + 1)
                    : dateObject.getMonth() + 1) +
                '/' +
                (dateObject.getFullYear() + '').slice(-2)
            );
        }
        return null;
    }
    ngOnInit() { }
    getIntName(str:string) {
        return (
            this.translateSuffix +
            str
                .split(' ')
                .filter(s => s.length > 2)
                .join()
                //    .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-zA-Z0-9]+/g, '')
                .toUpperCase()
        );
    }
    onclick(item:Dossier) {
        if (item.onclick) {
            item.onclick(item);
        }
    }
    handleChange(e:any, item:Dossier) {
        if (item.model && item.field) {
            item.model[item.field] = e;
        }
        if (item.onchange) {
            item.onchange(e);
        }
    }
    handleValue(item:Dossier) {
        if (item) {
            if (item.model && item.field && item.model[item.field]) {
                return item.model[item.field];
            } else {
                return item.value;
            }
        }
    }
    
    handleSelectValue(item:Dossier): ModelOption | null {
        if (!item || !item.value) return null;
        
        // If item.value is already a ModelOption, return it
        if (typeof item.value === 'object' && item.value !== null && 'libelle' in item.value && 'value' in item.value) {
            return item.value as ModelOption;
        }
        
        // Convert string/number to ModelOption
        const valueStr = String(item.value);
        return new ModelOption(valueStr, valueStr);
    }
    
    handleFormattedValue(item: Dossier): string {
        if (!item || !item.value) return '';
        
        if (item.suffix) {
            return this.amountFormat?.transform(item.value).concat(' ' + item.suffix);
        } else if (item.isNumber) {
            return this.amountFormat?.transform(item.value);
        } else if (item.isDate) {
            return this.mapTimestampToDate(+item.value) || '';
        } else {
            return String(item.value);
        }
    }
    
    handleDateValue(item: Dossier): Date | undefined {
        if (!item || !item.value) return undefined;
        
        if (typeof item.value === 'number') {
            return new Date(item.value);
        } else if (typeof item.value === 'string') {
            const parsed = new Date(item.value);
            return isNaN(parsed.getTime()) ? undefined : parsed;
        }
        
        return undefined;
    }
    fgroup(){
        return new FormGroup({});
    }
}