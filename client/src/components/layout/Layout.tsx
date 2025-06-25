import { ReactNode, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { checkAuthStatus } from '@/store/slices/authSlice';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  // Check if it's an auth page (login, register, etc.)
  const isAuthPage = router.pathname.startsWith('/auth/');

  // Check authentication status on component mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
