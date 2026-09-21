import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  Chip,
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

interface DocumentItem {
  id: string;
  name: string;
  source: string;
  badge: 'AFTER VISIT SUMMARY' | 'QUEST ORDER';
  dateEn: string;
  dateVi: string;
  type: string;
  pdfUrl: string;
}

interface DocumentGroup {
  dateEn: string;
  dateVi: string;
  items: DocumentItem[];
}

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

const DOCUMENT_GROUPS: DocumentGroup[] = [
  {
    dateEn: 'Mar 10, 2026',
    dateVi: '10 Tháng 3, 2026',
    items: [
      {
        id: 'doc-1',
        name: 'Visit Summary 03092026',
        source: 'System',
        badge: 'AFTER VISIT SUMMARY',
        dateEn: 'Mar 10, 2026',
        dateVi: '10 Tháng 3, 2026',
        type: 'PDF',
        pdfUrl: '/sample-after-visit-summary.pdf',
      },
    ],
  },
  {
    dateEn: 'Mar 9, 2026',
    dateVi: '9 Tháng 3, 2026',
    items: [
      {
        id: 'doc-2',
        name: 'QuestOrder_20260309_.pdf',
        source: 'System',
        badge: 'QUEST ORDER',
        dateEn: 'Mar 9, 2026',
        dateVi: '9 Tháng 3, 2026',
        type: 'PDF',
        pdfUrl: '/sample-after-visit-summary.pdf',
      },
    ],
  },
  {
    dateEn: 'Dec 25, 2025',
    dateVi: '25 Tháng 12, 2025',
    items: [
      {
        id: 'doc-3',
        name: 'Visit Summary 12242025',
        source: 'System',
        badge: 'AFTER VISIT SUMMARY',
        dateEn: 'Dec 25, 2025',
        dateVi: '25 Tháng 12, 2025',
        type: 'PDF',
        pdfUrl: '/sample-after-visit-summary.pdf',
      },
    ],
  },
  {
    dateEn: 'Dec 22, 2025',
    dateVi: '22 Tháng 12, 2025',
    items: [
      {
        id: 'doc-4',
        name: 'QuestOrder_20251222_.pdf',
        source: 'System',
        badge: 'QUEST ORDER',
        dateEn: 'Dec 22, 2025',
        dateVi: '22 Tháng 12, 2025',
        type: 'PDF',
        pdfUrl: '/sample-after-visit-summary.pdf',
      },
    ],
  },
];

export default function DocumentsPage() {
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

    if (file.size > 20 * 1024 * 1024) {
      showToast(
        isVi ? 'Dung lượng tệp vượt quá 20MB cho phép!' : 'File size exceeds the 20MB limit!',
        'error'
      );
      return;
    }

    const fileSizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const newFileItem: UploadedFileItem = {
      id: `doc-${Date.now()}`,
      name: file.name,
      size: fileSizeStr,
      uploadedAt: isVi ? 'Vừa xong' : 'Just now',
    };

    setUploadedFiles((prev) => [newFileItem, ...prev]);
    showToast(
      isVi
        ? `Đã tải lên tài liệu "${file.name}" thành công!`
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
    showToast(isVi ? 'Đã xóa tài liệu tải lên.' : 'Removed uploaded document.');
  };

  const handleOpenPdf = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* 1. Header */}
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
          {isVi ? 'Hồ sơ tài liệu' : 'Documents'}
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

      {/* 2. Dòng mô tả */}
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
          ? 'Truy cập tất cả hồ sơ bệnh án và tài liệu quan trọng của bạn trong một thư viện kỹ thuật số an toàn, có tổ chức.'
          : 'Access all your important medical records and documents in one secure, organized digital library.'}
      </Typography>

      {/* 3. Drag & Drop Upload */}
      <Box sx={{ maxWidth: 760, mx: 'auto', mb: 4 }}>
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

        {/* Danh sách tệp vừa upload */}
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

                <IconButton
                  size="small"
                  onClick={() => handleDeleteFile(file.id)}
                  sx={{ color: '#888', '&:hover': { color: '#e53935' } }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* 4. Danh sách tài liệu y tế */}
      <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 3.5 }}>
        {DOCUMENT_GROUPS.map((group, groupIdx) => (
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
                  onClick={() => handleOpenPdf(item.pdfUrl)}
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
                    {/* Bên trái: Icon PDF, Tên tài liệu & Nguồn System */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#333">
                          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                        </svg>
                        <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                          {item.name}
                        </Typography>
                      </Box>

                      <Typography variant="caption" sx={{ color: '#777', fontSize: '12px', pl: 3.8, fontFamily: APP_FONT_FAMILY }}>
                        {item.source}
                      </Typography>
                    </Box>

                    {/* Bên phải: Tag danh mục, Ngày tháng & Định dạng PDF */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.8 }}>
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          backgroundColor: '#f0f0f0',
                          color: '#333333',
                          fontWeight: 800,
                          fontSize: '9px',
                          height: 20,
                          borderRadius: '6px',
                          px: 0.5,
                          letterSpacing: '0.3px',
                        }}
                      />

                      <Typography sx={{ fontSize: '12px', color: '#777', fontFamily: APP_FONT_FAMILY }}>
                        {isVi ? item.dateVi : item.dateEn}
                      </Typography>

                      <Typography sx={{ fontSize: '11px', color: '#999', fontWeight: 600, fontFamily: APP_FONT_FAMILY }}>
                        {item.type}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
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