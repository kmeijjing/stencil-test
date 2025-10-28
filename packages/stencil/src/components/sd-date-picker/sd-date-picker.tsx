import { Component, Prop, h } from '@stencil/core';

@Component({
 tag: 'sd-date-picker',
 styleUrl: 'sd-date-picker.scss',
 shadow: true,
})
export class SdIcon {
 @Prop() value: string | null = null;
 @Prop() label?: string;

 render() {
  return (
   <div class="sd-date-picker">
    <sd-input label={this.label} placeholder="0000-00-00">
     <sd-icon slot="prefix" name="date" size="16" color="#737373" class="date-icon"></sd-icon>
    </sd-input>
   </div>
  );
 }
}
