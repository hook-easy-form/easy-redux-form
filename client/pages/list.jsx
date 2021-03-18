import { useState } from 'react';

import { ListLayout } from '../components/layout/list';
import { ListForm } from '../components/list-form';

const foo = Array(5).fill(null).map((e, i) => ({ id: i, text: `Item ${i + 1}`}));

export default function List() {
  const [list, setList] = useState(foo);
  const [item, setItem] = useState({ text: '' });

  const submit = (v) => {
    if (v.id) setList(ps => ps.map(el => +el.id === +v.id ? v : el));
    else {
      const item = { ...v,  id: Math.random() };
      setList(ps => ps.concat(item));
      setItem(item);
    }
  };

  return (
    <ListLayout>
      <ul>
        {list.map(e => <li key={e.id} onClick={() => setItem(e)}>{e.text}</li>)}
      </ul>
      <ListForm initialValues={item} onSubmit={submit} />

      <button onClick={() => setItem({ text: '' })}>Create new Item</button>
    </ListLayout>
  );
}