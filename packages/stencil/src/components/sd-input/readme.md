# sd-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                                                                        | Default      |
| ------------- | ------------- | ----------- | --------------------------------------------------------------------------- | ------------ |
| `autoFocus`   | `auto-focus`  |             | `boolean`                                                                   | `false`      |
| `barcode`     | `barcode`     |             | `boolean \| undefined`                                                      | `false`      |
| `clearable`   | `clearable`   |             | `boolean`                                                                   | `false`      |
| `disabled`    | `disabled`    |             | `boolean`                                                                   | `false`      |
| `inputStyle`  | --            |             | `{ [key: string]: string; }`                                                | `{}`         |
| `label`       | `label`       |             | `string \| undefined`                                                       | `undefined`  |
| `placeholder` | `placeholder` |             | `string`                                                                    | `'입력해 주세요.'` |
| `rules`       | --            |             | `(((value: string \| number \| null) => string \| boolean)[]) \| undefined` | `undefined`  |
| `value`       | `value`       |             | `null \| number \| string \| undefined`                                     | `null`       |
| `width`       | `width`       |             | `number \| string \| undefined`                                             | `undefined`  |


## Events

| Event      | Description | Type                                    |
| ---------- | ----------- | --------------------------------------- |
| `sdBlur`   |             | `CustomEvent<Event>`                    |
| `sdChange` |             | `CustomEvent<null \| number \| string>` |
| `sdClick`  |             | `CustomEvent<null \| number \| string>` |
| `sdFocus`  |             | `CustomEvent<Event>`                    |
| `sdInput`  |             | `CustomEvent<null \| number \| string>` |


## Methods

### `getNativeElement() => Promise<HTMLInputElement | null>`



#### Returns

Type: `Promise<HTMLInputElement | null>`




## Dependencies

### Used by

 - [sd-select](../sd-select)

### Depends on

- [sd-icon](../sd-icon)

### Graph
```mermaid
graph TD;
  sd-input --> sd-icon
  sd-select --> sd-input
  style sd-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
