import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import logo from '../assets/CardeaLogo.png';

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  profilePicture: string; 
}

function AppAppBar({ mode, toggleColorMode, profilePicture }: AppAppBarProps) {
  const [, setOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  const handleChangePasswordClick = () => {
    alert('Change Password Clicked');
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 56,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src={logo}
                alt="logo of Cardea"
                style={{ width: 80, height: 80, borderRadius: '50%' }}
              />
              <Box sx={{ display: 'flex', ml: 3 }}>
                <MenuItem
                  onClick={() => scrollToSection('generalInfo')}
                  sx={{ py: '6px', px: '16px' }} 
                >
                  <Typography variant="body1" color="text.primary">
                    General Info
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('myDetails')}
                  sx={{ py: '6px', px: '16px' }} 
                >
                  <Typography variant="body1" color="text.primary">
                    My Details
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection('photoUpload')}
                  sx={{ py: '6px', px: '16px' }} 
                >
                  <Typography variant="body1" color="text.primary">
                    Photo Upload
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="outlined" onClick={handleChangePasswordClick} sx={{ mr: 2 }}>
                Change Password
              </Button>
              <Avatar src={profilePicture} sx={{ width: 40, height: 40, mr: 2 }} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
