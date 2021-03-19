import { useDispatch } from 'react-redux';

import { fakeSubmit } from '../../store/actions';
// import { validateAuthForm } from '../../utils/validate';
import { Input } from '../input';
import { Select } from '../select';

// LIB
import { useFromRedux } from '../../lib';

const FORM_NAME = 'allFieldsForm';

export const AllFieldsForm = () => {
  const dispatch = useDispatch();
  const { Form, pristine, submitted, values } = useFromRedux(FORM_NAME, {
    // validate: validateAuthForm,
    onSubmit: (v) => dispatch(fakeSubmit(v)),
  });

  return (
    <Form style={{ width: '100%' }}>
      <Input name="firstName" onChange={(e) => console.log('e', e)} />
      <Input name="lastName" />
      <Input name="email" type="email" />
      <Input name="sex" type="radio" value="male" />
      <Input name="sex" type="radio" value="female" />
      <Input name="sex" type="radio" value="other" />
      <Select name="color" type="select" />
      <Input name="employed" type="checkbox" />
      <Input name="note" type="text-area" />
      <button type="submit" disabled={pristine || submitted}>submit</button>

      <pre>{JSON.stringify(values, null, 2)}</pre>
    </Form>
  );
}; 