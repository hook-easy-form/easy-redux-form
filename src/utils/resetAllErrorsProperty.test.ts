import { resetAllErrorsProperty } from './resetAllErrorsProperty';

describe('resetAllErrorsProperty()', () => {
  it('should return all properties with empty string', () => {
    const values = { email: 'true', password: 'false' };
    const expected = { email: '', password: '' };
    expect(resetAllErrorsProperty(values)).toMatchObject(expected);
  });
});
