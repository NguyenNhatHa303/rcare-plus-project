import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import rickyAvatarImg from '../assets/support-ricky.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function HealthHubPage() {
  const navigate = useNavigate();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();
  const isVi = language === 'vi';

  // State popup RB-026: Message Customer Support
  const [openSupportModal, setOpenSupportModal] = useState(false);
  const [showOutOfOffice, setShowOutOfOffice] = useState(true);
  const [supportMessage, setSupportMessage] = useState('');

  // State toast thông báo
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Hàm kiểm tra ngoài giờ làm việc (Mon-Fri, 8am - 6pm EST)
  const isOutsideBusinessHours = () => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        weekday: 'short',
        hour: 'numeric',
        hour12: false,
      });
      const parts = formatter.formatToParts(now);
      let weekday = '';
      let hour = 8;
      for (const p of parts) {
        if (p.type === 'weekday') weekday = p.value;
        if (p.type === 'hour') hour = parseInt(p.value, 10);
      }
      // Ngoài 8h - 18h hoặc Thứ 7, Chủ Nhật
      return weekday === 'Sat' || weekday === 'Sun' || hour < 8 || hour >= 18;
    } catch {
      return true;
    }
  };

  const handleOpenSupport = () => {
    setShowOutOfOffice(isOutsideBusinessHours());
    setOpenSupportModal(true);
  };

  const handleSendSupportMessage = () => {
    if (!supportMessage.trim()) return;
    setOpenSupportModal(false);
    setSupportMessage('');
    setToastMsg(
      isVi
        ? 'Tin nhắn hỗ trợ đã được gửi thành công tới Ricky QCare+.'
        : 'Your message has been sent to Ricky QCare+.'
    );
    setToastOpen(true);
  };

  const t = {
    pageTitle: isVi ? 'Sức khỏe' : 'Health',
    yourCare: isVi ? 'CHĂM SÓC CỦA BẠN' : 'YOUR CARE',
    healthServices: isVi ? 'DỊCH VỤ Y TẾ' : 'HEALTH SERVICES',
    support: isVi ? 'HỖ TRỢ' : 'SUPPORT',

    appointmentsTitle: isVi ? 'Lịch hẹn' : 'Appointments',
    appointmentsDesc: isVi ? 'Xem và quản lý lịch hẹn khám' : 'View and manage your schedule',

    healthHistoryTitle: isVi ? 'Lịch sử sức khỏe' : 'Health History',
    healthHistoryDesc: isVi ? 'Xem lại tiền sử bệnh và thể trạng' : 'Review your past conditions',

    labResultsTitle: isVi ? 'Kết quả xét nghiệm' : 'Lab Results',
    labResultsDesc: isVi ? 'Truy cập kết quả xét nghiệm' : 'Access your test results',

    prescriptionsTitle: isVi ? 'Đơn thuốc' : 'Prescriptions',
    prescriptionsDesc: isVi ? 'Quản lý đơn thuốc của bạn' : 'Manage your medications',

    assessmentsTitle: isVi ? 'Đánh giá sức khỏe' : 'Assessments',
    assessmentsDesc: isVi ? 'Hoàn thành kiểm tra sức khỏe' : 'Complete health checks',

    documentsTitle: isVi ? 'Hồ sơ tài liệu' : 'Documents',
    documentsDesc: isVi ? 'Xem tài liệu và bệnh án' : 'View your medical records',

    needAssistanceTitle: isVi ? 'Cần trợ giúp?' : 'Need Assistance?',
    needAssistanceDesc: isVi
      ? 'Đội ngũ hỗ trợ của chúng tôi sẵn sàng trợ giúp bạn'
      : 'Our support team is here to help',
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* 1. Header trên cùng */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          mb: 3.5,
          minHeight: 40,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#111',
            letterSpacing: '-0.4px',
            fontSize: { xs: '20px', md: '22px' },
            fontFamily: APP_FONT_FAMILY,
          }}
        >
          {t.pageTitle}
        </Typography>

        <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
          <IconButton
            onClick={handleOpenLangMenu}
            sx={{
              width: 38,
              height: 38,
              backgroundColor: '#d81b60',
              color: '#111',
              border: '1.5px solid #111',
              borderRadius: '10px',
              padding: '7px',
              transition: 'transform 0.15s',
              '&:hover': { backgroundColor: '#c2185b', transform: 'scale(1.05)' },
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </IconButton>
        </Box>
      </Box>

      {/* 2. Nội dung các nhóm thẻ */}
      <Box sx={{ maxWidth: 860, mx: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        {/* NHÓM 1: YOUR CARE */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box sx={{ width: 3, height: 13, backgroundColor: '#111', borderRadius: 1 }} />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                letterSpacing: '0.8px',
                color: '#666',
                textTransform: 'uppercase',
                fontSize: '11px',
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {t.yourCare}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Appointments */}
            <Card
              onClick={() => navigate('/appointments')}
              sx={{
                p: '16px 20px',
                borderRadius: '16px',
                boxShadow: 'none',
                border: '1px solid #f0f0f0',
                backgroundColor: '#fbfbfb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                '&:hover': {
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  borderColor: '#e0e0e0',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#111',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                  </svg>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111', fontSize: '15px' }}>
                    {t.appointmentsTitle}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777', fontSize: '12.5px' }}>
                    {t.appointmentsDesc}
                  </Typography>
                </Box>
              </Box>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#999">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </Card>

            {/* Health History */}
            <Card
              onClick={() => navigate('/profile?tab=health-history')}
              sx={{
                p: '16px 20px',
                borderRadius: '16px',
                boxShadow: 'none',
                border: '1px solid #f0f0f0',
                backgroundColor: '#fbfbfb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                '&:hover': {
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  borderColor: '#e0e0e0',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#d81b60',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
                  </svg>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111', fontSize: '15px' }}>
                    {t.healthHistoryTitle}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777', fontSize: '12.5px' }}>
                    {t.healthHistoryDesc}
                  </Typography>
                </Box>
              </Box>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#999">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </Card>
          </Box>
        </Box>

        {/* NHÓM 2: HEALTH SERVICES */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box sx={{ width: 3, height: 13, backgroundColor: '#111', borderRadius: 1 }} />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                letterSpacing: '0.8px',
                color: '#666',
                textTransform: 'uppercase',
                fontSize: '11px',
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {t.healthServices}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2.5,
            }}
          >
            {/* Lab Results */}
            <Card
              onClick={() => navigate('/health/labs')}
              sx={{
                p: '26px 20px',
                backgroundColor: '#eef8fc',
                borderRadius: '20px',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 1.2,
                cursor: 'pointer',
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 24px rgba(2, 136, 209, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#0288d1',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 2v2h1v9.88L3.21 20.08c-.78 1.15-.49 2.72.66 3.5.38.26.83.42 1.3.42h13.66c1.38 0 2.5-1.12 2.5-2.5 0-.47-.14-.92-.4-1.3L17 13.88V4h1V2H6zm3 4h6v7.35l3.22 5.65H5.78L9 13.35V6z" />
                </svg>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111', fontSize: '15px' }}>
                {t.labResultsTitle}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
                {t.labResultsDesc}
              </Typography>
            </Card>

            {/* Prescriptions */}
            <Card
              onClick={() => navigate('/health/prescriptions')}
              sx={{
                p: '26px 20px',
                backgroundColor: '#f2f9ed',
                borderRadius: '20px',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 1.2,
                cursor: 'pointer',
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 24px rgba(85, 139, 47, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#558b2f',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 3h12v2H6zm11 3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 8h-3v3h-2v-3H8v-2h3V9h2v3h3v2z" />
                </svg>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111', fontSize: '15px' }}>
                {t.prescriptionsTitle}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
                {t.prescriptionsDesc}
              </Typography>
            </Card>

            {/* Assessments */}
            <Card
              onClick={() => navigate('/health/assessments')}
              sx={{
                p: '26px 20px',
                backgroundColor: '#fcf6ed',
                borderRadius: '20px',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 1.2,
                cursor: 'pointer',
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 24px rgba(245, 124, 0, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#f57c00',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111', fontSize: '15px' }}>
                {t.assessmentsTitle}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
                {t.assessmentsDesc}
              </Typography>
            </Card>

            {/* Documents */}
            <Card
              onClick={() => navigate('/health/documents')}
              sx={{
                p: '26px 20px',
                backgroundColor: '#f1f3f9',
                borderRadius: '20px',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: 1.2,
                cursor: 'pointer',
                transition: 'transform 0.18s, box-shadow 0.18s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 24px rgba(63, 81, 181, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#3f51b5',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111', fontSize: '15px' }}>
                {t.documentsTitle}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '12px' }}>
                {t.documentsDesc}
              </Typography>
            </Card>
          </Box>
        </Box>

        {/* NHÓM 3: SUPPORT (RB-026 - NEED ASSISTANCE) */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Box sx={{ width: 3, height: 13, backgroundColor: '#111', borderRadius: 1 }} />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                letterSpacing: '0.8px',
                color: '#666',
                textTransform: 'uppercase',
                fontSize: '11px',
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {t.support}
            </Typography>
          </Box>

          <Card
            onClick={handleOpenSupport}
            sx={{
              p: '16px 20px',
              borderRadius: '16px',
              boxShadow: 'none',
              border: '1px solid #f0f0f0',
              backgroundColor: '#fbfbfb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              '&:hover': {
                backgroundColor: '#fff',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                borderColor: '#e0e0e0',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#d81b60',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h4c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
                </svg>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111', fontSize: '15px' }}>
                  {t.needAssistanceTitle}
                </Typography>
                <Typography variant="caption" sx={{ color: '#777', fontSize: '12.5px' }}>
                  {t.needAssistanceDesc}
                </Typography>
              </Box>
            </Box>

            <svg width="18" height="18" viewBox="0 0 24 24" fill="#999">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </Card>
        </Box>
      </Box>

      {/* POPUP RB-026: MESSAGE CUSTOMER SUPPORT (RICKY QCARE+) */}
      <Dialog
        open={openSupportModal}
        onClose={() => setOpenSupportModal(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '24px',
              p: { xs: 2.5, sm: '32px 36px' },
              fontFamily: APP_FONT_FAMILY,
              backgroundColor: '#ffffff',
              boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'visible',
            },
          },
        }}
      >
        {/* THẺ THÔNG BÁO OUT OF OFFICE GÓC TRÊN BÊN PHẢI (CHỈ HIỆN KHI NGOÀI GIỜ LÀM VIỆC) */}
        {showOutOfOffice && (
          <Box
            sx={{
              position: 'absolute',
              top: -24,
              right: { xs: 0, sm: -150, md: -170 },
              width: { xs: 280, sm: 300 },
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              p: '14px 16px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.14)',
              border: '1px solid #f0f0f0',
              zIndex: 1301,
              animation: 'fadeIn 0.25s ease',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '6px',
                    backgroundColor: '#fff9c4',
                    color: '#f57f17',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                  </svg>
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: '13px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                  Out Of Office
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={() => setShowOutOfOffice(false)}
                sx={{ color: '#888', p: 0.2, '&:hover': { color: '#111' } }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
              <Avatar
                src={rickyAvatarImg}
                alt="Ricky QCare+"
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '6px',
                  bgcolor: '#8d6e63',
                  fontSize: '11px',
                  fontWeight: 700,
                  objectFit: 'cover',
                }}
              >
                RQ
              </Avatar>
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
                Ricky QCare+
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: '11px',
                color: '#555',
                lineHeight: 1.45,
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {isVi
                ? 'Tôi hiện đang vắng mặt tại văn phòng. Nếu cần hỗ trợ khẩn cấp, vui lòng liên hệ chuyên viên chăm sóc hoặc bác sĩ điều trị của bạn.'
                : 'I will be out of office Friday 9/4 and will be back in office on Tuesday 9/8. If you need assistance, you can contact your patient support representative or your provider. Have a wonderful Labor Day weekend!'}
            </Typography>
          </Box>
        )}

        {/* Tiêu đề Modal chính giữa */}
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '18px',
            color: '#111',
            p: 0,
            mb: 2.5,
            fontFamily: APP_FONT_FAMILY,
          }}
        >
          {isVi ? 'Nhắn tin cho Chăm sóc Khách hàng' : 'Message Customer Support'}
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Thông tin người nhận: Ricky QCare+ */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              src={rickyAvatarImg}
              alt="Ricky QCare+"
              sx={{
                width: 46,
                height: 46,
                borderRadius: '12px',
                border: '1px solid #eee',
                bgcolor: '#8d6e63',
                color: '#fff',
                fontWeight: 700,
                fontSize: '15px',
                objectFit: 'cover',
              }}
            >
              RQ
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
                Ricky QCare+
              </Typography>
              <Typography variant="caption" sx={{ color: '#777', fontSize: '12px', fontFamily: APP_FONT_FAMILY }}>
                He/Him
              </Typography>
            </Box>
          </Box>

          {/* Ô nhập nội dung tin nhắn */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder={isVi ? 'Viết nội dung tin nhắn...' : 'Write something...'}
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                fontFamily: APP_FONT_FAMILY,
                fontSize: '14px',
                backgroundColor: '#ffffff',
                '& fieldset': { borderColor: '#111' },
                '&:hover fieldset': { borderColor: '#111' },
                '&.Mui-focused fieldset': { borderColor: '#111', borderWidth: '1.5px' },
              },
            }}
          />

          <Typography
            variant="caption"
            sx={{
              color: '#666',
              fontSize: '11.5px',
              lineHeight: 1.45,
              fontFamily: APP_FONT_FAMILY,
              mt: 0.5,
            }}
          >
            {isVi
              ? 'Giờ làm việc của bộ phận Chăm sóc Khách hàng là Thứ Hai - Thứ Sáu, từ 8:00 sáng đến 6:00 chiều EST. Có thể mất tối đa 1-2 ngày để phản hồi tin nhắn của bạn nếu gửi trong giờ làm việc thông thường.'
              : 'Customer Support business hours are Mon-Fri 8am - 6pm EST. It may take up to 1-2 days to respond to your message if it was sent during regular business hours.'}
          </Typography>
        </DialogContent>

        {/* 2 Nút hành động: Cancel & Send */}
        <DialogActions sx={{ p: 0, mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenSupportModal(false);
              setSupportMessage('');
            }}
            sx={{
              borderRadius: 50,
              py: 1.1,
              borderColor: '#111',
              color: '#111',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
              fontFamily: APP_FONT_FAMILY,
              '&:hover': { borderColor: '#111', backgroundColor: 'rgba(0,0,0,0.04)' },
            }}
          >
            {isVi ? 'Hủy' : 'Cancel'}
          </Button>

          <Button
            variant="contained"
            disableElevation
            disabled={!supportMessage.trim()}
            onClick={handleSendSupportMessage}
            sx={{
              borderRadius: 50,
              py: 1.1,
              backgroundColor: '#111',
              color: '#fff',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
              fontFamily: APP_FONT_FAMILY,
              '&:disabled': {
                backgroundColor: '#e0e0e0',
                color: '#9e9e9e',
              },
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            {isVi ? 'Gửi' : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Toast thành công */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            borderRadius: '14px',
            fontFamily: APP_FONT_FAMILY,
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            fontSize: '13px',
            fontWeight: 600,
            backgroundColor: '#111',
            color: '#fff',
            '& .MuiAlert-icon': { color: '#4caf50' },
          }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}