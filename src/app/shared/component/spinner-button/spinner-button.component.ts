import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerButtonComponent implements OnInit {
  @Input()
  isLoading = false;

  @Input()
  isDisable = false;

  @Input()
  isRaised = true;

  @Input()
  title = '';

  @Output()
  buttonClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
