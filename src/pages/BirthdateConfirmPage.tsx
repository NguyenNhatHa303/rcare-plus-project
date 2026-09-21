import { useState, useRef } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  Popover,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import bgPattern from '../assets/bg-pattern.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

const translations = {
  en: {
    welcomePrefix: 'Welcome back',
    subTitle: "Enter your birthdate below so we can confirm it's you",
    dobLabel: 'Date of Birth',
    dobError: 'Please select your birthdate.',
    continueBtn: 'Continue',
    backToLogin: 'Back to Login',
  },
  vi: {
    welcomePrefix: 'Chào mừng trở lại',
    subTitle: 'Nhập ngày sinh của bạn dưới đây để chúng tôi xác thực danh tính',
    dobLabel: 'Ngày sinh',
    dobError: 'Vui lòng chọn ngày sinh của bạn.',
    continueBtn: 'Tiếp tục',
    backToLogin: 'Quay lại Đăng nhập',
  },
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEK_DAYS = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];

// Tạo danh sách năm từ 1920 đến 2026
const YEARS_LIST = Array.from({ length: 2026 - 1920 + 1 }, (_, i) => 1920 + i);

export default function BirthdateConfirmPage() {
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Anchor cho Popover lịch
  const [calendarAnchor, setCalendarAnchor] = useState<HTMLElement | null>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  // Quản lý trạng thái view của Calendar: 'days' hoặc 'years'
  const [viewMode, setViewMode] = useState<'days' | 'years'>('days');
  const [viewYear, setViewYear] = useState<number>(2004);
  const [viewMonth, setViewMonth] = useState<number>(2); // Tháng 3 (index 2)
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const rawInput = location.state?.username || 'Timmy';

  const language: 'en' | 'vi' =
    (location.state?.language as 'en' | 'vi') ||
    (localStorage.getItem('rcare_lang') as 'en' | 'vi') ||
    'vi';

  const t = translations[language];

  const getDisplayName = (input: string) => {
    if (!input) return 'Timmy';
    const namePart = input.includes('@') ? input.split('@')[0] : input;
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  const displayName = getDisplayName(rawInput);

  // Mở Popover Lịch
  const handleOpenCalendar = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (birthdate && birthdate.length === 10) {
      const [m, d, y] = birthdate.split('/').map(Number);
      if (m && d && y) {
        setViewYear(y);
        setViewMonth(m - 1);
        setSelectedDay(d);
      }
    }
    setViewMode('days');
    setCalendarAnchor(inputContainerRef.current);
  };

  const handleCloseCalendar = () => {
    setCalendarAnchor(null);
  };

  // Điều hướng tháng
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Chọn Năm trong Year Grid
  const handleSelectYear = (year: number) => {
    setViewYear(year);
    setViewMode('days');
  };

  // Chọn Ngày
  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const yyyy = String(viewYear);
    const formatted = `${mm}/${dd}/${yyyy}`;

    setBirthdate(formatted);
    if (error) setError(false);
    handleCloseCalendar();
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate || birthdate.length !== 10) {
      setError(true);
      return;
    }
    setError(false);
    navigate('/dashboard', { state: { username: rawInput, birthdate, language } });
  };

  // Tính số ngày và ngày bắt đầu tuần của tháng đang xem
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        fontFamily: APP_FONT_FAMILY,
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: '100%',
          padding: { xs: 3, sm: '42px 40px 36px 40px' },
          borderRadius: 4,
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          fontFamily: APP_FONT_FAMILY,
          backgroundColor: '#fff',
        }}
      >
        {/* Shield Icon */}
        <Box
          sx={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            backgroundColor: '#fde7ef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 4px 14px rgba(216, 27, 96, 0.15)',
          }}
        >
          <svg width="38" height="38" viewBox="0 0 24 24" fill="#111">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
          </svg>
        </Box>

        <Typography
          variant="h5"
          sx={{
            mb: 1,
            color: '#111',
            fontWeight: 800,
            fontFamily: APP_FONT_FAMILY,
            letterSpacing: '-0.3px',
          }}
        >
          {t.welcomePrefix} {displayName},
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3.5,
            fontFamily: APP_FONT_FAMILY,
            fontSize: '14.5px',
          }}
        >
          {t.subTitle}
        </Typography>

        <Box component="form" onSubmit={handleContinue} sx={{ textAlign: 'left', mb: 3 }}>
          <Box ref={inputContainerRef}>
            <TextField
              fullWidth
              label={t.dobLabel}
              placeholder="MM/DD/YYYY"
              value={birthdate}
              error={error}
              helperText={error ? t.dobError : ''}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
                htmlInput: {
                  readOnly: true,
                  style: {
                    cursor: 'pointer',
                    userSelect: 'none',
                  },
                },
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={handleOpenCalendar}
                      edge="end"
                      size="small"
                      sx={{
                        color: '#666',
                        '&:hover': {
                          color: '#d81b60',
                          backgroundColor: 'rgba(216, 27, 96, 0.08)',
                        },
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                      </svg>
                    </IconButton>
                  ),
                },
              }}
              onClick={handleOpenCalendar}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: APP_FONT_FAMILY,
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  '& fieldset': {
                    borderColor: '#111',
                  },
                  '&:hover fieldset': {
                    borderColor: '#111',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#111',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#111',
                },
              }}
            />
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: '#111',
              color: '#fff',
              borderRadius: 50,
              padding: '11px 0',
              textTransform: 'none',
              fontSize: '15px',
              fontWeight: 700,
              fontFamily: APP_FONT_FAMILY,
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            {t.continueBtn}
          </Button>
        </Box>

        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: '#444',
            fontWeight: 500,
            fontSize: '14px',
            fontFamily: APP_FONT_FAMILY,
            '&:hover': {
              color: '#d81b60',
            },
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {t.backToLogin}
        </Link>
      </Card>

      {/* CUSTOM DATEPICKER POPOVER */}
      <Popover
        open={Boolean(calendarAnchor)}
        anchorEl={calendarAnchor}
        onClose={handleCloseCalendar}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              p: 2.5,
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
              border: '1px solid #eee',
              fontFamily: APP_FONT_FAMILY,
              mb: 1,
            },
          },
        }}
      >
        {/* Header: Tháng Năm + Chuyển View hoặc Chuyển Tháng */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Button
            onClick={() => setViewMode((prev) => (prev === 'days' ? 'years' : 'days'))}
            endIcon={
              <span style={{ fontSize: '10px' }}>
                {viewMode === 'days' ? '▼' : '▲'}
              </span>
            }
            sx={{
              textTransform: 'none',
              color: '#222',
              fontWeight: 700,
              fontSize: '15px',
              fontFamily: APP_FONT_FAMILY,
              p: '2px 8px',
              borderRadius: 2,
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            {MONTH_NAMES[viewMonth]} {viewYear}
          </Button>

          {viewMode === 'days' && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="small" onClick={handlePrevMonth}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>&lt;</span>
              </IconButton>
              <IconButton size="small" onClick={handleNextMonth}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>&gt;</span>
              </IconButton>
            </Box>
          )}
        </Box>

        {/* View 1: Year Grid Picker */}
        {viewMode === 'years' ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1.5,
              maxHeight: 250,
              overflowY: 'auto',
              pr: 0.5,
              py: 1,
            }}
          >
            {YEARS_LIST.map((year) => (
              <Button
                key={year}
                onClick={() => handleSelectYear(year)}
                variant={viewYear === year ? 'contained' : 'text'}
                disableElevation
                sx={{
                  fontFamily: APP_FONT_FAMILY,
                  fontSize: '13px',
                  fontWeight: viewYear === year ? 700 : 500,
                  borderRadius: 2,
                  py: 0.8,
                  backgroundColor: viewYear === year ? '#111' : 'transparent',
                  color: viewYear === year ? '#fff' : '#444',
                  '&:hover': {
                    backgroundColor: viewYear === year ? '#333' : '#f0f0f0',
                  },
                }}
              >
                {year}
              </Button>
            ))}
          </Box>
        ) : (
          /* View 2: Days Calendar Picker */
          <Box>
            {/* Hàng thứ trong tuần */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                textAlign: 'center',
                mb: 1.5,
              }}
            >
              {WEEK_DAYS.map((w, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    fontSize: '12px',
                    color: '#888',
                    fontWeight: 600,
                    fontFamily: APP_FONT_FAMILY,
                  }}
                >
                  {w}
                </Typography>
              ))}
            </Box>

            {/* Lưới ngày */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
                textAlign: 'center',
              }}
            >
              {/* Khoảng trống trước ngày đầu tiên của tháng */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <Box key={`blank-${idx}`} />
              ))}

              {/* Các ngày trong tháng */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const isSelected = selectedDay === day;

                return (
                  <Button
                    key={day}
                    onClick={() => handleSelectDay(day)}
                    sx={{
                      minWidth: 0,
                      width: 32,
                      height: 32,
                      p: 0,
                      m: 'auto',
                      borderRadius: '50%',
                      fontFamily: APP_FONT_FAMILY,
                      fontSize: '13px',
                      fontWeight: isSelected ? 700 : 500,
                      backgroundColor: isSelected ? '#111' : 'transparent',
                      color: isSelected ? '#fff' : '#222',
                      '&:hover': {
                        backgroundColor: isSelected ? '#333' : '#f5f5f5',
                      },
                    }}
                  >
                    {day}
                  </Button>
                );
              })}
            </Box>
          </Box>
        )}
      </Popover>
    </Box>
  );
}