import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";
import { IUser } from "./user.interface";

export interface IColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<IUser> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<IUser> | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
}
