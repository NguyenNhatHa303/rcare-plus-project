import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Link,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import verifyIcon from '../assets/verify-icon.png';
import bgPattern from '../assets/bg-pattern.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

const translations = {
  en: {
    title: 'Verification Code',
    sentSms: "I've sent a verification code to (***) ***-6609.",
    sentEmail: (email: string) => `I've sent a verification code to ${email || 'your email'}.`,
    subInstruction: 'Enter the 6-digit code below to continue',
    invalidCode: 'Invalid verification code. Please try again.',
    countdownPrefix: 'You can request a new code in',
    countdownSuffix: 'seconds',
    resendPrompt: "Didn't receive the code? Resend",
    backToLogin: 'Back to Login',
    modalTitle: 'Resend Verification Code',
    modalDesc: 'We can resend the verification code via SMS or send it to your email instead.',
    cancel: 'Cancel',
    useEmail: 'Use Email Instead',
    resendSms: 'Resend SMS',
  },
  vi: {
    title: 'Mã Xác Thực',
    sentSms: 'Mã xác thực đã được gửi tới số điện thoại (***) ***-6609.',
    sentEmail: (email: string) => `Mã xác thực đã được gửi tới email ${email || 'của bạn'}.`,
    subInstruction: 'Nhập mã 6 chữ số bên dưới để tiếp tục',
    invalidCode: 'Mã xác thực không hợp lệ. Vui lòng thử lại.',
    countdownPrefix: 'Bạn có thể yêu cầu gửi lại mã sau',
    countdownSuffix: 'giây',
    resendPrompt: 'Chưa nhận được mã? Gửi lại',
    backToLogin: 'Quay lại Đăng nhập',
    modalTitle: 'Gửi Lại Mã Xác Thực',
    modalDesc: 'Chúng tôi có thể gửi lại mã xác thực qua tin nhắn SMS hoặc chuyển sang gửi qua email của bạn.',
    cancel: 'Hủy bỏ',
    useEmail: 'Gửi qua Email thay thế',
    resendSms: 'Gửi lại SMS',
  },
};

