export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const getType = (option: string) => {
  switch (option) {
    case 'text input':
      return 'text'
    default:
      return;
  }
}

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);