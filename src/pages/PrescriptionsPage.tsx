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
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

interface PrescriptionItem {
  id: string;
  name: string;
  provider: string;
  dateEn: string;
  dateVi: string;
  fillsTotal: string;
  fillsTotalVi: string;
  perFill: string;
  pharmacyName: string;
  pharmacyPhone: string;
}

interface PrescriptionGroup {
  dateEn: string;
  dateVi: string;
  items: PrescriptionItem[];
}

const PRESCRIPTION_GROUPS: PrescriptionGroup[] = [
  {
    dateEn: 'Mar 10, 2026',
    dateVi: '10 Tháng 3, 2026',
    items: [
      {
        id: 'rx-1',
        name: 'Descovy 200 mg-25 mg tablet',
        provider: 'April Jewell, APRN, AAHIVS',
        dateEn: 'Mar 10, 2026',
        dateVi: '10 Tháng 3, 2026',
        fillsTotal: '3 fills total',
        fillsTotalVi: 'Tổng cộng 3 lần cấp',
        perFill: '30 per fill',
        pharmacyName: 'Crown Specialty Pharmacy',
        pharmacyPhone: '(313) 532-3784',
      },
      {
        id: 'rx-2',
        name: 'Doxycycline hyclate 100 mg capsule',
        provider: 'April Jewell, APRN, AAHIVS',
        dateEn: 'Mar 10, 2026',
        dateVi: '10 Tháng 3, 2026',
        fillsTotal: '1 fill total',
        fillsTotalVi: 'Tổng cộng 1 lần cấp',
        perFill: '90 per fill',
        pharmacyName: 'Crown Specialty Pharmacy',
        pharmacyPhone: '(313) 532-3784',
      },
    ],
  },
  {
    dateEn: 'Jan 23, 2026',
    dateVi: '23 Tháng 1, 2026',
    items: [
      {
        id: 'rx-3',
        name: 'Descovy 200 mg-25 mg tablet',
        provider: 'April Jewell, APRN, AAHIVS',
        dateEn: 'Jan 23, 2026',
        dateVi: '23 Tháng 1, 2026',
        fillsTotal: '1 fill total',
        fillsTotalVi: 'Tổng cộng 1 lần cấp',
        perFill: '90 per fill',
        pharmacyName: 'Crown Specialty Pharmacy',
        pharmacyPhone: '(313) 532-3784',
      },
    ],
  },
];

