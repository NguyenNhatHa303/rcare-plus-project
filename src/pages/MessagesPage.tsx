import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import doctorAvatarImg from '../assets/doctor-april-jewell.png';
import rickyAvatarImg from '../assets/support-ricky.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

interface MessageItem {
  id: string;
  sender: 'them' | 'me';
  text: string;
  time: string;
}

interface ConversationItem {
  id: string;
  name: string;
  roleEn: string;
  roleVi: string;
  dateEn: string;
  dateVi: string;
  avatarType: 'doctor' | 'ricky' | 'initials';
  initials?: string;
  color?: string;
  isOutOfOffice?: boolean;
  outOfOfficeMsgEn?: string;
  outOfOfficeMsgVi?: string;
  messages: MessageItem[];
}

const INITIAL_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv-1',
    name: 'Christian Robinson',
    roleEn: 'Patient Services Representative',
    roleVi: 'Đại diện Dịch vụ Bệnh nhân',
    dateEn: 'Apr 8',
    dateVi: '8 Thg 4',
    avatarType: 'initials',
    initials: 'CR',
    color: '#3f51b5',
    messages: [
      {
        id: 'm-1',
        sender: 'them',
        text: 'Hello, your prior authorization for the prescription refill was approved.',
        time: '10:15 AM',
      },
      {
        id: 'm-2',
        sender: 'me',
        text: 'Thank you so much Christian! When will it be shipped?',
        time: '10:20 AM',
      },
    ],
  },
  {
    id: 'conv-2',
    name: 'April Jewell, APRN, AAHIVS',
    roleEn: 'My Provider',
    roleVi: 'Bác sĩ phụ trách',
    dateEn: 'Mar 10',
    dateVi: '10 Thg 3',
    avatarType: 'doctor',
    messages: [
      {
        id: 'm-3',
        sender: 'them',
        text: 'Hello! I have reviewed your latest quarterly lab tests. Everything looks great and your kidney function is stable.',
        time: '09:00 AM',
      },
      {
        id: 'm-4',
        sender: 'me',
        text: 'Thank you April! Do I continue taking Descovy once daily?',
        time: '09:05 AM',
      },
      {
        id: 'm-5',
        sender: 'them',
        text: 'Yes, please continue exactly as prescribed. Let me know if you experience any side effects.',
        time: '09:12 AM',
      },
    ],
  },
  {
    id: 'conv-3',
    name: 'Devan Christian',
    roleEn: 'Patient Services Representative',
    roleVi: 'Đại diện Dịch vụ Bệnh nhân',
    dateEn: 'Nov 10, 2025',
    dateVi: '10 Thg 11, 2025',
    avatarType: 'initials',
    initials: 'DC',
    color: '#2e7d32',
    messages: [
      {
        id: 'm-6',
        sender: 'them',
        text: 'Hi, we received your lab requisition order at Quest Diagnostics.',
        time: 'Nov 10, 2025',
      },
    ],
  },
  {
    id: 'conv-4',
    name: 'Ricky QCare+',
    roleEn: 'Support',
    roleVi: 'Hỗ trợ CSKH',
    dateEn: 'Oct 27, 2025',
    dateVi: '27 Thg 10, 2025',
    avatarType: 'ricky',
    isOutOfOffice: true,
    outOfOfficeMsgEn:
      'I will be out of office Friday 9/4 and will be back in office on Tuesday 9/8. If you need assistance, you can contact your patient support representative or your provider. Have a wonderful Labor Day weekend!',
    outOfOfficeMsgVi:
      'Tôi sẽ vắng mặt tại văn phòng vào Thứ Sáu 4/9 và quay lại vào Thứ Ba 8/9. Nếu cần hỗ trợ khẩn cấp, vui lòng liên hệ chuyên viên chăm sóc hoặc bác sĩ của bạn. Chúc bạn kỳ nghỉ lễ vui vẻ!',
    messages: [
      {
        id: 'm-7',
        sender: 'them',
        text: 'Hello! How can Customer Support assist you today regarding your account or shipping address?',
        time: 'Oct 27, 2025',
      },
    ],
  },
  {
    id: 'conv-5',
    name: 'Cindy Calhoun',
    roleEn: 'CBO',
    roleVi: 'Bộ phận Thanh toán CBO',
    dateEn: 'Oct 15, 2025',
    dateVi: '15 Thg 10, 2025',
    avatarType: 'initials',
    initials: 'CC',
    color: '#6a1b9a',
    messages: [
      {
        id: 'm-8',
        sender: 'them',
        text: 'Your copay assistance program was applied successfully. Co-pay is $0.',
        time: 'Oct 15, 2025',
      },
    ],
  },
];

