import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import doctorAprilJewell from '../assets/doctor-april-jewell.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function AppointmentDetailPage() {
  const navigate = useNavigate();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();

  const isVi = language === 'vi';
  const pdfUrl = '/sample-after-visit-summary.pdf';

  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setOpenMessageModal(false);
    setMessageText('');
    setToastOpen(true);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* 1. Header trên cùng */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3.5,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => navigate('/appointments')}
          size="small"
          sx={{
            color: '#111',
            p: 1,
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: '#111',
            fontSize: '18px',
            fontFamily: APP_FONT_FAMILY,
          }}
        >
          {isVi ? 'Chi tiết lịch hẹn' : 'Appointment'}
        </Typography>

        <IconButton
          onClick={handleOpenLangMenu}
          sx={{
            width: 36,
            height: 36,
            backgroundColor: '#d81b60',
            color: '#111',
            border: '1.5px solid #111',
            borderRadius: '10px',
            padding: '6px',
            transition: 'transform 0.15s',
            '&:hover': { backgroundColor: '#c2185b', transform: 'scale(1.05)' },
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </IconButton>
      </Box>

      {/* 2. Khối nội dung chính căn giữa */}
      <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* THẺ 1: Chi tiết buổi hẹn */}
        <Card
          sx={{
            p: { xs: 2.5, md: '28px 32px' },
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #eee',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '16px',
                color: '#111',
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {isVi ? 'Tái khám PrEP định kỳ' : 'PrEP Quarterly'}
            </Typography>

            <Chip
              label={isVi ? 'HOÀN THÀNH' : 'COMPLETE'}
              size="small"
              sx={{
                backgroundColor: '#43a047',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '10px',
                height: 22,
                borderRadius: '6px',
                px: 0.5,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '13px', color: '#555', fontFamily: APP_FONT_FAMILY }}>
              {isVi ? '10 Tháng 3, 2026 lúc 03:26' : 'March 10, 2026 at 3:26 AM'}
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
              {isVi ? 'Thứ Ba' : 'Tuesday'}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: '13px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
            {isVi ? 'Buổi khám đã hoàn tất.' : 'The appointment was completed.'}
          </Typography>

          <Button
            variant="contained"
            disableElevation
            onClick={() => window.open(pdfUrl, '_blank')}
            startIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            }
            sx={{
              backgroundColor: '#111',
              color: '#fff',
              borderRadius: 50,
              py: 1.2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px',
              fontFamily: APP_FONT_FAMILY,
              mt: 1,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            {isVi ? 'Xem bản tóm tắt sau buổi khám' : 'View After Visit Summary'}
          </Button>
        </Card>

        {/* THẺ 2: Bác sĩ điều trị */}
        <Card
          sx={{
            p: { xs: 2.5, md: '28px 32px' },
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #eee',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#666">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <Typography
              sx={{
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#666',
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {isVi ? 'Bác sĩ phụ trách' : 'Healthcare Provider'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
            <Avatar
              src={doctorAprilJewell}
              alt="April Jewell"
              sx={{ width: 48, height: 48, borderRadius: '50%' }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#222',
                  fontWeight: 700,
                  fontFamily: APP_FONT_FAMILY,
                  lineHeight: 1.3,
                }}
              >
                April Jewell, APRN, AAHIVS
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#888',
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                {isVi ? 'Bác sĩ chuyên khoa' : 'She/Her'}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            onClick={() => setOpenMessageModal(true)}
            startIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
            sx={{
              borderRadius: 50,
              py: 1,
              borderColor: '#ddd',
              color: '#333',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '13.5px',
              fontFamily: APP_FONT_FAMILY,
              '&:hover': { borderColor: '#111', backgroundColor: 'rgba(0,0,0,0.02)' },
            }}
          >
            {isVi ? 'Nhắn tin' : 'Message'}
          </Button>
        </Card>
      </Box>

      {/* Pop-up Message Provider */}
      <Dialog
        open={openMessageModal}
        onClose={() => setOpenMessageModal(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '24px',
              p: { xs: 2.5, sm: '28px 32px' },
              fontFamily: APP_FONT_FAMILY,
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '18px',
            color: '#111',
            p: 0,
            mb: 2.5,
            fontFamily: APP_FONT_FAMILY,
          }}
        >
          {isVi ? 'Nhắn tin cho Bác sĩ' : 'Message Provider'}
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              src={doctorAprilJewell}
              alt="April Jewell"
              sx={{ width: 40, height: 40, borderRadius: '50%' }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#222',
                  lineHeight: 1.2,
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                April Jewell, APRN, AAHIVS
              </Typography>
              <Typography
                sx={{
                  fontSize: '11.5px',
                  color: '#888',
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                {isVi ? 'Bác sĩ chuyên khoa' : 'She/Her'}
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder={isVi ? 'Nhập nội dung tin nhắn...' : 'Write something...'}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                fontFamily: APP_FONT_FAMILY,
                fontSize: '14px',
                borderColor: '#111',
                '& fieldset': {
                  borderColor: '#222',
                  borderWidth: '1.5px',
                },
                '&:hover fieldset': {
                  borderColor: '#000',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#000',
                  borderWidth: '1.8px',
                },
              },
            }}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mt: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                color: '#666',
                lineHeight: 1.45,
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {isVi
                ? 'Chúng tôi làm việc từ Thứ Hai đến Thứ Sáu, 8h - 18h EST. Thời gian phản hồi có thể mất 1-2 ngày trong giờ làm việc.'
                : 'We are available Monday to Friday, 8am - 6pm EST. Responses may take 1-2 days during business hours.'}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                fontSize: '11px',
                color: '#666',
                lineHeight: 1.45,
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {isVi
                ? 'Đối với các trường hợp khẩn cấp, vui lòng đến phòng cấp cứu gần nhất hoặc liên hệ ngay với cơ sở y tế ban đầu của bạn. Bạn cũng có thể liên hệ với đội ngũ Hỗ trợ khách hàng trong giờ làm việc để được giải đáp.'
                : 'For urgent issues, please go to the emergency room or contact your primary care provider immediately. You can also reach our Customer Support team during business hours for assistance.'}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 0,
            mt: 3,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => setOpenMessageModal(false)}
            sx={{
              borderRadius: 50,
              py: 1.1,
              borderColor: '#e0e0e0',
              color: '#111',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
              fontFamily: APP_FONT_FAMILY,
              '&:hover': {
                borderColor: '#111',
                backgroundColor: 'rgba(0,0,0,0.03)',
              },
            }}
          >
            {isVi ? 'Hủy' : 'Cancel'}
          </Button>

          <Button
            variant="contained"
            disableElevation
            disabled={!messageText.trim()}
            onClick={handleSendMessage}
            sx={{
              borderRadius: 50,
              py: 1.1,
              backgroundColor: messageText.trim() ? '#111' : '#e0e0e0',
              color: messageText.trim() ? '#fff' : '#9e9e9e',
              fontWeight: 700,
              fontSize: '14px',
              textTransform: 'none',
              fontFamily: APP_FONT_FAMILY,
              '&:hover': {
                backgroundColor: messageText.trim() ? '#333' : '#e0e0e0',
              },
              '&.Mui-disabled': {
                backgroundColor: '#e6e6e6',
                color: '#aaa',
              },
            }}
          >
            {isVi ? 'Gửi' : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>

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
          {isVi
            ? 'Tin nhắn đã được gửi đến Bác sĩ April Jewell thành công.'
            : 'Message sent to provider April Jewell successfully.'}
        </Alert>
      </Snackbar>
    </Box>
  );
}