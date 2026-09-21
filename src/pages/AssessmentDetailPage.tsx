import {
  Box,
  Typography,
  Card,
  Chip,
  IconButton,
} from '@mui/material';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

interface QuestionAnswer {
  questionEn: string;
  questionVi: string;
  answerEn: string;
  answerVi: string;
}

const SAMPLE_ANSWERS: QuestionAnswer[] = [
  {
    questionEn: 'Has your insurance changed?',
    questionVi: 'Thông tin bảo hiểm y tế của bạn có thay đổi không?',
    answerEn: 'No',
    answerVi: 'Không',
  },
  {
    questionEn: 'How many PrEP pills in total do you have remaining (include additional bottles)?',
    questionVi: 'Tổng cộng bạn còn lại bao nhiêu viên thuốc PrEP (tính cả các lọ bổ sung)?',
    answerEn: '45',
    answerVi: '45 viên',
  },
  {
    questionEn: 'Have you missed more than 3 doses in the last 30 days?',
    questionVi: 'Bạn có bỏ quên quá 3 liều thuốc trong 30 ngày qua không?',
    answerEn: 'No',
    answerVi: 'Không',
  },
  {
    questionEn: 'Reason for missed doses?',
    questionVi: 'Lý do bỏ quên liều (nếu có)?',
    answerEn: 'No answer',
    answerVi: 'Không có câu trả lời',
  },
  {
    questionEn: 'Have you been taking PrEP as prescribed?',
    questionVi: 'Bạn có đang uống PrEP đúng theo chỉ định không?',
    answerEn: 'Yes',
    answerVi: 'Có',
  },
  {
    questionEn: 'Please indicate the reason',
    questionVi: 'Vui lòng nêu rõ lý do nếu không tuân thủ',
    answerEn: 'No answer',
    answerVi: 'Không có câu trả lời',
  },
  {
    questionEn: 'Do you need help remembering to take your PrEP?',
    questionVi: 'Bạn có cần công cụ hỗ trợ nhắc nhở uống thuốc PrEP không?',
    answerEn: 'Yes',
    answerVi: 'Có',
  },
  {
    questionEn: 'Have you had any side effects from your PrEP medication?',
    questionVi: 'Bạn có gặp bất kỳ tác dụng phụ nào từ thuốc PrEP không?',
    answerEn: 'No side effects reported',
    answerVi: 'Không có tác dụng phụ nào',
  },
  {
    questionEn: 'Are you currently experiencing any STI symptoms (discharge, pain, sores)?',
    questionVi: 'Bạn có đang xuất hiện triệu chứng STI nào không (tiết dịch, đau buốt, vết loét)?',
    answerEn: 'None',
    answerVi: 'Không có',
  },
  {
    questionEn: 'Do you require lab requisition renewal for this quarter?',
    questionVi: 'Bạn có yêu cầu làm phiếu xét nghiệm mới cho đợt này không?',
    answerEn: 'Yes, Quest PSC selected',
    answerVi: 'Có, đã chọn điểm xét nghiệm Quest PSC',
  },
];

export default function AssessmentDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();
  const isVi = language === 'vi';

  const assessmentHeader = {
    titleEn: id === 'asm-3' ? 'STI Health Assessment' : 'Quarterly Renewal Health Assessment',
    titleVi: id === 'asm-3' ? 'Bảng đánh giá nguy cơ STI' : 'Đánh giá sức khỏe tái khám định kỳ 3 tháng',
    encounterId: id === 'asm-3' ? '2451041' : '2486947',
    dateEn: id === 'asm-3' ? 'Oct 28, 2025' : 'Mar 9, 2026',
    dateVi: id === 'asm-3' ? '28 Tháng 10, 2025' : '9 Tháng 3, 2026',
    statusTextEn: 'Received (Reviewed)',
    statusTextVi: 'Đã tiếp nhận (Đã xem xét)',
    totalAnswers: 36,
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
          onClick={() => navigate('/health/assessments')}
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
          {isVi ? 'Đánh giá sức khỏe' : 'Assessment'}
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

      <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <Card
          sx={{
            p: '20px 24px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
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
                <Typography sx={{ fontWeight: 800, fontSize: '14.5px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? assessmentHeader.titleVi : assessmentHeader.titleEn}
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ color: '#777', fontSize: '12px', pl: 3.5, fontFamily: APP_FONT_FAMILY }}>
                Encounter ID: {assessmentHeader.encounterId}
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
                {isVi ? assessmentHeader.dateVi : assessmentHeader.dateEn}
              </Typography>
            </Box>
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
            gap: 2.2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
              Response Information
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', pb: 1.5 }}>
            <Typography sx={{ fontSize: '12.5px', color: '#666', fontFamily: APP_FONT_FAMILY }}>
              Status:
            </Typography>
            <Typography sx={{ fontSize: '12.5px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
              {isVi ? assessmentHeader.statusTextVi : assessmentHeader.statusTextEn}
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 800, fontSize: '13px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
            {isVi ? `Câu trả lời (${assessmentHeader.totalAnswers})` : `Answers (${assessmentHeader.totalAnswers})`}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {SAMPLE_ANSWERS.map((qa, index) => (
              <Box
                key={index}
                sx={{
                  p: '14px 18px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '12px',
                  border: '1px solid #f2f2f2',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.6,
                }}
              >
                <Typography sx={{ fontSize: '12.5px', color: '#666', fontFamily: APP_FONT_FAMILY, lineHeight: 1.4 }}>
                  {isVi ? qa.questionVi : qa.questionEn}
                </Typography>
                <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: qa.answerEn === 'No answer' ? '#999' : '#111', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? qa.answerVi : qa.answerEn}
                </Typography>
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
}