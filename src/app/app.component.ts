import { Component } from '@angular/core';
import { IColumnItem, IUser } from './interfaces';
import { ApiService } from './services';

@Component({
  selector: 'scome-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  listOfColumns: IColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: IUser, b: IUser) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: IUser) => list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'UserName',
      sortOrder: null,
      sortFn: (a: IUser, b: IUser) => a.username.localeCompare(b.username),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: IUser) => list.some(username => item.username.indexOf(username) !== -1)
    },
    {
      name: 'Email',
      sortOrder: null,
      sortFn: (a: IUser, b: IUser) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: IUser) => list.some(email => item.email.indexOf(email) !== -1)
    },
    {
      name: 'Phone',
      sortOrder: null,
      sortFn: (a: IUser, b: IUser) => a.phone.localeCompare(b.phone),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: IUser) => list.some(phone => item.phone.indexOf(phone) !== -1)
    },
    {
      name: 'Website',
      sortOrder: null,
      sortFn: (a: IUser, b: IUser) => a.website.localeCompare(b.website),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: IUser) => list.some(website => item.website.indexOf(website) !== -1)
    }
  ]
  users: IUser[] = []
  selectedUser: IUser | null = null
  loading: boolean = false
  showMap: boolean = false

  constructor(private srvApi: ApiService) {
    this.getData();
  }

  // get users data from server
  private getData(): void {
    this.loading = true;
    this.srvApi.getUsers().subscribe(users => {
      this.users = users;
      this.setColumnFilters();
      this.loading = false;
    }, () => {
      this.users = [];
    });
  }

  // set filter of columns that has multiple filter
  private setColumnFilters(): void {
    this.listOfColumns[0].listOfFilter = this.distict(this.users, 'name').map(i => ({ text: i, value: i }))
    this.listOfColumns[1].listOfFilter = this.distict(this.users, 'username').map(i => ({ text: i, value: i }))
    this.listOfColumns[2].listOfFilter = this.distict(this.users, 'email').map(i => ({ text: i, value: i }))
    this.listOfColumns[3].listOfFilter = this.distict(this.users, 'phone').map(i => ({ text: i, value: i }))
    this.listOfColumns[4].listOfFilter = this.distict(this.users, 'website').map(i => ({ text: i, value: i }))
  }

  // get distinct of array for column filter
  private distict(array: any[], key: string): string[] {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item[key])) {
        map.set(item[key], true);
        result.push(item[key]);
      }
    }
    return result;
  }

  showLocation(user: IUser): void {
    this.selectedUser = user
    this.showMap = true
  }

  handleCancel(): void {
    this.selectedUser = null
    this.showMap = false;
  }

}
