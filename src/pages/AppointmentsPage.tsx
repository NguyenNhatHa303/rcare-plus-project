import { Box, Typography, Card, Avatar, Chip, IconButton } from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';
import doctorAprilJewell from '../assets/doctor-april-jewell.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

interface AppointmentItem {
  id: string;
  dateGroupEn: string;
  dateGroupVi: string;
  titleEn: string;
  titleVi: string;
  doctorName: string;
  doctorRole: string;
  doctorPronounsEn: string;
  doctorPronounsVi: string;
  fullTimeEn: string;
  fullTimeVi: string;
  dayOfWeekEn: string;
  dayOfWeekVi: string;
  status: 'COMPLETE';
}

const APPOINTMENTS_DATA: AppointmentItem[] = [
  {
    id: 'apt-1',
    dateGroupEn: 'Mar 10, 2026',
    dateGroupVi: '10 Tháng 3, 2026',
    titleEn: 'PrEP Quarterly',
    titleVi: 'Tái khám PrEP định kỳ',
    doctorName: 'April Jewell',
    doctorRole: 'APRN, AAHIVS',
    doctorPronounsEn: 'She/Her',
    doctorPronounsVi: 'Bác sĩ chuyên khoa',
    fullTimeEn: 'March 10, 2026 at 3:26 AM',
    fullTimeVi: '10 Tháng 3, 2026 lúc 03:26',
    dayOfWeekEn: 'Tuesday',
    dayOfWeekVi: 'Thứ Ba',
    status: 'COMPLETE',
  },
  {
    id: 'apt-2',
    dateGroupEn: 'Jan 24, 2026',
    dateGroupVi: '24 Tháng 1, 2026',
    titleEn: 'PrEP Quarterly',
    titleVi: 'Tái khám PrEP định kỳ',
    doctorName: 'April Jewell',
    doctorRole: 'APRN, AAHIVS',
    doctorPronounsEn: 'She/Her',
    doctorPronounsVi: 'Bác sĩ chuyên khoa',
    fullTimeEn: 'January 24, 2026 at 5:42 AM',
    fullTimeVi: '24 Tháng 1, 2026 lúc 05:42',
    dayOfWeekEn: 'Saturday',
    dayOfWeekVi: 'Thứ Bảy',
    status: 'COMPLETE',
  },
  {
    id: 'apt-3',
    dateGroupEn: 'Jan 23, 2026',
    dateGroupVi: '23 Tháng 1, 2026',
    titleEn: 'PrEP Quarterly',
    titleVi: 'Tái khám PrEP định kỳ',
    doctorName: 'April Jewell',
    doctorRole: 'APRN, AAHIVS',
    doctorPronounsEn: 'She/Her',
    doctorPronounsVi: 'Bác sĩ chuyên khoa',
    fullTimeEn: 'January 23, 2026 at 7:33 AM',
    fullTimeVi: '23 Tháng 1, 2026 lúc 07:33',
    dayOfWeekEn: 'Friday',
    dayOfWeekVi: 'Thứ Sáu',
    status: 'COMPLETE',
  },
  {
    id: 'apt-4',
    dateGroupEn: 'Jan 15, 2026',
    dateGroupVi: '15 Tháng 1, 2026',
    titleEn: 'PrEP Quarterly',
    titleVi: 'Tái khám PrEP định kỳ',
    doctorName: 'April Jewell',
    doctorRole: 'APRN, AAHIVS',
    doctorPronounsEn: 'She/Her',
    doctorPronounsVi: 'Bác sĩ chuyên khoa',
    fullTimeEn: 'January 15, 2026 at 4:15 AM',
    fullTimeVi: '15 Tháng 1, 2026 lúc 04:15',
    dayOfWeekEn: 'Thursday',
    dayOfWeekVi: 'Thứ Năm',
    status: 'COMPLETE',
  },
];

export default function AppointmentsPage() {
  const navigate = useNavigate();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();

  const isVi = language === 'vi';

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* 1. Header trên cùng */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1.5,
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
          {isVi ? 'Lịch hẹn' : 'Appointments'}
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

      {/* 2. Dòng mô tả căn giữa */}
      <Typography
        variant="body2"
        sx={{
          color: '#777',
          textAlign: 'center',
          mb: 4,
          fontSize: '13px',
          fontFamily: APP_FONT_FAMILY,
          maxWidth: 720,
          mx: 'auto',
        }}
      >
        {isVi
          ? 'Lên lịch hẹn, tham gia cuộc gọi video và theo dõi tất cả các lịch hẹn chăm sóc sức khỏe của bạn tại một nơi thuận tiện.'
          : 'Schedule visits, join video calls, and keep track of all your healthcare appointments in one convenient place.'}
      </Typography>

      {/* 3. Danh sách cuộc hẹn */}
      <Box sx={{ maxWidth: 860, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        {APPOINTMENTS_DATA.map((item) => (
          <Box key={item.id}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: '13.5px',
                color: '#111',
                mb: 1.2,
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {isVi ? item.dateGroupVi : item.dateGroupEn}
            </Typography>

            <Card
              onClick={() => navigate(`/appointments/${item.id}`)}
              sx={{
                p: '20px 24px',
                borderRadius: '16px',
                backgroundColor: '#ffffff',
                border: '1px solid #eeeeee',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.8,
                cursor: 'pointer',
                transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                  borderColor: '#ddd',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '14.5px',
                    color: '#111',
                    fontFamily: APP_FONT_FAMILY,
                  }}
                >
                  {isVi ? item.titleVi : item.titleEn}
                </Typography>

                <Chip
                  label={isVi ? 'HOÀN THÀNH' : item.status}
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

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  src={doctorAprilJewell}
                  alt={item.doctorName}
                  sx={{ width: 42, height: 42, borderRadius: '50%' }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: '12.5px',
                      color: '#333',
                      fontWeight: 600,
                      fontFamily: APP_FONT_FAMILY,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.doctorName}, {item.doctorRole}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '11px',
                      color: '#888',
                      fontFamily: APP_FONT_FAMILY,
                    }}
                  >
                    {isVi ? item.doctorPronounsVi : item.doctorPronounsEn}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#666',
                    fontFamily: APP_FONT_FAMILY,
                  }}
                >
                  {isVi ? item.fullTimeVi : item.fullTimeEn}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#777',
                    fontFamily: APP_FONT_FAMILY,
                  }}
                >
                  {isVi ? item.dayOfWeekVi : item.dayOfWeekEn}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}