export default function MessagesPage() {
  const { language, handleOpenLangMenu } = useOutletContext<OutletContextType>();
  const isVi = language === 'vi';

  const [conversations, setConversations] = useState<ConversationItem[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [showOutOfOfficeCard, setShowOutOfOfficeCard] = useState(false);

  const selectedConv = conversations.find((c) => c.id === selectedConvId);

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;
    const q = searchQuery.toLowerCase();
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.roleEn.toLowerCase().includes(q) ||
        c.roleVi.toLowerCase().includes(q)
    );
  }, [conversations, searchQuery]);

  const handleSelectConversation = (conv: ConversationItem) => {
    setSelectedConvId(conv.id);
    if (conv.isOutOfOffice) {
      setShowOutOfOfficeCard(true);
    } else {
      setShowOutOfOfficeCard(false);
    }
  };

  const handleSelectCategory = (targetName: string) => {
    const found = conversations.find(
      (c) =>
        c.name.toLowerCase().includes(targetName.toLowerCase()) ||
        c.roleEn.toLowerCase().includes(targetName.toLowerCase())
    );
    if (found) {
      handleSelectConversation(found);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedConvId) return;
    const newMsg: MessageItem = {
      id: `m-${Date.now()}`,
      sender: 'me',
      text: inputText.trim(),
      time: 'Just now',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedConvId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );
    setInputText('');
  };

  const renderAvatar = (conv: ConversationItem, size = 36) => {
    if (conv.avatarType === 'doctor') {
      return (
        <Avatar
          src={doctorAvatarImg}
          alt={conv.name}
          sx={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
        />
      );
    }
    if (conv.avatarType === 'ricky') {
      return (
        <Avatar
          src={rickyAvatarImg}
          alt={conv.name}
          sx={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
        />
      );
    }
    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: conv.color || '#555',
          fontSize: '12.5px',
          fontWeight: 700,
        }}
      >
        {conv.initials}
      </Avatar>
    );
  };

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', pt: 0 }}>
      {/* NÚT QUẢ CẦU NGÔN NGỮ ĐẶT ABSOLUTE GÓC PHẢI KHÔNG CHIẾM DIỆN TÍCH DÒNG */}
      <IconButton
        onClick={handleOpenLangMenu}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 34,
          height: 34,
          backgroundColor: '#d81b60',
          color: '#111',
          border: '1.5px solid #111',
          borderRadius: '10px',
          padding: '5px',
          zIndex: 10,
          transition: 'transform 0.15s',
          '&:hover': { backgroundColor: '#c2185b', transform: 'scale(1.05)' },
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </IconButton>

      {/* THẺ THÔNG BÁO OUT OF OFFICE GÓC TRÊN BÊN PHẢI */}
      {showOutOfOfficeCard && selectedConv?.isOutOfOffice && (
        <Box
          sx={{
            position: 'fixed',
            top: 24,
            right: 28,
            width: 320,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            p: '16px 18px',
            boxShadow: '0 14px 40px rgba(0, 0, 0, 0.16)',
            border: '1px solid #eeeeee',
            zIndex: 1400,
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '6px',
                  backgroundColor: '#fff9c4',
                  color: '#f57f17',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                </svg>
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: '13.5px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                Out Of Office
              </Typography>
            </Box>

            <IconButton
              size="small"
              onClick={() => setShowOutOfOfficeCard(false)}
              sx={{ color: '#888', p: 0.3, '&:hover': { color: '#111' } }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Avatar
              src={rickyAvatarImg}
              alt="Ricky QCare+"
              sx={{ width: 26, height: 26, borderRadius: '6px', objectFit: 'cover' }}
            />
            <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
              Ricky QCare+
            </Typography>
          </Box>

          <Typography sx={{ fontSize: '11.5px', color: '#555', lineHeight: 1.45, fontFamily: APP_FONT_FAMILY }}>
            {isVi ? selectedConv.outOfOfficeMsgVi : selectedConv.outOfOfficeMsgEn}
          </Typography>
        </Box>
      )}

      {/* BỐ CỤC CHÍNH ĐẨY LÊN SÁT ĐỈNH TRANG */}
      <Box sx={{ display: 'flex', height: '100%', gap: 3 }}>
        {/* CỘT TRÁI: 3 CATEGORIES ĐÃ ĐẨY LÊN TRÊN SÁT MÉP + SEARCH + DANH SÁCH */}
        <Box
          sx={{
            width: { xs: '100%', md: 330 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1.2,
            overflowY: 'auto',
            pr: 0.5,
            flexShrink: 0,
          }}
        >
          {/* CATEGORY 1: Customer Support */}
          <Card
            onClick={() => handleSelectCategory('Ricky QCare+')}
            sx={{
              p: '12px 14px',
              borderRadius: '14px',
              border: '1px solid #eeeeee',
              boxShadow: 'none',
              backgroundColor: '#fafafa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.2,
              transition: 'all 0.15s ease',
              '&:hover': { backgroundColor: '#f2f2f2', borderColor: '#ddd' },
            }}
          >
            <Box sx={{ mt: 0.2, color: '#111' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
              </svg>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '13px', color: '#111', fontFamily: APP_FONT_FAMILY, lineHeight: 1.2 }}>
                {isVi ? 'Chăm sóc Khách hàng' : 'Customer Support'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', lineHeight: 1.35, display: 'block', mt: 0.3 }}>
                {isVi
                  ? 'Hỗ trợ khởi động lại liệu trình, bảo hiểm, đồng chi trả, đổi địa chỉ, trạng thái đơn thuốc'
                  : 'Help with restarting care, insurance, copay, address change, prescription status'}
              </Typography>
            </Box>
          </Card>

          {/* CATEGORY 2: Patient Services Representative */}
          <Card
            onClick={() => handleSelectCategory('Christian Robinson')}
            sx={{
              p: '12px 14px',
              borderRadius: '14px',
              border: '1px solid #eeeeee',
              boxShadow: 'none',
              backgroundColor: '#fafafa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.2,
              transition: 'all 0.15s ease',
              '&:hover': { backgroundColor: '#f2f2f2', borderColor: '#ddd' },
            }}
          >
            <Box sx={{ mt: 0.2, color: '#111' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '13px', color: '#111', fontFamily: APP_FONT_FAMILY, lineHeight: 1.2 }}>
                {isVi ? 'Đại diện Dịch vụ Bệnh nhân' : 'Patient Services Representative'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '11px', lineHeight: 1.35, display: 'block', mt: 0.3 }}>
                {isVi
                  ? 'Hỗ trợ đơn thuốc (cấp mới, nạp lại, phê duyệt trước), xét nghiệm (trạng thái, kết quả)'
                  : 'Help with prescriptions (new fill, refill, prior auth), labs (status, results)'}
              </Typography>
            </Box>
          </Card>

          {/* CATEGORY 3: My Provider */}
          <Card
            onClick={() => handleSelectCategory('April Jewell')}
            sx={{
              p: '11px 14px',
              borderRadius: '14px',
              border: '1px solid #eeeeee',
              boxShadow: 'none',
              backgroundColor: '#fafafa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              transition: 'all 0.15s ease',
              '&:hover': { backgroundColor: '#f2f2f2', borderColor: '#ddd' },
            }}
          >
            <Box sx={{ color: '#111', display: 'flex', alignItems: 'center' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Box>
            <Typography sx={{ fontWeight: 800, fontSize: '13px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
              {isVi ? 'Bác sĩ của tôi' : 'My Provider'}
            </Typography>
          </Card>

          {/* Ô TÌM KIẾM HỘI THOẠI */}
          <TextField
            fullWidth
            size="small"
            placeholder={isVi ? 'Tìm kiếm cuộc trò chuyện...' : 'Search conversations...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#888">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              mt: 0.3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                fontFamily: APP_FONT_FAMILY,
                '& fieldset': { borderColor: '#e0e0e0' },
                '&:hover fieldset': { borderColor: '#bbb' },
                '&.Mui-focused fieldset': { borderColor: '#111' },
              },
            }}
          />

          {/* DANH SÁCH THREADS */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.3 }}>
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === selectedConvId;
              return (
                <Box
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: '10px 12px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#f2f2f2' : 'transparent',
                    transition: 'background-color 0.15s',
                    '&:hover': { backgroundColor: isSelected ? '#f2f2f2' : '#fafafa' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
                    {renderAvatar(conv, 38)}
                    <Box sx={{ overflow: 'hidden' }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '13px',
                          color: '#111',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontFamily: APP_FONT_FAMILY,
                        }}
                      >
                        {conv.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#777',
                          fontSize: '11.5px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: 'block',
                          fontFamily: APP_FONT_FAMILY,
                        }}
                      >
                        {isVi ? conv.roleVi : conv.roleEn}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography sx={{ fontSize: '11px', color: '#999', flexShrink: 0, ml: 1, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? conv.dateVi : conv.dateEn}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* CỘT PHẢI: KHUNG TRÒ CHUYỆN / EMPTY STATE */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fbfbfb',
            borderRadius: '20px',
            border: '1px solid #eeeeee',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {selectedConv ? (
            <>
              {/* Header người chat */}
              <Box
                sx={{
                  p: '14px 20px',
                  borderBottom: '1px solid #eeeeee',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                {renderAvatar(selectedConv, 40)}
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '14px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                    {selectedConv.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#777', fontSize: '12px', fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? selectedConv.roleVi : selectedConv.roleEn}
                  </Typography>
                </Box>
              </Box>

              {/* Lịch sử tin nhắn */}
              <Box sx={{ flex: 1, p: 2.5, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {selectedConv.messages.map((m) => {
                  const isMe = m.sender === 'me';
                  return (
                    <Box
                      key={m.id}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMe ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '75%',
                          p: '12px 16px',
                          borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          backgroundColor: isMe ? '#111111' : '#ffffff',
                          color: isMe ? '#ffffff' : '#111111',
                          border: isMe ? 'none' : '1px solid #eeeeee',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        }}
                      >
                        <Typography sx={{ fontSize: '13px', lineHeight: 1.45, fontFamily: APP_FONT_FAMILY }}>
                          {m.text}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#999', fontSize: '10.5px', mt: 0.4, px: 0.5 }}>
                        {m.time}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* Khung soạn thảo tin nhắn (Composer) */}
              <Box
                sx={{
                  p: '14px 18px',
                  backgroundColor: '#ffffff',
                  borderTop: '1px solid #eeeeee',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder={isVi ? 'Nhập tin nhắn...' : 'Write something...'}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 50,
                      backgroundColor: '#f8f8f8',
                      fontSize: '13.5px',
                      fontFamily: APP_FONT_FAMILY,
                      '& fieldset': { borderColor: '#e0e0e0' },
                      '&:hover fieldset': { borderColor: '#ccc' },
                      '&.Mui-focused fieldset': { borderColor: '#111' },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  disableElevation
                  disabled={!inputText.trim()}
                  onClick={handleSendMessage}
                  sx={{
                    borderRadius: 50,
                    px: 3,
                    py: 1,
                    backgroundColor: '#111',
                    color: '#fff',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '13px',
                    fontFamily: APP_FONT_FAMILY,
                    '&:hover': { backgroundColor: '#333' },
                  }}
                >
                  {isVi ? 'Gửi' : 'Send'}
                </Button>
              </Box>
            </>
          ) : (
            // EMPTY STATE BAN ĐẦU THEO ĐÚNG ẢNH MẪU QCARE+
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '16px',
                  backgroundColor: '#eeeeee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                </svg>
              </Box>
              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#777', fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Bắt đầu những cuộc trò chuyện ý nghĩa!' : 'Start meaningful conversations!'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}