export default function PrescriptionsPage() {
  const navigate = useNavigate();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();
  const isVi = language === 'vi';

  const [callModalData, setCallModalData] = useState<{
    pharmacyName: string;
    phone: string;
  } | null>(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleOpenCallModal = (e: React.MouseEvent, pharmacyName: string, phone: string) => {
    e.stopPropagation();
    setCallModalData({ pharmacyName, phone });
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setToastMsg(isVi ? `Đã sao chép số điện thoại: ${phone}` : `Copied phone number: ${phone}`);
    setToastOpen(true);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => navigate('/health')}
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
          {isVi ? 'Đơn thuốc' : 'Prescriptions'}
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

      <Typography
        variant="body2"
        sx={{
          color: '#555',
          textAlign: 'center',
          fontSize: '13px',
          maxWidth: 780,
          mx: 'auto',
          mb: 4,
          lineHeight: 1.5,
          fontFamily: APP_FONT_FAMILY,
        }}
      >
        {isVi
          ? 'Quản lý đơn thuốc của bạn một cách dễ dàng — theo dõi số lần cấp phát, tình trạng giao hàng và duy trì thói quen chăm sóc sức khỏe.'
          : 'Manage your medications with ease - track refills, delivery status, and stay on top of your health routine.'}
      </Typography>

      <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        {PRESCRIPTION_GROUPS.map((group, groupIdx) => (
          <Box key={groupIdx}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '13.5px',
                color: '#111',
                mb: 1.2,
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {isVi ? group.dateVi : group.dateEn}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {group.items.map((item) => (
                <Card
                  key={item.id}
                  onClick={() => navigate(`/health/prescriptions/${item.id}`)}
                  sx={{
                    p: '20px 24px',
                    borderRadius: '16px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #eeeeee',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    '&:hover': {
                      borderColor: '#ccc',
                      boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.5 20.5l10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                        <path d="m8.5 8.5 7 7" />
                      </svg>
                      <Typography sx={{ fontWeight: 800, fontSize: '14.5px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                        {item.name}
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
                    <Typography sx={{ fontSize: '12.5px', color: '#555', fontFamily: APP_FONT_FAMILY }}>
                      {item.provider}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
                      {isVi ? item.dateVi : item.dateEn}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
                      {isVi ? item.fillsTotalVi : item.fillsTotal}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: '#888', fontFamily: APP_FONT_FAMILY }}>
                      {item.perFill}
                    </Typography>
                  </Box>

                  <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', fontFamily: APP_FONT_FAMILY }}>
                    {isVi
                      ? 'Nhà thuốc của bạn có thể xác nhận còn bao nhiêu lần cấp phát tiếp theo'
                      : 'Your pharmacy can confirm how many refills are left'}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: '12px 16px',
                      backgroundColor: '#f9f9f9',
                      borderRadius: '12px',
                      border: '1px solid #f0f0f0',
                      mt: 0.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      <Box>
                        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
                          {item.pharmacyName}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '11.5px', fontFamily: APP_FONT_FAMILY }}>
                          {item.pharmacyPhone}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      variant="outlined"
                      onClick={(e) => handleOpenCallModal(e, item.pharmacyName, item.pharmacyPhone)}
                      sx={{
                        borderColor: '#222',
                        color: '#111',
                        borderRadius: 50,
                        px: 3,
                        py: 0.5,
                        fontSize: '13px',
                        fontWeight: 700,
                        textTransform: 'none',
                        fontFamily: APP_FONT_FAMILY,
                        '&:hover': {
                          borderColor: '#000',
                          backgroundColor: 'rgba(0,0,0,0.04)',
                        },
                      }}
                    >
                      {isVi ? 'Gọi' : 'Call'}
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Dialog
        open={Boolean(callModalData)}
        onClose={() => setCallModalData(null)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: '24px',
              p: '28px 26px',
              fontFamily: APP_FONT_FAMILY,
              textAlign: 'center',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </Box>
        </Box>

        <DialogTitle sx={{ fontWeight: 800, fontSize: '18px', p: 0, mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
          {isVi ? 'Liên hệ Nhà thuốc' : 'Contact Pharmacy'}
        </DialogTitle>

        <Typography sx={{ fontSize: '13px', color: '#666', mb: 2.5, fontFamily: APP_FONT_FAMILY }}>
          {callModalData?.pharmacyName}
        </Typography>

        <DialogContent sx={{ p: 0, mb: 3 }}>
          <Box
            sx={{
              backgroundColor: '#f8f9fa',
              borderRadius: '16px',
              p: '16px 20px',
              border: '1px dashed #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
            }}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: 800, color: '#111', letterSpacing: '0.5px', fontFamily: APP_FONT_FAMILY }}>
              {callModalData?.phone}
            </Typography>
            <IconButton
              size="small"
              onClick={() => callModalData && handleCopyPhone(callModalData.phone)}
              sx={{ color: '#555', '&:hover': { color: '#111' } }}
              title="Sao chép"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </IconButton>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            component="a"
            href={`tel:${callModalData?.phone.replace(/[^0-9]/g, '')}`}
            sx={{
              backgroundColor: '#111',
              color: '#fff',
              borderRadius: 50,
              py: 1.1,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '14px',
              fontFamily: APP_FONT_FAMILY,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            {isVi ? 'Gọi ngay' : 'Call Now'}
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={() => setCallModalData(null)}
            sx={{
              color: '#666',
              borderRadius: 50,
              py: 0.8,
              textTransform: 'none',
              fontSize: '13px',
              fontFamily: APP_FONT_FAMILY,
            }}
          >
            {isVi ? 'Đóng' : 'Close'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
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