export default function VerificationPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isError, setIsError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [sendMethod, setSendMethod] = useState<'sms' | 'email'>('sms');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username || '';
  
  // Đọc ngôn ngữ từ state hoặc localStorage trực tiếp
  const language: 'en' | 'vi' =
    (location.state?.language as 'en' | 'vi') ||
    (localStorage.getItem('rcare_lang') as 'en' | 'vi') ||
    'vi';

  const t = translations[language];

  const maskEmail = (val: string) => {
    if (!val.includes('@')) return val;
    const [name, domain] = val.split('@');
    const visible = name.slice(0, 2);
    return `${visible}***@${domain}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const verifyCode = (fullCode: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      if (fullCode === '123456') {
        setIsError(false);
        setIsVerifying(false);
        navigate('/confirm-birthdate', { state: { username, language } });
      } else {
        setIsError(true);
        setIsVerifying(false);
      }
    }, 600);
  };

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (isError) setIsError(false);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      const enteredCode = newCode.join('');
      if (index === 5 && value && enteredCode.length === 6) {
        verifyCode(enteredCode);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const digits = pasteData.split('');
      setCode(digits);
      if (isError) setIsError(false);
      inputRefs.current[5]?.focus();
      verifyCode(pasteData);
    }
  };

  const handleOpenResendOptions = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmResend = (method: 'sms' | 'email') => {
    setSendMethod(method);
    setOpenModal(false);
    setCode(['', '', '', '', '', '']);
    setIsError(false);
    setTimeLeft(60);
    inputRefs.current[0]?.focus();
  };

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
          padding: { xs: 3, sm: '40px 40px 35px 40px' },
          borderRadius: 4,
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          fontFamily: APP_FONT_FAMILY,
        }}
      >
        <Box
          component="img"
          src={verifyIcon}
          alt="Verification Icon"
          sx={{
            width: 75,
            height: 75,
            margin: '0 auto 15px auto',
            objectFit: 'contain',
          }}
        />

        <Typography variant="h5" sx={{ mb: 1, color: '#111', fontWeight: 'bold', fontFamily: APP_FONT_FAMILY }}>
          {t.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
          {sendMethod === 'sms'
            ? t.sentSms
            : t.sentEmail(username.includes('@') ? maskEmail(username) : '')}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontFamily: APP_FONT_FAMILY }}>
          {t.subInstruction}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mb: isError ? 1.5 : 4 }}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              disabled={isVerifying}
              value={digit}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              style={{
                width: '48px',
                height: '56px',
                fontSize: '24px',
                textAlign: 'center',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: isError ? '1.5px solid #d81b60' : '1px solid #ccc',
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: APP_FONT_FAMILY,
                color: isError ? '#d81b60' : '#111',
                backgroundColor: isVerifying ? '#f9f9f9' : '#fff',
              }}
            />
          ))}
        </Box>

        {isError && (
          <Typography
            variant="caption"
            sx={{
              color: '#d81b60',
              fontWeight: 500,
              display: 'block',
              mb: 3,
              fontFamily: APP_FONT_FAMILY,
            }}
          >
            {t.invalidCode}
          </Typography>
        )}

        {isVerifying && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} sx={{ color: '#d81b60' }} />
          </Box>
        )}

        {!isVerifying && (timeLeft > 0 && !isError ? (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontFamily: APP_FONT_FAMILY }}>
              {t.countdownPrefix} {timeLeft} {t.countdownSuffix}
            </Typography>
            <Box
              sx={{
                width: '80%',
                height: 4,
                backgroundColor: '#eee',
                borderRadius: 2,
                margin: '0 auto',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${(timeLeft / 60) * 100}%`,
                  height: '100%',
                  backgroundColor: '#111',
                  borderRadius: 2,
                  transition: 'width 1s linear',
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              onClick={handleOpenResendOptions}
              disableElevation
              sx={{
                backgroundColor: '#111',
                color: '#fff',
                borderRadius: 50,
                padding: '8px 24px',
                textTransform: 'none',
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: APP_FONT_FAMILY,
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              {t.resendPrompt}
            </Button>
          </Box>
        ))}

        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: '#333',
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

      {/* MODAL RESEND */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              padding: '24px 20px',
              maxWidth: 440,
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
              fontFamily: APP_FONT_FAMILY,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            p: 0,
            mb: 1.5,
            fontSize: '18px',
            fontWeight: 700,
            color: '#111',
            fontFamily: APP_FONT_FAMILY,
          }}
        >
          {t.modalTitle}
        </DialogTitle>

        <DialogContent sx={{ p: 0, mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.5, fontFamily: APP_FONT_FAMILY }}>
            {t.modalDesc}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            p: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Button
            onClick={handleCloseModal}
            sx={{
              color: '#444',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '13px',
              fontFamily: APP_FONT_FAMILY,
              minWidth: 'auto',
              p: '6px 12px',
              '&:hover': { backgroundColor: 'transparent', color: '#111' },
            }}
          >
            {t.cancel}
          </Button>

          <Button
            variant="outlined"
            onClick={() => handleConfirmResend('email')}
            sx={{
              borderRadius: 50,
              textTransform: 'none',
              borderColor: '#ccc',
              color: '#111',
              fontWeight: 600,
              fontSize: '13px',
              fontFamily: APP_FONT_FAMILY,
              padding: '6px 18px',
              '&:hover': {
                borderColor: '#111',
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            {t.useEmail}
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={() => handleConfirmResend('sms')}
            sx={{
              borderRadius: 50,
              backgroundColor: '#111',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '13px',
              fontFamily: APP_FONT_FAMILY,
              padding: '6px 20px',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            {t.resendSms}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}