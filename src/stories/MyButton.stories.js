import { MyButton } from './MyButton';

export default {
  title: 'Example/MyButton',
  component: MyButton,
  parameters: {
    layout: 'centered',
  },
};

export const Primary = {
  args: {
    primary: true,
    label: 'MyButton',
  },
};

export const Secondary = {
  args: {
    label: 'MyButton',
  },
};

export const PrimaryDisabled = {
  args: {
    primary: true,
    label: 'MyButton',
    disabled: true,
  },
};

export const SecondaryDisabled = {
  args: {
    primary: false,
    label: 'MyButton',
    disabled: true,
  },
};
