import { getPristineProperty } from './getPristineProperty';

describe('getPristineProperty()', () => {
  it('should return = true', () => {
    const values = { email: '', password: '' };
    const initial = { email: '', password: '' };
    expect(getPristineProperty(values, initial)).toBe(true);
  });

  it('should return = false', () => {
    const values = { email: 'required', password: 'required' };
    const initial = { email: '', password: '' };
    expect(getPristineProperty(values, initial)).toBe(false);
  });
});
