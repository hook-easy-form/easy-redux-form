import { getValidProperty } from './getValidProperty';

describe('getValidProperty()', () => {
  it('should return error = true', () => {
    const v = { email: '', password: '' };
    expect(getValidProperty(v)).toBe(true);
  });

  it('should return error = false', () => {
    const v = { email: 'required', password: 'required' };
    expect(getValidProperty(v)).toBe(false);
  });
});
