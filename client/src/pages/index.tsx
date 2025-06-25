import { NextPage } from 'next';
import { Box, Typography, Container, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Head from 'next/head';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/router';

const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const HomePage: NextPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Bandmate | Rehearsal Coordination Platform</title>
        <meta
          name="description"
          content="Efficiently coordinate rehearsals, track attendance, and optimize rehearsal times for bands and musical ensembles."
        />
      </Head>

      <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
          >
            Bandmate
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Streamline your band&apos;s rehearsal scheduling and coordination with our
            comprehensive platform designed for musicians.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            {isAuthenticated ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => router.push('/auth/register')}
                >
                  Sign Up
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FeaturePaper>
              <EventNoteIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Schedule Efficiently
              </Typography>
              <Typography color="text.secondary">
                Coordinate rehearsals with ease, track member availability, and eliminate
                scheduling conflicts with our intuitive calendar system.
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeaturePaper>
              <GroupIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Track Attendance
              </Typography>
              <Typography color="text.secondary">
                Keep records of attendance, analyze participation patterns, and generate
                reports to ensure everyone stays accountable.
              </Typography>
            </FeaturePaper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeaturePaper>
              <MusicNoteIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Manage Setlists
              </Typography>
              <Typography color="text.secondary">
                Create and share setlists for upcoming rehearsals, track song durations,
                and ensure everyone is prepared.
              </Typography>
            </FeaturePaper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Ready to streamline your band&apos;s rehearsals?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            onClick={() => router.push(isAuthenticated ? '/dashboard' : '/auth/register')}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
