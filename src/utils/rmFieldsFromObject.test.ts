import { rmFieldsFromObject } from './rmFieldsFromObject';

describe('getValue()', () => {
  it('should remove property', () => {
    const v = 'password';
    const from = { email: '', password: '' };
    const to = { email: '' };
    expect(rmFieldsFromObject(from, [v])).toMatchObject(to);
  });
});
