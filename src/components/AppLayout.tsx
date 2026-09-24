import { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [langMenuAnchor, setLangMenuAnchor] = useState<null | HTMLElement>(null);

  const rawUsername = 'nguyennhatha303@gmail.com';
  const displayName = 'Nguyen Nhat Ha';
  const initials = 'NH';

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
      badge: 2,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: 'health',
      labelEn: 'Health',
      labelVi: 'Sức khỏe',
      path: '/health',
      badge: 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
        </svg>
      ),
    },
    {
      id: 'messages',
      labelEn: 'Messages',
      labelVi: 'Tin nhắn',
      path: '/messages',
      badge: 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
        </svg>
      ),
    },
    {
      id: 'profile',
      labelEn: 'Profile',
      labelVi: 'Hồ sơ',
      path: '/profile',
      badge: 1,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        fontFamily: APP_FONT_FAMILY,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          width: '100%',
          height: { xs: 'auto', md: '100vh' },
          overflow: { xs: 'visible', md: 'hidden' },
        }}
      >
        {/* ========================================================= */}
        {/* 1. SIDEBAR DỌC TRÁI (CHỈ HIỂN THỊ TRÊN LAPTOP / DESKTOP) */}
        {/* ========================================================= */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' }, // ẨN HOÀN TOÀN TRÊN MOBILE
            width: 240,
            height: '100%',
            backgroundColor: '#ffffff',
            borderRight: '1px solid #eeeeee',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: '24px 20px',
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
                px: 1.5,
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'transform 0.15s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  color: '#111111',
                  letterSpacing: '-0.8px',
                  fontSize: '32px',
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
                  fontSize: '28px',
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
                      p: '10px 16px',
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
                    <Typography sx={{ fontSize: '14.5px', fontFamily: APP_FONT_FAMILY }}>
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
              p: 1,
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
            <Box sx={{ overflow: 'hidden' }}>
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

        {/* ========================================================= */}
        {/* 2. KHU VỰC NỘI DUNG CHÍNH (<Outlet/>)                     */}
        {/* ========================================================= */}
        <Box
          component="main"
          sx={{
            flex: 1,
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: { xs: 'transparent', md: '#ffffff' },
            m: { xs: 0, md: 2 },
            borderRadius: { xs: 0, md: '24px' },
            p: { xs: 1.5, sm: 2.5, md: 4 },
            // Trừ hao khoảng trống dưới chân trên mobile để Bottom Bar không che nội dung
            pb: { xs: '84px !important', md: 4 },
            boxSizing: 'border-box',
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
      </Box>

      {/* ========================================================= */}
      {/* 3. BOTTOM NAVIGATION BAR (CHUẨN FORM MOBILE NHƯ QCARE+)  */}
      {/* ========================================================= */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' }, // CHỈ HIỆN TRÊN ĐIỆN THOẠI
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          backgroundColor: '#ffffff',
          borderTop: '1px solid #eeeeee',
          alignItems: 'center',
          justifyContent: 'space-around',
          px: 1,
          zIndex: 1100,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)',
        }}
      >
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
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                py: 0.5,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 28,
                  borderRadius: '16px',
                  backgroundColor: isActive ? '#fce4ec' : 'transparent',
                  color: isActive ? '#d81b60' : '#666666',
                  transition: 'all 0.15s ease',
                  mb: 0.3,
                }}
              >
                {item.badge && item.badge > 0 ? (
                  <Badge
                    badgeContent={item.badge}
                    sx={{
                      '& .MuiBadge-badge': {
                        backgroundColor: '#fbc02d',
                        color: '#111',
                        fontWeight: 800,
                        fontSize: '10px',
                        height: 16,
                        minWidth: 16,
                        borderRadius: '50%',
                        top: 2,
                        right: 2,
                      },
                    }}
                  >
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </Box>

              <Typography
                sx={{
                  fontSize: '11px',
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? '#d81b60' : '#777777',
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                {isVi ? item.labelVi : item.labelEn}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* MENU CHỌN NGÔN NGỮ */}
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