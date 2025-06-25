import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Settings,
  Dashboard,
  EventNote,
  MusicNote,
  Person,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { logout } from '@/store/slices/authSlice';

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for profile menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // State for mobile drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    dispatch(logout());
    router.push('/');
  };

  const navigateTo = (path: string) => {
    router.push(path);
    handleProfileMenuClose();
    setDrawerOpen(false);
  };

  const navItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <Dashboard fontSize="small" /> },
    { text: 'Rehearsals', path: '/rehearsals', icon: <EventNote fontSize="small" /> },
    { text: 'Bands', path: '/bands', icon: <Person fontSize="small" /> },
    { text: 'Setlists', path: '/setlists', icon: <MusicNote fontSize="small" /> },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Bandmate
      </Typography>
      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  sx={{ textAlign: 'center' }}
                  onClick={() => navigateTo(item.path)}
                  selected={router.pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigateTo('/auth/login')}>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigateTo('/auth/register')}>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: isMobile ? '1.2rem' : '1.5rem',
          }}
          onClick={() => navigateTo('/')}
        >
          BANDMATE
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.text}
                      color="inherit"
                      onClick={() => navigateTo(item.path)}
                      variant={router.pathname === item.path ? 'outlined' : 'text'}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>

                <IconButton onClick={handleProfileMenuOpen} color="inherit" edge="end">
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleProfileMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => navigateTo('/profile')}>
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigateTo('/settings')}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigateTo('/auth/login')}>
                  Login
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigateTo('/auth/register')}
                  sx={{ ml: 2, color: 'white', borderColor: 'white' }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
