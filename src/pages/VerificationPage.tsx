import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Link,
  TextField,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import bgPattern from '../assets/bg-pattern.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

export default function VerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const username = location.state?.username || 'nguyennhatha303@gmail.com';
  const language = location.state?.language || 'vi';
  const isVi = language === 'vi';

  useEffect(() => {
    // Tự động focus vào ô đầu tiên khi mở trang
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Chỉ nhận ký tự số
    const cleanVal = value.replace(/\D/g, '');
    if (!cleanVal) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // Nếu paste nhiều số cùng lúc
    if (cleanVal.length > 1) {
      const pastedArr = cleanVal.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedArr.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(pastedArr.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Nhập 1 số
    const newOtp = [...otp];
    newOtp[index] = cleanVal[cleanVal.length - 1];
    setOtp(newOtp);
    setError(false);

    // Tự động nhảy sang ô tiếp theo
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) {
      setError(true);
      return;
    }

    // Mặc định hoặc test thành công chuyển đến bước tiếp theo
    navigate('/birthdate-confirm', { state: { username, language } });
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        boxSizing: 'border-box',
        p: { xs: 2, sm: 3 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: APP_FONT_FAMILY,
      }}
    >
      <Card
        sx={{
          maxWidth: 480,
          width: '100%',
          borderRadius: { xs: 3, sm: 4 },
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          p: { xs: 3, sm: 4.5 },
          backgroundColor: '#ffffff',
          textAlign: 'center',
        }}
      >
        {/* LOGO */}
        <Box sx={{ mb: 2.5, display: 'inline-flex', alignItems: 'baseline' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: '#111',
              fontFamily: APP_FONT_FAMILY,
              letterSpacing: '-0.8px',
            }}
          >
            RCare
          </Typography>
          <Typography
            component="span"
            sx={{
              fontWeight: 900,
              color: '#d81b60',
              fontSize: '26px',
              ml: '2px',
              position: 'relative',
              top: '-3px',
            }}
          >
            +
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: '#111',
            mb: 1,
            fontFamily: APP_FONT_FAMILY,
            fontSize: '19px',
          }}
        >
          {isVi ? 'Nhập mã xác thực 2 bước' : 'Two-Step Verification'}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#666',
            mb: 3.5,
            fontSize: '13.5px',
            lineHeight: 1.5,
            fontFamily: APP_FONT_FAMILY,
          }}
        >
          {isVi
            ? `Chúng tôi đã gửi mã xác thực bảo mật 6 chữ số đến:`
            : `We sent a 6-digit security code to:`}
          <br />
          <strong style={{ color: '#111' }}>{username}</strong>
        </Typography>

        {/* 6 Ô NHẬP OTP (ĐÃ ẨN SỐ DẠNG PASSWORD) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 1, sm: 1.5 },
            mb: 2,
          }}
        >
          {otp.map((digit, idx) => (
            <TextField
              key={idx}
              inputRef={(el) => (inputRefs.current[idx] = el)}
              type="password" // ẨN SỐ THÀNH DẤU CHẤM • BẢO MẬT
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(idx, e)}
              slotProps={{
                htmlInput: {
                  maxLength: 1,
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  style: {
                    textAlign: 'center',
                    fontSize: '22px',
                    fontWeight: 800,
                    padding: '10px 0',
                    caretColor: '#d81b60',
                    WebkitTextSecurity: 'disc', // Đảm bảo mọi trình duyệt đều hiện chấm tròn
                  },
                },
              }}
              sx={{
                width: { xs: 44, sm: 52 },
                height: { xs: 52, sm: 58 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  backgroundColor: '#f9f9f9',
                  '& fieldset': {
                    borderColor: error ? '#d32f2f' : '#e0e0e0',
                    borderWidth: '1.5px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#111',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#d81b60',
                    borderWidth: '2px',
                  },
                },
              }}
            />
          ))}
        </Box>

        {error && (
          <Typography
            sx={{
              color: '#d32f2f',
              fontSize: '12.5px',
              fontWeight: 600,
              mb: 2,
              fontFamily: APP_FONT_FAMILY,
            }}
          >
            {isVi
              ? 'Vui lòng nhập đủ 6 chữ số mã xác thực.'
              : 'Please enter all 6 digits of the verification code.'}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={handleVerify}
          sx={{
            backgroundColor: '#d81b60',
            color: '#fff',
            py: 1.3,
            borderRadius: 50,
            textTransform: 'none',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: APP_FONT_FAMILY,
            mt: 1,
            mb: 2.5,
            '&:hover': { backgroundColor: '#c2185b' },
          }}
        >
          {isVi ? 'Xác nhận' : 'Verify'}
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#777', fontSize: '12.5px' }}>
            {isVi ? 'Không nhận được mã?' : "Didn't receive code?"}
          </Typography>
          <Link
            component="button"
            type="button"
            onClick={() => setOtp(['', '', '', '', '', ''])}
            sx={{
              color: '#d81b60',
              fontWeight: 700,
              fontSize: '12.5px',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {isVi ? 'Gửi lại mã' : 'Resend Code'}
          </Link>
        </Box>
      </Card>
    </Box>
  );
}