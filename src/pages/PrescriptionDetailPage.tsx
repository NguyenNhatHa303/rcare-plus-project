import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import doctorAvatarImg from '../assets/doctor-april-jewell.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function PrescriptionDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();
  const isVi = language === 'vi';

  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const prescriptionData = {
    id: id || 'rx-1',
    name: id === 'rx-2' ? 'Doxycycline hyclate 100 mg capsule' : 'Descovy 200 mg-25 mg tablet',
    fillsTotal: id === 'rx-2' ? '1 fill total' : '3 fills total',
    fillsTotalVi: id === 'rx-2' ? 'Tổng cộng 1 lần cấp' : 'Tổng cộng 3 lần cấp',
    perFill: id === 'rx-2' ? '90 per fill' : '30 per fill',
    pharmacyName: 'Crown Specialty Pharmacy',
    pharmacyAddress: 'Redford, MI, 48239',
    pharmacyPhone: '3135323784',
    providerName: 'April Jewell, APRN, AAHIVS',
    providerPronouns: 'She/Her',
    submittedDateEn: id === 'rx-3' ? 'January 23, 2026' : 'March 10, 2026',
    submittedDateVi: id === 'rx-3' ? '23 Tháng 1, 2026' : '10 Tháng 3, 2026',
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setOpenMessageModal(false);
    setMessageText('');
    setToastMsg(
      isVi
        ? 'Tin nhắn của bạn đã được gửi tới bác sĩ phụ trách.'
        : 'Your message has been sent to your provider.'
    );
    setToastOpen(true);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
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
          onClick={() => navigate('/health/prescriptions')}
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
          {isVi ? 'Chi tiết đơn thuốc' : 'Prescription'}
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

      <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.2 }}>
        <Card
          sx={{
            p: '22px 26px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                <path d="m8.5 8.5 7 7" />
              </svg>
              <Typography sx={{ fontWeight: 800, fontSize: '14.5px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                {prescriptionData.name}
              </Typography>
            </Box>

            <Chip
              label="SENT TO PHARMACY"
              size="small"
              sx={{
                backgroundColor: '#0288d1',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '9.5px',
                height: 22,
                borderRadius: '6px',
                px: 0.5,
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
              {isVi ? prescriptionData.fillsTotalVi : prescriptionData.fillsTotal}
            </Typography>
            <Typography sx={{ fontSize: '12px', color: '#888', fontFamily: APP_FONT_FAMILY }}>
              {prescriptionData.perFill}
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', fontFamily: APP_FONT_FAMILY }}>
            {isVi
              ? 'Nhà thuốc của bạn có thể xác nhận còn bao nhiêu lần cấp phát tiếp theo'
              : 'Your pharmacy can confirm how many refills are left'}
          </Typography>
        </Card>

        <Card
          sx={{
            p: '22px 26px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
              Pharmacy
            </Typography>
          </Box>

          <Box sx={{ pl: 0.5 }}>
            <Typography sx={{ fontSize: '13.5px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
              {prescriptionData.pharmacyName}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '12px', display: 'block', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
              {prescriptionData.pharmacyAddress}
            </Typography>
            <Typography
              component="a"
              href={`tel:${prescriptionData.pharmacyPhone}`}
              sx={{
                color: '#e91e63',
                fontSize: '12.5px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                mt: 0.4,
                fontFamily: APP_FONT_FAMILY,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Phone: {prescriptionData.pharmacyPhone}
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            p: '22px 26px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.8,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
              Prescribing Provider
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 0.5 }}>
            <Avatar
              src={doctorAvatarImg}
              alt={prescriptionData.providerName}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                border: '1px solid #eee',
                objectFit: 'cover',
              }}
            />
            <Box>
              <Typography sx={{ fontSize: '13.5px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
                {prescriptionData.providerName}
              </Typography>
              <Typography variant="caption" sx={{ color: '#777', fontSize: '12px', fontFamily: APP_FONT_FAMILY }}>
                {prescriptionData.providerPronouns}
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => setOpenMessageModal(true)}
            startIcon={
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
            sx={{
              borderRadius: 50,
              py: 0.9,
              borderColor: '#222',
              color: '#111',
              fontWeight: 700,
              fontSize: '13.5px',
              textTransform: 'none',
              fontFamily: APP_FONT_FAMILY,
              '&:hover': {
                borderColor: '#000',
                backgroundColor: 'rgba(0,0,0,0.03)',
              },
            }}
          >
            {isVi ? 'Nhắn tin cho bác sĩ' : 'Message'}
          </Button>
        </Card>

        <Card
          sx={{
            p: '22px 26px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
              Date Prescription Submitted
            </Typography>
          </Box>

          <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#333', pl: 0.5, fontFamily: APP_FONT_FAMILY }}>
            {isVi ? prescriptionData.submittedDateVi : prescriptionData.submittedDateEn}
          </Typography>
        </Card>
      </Box>

      <Dialog
        open={openMessageModal}
        onClose={() => setOpenMessageModal(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '24px',
              p: { xs: 2.5, sm: '32px 36px' },
              fontFamily: APP_FONT_FAMILY,
              backgroundColor: '#ffffff',
              boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
            },
          },
        }}
      >
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
          {isVi ? 'Nhắn tin cho Bác sĩ' : 'Message Provider'}
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              src={doctorAvatarImg}
              alt={prescriptionData.providerName}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '14px',
                border: '1px solid #eee',
                objectFit: 'cover',
              }}
            />
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
                {prescriptionData.providerName}
              </Typography>
              <Typography variant="caption" sx={{ color: '#777', fontSize: '12px', fontFamily: APP_FONT_FAMILY }}>
                {prescriptionData.providerPronouns}
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder={isVi ? 'Viết nội dung tin nhắn...' : 'Write something...'}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mt: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '11.5px', lineHeight: 1.45, fontFamily: APP_FONT_FAMILY }}>
              {isVi
                ? 'Chúng tôi làm việc từ Thứ Hai đến Thứ Sáu, 8:00 sáng - 6:00 chiều EST. Thời gian phản hồi trong vòng 1-2 ngày làm việc.'
                : 'We are available Monday to Friday, 8am - 6pm EST. Responses may take 1-2 days during business hours.'}
            </Typography>

            <Typography variant="caption" sx={{ color: '#666', fontSize: '11.5px', lineHeight: 1.45, fontFamily: APP_FONT_FAMILY }}>
              {isVi
                ? 'Đối với các trường hợp khẩn cấp, vui lòng đến phòng cấp cứu hoặc liên hệ trực tiếp với cơ sở y tế gần nhất. Bạn cũng có thể liên hệ tổng đài Hỗ trợ Khách hàng trong giờ làm việc để được hỗ trợ.'
                : 'For urgent issues, please go to the emergency room or contact your primary care provider immediately. You can also reach our Customer Support team during business hours for assistance.'}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 0, mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpenMessageModal(false);
              setMessageText('');
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
            disabled={!messageText.trim()}
            onClick={handleSendMessage}
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