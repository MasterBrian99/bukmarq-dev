import {
  Anchor,
  Button,
  createStyles,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';

import { loginUser } from '../../api/auth';
import { CustomErrorResponse } from '../../http/httpClient';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function LoginScreen() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err: CustomErrorResponse) => {
      console.log(err.message);
      form.setFieldError('username', err.message);
    },
  });

  function submitRegisterUser() {
    loginMutation.mutate({
      ...form.values,
    });
  }
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          Welcome back to Bukmarq
        </Title>
        <form onSubmit={form.onSubmit(() => submitRegisterUser())}>
          <TextInput
            label="Username"
            placeholder="username"
            size="md"
            {...form.getInputProps('username')}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps('password')}
            required
          />
          <Button fullWidth mt="xl" size="md" type={'submit'}>
            Login
          </Button>
        </form>
        <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'> href="#" weight={700} onClick={(event) => event.preventDefault()}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
