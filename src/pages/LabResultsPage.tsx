import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  Chip,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useOutletContext } from 'react-router-dom';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

interface LabItem {
  id: string;
  dateGroupEn: string;
  dateGroupVi: string;
  facility: string;
  titleEn: string;
  titleVi: string;
  provider: string;
  status: 'ORDERED' | 'READY';
  dateReceivedEn?: string;
  dateReceivedVi?: string;
  resultSummary?: string;
}

const LAB_RECORDS: LabItem[] = [
  {
    id: 'lab-1',
    dateGroupEn: 'Mar 9, 2026',
    dateGroupVi: '9 Tháng 3, 2026',
    facility: 'Quest',
    titleEn: 'PrEP Quarterly',
    titleVi: 'Tái khám PrEP định kỳ',
    provider: 'April Jewell, APRN, AAHIVS',
    status: 'ORDERED',
  },
  {
    id: 'lab-2',
    dateGroupEn: 'Dec 22, 2025',
    dateGroupVi: '22 Tháng 12, 2025',
    facility: 'Quest',
    titleEn: 'PrEP Quarterly',
    titleVi: 'Tái khám PrEP định kỳ',
    provider: 'April Jewell, APRN, AAHIVS',
    status: 'READY',
    dateReceivedEn: 'Jan 14, 2026',
    dateReceivedVi: '14 Tháng 1, 2026',
    resultSummary: 'Negative',
  },
  {
    id: 'lab-3',
    dateGroupEn: 'Dec 22, 2025',
    dateGroupVi: '22 Tháng 12, 2025',
    facility: 'Ash',
    titleEn: 'PrEP Quarterly',
    titleVi: 'Tái khám PrEP định kỳ',
    provider: 'April Jewell, APRN, AAHIVS',
    status: 'READY',
    dateReceivedEn: 'Jan 23, 2026',
    dateReceivedVi: '23 Tháng 1, 2026',
    resultSummary: 'Negative',
  },
  {
    id: 'lab-4',
    dateGroupEn: 'Nov 8, 2025',
    dateGroupVi: '8 Tháng 11, 2025',
    facility: 'Ash',
    titleEn: 'PrEP Quarterly',
    titleVi: 'Tái khám PrEP định kỳ',
    provider: 'April Jewell, APRN, AAHIVS',
    status: 'READY',
    dateReceivedEn: 'Nov 20, 2025',
    dateReceivedVi: '20 Tháng 11, 2025',
    resultSummary: 'Negative',
  },
];

