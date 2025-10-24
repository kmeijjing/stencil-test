import type { Meta, StoryObj } from '@storybook/web-components';

// import '../../../dist/design-system/design-system.esm.js';

const meta: Meta = {
 title: 'Components/Pagination',
 component: 'sd-pagination',
 tags: ['autodocs'],
 argTypes: {
  currentPage: { control: 'number' },
  lastPage: { control: 'number' },
  simple: { control: 'boolean' },
 },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
 args: {
  currentPage: 1,
  lastPage: 1000,
  simple: false,
 },
};

export const Simple: Story = {
 args: {
  currentPage: 1,
  lastPage: 1000,
  simple: true,
 },
};
