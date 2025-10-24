import { Component, Host, Prop, State, Watch, h } from '@stencil/core';

export type SdTableSortDir = 'asc' | 'desc' | 'none';

export interface SdTableColumn {
 name: string;
 label: string;
 field: string | ((row: any) => any);
 align?: 'left' | 'center' | 'right';
 width?: string;
 format?: (value: any, row: any) => string;
 visible?: boolean;
}

export interface Row {
 [key: string]: any;
}

@Component({
 tag: 'sd-table',
 styleUrl: 'sd-table.scss',
 shadow: true,
})
export class SdTable {
 /** column 정의 */
 @Prop() columns: SdTableColumn[] = [];

 /** row 데이터 */
 @Prop({ mutable: true }) rows: { [key: string]: any }[] = [];

 /** 행의 고유 식별자 프로퍼티 */
 @Prop() rowKey: string = 'id';

 /** 다중 선택 허용 */
 @Prop() selectable: boolean = true;

 /** 헤더 고정 */
 @Prop() stickyHeader: boolean = false;

 /** 빈 상태 메시지 */
 @Prop() noDataLabel: string = '데이터가 없습니다.';

 /** 선택된 row 목록 */
 @Prop() selected: Set<{ [key: string]: any }> = new Set();

 @Prop() pagination?: {
  page: number;
  rowsPerPage: number;
  lastPage?: number;
 };

 @Prop() class: string = '';

 @State() sortDirections: SdTableSortDir[] = [];
 @State() innerRows: { [key: string]: any }[] = this.rows;
 @State() innerSelected: Set<{ [key: string]: any }> = new Set(this.selected);

 @Watch('rows')
 watchRows(newRows: Row[]) {
  this.innerRows = [...newRows];
 }

 componentWillLoad() {
  this.sortDirections = this.columns.map(() => 'none');
 }

 private get paginatedRows(): { [key: string]: any }[] {
  const { page, rowsPerPage } = this.pagination || {};
  if (!page || !rowsPerPage) return this.rows;

  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return this.innerRows.slice(start, end);
 }

 private get sdTableClasses() {
  const classes = ['sd-table'];

  if (this.stickyHeader) {
   classes.push('sd-table--sticky-header');
  }

  if (this.selectable) {
   classes.push('sd-table--selectable');
  }

  if (!this.paginatedRows.length) {
   classes.push('sd-table--no-data');
  }

  return classes.join(' ');
 }

 private get visibleColumns(): SdTableColumn[] {
  return this.columns.filter(col => col.visible !== false);
 }

 private updateRowSelect(row: Row) {
  const selectedArray = Array.from(this.innerSelected);
  const exists = this.isRowSelected(row);
  const newSelected = exists
   ? selectedArray.filter(r => r[this.rowKey] !== row[this.rowKey])
   : [...selectedArray, row];

  // 동일 상태면 set하지 않음 → 불필요 렌더 방지
  if (newSelected.length === selectedArray.length) return;

  this.innerSelected = new Set(newSelected);
 }

 private get isAllChecked(): boolean | null {
  const total = this.paginatedRows.length;
  const selectedCount = this.paginatedRows.filter(row =>
   Array.from(this.innerSelected).some(
    selectedRow => selectedRow[this.rowKey] === row[this.rowKey],
   ),
  ).length;

  if (selectedCount === 0) return false; // 아무것도 안 선택됨
  if (selectedCount === total) return true; // 전부 선택됨
  return null; // 일부만 선택됨
 }

 private get selectedKeyMap(): Map<any, boolean> {
  return new Map(Array.from(this.innerSelected).map(r => [r[this.rowKey], true]));
 }

 private isRowSelected(row: Row): boolean {
  return this.selectedKeyMap.has(row[this.rowKey]);
 }

 private toggleSelectAll(checked: boolean | any[]) {
  if (checked) {
   const pageRows = new Set([...this.paginatedRows]);
   this.innerSelected = new Set([...this.innerSelected, ...pageRows]);
  } else {
   const currentPageKeys = this.paginatedRows.map(r => r[this.rowKey]);
   this.innerSelected = new Set(
    [...this.innerSelected].filter(r => !currentPageKeys.includes(r[this.rowKey])),
   );
  }
 }

 private renderHeader() {
  return (
   <thead>
    <slot name="header">
     <tr>
      <slot name="header-cell">
       {this.selectable && (
        <th class="sd-th sd-th--selected">
         <slot name="header-selection">
          <sd-checkbox
           checked={this.isAllChecked}
           disabled={!this.paginatedRows.length}
           onSdChange={(e: CustomEvent<boolean | any[]>) => this.toggleSelectAll(e.detail)}
          ></sd-checkbox>
         </slot>
        </th>
       )}
       {this.visibleColumns.map(col => (
        <slot name={`header-cell-${col.name}`}>
         <th class="sd-th" key={col.name}>
          <div class={`sd-th__content sd-th__content--${col.align || 'left'}`}>
           <div class="sd-th__content--label">{col.label}</div>
          </div>
         </th>
        </slot>
       ))}
      </slot>
     </tr>
    </slot>
   </thead>
  );
 }

 private getRowData = (column: SdTableColumn, row: Row) => {
  const { field, format, name } = column;

  // 기본 필드 선택
  const value = field ? (typeof field === 'string' ? row[field] : field(row)) : row[name];

  // 포맷 적용
  return format ? format(value, row) : value;
 };

 private renderBody() {
  return (
   <tbody>
    {this.paginatedRows.map((row, rowIndex) => (
     <slot name="body">
      <tr key={rowIndex} class="hover:bg-Grey_Lighten-6">
       <slot name="body-cell">
        {this.selectable && (
         <slot name="body-selection">
          <td class="sd-td sd-td--selected">
           <sd-checkbox
            checked={this.isRowSelected(row)}
            disabled={!this.paginatedRows.length}
            onSdChange={() => this.updateRowSelect(row)}
           ></sd-checkbox>
          </td>
         </slot>
        )}
        {this.columns.map(column => (
         <slot name={`body-cell-${column.name}`}>
          <td key={column.name} class={`sd-td sd-td--${column.align || 'left'}`}>
           {this.getRowData(column, row)}
          </td>
         </slot>
        ))}
       </slot>
      </tr>
     </slot>
    ))}
   </tbody>
  );
 }

 private renderNoData() {
  if (this.paginatedRows.length > 0) return null;

  return <div class="sd-table__bottom--no-data">{this.noDataLabel}</div>;
 }

 render() {
  return (
   <Host class={`sd-table__container ${this.class}`}>
    <div class="sd-table__middle">
     <table role="table" class={this.sdTableClasses}>
      {this.renderHeader()}

      {this.paginatedRows.length > 0 && this.renderBody()}
     </table>
    </div>

    <div class="sd-table__bottom">{this.renderNoData()}</div>
   </Host>
  );
 }
}
