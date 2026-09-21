import { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);

  const rawUsername = 'nguyennhattha303@gmail.com';
  const displayName = 'Nguyennhattha303';
  const initials = 'NG';

  const isVi = language === 'vi';

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setLangMenuAnchor(null);
  };

  const handleSelectLang = (lang: 'en' | 'vi') => {
    setLanguage(lang);
    setLangMenuAnchor(null);
  };

  const navItems = [
    {
      id: 'home',
      labelEn: 'Home',
      labelVi: 'Trang chủ',
      path: '/dashboard',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: 'health',
      labelEn: 'Health',
      labelVi: 'Sức khỏe',
      path: '/health',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
        </svg>
      ),
    },
    {
      id: 'messages',
      labelEn: 'Messages',
      labelVi: 'Tin nhắn',
      path: '/messages',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
        </svg>
      ),
    },
    {
      id: 'profile',
      labelEn: 'Profile',
      labelVi: 'Hồ sơ',
      path: '/profile',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        fontFamily: APP_FONT_FAMILY,
      }}
    >
      <Box
        sx={{
          width: { xs: 70, sm: 220, md: 240 },
          height: '100%',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #eeeeee',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: { xs: 1.5, sm: '24px 20px' },
          flexShrink: 0,
        }}
      >
        <Box>
          <Box
            onClick={() => navigate('/dashboard')}
            sx={{
              display: 'inline-flex',
              alignItems: 'baseline',
              mb: 4.5,
              mt: 0.5,
              px: { xs: 0.5, sm: 1.5 },
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'opacity 0.15s ease, transform 0.15s ease',
              '&:hover': {
                opacity: 0.85,
                transform: 'scale(1.02)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                color: '#111111',
                letterSpacing: '-0.8px',
                fontSize: { xs: '24px', sm: '32px' },
                fontFamily: APP_FONT_FAMILY,
                lineHeight: 1,
              }}
            >
              RCare
            </Typography>
            <Typography
              component="span"
              sx={{
                fontWeight: 900,
                color: '#d81b60',
                fontSize: { xs: '22px', sm: '28px' },
                lineHeight: 1,
                fontFamily: APP_FONT_FAMILY,
                ml: '2px',
                position: 'relative',
                top: '-4px',
              }}
            >
              +
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {navItems.map((item) => {
              const isActive =
                item.path === '/dashboard'
                  ? location.pathname === '/dashboard'
                  : location.pathname.startsWith(item.path);

              return (
                <Box
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: '10px 14px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    backgroundColor: isActive ? '#fce4ec' : 'transparent',
                    color: isActive ? '#d81b60' : '#444444',
                    fontWeight: isActive ? 700 : 500,
                    transition: 'all 0.18s ease',
                    '&:hover': {
                      backgroundColor: isActive ? '#fce4ec' : '#f5f5f5',
                      color: isActive ? '#d81b60' : '#111111',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      display: { xs: 'none', sm: 'block' },
                      fontSize: '14px',
                      fontFamily: APP_FONT_FAMILY,
                    }}
                  >
                    {isVi ? item.labelVi : item.labelEn}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          onClick={() => navigate('/profile')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: { xs: 0.5, sm: 1 },
            borderRadius: '16px',
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#fafafa' },
          }}
        >
          <Avatar
            sx={{
              bgcolor: '#6d6875',
              color: '#ffffff',
              width: 38,
              height: 38,
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, overflow: 'hidden' }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '13px',
                color: '#111',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 140,
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {displayName}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#888',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 140,
                fontSize: '11px',
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {rawUsername}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          height: '100%',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          m: { xs: 1, sm: 2 },
          borderRadius: '24px',
          p: { xs: 2.5, sm: 3.5, md: 4.5 },
          boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
        }}
      >
        <Outlet
          context={{
            language,
            displayName,
            rawUsername,
            initials,
            handleOpenLangMenu,
          }}
        />
      </Box>

      <Menu
        anchorEl={langMenuAnchor}
        open={Boolean(langMenuAnchor)}
        onClose={handleCloseLangMenu}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '16px',
              mt: 1,
              minWidth: 160,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              fontFamily: APP_FONT_FAMILY,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleSelectLang('en')}
          selected={language === 'en'}
          sx={{ fontSize: '13.5px', fontFamily: APP_FONT_FAMILY }}
        >
          🇺🇸 English
        </MenuItem>
        <MenuItem
          onClick={() => handleSelectLang('vi')}
          selected={language === 'vi'}
          sx={{ fontSize: '13.5px', fontFamily: APP_FONT_FAMILY }}
        >
          🇻🇳 Tiếng Việt
        </MenuItem>
      </Menu>
    </Box>
  );
}