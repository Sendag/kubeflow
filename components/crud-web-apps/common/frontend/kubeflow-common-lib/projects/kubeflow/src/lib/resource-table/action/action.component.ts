import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { STATUS_TYPE } from '../status/types';
import { Observable, Subject } from 'rxjs';
import { ActionIconValue, ActionEvent } from '../types';

@Component({
  selector: 'lib-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent implements OnInit {
  // READY: Button will be enabled
  // WAITING: Button will be a Spinner
  // TERMINATING/UNAVAILABLE: Button will be disabled

  private innerData: any = {};
  private clicked = false;
  private cancelWaitingPhase$ = new Subject<boolean>();

  @Input()
  action: ActionIconValue;

  @Input()
  data: any;

  @Output()
  emitter = new EventEmitter<ActionEvent>();

  constructor() {}

  ngOnInit() {}

  // Event emitting functions
  public emitClickedEvent() {
    const ev = new ActionEvent(this.action.name, this.data);
    this.emitter.emit(ev);
  }

  // Icon handling functions
  public getIcon(icon: string) {
    if (icon.split(':').length !== 2) {
      return '';
    }

    if (this.getCategory(icon) === 'fa') {
      const inpt = icon.split(':');
      return inpt.slice(1, inpt.length);
    }

    return icon.split(':')[1];
  }

  public getCategory(icon) {
    if (icon.split(':').length !== 2) {
      return '';
    }

    return icon.split(':')[0];
  }

  // Helpers for checking the Action's State
  public isPhaseReady(): boolean {
    const phaseField = this.action.field;
    const status = this.data[phaseField];

    return status === STATUS_TYPE.READY;
  }

  public isPhaseInit(): boolean {
    const phaseField = this.action.field;
    const status = this.data[phaseField];

    return status === STATUS_TYPE.UNINITIALIZED;
  }

  public isPhaseWaiting(): boolean {
    const phaseField = this.action.field;
    const status = this.data[phaseField];

    return status === STATUS_TYPE.WAITING;
  }

  public isPhaseDisabled(): boolean {
    const phaseField = this.action.field;
    const status = this.data[phaseField];

    return (
      status === STATUS_TYPE.TERMINATING || status === STATUS_TYPE.UNAVAILABLE
    );
  }
}
