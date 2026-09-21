import {
  Box,
  Typography,
  Card,
  Chip,
  Button,
  IconButton,
} from '@mui/material';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function LabResultDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();
  const isVi = language === 'vi';

  // Trạng thái ORDERED (RB-019) nếu id = 'lab-1' hoặc 'ordered', ngược lại là READY (RB-018)
  const isOrderedStatus = id === 'lab-1' || id === 'ordered';

  // Mở file PDF trực tiếp sang 1 tab mới của trình duyệt
  const handleOpenPdfNewTab = () => {
    window.open('/sample-after-visit-summary.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* 1. Header trên cùng: Back button + Tiêu đề Lab + Nút ngôn ngữ */}
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
          onClick={() => navigate('/health/labs')}
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
          {isVi ? 'Chi tiết Xét nghiệm' : 'Lab'}
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

      {/* 2. Container nội dung căn giữa */}
      <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        {/* THẺ 1: HEADER THÔNG TIN (ORDERED HOẶC READY) */}
        <Card
          sx={{
            p: '22px 26px',
            borderRadius: '18px',
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            borderLeft: isOrderedStatus ? '4px solid #0288d1' : '4px solid #43a047',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2v2h1v9.88L3.21 20.08c-.78 1.15-.49 2.72.66 3.5.38.26.83.42 1.3.42h13.66c1.38 0 2.5-1.12 2.5-2.5 0-.47-.14-.92-.4-1.3L17 13.88V4h1V2H6zm3 4h6v7.35l3.22 5.65H5.78L9 13.35V6z" />
              </svg>
              <Typography sx={{ fontWeight: 800, fontSize: '15px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                Quest
              </Typography>
            </Box>

            <Chip
              label={isOrderedStatus ? 'ORDERED' : 'READY'}
              size="small"
              sx={{
                backgroundColor: isOrderedStatus ? '#0288d1' : '#43a047',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '10px',
                height: 22,
                borderRadius: '6px',
                px: 0.5,
              }}
            />
          </Box>

          <Typography sx={{ fontSize: '13.5px', color: '#555', fontFamily: APP_FONT_FAMILY, mb: 1 }}>
            PrEP Quarterly
          </Typography>

          {isOrderedStatus ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenPdfNewTab}
                sx={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  borderRadius: 50,
                  px: 3,
                  py: 0.8,
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontFamily: APP_FONT_FAMILY,
                  '&:hover': { backgroundColor: '#333333' },
                }}
              >
                {isVi ? 'Mở phiếu yêu cầu' : 'Open Order'}
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Typography sx={{ fontSize: '12px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Ngày nhận:' : 'Date Received:'}{' '}
                <strong style={{ color: '#222' }}>{isVi ? '14 Tháng 1, 2026' : 'Jan 14, 2026'}</strong>
              </Typography>

              <Typography sx={{ fontSize: '12px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Kết quả dương tính:' : 'Positive Results:'}{' '}
                <strong style={{ color: '#222' }}>Negative</strong>
              </Typography>
            </Box>
          )}
        </Card>

        {/* THẺ 2: FILES */}
        <Card
          sx={{
            p: '22px 26px',
            borderRadius: '18px',
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
            <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
              Files
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Order Document */}
            <Box>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', mb: 0.8, fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Phiếu chỉ định' : 'Order Document'}
              </Typography>
              <Box
                onClick={handleOpenPdfNewTab}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 2,
                  py: 0.6,
                  borderRadius: 50,
                  border: '1px solid #222',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#111', fontFamily: APP_FONT_FAMILY }}>
                  {isOrderedStatus ? 'QuestOrder_20260309_.pdf' : 'QuestOrder_20251222_.pdf'}
                </Typography>
              </Box>
            </Box>

            {/* Results (Chỉ hiện khi trạng thái READY) */}
            {!isOrderedStatus && (
              <Box>
                <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', mb: 0.8, fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Tệp kết quả' : 'Results'}
                </Typography>
                <Box
                  onClick={handleOpenPdfNewTab}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 2,
                    py: 0.6,
                    borderRadius: 50,
                    backgroundColor: '#111111',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      backgroundColor: '#333333',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', fontFamily: APP_FONT_FAMILY }}>
                    Result(Needs Review)_20260113_3224125.pdf
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Card>

        {/* THẺ 3: OBSERVATIONS (ẨN ĐI Ở TRẠNG THÁI ORDERED - RB-019) */}
        {!isOrderedStatus && (
          <Card
            sx={{
              p: '22px 26px',
              borderRadius: '18px',
              backgroundColor: '#ffffff',
              border: '1px solid #eeeeee',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                Observations
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: APP_FONT_FAMILY }}>
                  CREATININE
                </Typography>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                  1.09
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: APP_FONT_FAMILY }}>
                  EGFR
                </Typography>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                  87
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: APP_FONT_FAMILY }}>
                  HIV FINAL INTERPRETATION
                </Typography>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                  HIV NEGATIVE
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: APP_FONT_FAMILY }}>
                  HIV1/AG/AB, SCREEN
                </Typography>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                  NON-REACTIVE
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: APP_FONT_FAMILY }}>
                  RPR (DX) W/REFL TITER AND CONFIRMATORY TESTING
                </Typography>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                  NON-REACTIVE
                </Typography>
              </Box>
            </Box>
          </Card>
        )}

        {/* THẺ 4: DETAILS */}
        <Card
          sx={{
            p: '22px 26px',
            borderRadius: '18px',
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
              Details
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Mã chỉ định (Requisition ID)' : 'Requisition ID'}
              </Typography>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                {isOrderedStatus ? '3505719' : '3224125'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Trạng thái' : 'Status'}
              </Typography>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                {isOrderedStatus ? 'Pending' : 'Received'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Ngày chỉ định' : 'Date Ordered'}
              </Typography>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                {isOrderedStatus ? 'Mar 9, 2026' : 'Dec 22, 2025'}
              </Typography>
            </Box>

            {!isOrderedStatus && (
              <Box>
                <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Ngày nhận mẫu' : 'Date Received'}
                </Typography>
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222', mt: 0.3, fontFamily: APP_FONT_FAMILY }}>
                  Jan 14, 2026
                </Typography>
              </Box>
            )}

            <Box>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Các danh mục kiểm tra' : 'Panels'}
              </Typography>
              <Typography sx={{ fontSize: '12.5px', fontWeight: 500, color: '#333', mt: 0.3, lineHeight: 1.5, fontFamily: APP_FONT_FAMILY }}>
                {isOrderedStatus
                  ? 'CREATININE, CT/GC RNA,TMA,UROGEN, HIV1/2 AG/AB,4 W/RFL, RPR (Diagnosis), reflex Titer and Ab'
                  : 'CREATININE, HIV1/2 AG/AB, 4TH/RFL, RPR (Diagnosis), w/Reflex Titer and Ab'}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}