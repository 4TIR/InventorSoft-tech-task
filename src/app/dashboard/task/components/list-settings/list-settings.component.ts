import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-task-list-settings',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.css']
})
export class ListSettingsComponent {
  @Output()
  edit: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();
}
