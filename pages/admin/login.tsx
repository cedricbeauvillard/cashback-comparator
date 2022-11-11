import {Anchor, Button, Group, Paper, PasswordInput, Stack, Text, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useToggle} from '@mantine/hooks';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {VFC} from 'react';
import {login} from '../../lib/api/consumers/admin';

export interface LoginProps {}

const Login: VFC<LoginProps> = (props: LoginProps) => {
  // TODO: Make the same for contact page
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Adm - Login</title>
        <meta name="description" content="Back office" />
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/logo.webp" />
        <meta property="og:title" content={'Adm - Login'} />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={url} />
        <meta property="og:image" content={'/logo.webp'} />
        <meta property="og:image:alt" content="M" />*/}
        <meta property="og:description" content={'Description'} />
        <meta property="og:site_name" content="MeilleursCashback" />
      </Head>
      <main className="flex flex-col items-center">
        <Paper className="w-1/4 mt-24" radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500}>
            Connexion
          </Text>
          <form onSubmit={form.onSubmit(() => {})} className="mt-4">
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="votre@email.fr"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="****"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
              />
            </Stack>
          </form>
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            ></Anchor>
            <Button
              type="submit"
              onClick={async () => {
                login(form.values.email, form.values.password, router);
              }}
            >
              Connexion
            </Button>
          </Group>
        </Paper>
      </main>
    </div>
  );
};

export default Login;
