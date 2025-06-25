import { Box, Container, Typography, Link, Grid, Divider } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Bandmate
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Streamlining rehearsal coordination for bands and musical ensembles.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/features" color="inherit" display="block" sx={{ mb: 1 }}>
              Features
            </Link>
            <Link href="/pricing" color="inherit" display="block" sx={{ mb: 1 }}>
              Pricing
            </Link>
            <Link href="/about" color="inherit" display="block">
              About Us
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link href="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
            <Link href="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/contact" color="inherit" display="block">
              Contact Us
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} Bandmate. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="https://github.com/" color="inherit" target="_blank" rel="noopener">
              <GitHub />
            </Link>
            <Link href="https://twitter.com/" color="inherit" target="_blank" rel="noopener">
              <Twitter />
            </Link>
            <Link href="https://linkedin.com/" color="inherit" target="_blank" rel="noopener">
              <LinkedIn />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
