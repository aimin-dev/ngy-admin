import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { from, forkJoin, of, throwError } from 'rxjs';
import { map, mergeMap, filter, flatMap, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

// @dynamic
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-api-admin-selection-toolbar',
  templateUrl: './selection-toolbar.component.html',
  styleUrls: ['./selection-toolbar.component.scss']
})
export class SelectionToolbarComponent implements OnInit {

  @Input() selection: SelectionModel<any>;
  @Input() resource: any;
  @Output() deleting: EventEmitter<any[]> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() success: EventEmitter<void> = new EventEmitter();
  @Output() failure: EventEmitter<void> = new EventEmitter();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  delete(): void {
    const selected = [...this.selection.selected];
    const itemLabel = selected.length > 1 ? 'items' : 'item';
    const snackBarConfig: MatSnackBarConfig = {duration: 3000};
    const ref = this.snackBar.open(`Deleting ${selected.length} ${selected.length > 1 ? 'items' : 'item'}`, 'Cancel', snackBarConfig);
    this.deleting.emit(selected);
    this.selection.clear();
    ref.onAction().subscribe(() => ref.dismiss());
    ref.afterDismissed().subscribe(res => {
      if (res.dismissedByAction) {
        this.cancel.emit();
      } else {
        forkJoin(
          selected.map(item => this.http.delete(this.resource.url + '/' + item.id))
        ).pipe(
          map(response => response instanceof HttpErrorResponse ? throwError((response as HttpErrorResponse).message) : response),
        ).subscribe((a) => {
          this.success.emit();
          this.snackBar.open(`${selected.length} ${itemLabel} deleted`, null, snackBarConfig);
        }, err => {
          this.snackBar.open(`Failed to delete ${selected.length} ${itemLabel}`, null, snackBarConfig);
          this.failure.emit();
        });
      }
    });
  }

}
