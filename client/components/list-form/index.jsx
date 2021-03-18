import { Input } from '../input';

// LIB
import { useFromRedux } from '../../lib';

const FORM_NAME = 'listForm';

export const ListForm = ({ onSubmit, initialValues }) => {
  const { Form, pristine, submitted, values, reset } = useFromRedux(FORM_NAME, {
    onSubmit,
    initialValues,
  });

  return (
    <Form style={{ width: '100%' }}>
      <Input name="text" />
      <button type="submit" disabled={pristine || submitted}>submit</button>
      <button type="button" disabled={pristine || submitted} onClick={reset}>reset</button>

      <pre>{JSON.stringify(values, null, 2)}</pre>
    </Form>
  );
}; 