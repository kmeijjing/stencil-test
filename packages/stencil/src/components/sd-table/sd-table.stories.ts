import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
 title: 'Components/Table',
 component: 'sd-table',
 tags: ['autodocs'],
 argTypes: {
  selectable: { control: 'boolean', defaultValue: false, description: '다중 선택 허용 여부' },
  resizable: { control: 'boolean', defaultValue: false, description: '컬럼 리사이즈 허용 여부' },
  stickyHeader: { control: 'boolean', defaultValue: false, description: '헤더 고정 여부' },
  className: { control: 'text', description: '추가 클래스 이름' },
 },
};
export default meta;
type Story = StoryObj;

const COLUMNS = [
 { name: 'name', label: '이름', field: 'name', align: 'left', width: '160' },
 { name: 'email', label: '이메일', field: 'email', align: 'left', width: '240' },
 { name: 'role', label: '역할', field: 'role', align: 'center', width: '120' },
 { name: 'createdAt', label: '가입일', field: 'createdAt', align: 'right', width: '160' },
];

const ROWS = [
 { id: 1, name: '김민수', email: 'minsu@example.com', role: 'Admin', createdAt: '2024-12-01' },
 { id: 2, name: '이서연', email: 'seoyeon@example.com', role: 'User', createdAt: '2024-12-05' },
 { id: 3, name: '박지훈', email: 'jihoon@example.com', role: 'User', createdAt: '2024-12-10' },
 { id: 4, name: '최유진', email: 'yujin@example.com', role: 'Manager', createdAt: '2024-12-12' },
 { id: 5, name: '정하늘', email: 'haneul@example.com', role: 'User', createdAt: '2024-12-20' },
 { id: 6, name: '한도윤', email: 'doyoon@example.com', role: 'User', createdAt: '2024-12-25' },
];

export const Default: Story = {
 render: args => html`
  <sd-table
   .columns=${COLUMNS}
   .rows=${ROWS}
   selectable=${args.selectable}
   resizable=${args.resizable}
   stickyHeader=${args.stickyHeader}
   className=${args.className || ''}
  ></sd-table>
 `,
 args: {
  selectable: false,
  resizable: false,
  stickyHeader: false,
 },
};

export const Selectable: Story = {
 args: {
  columns: COLUMNS,
  rows: ROWS,
  selectable: true,
 },
};

export const Resizable: Story = {
 args: {
  columns: COLUMNS,
  rows: ROWS,
  resizable: true,
 },
};

export const stickyHeader: Story = {
 args: {
  columns: COLUMNS,
  rows: ROWS,
  stickyHeader: true,
 },
 render: args => html`
  <sd-table
   .columns=${args.columns}
   .rows=${args.rows}
   .stickyHeader=${args.stickyHeader}
   .style=${'height: 200px;'}
   class="custom-table"
  ></sd-table>
 `,
};

export const WithPagination: Story = {
 args: {
  columns: COLUMNS,
  rows: ROWS,
  pagination: {
   page: 1,
   rowsPerPage: 5,
   lastPage: 2,
  },
 },
};

export const CustomRenderer: Story = {
 render: () => {
  const bodyCellRenderer = (col: any, row: any) => {
   if (col.name === 'role') {
    const color = row.role === 'Admin' ? '#e74c3c' : row.role === 'Manager' ? '#3498db' : '#2ecc71';
    return `<span style="color:${color}; font-weight:600">${row.role}</span>`;
   }
   return null;
  };

  return html`
   <sd-table
    .columns=${COLUMNS}
    .rows=${ROWS}
    selectable
    .bodyCellRenderer=${bodyCellRenderer}
   ></sd-table>
  `;
 },
};
