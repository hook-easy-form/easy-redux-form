import { useState } from 'react';

import { Layout } from '../components/layout';
import { AuthForm } from '../components/auth-form';
import { RegistrationForm } from '../components/registration-form';

function HomePage() {
  const [auth, setAuth] = useState(true);
  return (
    <Layout>
      {auth ? <AuthForm /> : <RegistrationForm />}

      <button onClick={() => setAuth(ps => !ps)}>change form</button>
    </Layout>
  );
}

export default HomePage;