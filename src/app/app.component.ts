import { Component } from '@angular/core';
import { Item, ApiService } from './service/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "PwaDemo";
  items: Array<Item>;

  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.fetch()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
    (data: Array<Item>) => {
      console.log(data);
      this.items = data;
    },
    (err) => {
      console.log(err);
    });
  }
}
