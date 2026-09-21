import {
  Box,
  Typography,
  Card,
  Chip,
  IconButton,
} from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

interface AssessmentItem {
  id: string;
  titleEn: string;
  titleVi: string;
  encounterId: string;
  dateEn: string;
  dateVi: string;
  status: 'REVIEWED' | 'PENDING';
}

interface AssessmentGroup {
  dateEn: string;
  dateVi: string;
  items: AssessmentItem[];
}

const ASSESSMENT_GROUPS: AssessmentGroup[] = [
  {
    dateEn: 'Mar 9, 2026',
    dateVi: '9 Tháng 3, 2026',
    items: [
      {
        id: 'asm-1',
        titleEn: 'Quarterly Renewal Health Assessment',
        titleVi: 'Đánh giá sức khỏe tái khám định kỳ 3 tháng',
        encounterId: '2486947',
        dateEn: 'Mar 9, 2026',
        dateVi: '9 Tháng 3, 2026',
        status: 'REVIEWED',
      },
    ],
  },
  {
    dateEn: 'Dec 22, 2025',
    dateVi: '22 Tháng 12, 2025',
    items: [
      {
        id: 'asm-2',
        titleEn: 'Quarterly Renewal Health Assessment',
        titleVi: 'Đánh giá sức khỏe tái khám định kỳ 3 tháng',
        encounterId: '2465872',
        dateEn: 'Dec 22, 2025',
        dateVi: '22 Tháng 12, 2025',
        status: 'REVIEWED',
      },
    ],
  },
  {
    dateEn: 'Oct 28, 2025',
    dateVi: '28 Tháng 10, 2025',
    items: [
      {
        id: 'asm-3',
        titleEn: 'STI Health Assessment',
        titleVi: 'Bảng đánh giá nguy cơ & triệu chứng STI',
        encounterId: '2451041',
        dateEn: 'Oct 28, 2025',
        dateVi: '28 Tháng 10, 2025',
        status: 'REVIEWED',
      },
    ],
  },
  {
    dateEn: 'Oct 24, 2025',
    dateVi: '24 Tháng 10, 2025',
    items: [
      {
        id: 'asm-4',
        titleEn: 'PrEP Initial Post Encounter Med Assessment',
        titleVi: 'Khảo sát sau buổi khám khởi động PrEP',
        encounterId: '2447440',
        dateEn: 'Oct 24, 2025',
        dateVi: '24 Tháng 10, 2025',
        status: 'REVIEWED',
      },
    ],
  },
];

export default function AssessmentsPage() {
  const navigate = useNavigate();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();
  const isVi = language === 'vi';

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
          {isVi ? 'Đánh giá sức khỏe' : 'Assessments'}
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
          ? 'Hoàn thành các bài kiểm tra sức khỏe nhanh giúp đội ngũ y tế cung cấp cho bạn phác đồ điều trị cá nhân hóa và hiệu quả nhất.'
          : 'Complete quick health check-ins that help your care team provide you with personalized, effective treatment.'}
      </Typography>

      <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        {ASSESSMENT_GROUPS.map((group, groupIdx) => (
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
                  onClick={() => navigate(`/health/assessments/${item.id}`)}
                  sx={{
                    p: '18px 24px',
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="20" x2="18" y2="10" />
                          <line x1="12" y1="20" x2="12" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                        <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                          {isVi ? item.titleVi : item.titleEn}
                        </Typography>
                      </Box>

                      <Typography variant="caption" sx={{ color: '#777', fontSize: '12px', pl: 3.5, fontFamily: APP_FONT_FAMILY }}>
                        Encounter ID: {item.encounterId}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.8 }}>
                      <Chip
                        label="REVIEWED"
                        size="small"
                        sx={{
                          backgroundColor: '#43a047',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '9.5px',
                          height: 22,
                          borderRadius: '6px',
                          px: 0.5,
                        }}
                      />

                      <Typography sx={{ fontSize: '12px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
                        {isVi ? item.dateVi : item.dateEn}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}