import { hot } from 'react-hot-loader/root';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// LIB
import { useFromRedux, setValidation, changeField } from '../lib';

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

const FORM_NAME = 'auth';

function App() {

  const dispatch = useDispatch();

  const { Form, ...form } = useFromRedux(FORM_NAME, {
    validate,
    initialValues: { email: 'lol@com.com' },
    onSubmit: (v) => console.log('s', v),
    resetAfterSubmit: true,
  });

  const setErrors = useCallback(() => {
    const meta = { form: FORM_NAME, setTouchedForAllValues: true };
    const payload = { email: 'FOOOO', password: 'EASY' };
    dispatch(setValidation({ meta, payload }));
  }, [dispatch]);

  const setValue = useCallback(() => {
    const meta = { form: FORM_NAME, field: 'email' };
    const payload = { value: 'TRA_TA_TA', touched: true };
    dispatch(changeField({ meta, payload }));
  }, [dispatch]);

  console.log('form.anyTouched', form);
  return (
    <Form>
      <Input name="email" />
      <Input name="password" type="password" />
      <Input name="sex" type="checkbox" />
      <button type="submit" disabled={form.pristine || form.submitted}>submit</button>
      <button type="button" disabled={form.pristine || form.submitted} onClick={form.reset}>reset</button>
      <button type="button" onClick={setErrors}>set Errors manually</button>
      <button type="button" onClick={setValue}>set Value manually</button>
    </Form>
  );
}

export default hot(App);