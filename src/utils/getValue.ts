export const getValue = (value: any, type?: string) => {
  if (value) return value;

  switch (type) {
    case 'checkbox':
      return false;

    default: {
      return '';
    }
  }
};
