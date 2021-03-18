import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { fakeSubmit } from '../../store/actions';
import { validateRegistrationForm } from '../../utils/validate';
import { Input } from '../input';

// LIB
import { useFromRedux } from '../../lib';

const FORM_NAME = 'registrationForm';

export const RegistrationForm = () => {
  const [cb, setCb] = useState(true);
  const dispatch = useDispatch();
  const { Form, pristine, submitted, values } = useFromRedux(FORM_NAME, {
    validate: validateRegistrationForm,
    onSubmit: (v) => dispatch(fakeSubmit(v)),
  });

  return (
    <Form style={{ width: '100%' }}>
      <Input name="email" type="email" />
      <Input name="password" type="password" />
      {cb && <Input name="sex" type="checkbox" />}
      <button type="submit" disabled={pristine || submitted}>submit</button>
      <button type="button" onClick={() => setCb(ps => !ps)}>hide checkbox</button>
      

      <pre>{JSON.stringify(values, null, 2)}</pre>
    </Form>
  );
}; 