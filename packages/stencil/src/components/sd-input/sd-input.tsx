import {
 Component,
 Element,
 Host,
 Prop,
 State,
 Watch,
 Event,
 EventEmitter,
 h,
 Method,
} from '@stencil/core';

@Component({
 tag: 'sd-input',
 styleUrl: 'sd-input.scss',
 shadow: true,
})
export class SdInput {
 @Element() el!: HTMLElement;

 @Prop({ mutable: true }) value?: string | number | null = null;
 @Prop() label?: string;
 @Prop() placeholder: string = '입력해 주세요.';
 @Prop() disabled: boolean = false;
 @Prop() clearable: boolean = false;
 @Prop() width?: number | string;
 @Prop() barcode?: boolean = false;
 @Prop() rules?: Array<(value: string | number | null) => boolean | string>;
 @Prop() autoFocus: boolean = false;

 //  props - custom styles
 @Prop() inputStyle: { [key: string]: string } = {};

 @State() private internalValue: string | number | null = null;
 @State() private error: boolean = false;
 @State() private focused: boolean = false;

 private nativeEl: HTMLInputElement | undefined = undefined;

 @Event() sdClick?: EventEmitter<string | number | null>;
 @Event() sdInput?: EventEmitter<string | number | null>;
 @Event() sdChange?: EventEmitter<string | number | null>;
 @Event() sdFocus?: EventEmitter<Event>;
 @Event() sdBlur?: EventEmitter<Event>;

 @Watch('value')
 valueChanged(newValue: string | number | null) {
  this.internalValue = newValue;
 }

 @Watch('internalValue')
 internalValueChanged(newValue: string | number | null) {
  if (!this.rules || this.rules.length === 0) return;
  this.error = false;
  for (const rule of this.rules) {
   const result = rule(newValue);
   if (result !== true) {
    this.error = true;
    break;
   }
  }
 }

 @Method()
 async getNativeElement(): Promise<HTMLInputElement | null> {
  return this.nativeEl || null;
 }

 componentWillLoad() {
  if (this.value) {
   this.internalValue = this.value;
  }
 }

 private handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  this.internalValue = target.value;
  this.sdInput?.emit(this.internalValue);
 };

 private handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  this.internalValue = target.value;
  this.sdChange?.emit(this.internalValue);
 };

 private handleFocus = (type: 'focus' | 'blur', event: Event) => {
  this.focused = type === 'focus';

  if (type === 'blur') this.sdBlur?.emit(event);
  else this.sdFocus?.emit(event);
 };

 render() {
  const inputWidth = this.width
   ? {
      '--input-width': typeof this.width === 'number' ? `${this.width}px` : this.width,
     }
   : {};

  return (
   <Host style={inputWidth}>
    {this.label && <div class="sd-input__label">{this.label}</div>}
    <label
     class={{
      'sd-input': true,
      'sd-input--disabled': this.disabled,
      'sd-input--focused': this.focused,
      'sd-input--barcode': !!this.barcode,
      'sd-input--error': this.error,
     }}
     style={this.inputStyle}
    >
     <slot name="prefix"></slot>
     <input
      ref={el => (this.nativeEl = el)}
      class={'sd-input__native_element'}
      type="text"
      value={this.internalValue || ''}
      placeholder={this.placeholder}
      disabled={this.disabled}
      autofocus={this.autoFocus}
      onInput={this.handleInput}
      onChange={this.handleChange}
      onFocus={event => this.handleFocus('focus', event)}
      onBlur={event => this.handleFocus('blur', event)}
     />
     <slot name="suffix"></slot>
     {this.clearable && this.internalValue && (
      <sd-icon
       name="close"
       color="#888"
       style={{ marginRight: '-4px', marginLeft: '8px', cursor: 'pointer' }}
       onClick={() => {
        this.internalValue = '';
        this.sdChange?.emit(this.internalValue);
        this.sdInput?.emit(this.internalValue);
       }}
      />
     )}
    </label>
   </Host>
  );
 }
}

{
 /*
  html example for index.html 
  <sd-input>
   <span slot="prefix">$</span>
   <span slot="suffix">.com</span>
  </sd-input>

  <script>
   document.addEventListener('DOMContentLoaded', () => {
    const sdInput = document.querySelector('sd-input');

    // 기본 DOM 이벤트 - 자동으로 작동
    sdInput.addEventListener('focus', event => {
     console.log('Native focus event:', event.type); // 'focus'
     console.log('Event target:', event.target); // sd-input 엘리먼트
    });

    sdInput.addEventListener('input', event => {
     console.log('Native input event:', event.target.value);
    });

    // 커스텀 이벤트 - 수동으로 emit된 것만 작동
    sdInput.addEventListener('sdFocus', event => {
     console.log('Custom sdFocus event:', event.detail); // Event 객체
    });

    sdInput.addEventListener('sdInput', event => {
     console.log('Custom sdInput event:', event.detail); // 값 자체
    });
   });
  </script>
  */
}