export default function LabResultsPage() {
  const navigate = useNavigate();
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();
  const isVi = language === 'vi';

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success');

  const showToast = (msg: string, severity: 'success' | 'error' = 'success') => {
    setToastMsg(msg);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const processFile = (file: File) => {
    const validExtensions = ['pdf', 'png', 'jpg', 'jpeg'];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';

    if (!validExtensions.includes(extension)) {
      showToast(
        isVi
          ? 'Định dạng tệp không hợp lệ! Chỉ chấp nhận file PDF, PNG, JPG.'
          : 'Invalid file format! Only PDF, PNG, and JPG are allowed.',
        'error'
      );
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      showToast(
        isVi ? 'Dung lượng tệp vượt quá 15MB cho phép!' : 'File size exceeds the 15MB limit!',
        'error'
      );
      return;
    }

    const fileSizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const newFileItem: UploadedFileItem = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: fileSizeStr,
      uploadedAt: isVi ? 'Vừa xong' : 'Just now',
    };

    setUploadedFiles((prev) => [newFileItem, ...prev]);
    showToast(
      isVi
        ? `Đã tải lên tệp "${file.name}" thành công!`
        : `Uploaded "${file.name}" successfully!`
    );
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    showToast(isVi ? 'Đã xóa tệp tải lên.' : 'Removed uploaded file.');
  };

  // Mở trực tiếp file PDF sang tab mới khi bấm nút Open Order
  const handleOpenPdfOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('/sample-after-visit-summary.pdf', '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = (item: LabItem) => {
    navigate(`/health/labs/${item.id}`);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Header */}
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
          {isVi ? 'Xét nghiệm' : 'Labs'}
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

      {/* Mô tả */}
      <Box sx={{ maxWidth: 780, mx: 'auto', textAlign: 'center', mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#555',
            fontSize: '13px',
            mb: 1.2,
            fontFamily: APP_FONT_FAMILY,
            lineHeight: 1.5,
          }}
        >
          {isVi
            ? 'Theo dõi lộ trình chăm sóc sức khỏe của bạn với các kết quả xét nghiệm chi tiết và hướng dẫn chuyên môn.'
            : 'Track your health journey with detailed lab results and insights that help guide your care decisions.'}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: '#777',
            fontSize: '12px',
            fontStyle: 'italic',
            display: 'block',
            fontFamily: APP_FONT_FAMILY,
            lineHeight: 1.45,
          }}
        >
          {isVi
            ? 'Nếu bạn có kết quả xét nghiệm từ cơ sở y tế khác, bạn có thể tải lên bên dưới. Vui lòng đảm bảo ghi rõ họ tên, ngày sinh và ngày lấy mẫu.'
            : 'If you have lab work results from somewhere other than Q Care Plus, you can upload them below. Please be sure to include your name, date of birth and date of collection.'}
        </Typography>
      </Box>

      {/* Upload Drag & Drop */}
      <Box sx={{ maxWidth: 760, mx: 'auto', mb: 3.5 }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
          accept=".pdf,.png,.jpg,.jpeg"
        />

        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: isDragging ? '2px dashed #111' : '1.5px dashed #ccc',
            backgroundColor: isDragging ? '#f5f5f5' : '#ffffff',
            borderRadius: '16px',
            py: 2.8,
            px: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.2,
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            '&:hover': {
              borderColor: '#111',
              backgroundColor: '#fafafa',
            },
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>

          <Typography sx={{ fontSize: '13.5px', color: '#222', fontFamily: APP_FONT_FAMILY }}>
            <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
              {isVi ? 'Nhấn để tải lên' : 'Click to upload'}
            </span>{' '}
            {isVi ? 'hoặc kéo và thả tệp vào đây' : 'or drag and drop'}
          </Typography>
        </Box>

        {uploadedFiles.length > 0 && (
          <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {uploadedFiles.map((file) => (
              <Box
                key={file.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: '10px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #eee',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#555">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                  <Typography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#111',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: { xs: 220, sm: 400 },
                    }}
                  >
                    {file.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px' }}>
                    ({file.size})
                  </Typography>
                </Box>

                <IconButton size="small" onClick={() => handleDeleteFile(file.id)} sx={{ color: '#888', '&:hover': { color: '#e53935' } }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Danh sách các card xét nghiệm */}
      <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        {LAB_RECORDS.map((item) => (
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
              onClick={() => handleCardClick(item)}
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2v2h1v9.88L3.21 20.08c-.78 1.15-.49 2.72.66 3.5.38.26.83.42 1.3.42h13.66c1.38 0 2.5-1.12 2.5-2.5 0-.47-.14-.92-.4-1.3L17 13.88V4h1V2H6zm3 4h6v7.35l3.22 5.65H5.78L9 13.35V6z" />
                    </svg>
                    <Typography sx={{ fontWeight: 800, fontSize: '14.5px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                      {item.facility}
                    </Typography>
                  </Box>

                  <Typography sx={{ fontSize: '13px', color: '#555', fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? item.titleVi : item.titleEn}
                  </Typography>

                  {item.status === 'READY' && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 0.5 }}>
                      <Typography sx={{ fontSize: '12px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
                        {isVi ? 'Ngày nhận:' : 'Date Received:'}{' '}
                        <strong style={{ color: '#222' }}>{isVi ? item.dateReceivedVi : item.dateReceivedEn}</strong>
                      </Typography>

                      <Typography sx={{ fontSize: '12px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
                        {isVi ? 'Kết quả dương tính:' : 'Positive Results:'}{' '}
                        <strong style={{ color: '#222' }}>{item.resultSummary}</strong>
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1.2 }}>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      backgroundColor: item.status === 'ORDERED' ? '#0288d1' : '#43a047',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '10px',
                      height: 22,
                      borderRadius: '6px',
                      px: 0.5,
                    }}
                  />

                  <Typography sx={{ fontSize: '12px', color: '#666', fontFamily: APP_FONT_FAMILY, textAlign: 'right' }}>
                    {item.provider}
                  </Typography>

                  {item.status === 'ORDERED' ? (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={handleOpenPdfOrder}
                      sx={{
                        backgroundColor: '#111',
                        color: '#fff',
                        borderRadius: 50,
                        px: 2.2,
                        py: 0.6,
                        fontSize: '12.5px',
                        fontWeight: 700,
                        textTransform: 'none',
                        fontFamily: APP_FONT_FAMILY,
                        '&:hover': { backgroundColor: '#333' },
                      }}
                    >
                      {isVi ? 'Mở phiếu yêu cầu' : 'Open Order'}
                    </Button>
                  ) : (
                    <Typography
                      sx={{
                        color: '#111',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        fontFamily: APP_FONT_FAMILY,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {isVi ? 'Xem chi tiết' : 'View Details'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Snackbar Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastSeverity}
          variant="filled"
          sx={{
            borderRadius: '14px',
            fontFamily: APP_FONT_FAMILY,
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            fontSize: '13px',
            fontWeight: 600,
            backgroundColor: toastSeverity === 'error' ? '#d32f2f' : '#111',
            color: '#fff',
            '& .MuiAlert-icon': { color: toastSeverity === 'error' ? '#fff' : '#4caf50' },
          }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}