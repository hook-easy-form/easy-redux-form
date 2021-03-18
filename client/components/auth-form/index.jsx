import { useDispatch } from 'react-redux';

import { Layout } from '../layout';
import { fakeAuthSubmit } from '../../store/actions';
import { validateAuthForm } from '../../utils/validate';
import { Input } from '../input';

// LIB
import { useFromRedux } from '../../lib';

const FORM_NAME = 'authForm';

export const AuthForm = () => {
  const dispatch = useDispatch();
  const { Form, pristine, submitted, values } = useFromRedux(FORM_NAME, {
    validate: validateAuthForm,
    onSubmit: (v) => dispatch(fakeAuthSubmit(v)),
  });

  return (
    <Layout>
      <Form>
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        <button type="submit" disabled={pristine || submitted}>submit</button>

        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Form>
    </Layout>
  );
}; 