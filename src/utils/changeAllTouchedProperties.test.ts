import { changeAllTouchedProperties } from './changeAllTouchedProperties';

describe('changeAllTouchedProperties()', () => {
  it('should return all properties is true', () => {
    const values = { email: true, password: false };
    const expected = { email: true, password: true };
    expect(changeAllTouchedProperties(values, true)).toMatchObject(expected);
  });

  it('should return all properties is false', () => {
    const values = { email: true, password: false };
    const expected = { email: false, password: false };
    expect(changeAllTouchedProperties(values, false)).toMatchObject(expected);
  });
});
