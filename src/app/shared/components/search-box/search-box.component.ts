import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @Output()
  public OnValue:EventEmitter<string> = new EventEmitter<string>();

  emitValue(value: string) :void{
    this.OnValue.emit(value);
  }
}
