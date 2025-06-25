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
  Grid,
} from '@mui/material';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { register as registerUser } from '@/store/slices/authSlice';
import Head from 'next/head';

const RegisterPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
      phone: Yup.string(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...userData } = values;
        await dispatch(registerUser(userData)).unwrap();
        router.push('/dashboard');
      } catch (err: any) {
        setError(err?.message || 'An error occurred during registration');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register | Bandmate</title>
        <meta name="description" content="Create a new Bandmate account" />
      </Head>

      <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Create a New Account
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
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone Number (optional)"
              name="phone"
              autoComplete="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Link href="/auth/login" passHref>
                <MuiLink variant="body2">Already have an account? Sign in</MuiLink>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default RegisterPage;
