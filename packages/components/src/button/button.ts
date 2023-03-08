import type { ExtractPropTypes } from 'vue';
type ButtonTypes = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';
const buttonTypes: ButtonTypes[] = ['primary', 'success', 'info', 'warning', 'danger', 'text'];
type ButtonSize = 'small' | 'mini';
const buttonSize: ButtonSize[] = ['small', 'mini'];

export const buttonProps = {
  type: {
    type: String as PropType<ButtonTypes>,
    required: true,
    validator(value: ButtonTypes) {
      return buttonTypes.includes(value);
    },
  },
  size: {
    type: String as PropType<ButtonSize>,
    validator(value: ButtonSize) {
      return buttonSize.includes(value);
    },
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;