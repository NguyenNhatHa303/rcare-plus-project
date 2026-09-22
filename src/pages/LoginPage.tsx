import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import equalityLogo from '../assets/equality100.png';
import hipaaLogo from '../assets/hipaa.png';
import bgPattern from '../assets/bg-pattern.png';

import appStoreIcon from '../assets/app-store-icon.png';
import googlePlayIcon from '../assets/google-play-icon.png';

import careTeamIcon from '../assets/care-team-icon.png';
import labResultsIcon from '../assets/lab-results-icon.png';
import virtualCareIcon from '../assets/virtual-care-icon.png';
import prepRefillIcon from '../assets/prep-refill-icon.png';
import recordsIcon from '../assets/records-icon.png';
import support247Icon from '../assets/support-247-icon.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

const translations = {
  en: {
    langLabel: 'English',
    title: 'RCare Plus makes accessing PrEP easy.',
    loginHighlight: 'Log in',
    loginSubtitle: ' and get started today!',
    usernameLabel: 'Username / RCare user',
    usernamePlaceholder: 'Enter Username or RCare user',
    errorEmpty: 'Please enter login information.',
    forgotLogin: 'Forgot login information?',
    continueBtn: 'Continue',
    needHelp: 'Need help?',
    signUp: 'Sign up',
    staticFooterNote: 'Your health journey, protected and supported every step of the way',
    platformTitle: 'RCare Plus Platform',
    copyright: 'Powered by RCare Health Network © 2026',
    features: [
      {
        title: 'Dedicated Care Team',
        desc: 'Direct, judgment-free messaging with specialized PrEP healthcare providers.',
      },
      {
        title: 'Discrete Lab Test Kits',
        desc: 'Order free at-home testing kits and access confidential digital results quickly.',
      },
      {
        title: 'Telehealth Consultations',
        desc: 'Schedule private, high-definition video check-ins from the privacy of your home.',
      },
      {
        title: 'PrEP Refills & Delivery',
        desc: 'Automate recurring medication delivery in 100% unmarked, discreet packaging.',
      },
      {
        title: 'Confidential Records',
        desc: 'Your health history, prescriptions, and status protected by HIPAA encryptions.',
      },
      {
        title: '24/7 Patient Support',
        desc: 'Round-the-clock navigation assistance for insurance, co-pay, and adherence.',
      },
    ],
    modals: {
      close: 'Close',
      forgotTitle: 'Forgot Login Information',
      forgotDesc: 'Enter your registered email address or phone number and we will send you instructions to recover your account credentials.',
      forgotInputPlaceholder: 'Email or Phone Number',
      forgotSubmit: 'Send Recovery Link',
      helpTitle: 'Need Assistance?',
      helpDesc: 'Our patient support specialists are available 24/7 to assist you with login, PrEP prescriptions, and portal access.',
      helpCallLabel: 'Direct Support Hotline (24/7):',
      helpCallNumber: '(800) 722-7303',
      signupTitle: 'Sign up for RCare+',
      signupDesc: 'Create an account to start your PrEP consultation and discreet home delivery.',
      signupFullName: 'Full Name',
      signupEmail: 'Email Address',
      signupPhone: 'Phone Number',
      signupSubmit: 'Create Account',
      signupCancel: 'Cancel',
      signupErrorRequired: 'Please fill in all required fields before proceeding.',
    },
  },
  vi: {
    langLabel: 'Tiếng Việt',
    title: 'RCare Plus giúp tiếp cận PrEP dễ dàng.',
    loginHighlight: 'Đăng nhập',
    loginSubtitle: ' để bắt đầu ngay hôm nay!',
    usernameLabel: 'Tên đăng nhập / Người dùng RCare',
    usernamePlaceholder: 'Nhập tên đăng nhập hoặc email',
    errorEmpty: 'Vui lòng nhập thông tin tài khoản.',
    forgotLogin: 'Quên thông tin đăng nhập?',
    continueBtn: 'Tiếp tục',
    needHelp: 'Cần trợ giúp?',
    signUp: 'Đăng ký',
    staticFooterNote: 'Đồng hành và bảo vệ hành trình chăm sóc sức khỏe của bạn',
    platformTitle: 'Nền tảng RCare Plus',
    copyright: 'Được vận hành bởi RCare Health Network © 2026',
    features: [
      {
        title: 'Đội ngũ Bác sĩ Tận tâm',
        desc: 'Trao đổi trực tiếp, không phán xét cùng các chuyên gia chăm sóc điều trị PrEP.',
      },
      {
        title: 'Bộ Xét nghiệm Kín đáo',
        desc: 'Đặt bộ kít tự lấy mẫu tại nhà miễn phí và nhận kết quả trực tuyến nhanh chóng, bảo mật.',
      },
      {
        title: 'Khám Bệnh Từ xa (Telehealth)',
        desc: 'Tư vấn trực tuyến qua video độ phân giải cao ngay tại không gian riêng tư của bạn.',
      },
      {
        title: 'Giao Thuốc PrEP Tận nơi',
        desc: 'Cấp phát và đóng gói thuốc định kỳ hoàn toàn kín đáo, không nhãn định danh bên ngoài.',
      },
      {
        title: 'Hồ sơ Sức khỏe Bảo mật',
        desc: 'Lịch sử khám, đơn thuốc và bệnh án được mã hóa an toàn theo tiêu chuẩn HIPAA.',
      },
      {
        title: 'Hỗ trợ Bệnh nhân 24/7',
        desc: 'Đội ngũ tư vấn thường trực hỗ trợ hướng dẫn bảo hiểm, đồng chi trả và tuân thủ liệu trình.',
      },
    ],
    modals: {
      close: 'Đóng',
      forgotTitle: 'Quên Thông tin Đăng nhập',
      forgotDesc: 'Nhập email hoặc số điện thoại đã đăng ký, chúng tôi sẽ gửi hướng dẫn khôi phục tài khoản cho bạn.',
      forgotInputPlaceholder: 'Email hoặc Số điện thoại',
      forgotSubmit: 'Gửi liên kết khôi phục',
      helpTitle: 'Hỗ trợ Người dùng',
      helpDesc: 'Đội ngũ chăm sóc khách hàng của RCare+ luôn sẵn sàng 24/7 để hỗ trợ bạn về đăng nhập và quy trình PrEP.',
      helpCallLabel: 'Đường dây nóng hỗ trợ 24/7:',
      helpCallNumber: '1900 6868',
      signupTitle: 'Đăng ký Tài khoản RCare+',
      signupDesc: 'Tạo tài khoản để bắt đầu tư vấn PrEP và nhận thuốc kín đáo tại nhà.',
      signupFullName: 'Họ và Tên',
      signupEmail: 'Địa chỉ Email',
      signupPhone: 'Số điện thoại',
      signupSubmit: 'Hoàn tất Đăng ký',
      signupCancel: 'Hủy bỏ',
      signupErrorRequired: 'Vui lòng điền đầy đủ các thông tin bắt buộc.',
    },
  },
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);

  const [language, setLanguage] = useState<'en' | 'vi'>(() => {
    const savedLang = localStorage.getItem('rcare_lang');
    return savedLang === 'en' || savedLang === 'vi' ? savedLang : 'vi';
  });

  const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);

  const [openForgotModal, setOpenForgotModal] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const [signupData, setSignupData] = useState({ fullName: '', email: '', phone: '' });
  const [signupError, setSignupError] = useState(false);

  const navigate = useNavigate();
  const t = translations[language];

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLangAnchorEl(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setLangAnchorEl(null);
  };

  const handleSelectLang = (lang: 'en' | 'vi') => {
    setLanguage(lang);
    localStorage.setItem('rcare_lang', lang);
    handleCloseLangMenu();
  };

  const handleNextClick = () => {
    if (!username.trim()) {
      setError(true);
      return;
    }
    setError(false);
    localStorage.setItem('rcare_lang', language);
    navigate('/verify', { state: { username: username.trim(), language } });
  };

  const handleSignupSubmit = () => {
    if (!signupData.fullName.trim() || !signupData.email.trim() || !signupData.phone.trim()) {
      setSignupError(true);
      return;
    }
    setSignupError(false);
    setOpenSignupModal(false);
    setSignupData({ fullName: '', email: '', phone: '' });
  };

  const handleCloseSignup = () => {
    setOpenSignupModal(false);
    setSignupError(false);
  };

  const featureIcons = [careTeamIcon, labResultsIcon, virtualCareIcon, prepRefillIcon, recordsIcon, support247Icon];

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        p: { xs: 1.5, sm: 2.5, md: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: APP_FONT_FAMILY,
      }}
    >
      <Card
        sx={{
          maxWidth: 1180,
          width: '100%',
          borderRadius: { xs: 3, sm: 4 },
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          overflow: 'hidden',
          fontFamily: APP_FONT_FAMILY,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          my: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            // Trên điện thoại: xếp Form Login lên đầu (column-reverse), trên máy tính giữ nguyên
            flexDirection: { xs: 'column-reverse', md: 'row' },
            flex: 1,
          }}
        >
          {/* CỘT TÍNH NĂNG */}
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 60%' },
              padding: { xs: '24px 20px', sm: '35px 35px 25px 40px' },
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-1px',
                    color: '#111',
                    fontFamily: APP_FONT_FAMILY,
                  }}
                >
                  RCare
                  <sup style={{ color: '#d81b60', fontSize: '0.65em', fontWeight: 800 }}>+</sup>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: { xs: 2.5, sm: 3.5 },
                }}
              >
                {t.features.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        minWidth: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        component="img"
                        src={featureIcons[index]}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          mixBlendMode: 'multiply',
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: '#222',
                          mb: 0.3,
                          fontFamily: APP_FONT_FAMILY,
                          fontSize: '14px',
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#666',
                          lineHeight: 1.45,
                          display: 'block',
                          fontFamily: APP_FONT_FAMILY,
                          fontSize: '12px',
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
          <Divider orientation="horizontal" flexItem sx={{ display: { xs: 'block', md: 'none' } }} />

          {/* CỘT FORM ĐĂNG NHẬP */}
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 40%' },
              padding: { xs: '28px 20px 24px 20px', sm: '32px 35px 25px 35px' },
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fafafa',
            }}
          >
            {/* Header trên Mobile: hiện Logo và nút đổi ngôn ngữ cùng hàng */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: '#111',
                    fontFamily: APP_FONT_FAMILY,
                  }}
                >
                  RCare
                  <sup style={{ color: '#d81b60', fontSize: '0.65em', fontWeight: 800 }}>+</sup>
                </Typography>
              </Box>

              {/* Dropdown chọn ngôn ngữ */}
              <Box
                onClick={handleOpenLangMenu}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.6,
                  cursor: 'pointer',
                  color: '#2e7d32',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  padding: '4px 8px',
                  borderRadius: 1,
                  fontFamily: APP_FONT_FAMILY,
                  ml: 'auto',
                  '&:hover': { backgroundColor: 'rgba(46, 125, 50, 0.08)' },
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span>{t.langLabel}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </Box>

              <Menu
                anchorEl={langAnchorEl}
                open={Boolean(langAnchorEl)}
                onClose={handleCloseLangMenu}
                slotProps={{
                  paper: {
                    sx: {
                      borderRadius: 2,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      fontFamily: APP_FONT_FAMILY,
                      minWidth: 120,
                    },
                  },
                }}
              >
                <MenuItem
                  selected={language === 'en'}
                  onClick={() => handleSelectLang('en')}
                  sx={{ fontSize: '13px', fontWeight: language === 'en' ? 700 : 400, fontFamily: APP_FONT_FAMILY }}
                >
                  English
                </MenuItem>
                <MenuItem
                  selected={language === 'vi'}
                  onClick={() => handleSelectLang('vi')}
                  sx={{ fontSize: '13px', fontWeight: language === 'vi' ? 700 : 400, fontFamily: APP_FONT_FAMILY }}
                >
                  Tiếng Việt
                </MenuItem>
              </Menu>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 700, fontFamily: APP_FONT_FAMILY, textAlign: 'left', fontSize: { xs: '15px', sm: '16px' } }}>
              {t.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontFamily: APP_FONT_FAMILY, textAlign: 'left', fontSize: '13.5px' }}>
              <span style={{ color: '#d81b60', fontWeight: 'bold' }}>{t.loginHighlight}</span>
              {t.loginSubtitle}
            </Typography>

            {/* Form đăng nhập */}
            <Box
              component="form"
              sx={{ textAlign: 'left', mb: 2 }}
              onSubmit={(e) => {
                e.preventDefault();
                handleNextClick();
              }}
            >
              <Typography variant="body2" sx={{ mb: 0.8, color: '#333', fontWeight: 600, fontFamily: APP_FONT_FAMILY, fontSize: '13.5px' }}>
                {t.usernameLabel}
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder={t.usernamePlaceholder}
                variant="outlined"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError(false);
                }}
                error={error}
                helperText={error ? t.errorEmpty : ''}
                sx={{
                  mb: 1.2,
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontFamily: APP_FONT_FAMILY,
                    '&.Mui-focused fieldset': {
                      borderColor: '#d81b60',
                    },
                  },
                }}
              />

              <Box sx={{ mb: 2 }}>
                <Link
                  component="button"
                  type="button"
                  onClick={() => setOpenForgotModal(true)}
                  underline="hover"
                  sx={{
                    color: '#555',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: APP_FONT_FAMILY,
                    cursor: 'pointer',
                    '&:hover': { color: '#d81b60' },
                  }}
                >
                  {t.forgotLogin}
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={handleNextClick}
                sx={{
                  backgroundColor: '#d81b60',
                  color: 'white',
                  borderRadius: 50,
                  py: 1.2,
                  textTransform: 'none',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  fontFamily: APP_FONT_FAMILY,
                  '&:hover': {
                    backgroundColor: '#c2185b',
                  },
                }}
              >
                {t.continueBtn}
              </Button>
            </Box>

            {/* 2 nút trợ giúp: Need help? & Sign up */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 4, sm: 6 }, my: 2 }}>
              <Box
                onClick={() => setOpenHelpModal(true)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: 0.5,
                  '&:hover svg, &:hover span': { color: '#d81b60' },
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#444">
                  <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
                </svg>
                <Typography component="span" variant="caption" sx={{ fontWeight: 600, color: '#444', fontFamily: APP_FONT_FAMILY, fontSize: '13px' }}>
                  {t.needHelp}
                </Typography>
              </Box>

              <Box
                onClick={() => {
                  setSignupError(false);
                  setOpenSignupModal(true);
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: 0.5,
                  '&:hover svg, &:hover span': { color: '#d81b60' },
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#444">
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-7V7H4v2H2v2h2v2h2v-2h2V9H6z" />
                </svg>
                <Typography component="span" variant="caption" sx={{ fontWeight: 600, color: '#444', fontFamily: APP_FONT_FAMILY, fontSize: '13px' }}>
                  {t.signUp}
                </Typography>
              </Box>
            </Box>

            {/* Logo Equality 100 & HIPAA */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2.5,
                mt: 'auto',
                pt: 1.5,
              }}
            >
              <Box
                component="img"
                src={equalityLogo}
                alt="Equality 100"
                sx={{
                  width: { xs: 110, sm: 130 },
                  maxWidth: '48%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
              <Box
                component="img"
                src={hipaaLogo}
                alt="HIPAA Compliant"
                sx={{
                  width: { xs: 100, sm: 120 },
                  maxWidth: '45%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* FOOTER */}
        <Box
          sx={{
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #eaeaea',
            padding: { xs: '14px 16px', sm: '14px 40px' },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box component="a" href="#" sx={{ display: 'inline-flex', textDecoration: 'none' }}>
              <Box component="img" src={appStoreIcon} alt="App Store" sx={{ height: 34, width: 'auto', borderRadius: 1 }} />
            </Box>
            <Box component="a" href="#" sx={{ display: 'inline-flex', textDecoration: 'none' }}>
              <Box component="img" src={googlePlayIcon} alt="Google Play" sx={{ height: 34, width: 'auto', borderRadius: 1 }} />
            </Box>
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: '#888',
              fontSize: '11.5px',
              fontWeight: 500,
              fontFamily: APP_FONT_FAMILY,
              textAlign: 'center',
            }}
          >
            {t.staticFooterNote}
          </Typography>

          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="caption" sx={{ color: '#777', fontSize: '11px', display: 'block', fontFamily: APP_FONT_FAMILY }}>
              {t.platformTitle}
            </Typography>
            <Typography variant="caption" sx={{ color: '#999', fontSize: '10px', display: 'block', fontFamily: APP_FONT_FAMILY }}>
              {t.copyright}
            </Typography>
          </Box>
        </Box>
      </Card>

      {/* MODAL 1: FORGOT LOGIN INFORMATION */}
      <Dialog
        open={openForgotModal}
        onClose={() => setOpenForgotModal(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              padding: '24px 20px',
              maxWidth: 440,
              width: '100%',
              fontFamily: APP_FONT_FAMILY,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', p: 0, mb: 1, fontFamily: APP_FONT_FAMILY }}>
          {t.modals.forgotTitle}
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 2.5 }}>
          <Typography variant="body2" sx={{ color: '#555', mb: 2, fontFamily: APP_FONT_FAMILY }}>
            {t.modals.forgotDesc}
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder={t.modals.forgotInputPlaceholder}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5, fontFamily: APP_FONT_FAMILY } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 0, gap: 1 }}>
          <Button onClick={() => setOpenForgotModal(false)} sx={{ color: '#666', textTransform: 'none', fontFamily: APP_FONT_FAMILY }}>
            {t.modals.close}
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpenForgotModal(false)}
            sx={{
              backgroundColor: '#111',
              textTransform: 'none',
              borderRadius: 50,
              fontFamily: APP_FONT_FAMILY,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            {t.modals.forgotSubmit}
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL 2: NEED HELP? */}
      <Dialog
        open={openHelpModal}
        onClose={() => setOpenHelpModal(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              padding: '26px 22px',
              maxWidth: 440,
              width: '100%',
              fontFamily: APP_FONT_FAMILY,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '18px', p: 0, mb: 1, fontFamily: APP_FONT_FAMILY }}>
          {t.modals.helpTitle}
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 2.5 }}>
          <Typography variant="body2" sx={{ color: '#555', mb: 2.5, fontFamily: APP_FONT_FAMILY }}>
            {t.modals.helpDesc}
          </Typography>

          <Box
            sx={{
              p: 2.5,
              backgroundColor: '#f8f9fa',
              border: '1px solid #e9ecef',
              borderRadius: 2.5,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5, fontWeight: 500, fontFamily: APP_FONT_FAMILY }}>
              {t.modals.helpCallLabel}
            </Typography>
            <Typography
              variant="h5"
              component="a"
              href={`tel:${t.modals.helpCallNumber.replace(/\D/g, '')}`}
              sx={{
                fontWeight: 800,
                color: '#d81b60',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                fontFamily: APP_FONT_FAMILY,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {t.modals.helpCallNumber}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <Button onClick={() => setOpenHelpModal(false)} sx={{ color: '#666', textTransform: 'none', fontFamily: APP_FONT_FAMILY }}>
            {t.modals.close}
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL 3: SIGN UP FORM */}
      <Dialog
        open={openSignupModal}
        onClose={handleCloseSignup}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              padding: '24px 22px',
              maxWidth: 460,
              width: '100%',
              fontFamily: APP_FONT_FAMILY,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '19px', p: 0, mb: 1, fontFamily: APP_FONT_FAMILY }}>
          {t.modals.signupTitle}
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 2.5 }}>
          <Typography variant="body2" sx={{ color: '#555', mb: 2, fontFamily: APP_FONT_FAMILY }}>
            {t.modals.signupDesc}
          </Typography>

          {signupError && (
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: 2,
                fontSize: '13px',
                fontFamily: APP_FONT_FAMILY,
                '& .MuiAlert-message': { fontFamily: APP_FONT_FAMILY },
              }}
            >
              {t.modals.signupErrorRequired}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
            <TextField
              fullWidth
              size="small"
              label={t.modals.signupFullName}
              value={signupData.fullName}
              error={signupError && !signupData.fullName.trim()}
              onChange={(e) => {
                setSignupData({ ...signupData, fullName: e.target.value });
                if (signupError) setSignupError(false);
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5, fontFamily: APP_FONT_FAMILY } }}
            />
            <TextField
              fullWidth
              size="small"
              type="email"
              label={t.modals.signupEmail}
              value={signupData.email}
              error={signupError && !signupData.email.trim()}
              onChange={(e) => {
                setSignupData({ ...signupData, email: e.target.value });
                if (signupError) setSignupError(false);
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5, fontFamily: APP_FONT_FAMILY } }}
            />
            <TextField
              fullWidth
              size="small"
              label={t.modals.signupPhone}
              value={signupData.phone}
              error={signupError && !signupData.phone.trim()}
              onChange={(e) => {
                setSignupData({ ...signupData, phone: e.target.value });
                if (signupError) setSignupError(false);
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5, fontFamily: APP_FONT_FAMILY } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0, gap: 1 }}>
          <Button onClick={handleCloseSignup} sx={{ color: '#666', textTransform: 'none', fontFamily: APP_FONT_FAMILY }}>
            {t.modals.signupCancel}
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleSignupSubmit}
            sx={{
              backgroundColor: '#d81b60',
              textTransform: 'none',
              borderRadius: 50,
              padding: '8px 22px',
              fontWeight: 700,
              fontFamily: APP_FONT_FAMILY,
              '&:hover': { backgroundColor: '#c2185b' },
            }}
          >
            {t.modals.signupSubmit}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}