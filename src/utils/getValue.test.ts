import { getValue } from './getValue';

describe('getValue()', () => {
  it('should return value', () => {
    const v = 'some value';
    expect(getValue(v, '')).toBe(v);
  });

  it('should return empty string', () => {
    const v = '';
    const type = 'text';
    expect(getValue(v, type)).toBe(v);
  });

  it('should return boolean', () => {
    const v = '';
    const type = 'checkbox';
    expect(getValue(v, type)).toBe(false);
  });
});
