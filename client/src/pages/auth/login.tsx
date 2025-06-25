import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Link as MuiLink,
  CircularProgress,
  Alert,
} from '@mui/material';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { login } from '@/store/slices/authSlice';
import Head from 'next/head';

const LoginPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(login(values)).unwrap();
        router.push('/dashboard');
      } catch (err: any) {
        setError(err?.message || 'An error occurred during login');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Login | Bandmate</title>
        <meta name="description" content="Login to your Bandmate account" />
      </Head>

      <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Login to Your Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Link href="/auth/forgot-password" passHref>
                <MuiLink variant="body2">Forgot password?</MuiLink>
              </Link>
              <Link href="/auth/register" passHref>
                <MuiLink variant="body2">Don&apos;t have an account? Sign Up</MuiLink>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
