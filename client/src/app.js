import { hot } from 'react-hot-loader/root';
import React from 'react';

// LIB
import { useFromRedux } from '../lib';

import { Input } from './components/input';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

function App() {
  const { Form, ...form } = useFromRedux('auth', {
    validate,
    initialValues: { email: 'lol@com.com' },
    onSubmit: (v) => console.log('s', v),
  });

  console.log('form.anyTouched', form.anyTouched);
  return (
    <Form>
      <Input name="email" />
      <Input name="password" type="password" />
      <Input name="sex" type="checkbox" />
      <button type="submit" disabled={form.pristine || form.submitted}>submit</button>
      <button type="button" disabled={form.pristine || form.submitted} onClick={form.reset}>reset</button>
    </Form>
  );
}

export default hot(App);