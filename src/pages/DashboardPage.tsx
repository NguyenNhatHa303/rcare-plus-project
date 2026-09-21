import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Card,
  Avatar,
  IconButton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language: 'en' | 'vi';
  displayName: string;
  initials: string;
  handleOpenLangMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

interface TaskItem {
  id: number;
  type: 'profile' | 'contact';
  titleEn: string;
  titleVi: string;
  descEn: string;
  descVi: string;
  badgeEn: string;
  badgeVi: string;
}

export default function DashboardPage() {
  const { language, displayName, initials, handleOpenLangMenu } =
    useOutletContext<OutletContextType>();
  const navigate = useNavigate();

  const isVi = language === 'vi';
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      type: 'profile',
      titleEn: 'Complete Your Profile',
      titleVi: 'Hoàn thiện Hồ sơ Bệnh nhân',
      descEn:
        'Add remaining details to your profile. Your provider will use this information during your visit.',
      descVi:
        'Cung cấp thêm các chi tiết vào hồ sơ. Bác sĩ sẽ sử dụng thông tin này trong buổi khám.',
      badgeEn: 'REQUIRED',
      badgeVi: 'BẮT BUỘC',
    },
    {
      id: 2,
      type: 'contact',
      titleEn: 'Verify Contact Information',
      titleVi: 'Xác thực Thông tin Liên hệ',
      descEn:
        'Confirm your active email and shipping address to ensure discreet PrEP package delivery.',
      descVi:
        'Xác nhận email và địa chỉ nhận hàng để đảm bảo giao gói thuốc PrEP kín đáo.',
      badgeEn: 'REQUIRED',
      badgeVi: 'BẮT BUỘC',
    },
  ]);

  const [activeTaskModal, setActiveTaskModal] = useState<TaskItem | null>(null);

  const [profileFormData, setProfileFormData] = useState({
    legalName: 'Nguyen Nhat Ha',
    genderIdentity: 'Nam',
    address: '123 Vo Van Ngan, Thu Duc, TP.HCM',
  });

  const [contactFormData, setContactFormData] = useState({
    phone: '(***) ***-6609',
    deliveryAddress: '123 Vo Van Ngan, Thu Duc, TP.HCM',
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (isVi) {
      if (hour >= 5 && hour < 11) return 'Chào buổi sáng';
      if (hour >= 11 && hour < 14) return 'Chào buổi trưa';
      if (hour >= 14 && hour < 18) return 'Chào buổi chiều';
      return 'Chào buổi tối';
    }
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleStartTask = (task: TaskItem) => {
    setActiveTaskModal(task);
  };

  const handleCompleteTask = () => {
    if (activeTaskModal) {
      const taskName = isVi ? activeTaskModal.titleVi : activeTaskModal.titleEn;
      setTasks((prev) => prev.filter((t) => t.id !== activeTaskModal.id));
      setActiveTaskModal(null);

      setToastMessage(
        isVi
          ? `Đã hoàn tất nhiệm vụ: "${taskName}"`
          : `Task completed: "${taskName}"`
      );
      setToastOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'space-between' }}>
      <Box>
        {/* 1. Header trên cùng */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3.5,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#111',
                letterSpacing: '-0.6px',
                fontSize: { xs: '26px', md: '34px' },
                fontFamily: APP_FONT_FAMILY,
                lineHeight: 1.15,
              }}
            >
              {getGreeting()},
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                color: '#555',
                mt: 0.2,
                fontSize: { xs: '20px', md: '24px' },
                fontFamily: APP_FONT_FAMILY,
              }}
            >
              {displayName}!
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              onClick={handleOpenLangMenu}
              sx={{
                width: 38,
                height: 38,
                backgroundColor: '#d81b60',
                color: '#111',
                border: '1.5px solid #111',
                borderRadius: '10px',
                padding: '7px',
                transition: 'transform 0.15s',
                '&:hover': { backgroundColor: '#c2185b', transform: 'scale(1.05)' },
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </IconButton>

            <Avatar
              sx={{
                bgcolor: '#6d6875',
                color: '#fff',
                width: 40,
                height: 40,
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              {initials}
            </Avatar>
          </Box>
        </Box>

        {/* 2. 3 Shortcut Cards: Chat -> /messages, Labs -> /health/labs, Rx -> /health/prescriptions */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: { xs: 1.5, sm: 3 },
            mb: 4.5,
          }}
        >
          {[
            {
              id: 'chat',
              title: isVi ? 'Trò chuyện' : 'Chat',
              bg: '#fcf6ed',
              iconBg: '#f57c00',
              action: () => navigate('/messages'),
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              ),
            },
            {
              id: 'labs',
              title: isVi ? 'Xét nghiệm' : 'Labs',
              bg: '#eef8fc',
              iconBg: '#0288d1',
              action: () => navigate('/health/labs'),
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M6 2v2h1v9.88L3.21 20.08c-.78 1.15-.49 2.72.66 3.5.38.26.83.42 1.3.42h13.66c1.38 0 2.5-1.12 2.5-2.5 0-.47-.14-.92-.4-1.3L17 13.88V4h1V2H6zm3 4h6v7.35l3.22 5.65H5.78L9 13.35V6z" />
                </svg>
              ),
            },
            {
              id: 'rx',
              title: isVi ? 'Đơn thuốc' : 'Rx',
              bg: '#f2f9ed',
              iconBg: '#558b2f',
              action: () => navigate('/health/prescriptions'),
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M6 3h12v2H6zm11 3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 8h-3v3h-2v-3H8v-2h3V9h2v3h3v2z" />
                </svg>
              ),
            },
          ].map((item) => (
            <Card
              key={item.id}
              onClick={item.action}
              sx={{
                p: { xs: 2.2, sm: 3.2 },
                backgroundColor: item.bg,
                borderRadius: '20px',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.4,
                cursor: 'pointer',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                },
              }}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  backgroundColor: item.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: '#222',
                  fontSize: '14.5px',
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                {item.title}
              </Typography>
            </Card>
          ))}
        </Box>

        {/* 3. Danh sách Tasks hoặc All Caught Up */}
        <Box sx={{ mb: 4 }}>
          {tasks.length > 0 ? (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '1px',
                    color: '#777',
                    textTransform: 'uppercase',
                    fontFamily: APP_FONT_FAMILY,
                  }}
                >
                  {isVi ? 'NHIỆM VỤ CẦN LÀM' : 'TASKS'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#888', fontWeight: 600, fontFamily: APP_FONT_FAMILY }}
                >
                  {tasks.length} {isVi ? 'nhiệm vụ còn lại' : 'task remaining'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    sx={{
                      p: 3,
                      borderRadius: '18px',
                      border: '1px solid rgba(0,0,0,0.05)',
                      borderLeft: '4.5px solid #ffb300',
                      boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#333">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}
                        >
                          {isVi ? task.titleVi : task.titleEn}
                        </Typography>
                        <Chip
                          label={isVi ? task.badgeVi : task.badgeEn}
                          size="small"
                          sx={{
                            backgroundColor: '#ffb300',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '10px',
                            height: 20,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ color: '#666', maxWidth: 650, fontFamily: APP_FONT_FAMILY }}
                      >
                        {isVi ? task.descVi : task.descEn}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      disableElevation
                      onClick={() => handleStartTask(task)}
                      sx={{
                        backgroundColor: '#111',
                        color: '#fff',
                        borderRadius: 50,
                        px: 3.5,
                        py: 0.9,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '13.5px',
                        fontFamily: APP_FONT_FAMILY,
                        '&:hover': { backgroundColor: '#333' },
                      }}
                    >
                      {isVi ? 'Bắt đầu' : 'Start Task'}
                    </Button>
                  </Card>
                ))}
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                position: 'relative',
                textAlign: 'center',
                py: 8,
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 105,
                  height: 105,
                  borderRadius: '50%',
                  backgroundColor: '#eff2f5',
                  top: '10%',
                  right: '30%',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#e7ecf3',
                  top: '36%',
                  left: '30%',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  backgroundColor: '#edf5e7',
                  bottom: '8%',
                  left: '32%',
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: 68,
                  height: 68,
                  borderRadius: '50%',
                  backgroundColor: '#fdeaf1',
                  bottom: '10%',
                  right: '32%',
                  zIndex: 0,
                }}
              />

              <Box
                sx={{
                  position: 'relative',
                  width: 86,
                  height: 86,
                  borderRadius: '50%',
                  backgroundColor: '#fce4ec',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2.5,
                  zIndex: 1,
                  boxShadow: '0 4px 18px rgba(216, 27, 96, 0.08)',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 6,
                    right: 15,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#ffb300',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 12,
                    width: 7.5,
                    height: 7.5,
                    borderRadius: '50%',
                    backgroundColor: '#d81b60',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 50,
                    left: 3,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#43a047',
                  }}
                />
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#111">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: '#111',
                  mb: 0.8,
                  fontFamily: APP_FONT_FAMILY,
                  zIndex: 1,
                  fontSize: '18px',
                }}
              >
                {isVi ? 'Bạn đã hoàn tất mọi việc!' : 'All caught up!'}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#777',
                  fontFamily: APP_FONT_FAMILY,
                  zIndex: 1,
                  fontSize: '13.5px',
                }}
              >
                {isVi
                  ? 'Hiện tại bạn không có nhiệm vụ nào cần xử lý.'
                  : "You don't have any tasks at the moment."}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* FOOTER */}
      <Box sx={{ textAlign: 'center', pt: 3, mt: 4, borderTop: '1px solid #f0f0f0' }}>
        <Typography variant="caption" sx={{ color: '#777', display: 'block', mb: 0.5 }}>
          {isVi ? 'Nếu bạn có bất kỳ câu hỏi nào, vui lòng xem ' : 'If you have any questions, please check the '}
          <Link href="#" underline="hover" sx={{ color: '#d81b60', fontWeight: 600 }}>
            FAQ
          </Link>
        </Typography>
        <Typography variant="caption" sx={{ color: '#888' }}>
          {isVi ? (
            <>
              Trong các trường hợp khẩn cấp, vui lòng đến Phòng Cấp cứu gần nhất hoặc{' '}
              <Link href="tel:115" underline="hover" sx={{ color: '#d81b60', fontWeight: 700 }}>
                gọi 115
              </Link>
            </>
          ) : (
            <>
              If you are experiencing a medical emergency, please go to the nearest Emergency Room or{' '}
              <Link href="tel:911" underline="hover" sx={{ color: '#d81b60', fontWeight: 700 }}>
                call 911
              </Link>
            </>
          )}
        </Typography>
      </Box>

      {/* Modal Task */}
      <Dialog
        open={Boolean(activeTaskModal)}
        onClose={() => setActiveTaskModal(null)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '24px',
              padding: '24px 22px',
              maxWidth: 480,
              width: '100%',
              fontFamily: APP_FONT_FAMILY,
            },
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: 700, fontSize: '19px', p: 0, mb: 1, fontFamily: APP_FONT_FAMILY }}
        >
          {isVi ? activeTaskModal?.titleVi : activeTaskModal?.titleEn}
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 2.5 }}>
          <Typography
            variant="body2"
            sx={{ color: '#666', mb: 2.5, fontFamily: APP_FONT_FAMILY }}
          >
            {isVi ? activeTaskModal?.descVi : activeTaskModal?.descEn}
          </Typography>

          {activeTaskModal?.type === 'profile' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label={isVi ? 'Họ và tên pháp lý' : 'Legal Full Name'}
                value={profileFormData.legalName}
                onChange={(e) =>
                  setProfileFormData({ ...profileFormData, legalName: e.target.value })
                }
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontFamily: APP_FONT_FAMILY } }}
              />
              <TextField
                fullWidth
                size="small"
                label={isVi ? 'Bản dạng giới' : 'Gender Identity'}
                value={profileFormData.genderIdentity}
                onChange={(e) =>
                  setProfileFormData({ ...profileFormData, genderIdentity: e.target.value })
                }
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontFamily: APP_FONT_FAMILY } }}
              />
              <TextField
                fullWidth
                size="small"
                label={isVi ? 'Địa chỉ nơi ở' : 'Residential Address'}
                value={profileFormData.address}
                onChange={(e) =>
                  setProfileFormData({ ...profileFormData, address: e.target.value })
                }
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontFamily: APP_FONT_FAMILY } }}
              />
            </Box>
          )}

          {activeTaskModal?.type === 'contact' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label={isVi ? 'Số điện thoại nhận thông báo' : 'Notification Phone Number'}
                value={contactFormData.phone}
                onChange={(e) =>
                  setContactFormData({ ...contactFormData, phone: e.target.value })
                }
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontFamily: APP_FONT_FAMILY } }}
              />
              <TextField
                fullWidth
                size="small"
                label={isVi ? 'Địa chỉ nhận bưu phẩm kín' : 'Discreet Delivery Address'}
                value={contactFormData.deliveryAddress}
                onChange={(e) =>
                  setContactFormData({ ...contactFormData, deliveryAddress: e.target.value })
                }
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontFamily: APP_FONT_FAMILY } }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 0, gap: 1 }}>
          <Button
            onClick={() => setActiveTaskModal(null)}
            sx={{ color: '#666', textTransform: 'none', fontFamily: APP_FONT_FAMILY }}
          >
            {isVi ? 'Để sau' : 'Cancel'}
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleCompleteTask}
            sx={{
              backgroundColor: '#111',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 50,
              padding: '8px 22px',
              fontWeight: 700,
              fontFamily: APP_FONT_FAMILY,
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            {isVi ? 'Lưu & Hoàn tất' : 'Save & Complete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Alert */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
          sx={{
            borderRadius: '14px',
            fontFamily: APP_FONT_FAMILY,
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            fontSize: '13.5px',
            fontWeight: 600,
            backgroundColor: '#111',
            color: '#fff',
            '& .MuiAlert-icon': { color: '#4caf50' },
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}