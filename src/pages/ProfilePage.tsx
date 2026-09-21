import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Snackbar,
  Alert,
  InputAdornment,
  Menu,
  Chip,
  Popover,
} from '@mui/material';
import { useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import rickyAvatarImg from '../assets/support-ricky.png';

const APP_FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

interface OutletContextType {
  language?: 'en' | 'vi';
  rawUsername?: string;
  displayName?: string;
  initials?: string;
  handleOpenLangMenu?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface AllergyItem {
  name: string;
  reaction: string;
  severity: string;
}

interface MedicationItem {
  name: string;
  frequency: string;
  dosage: string;
  reason: string;
  year: string;
}

interface CommonHistoryItem {
  name: string;
  year: string;
}

interface InsuranceItem {
  id: string;
  insuredName: string;
  insuranceType: 'BHYT' | 'COMMERCIAL';
  providerName: string;
  cardNumber: string;
  initialHospital: string;
  validFrom: string;
  validTo: string;
  benefitRate?: string;
  frontCardImg?: string | null;
  backCardImg?: string | null;
  status: 'active' | 'expired';
}

interface VitalRecord {
  id: string;
  value: string;
  date: string;
}

type NotificationPrefType = 'Text and Email' | 'Email' | 'Text';
type ContactPrefType = 'Email' | 'Phone';

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_NAMES_VI = [
  'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
];

interface FAQItem {
  id: string;
  categoryEn: string;
  categoryVi: string;
  questionEn: string;
  questionVi: string;
  answerEn: string;
  answerVi: string;
  icon: React.ReactNode;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    categoryEn: 'GENERAL',
    categoryVi: 'CHUNG',
    questionEn: 'What is PrEP and how does it work?',
    questionVi: 'PrEP là gì và hoạt động như thế nào?',
    answerEn: 'PrEP (pre-exposure prophylaxis) is medicine people at risk for HIV take to prevent getting HIV from sex or injection drug use. When taken as prescribed, PrEP is highly effective for preventing HIV.',
    answerVi: 'PrEP (điều trị dự phòng trước phơi nhiễm) là thuốc dành cho người có nguy cơ lây nhiễm HIV. Khi uống đều đặn và đúng hướng dẫn, PrEP đạt hiệu quả bảo vệ lên đến hơn 90%.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
      </svg>
    ),
  },
  {
    id: 'faq-2',
    categoryEn: 'ACCOUNT',
    categoryVi: 'TÀI KHOẢN',
    questionEn: 'How do I upload my photo ID?',
    questionVi: 'Làm thế nào để tải ảnh giấy tờ tùy thân?',
    answerEn: 'Navigate to Profile > Photo of Government Issued ID. You can click on the upload card to take a live photo or upload an existing image from your device.',
    answerVi: 'Truy cập mục Hồ sơ cá nhân > Ảnh giấy tờ tùy thân. Nhấp vào khung tải ảnh để chụp trực tiếp CCCD/Hộ chiếu hoặc tải tệp ảnh từ thiết bị của bạn.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
  },
  {
    id: 'faq-3',
    categoryEn: 'ACCOUNT',
    categoryVi: 'TÀI KHOẢN',
    questionEn: 'How can I restart my care?',
    questionVi: 'Làm thế nào để tái kích hoạt hoặc tiếp tục lộ trình chăm sóc?',
    answerEn: 'You can easily request a consultation or message our clinical team via the Messages tab or Contact Support modal.',
    answerVi: 'Bạn có thể gửi yêu cầu tái khám trực tiếp hoặc nhắn tin cho bác sĩ phụ trách qua tab Tin nhắn hoặc khung Hỗ trợ trực tuyến.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
      </svg>
    ),
  },
  {
    id: 'faq-4',
    categoryEn: 'TESTING',
    categoryVi: 'XÉT NGHIỆM',
    questionEn: 'How long does in-person testing take?',
    questionVi: 'Buổi xét nghiệm trực tiếp tại phòng khám mất bao lâu?',
    answerEn: 'In-person visits generally take around 15 to 30 minutes including rapid testing and sample collection.',
    answerVi: 'Quy trình xét nghiệm trực tiếp thường kéo dài khoảng 15 đến 30 phút bao gồm lấy mẫu và kiểm tra nhanh.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
    ),
  },
  {
    id: 'faq-5',
    categoryEn: 'TESTING',
    categoryVi: 'XÉT NGHIỆM',
    questionEn: 'How fast will I get my test results?',
    questionVi: 'Bao lâu sau khi xét nghiệm tôi nhận được kết quả?',
    answerEn: 'Rapid tests are available within 20 minutes. Comprehensive laboratory panel results are securely posted to your Health Hub within 2-3 business days.',
    answerVi: 'Kết quả test nhanh có sau 20 phút. Kết quả xét nghiệm chuyên sâu trong phòng lab sẽ được cập nhật bảo mật lên hồ sơ Health Hub sau 2 - 3 ngày làm việc.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
      </svg>
    ),
  },
  {
    id: 'faq-6',
    categoryEn: 'TESTING',
    categoryVi: 'XÉT NGHIỆM',
    questionEn: 'How can I share lab results from other sources?',
    questionVi: 'Làm thế nào để chia sẻ kết quả xét nghiệm từ bệnh viện khác?',
    answerEn: 'You can upload external PDF or photo results directly in your Health Hub or send them as an attachment to our care team.',
    answerVi: 'Bạn có thể tải file PDF hoặc ảnh chụp kết quả xét nghiệm ngoài trực tiếp vào tab Hồ sơ sức khỏe hoặc gửi cho đội ngũ chăm sóc khách hàng.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
      </svg>
    ),
  },
  {
    id: 'faq-7',
    categoryEn: 'LAB COLLECTION INSTRUCTIONS',
    categoryVi: 'HƯỚNG DẪN THU MẪU TẠI NHÀ',
    questionEn: 'How do I collect a dried blood spot sample?',
    questionVi: 'Làm thế nào để lấy mẫu giọt máu khô (DBS)?',
    answerEn: 'Clean your fingertip with the alcohol pad, use the lancet to prick the side of your finger, wipe away the first drop, and drop blood into each circle on the collection card until fully filled.',
    answerVi: 'Sát khuẩn đầu ngón tay bằng bông cồn, dùng kim chích bên cạnh đầu ngón tay, lau bỏ giọt máu đầu tiên và nhỏ lần lượt vào các vòng tròn trên thẻ giấy thấm mẫu cho đến khi đầy.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    id: 'faq-8',
    categoryEn: 'LAB COLLECTION INSTRUCTIONS',
    categoryVi: 'HƯỚNG DẪN THU MẪU TẠI NHÀ',
    questionEn: 'How do I collect a urine sample?',
    questionVi: 'Làm thế nào để lấy mẫu nước tiểu đúng cách?',
    answerEn: 'Do not urinate for at least 1 hour before collection. Collect the first 10-20 mL of urine into the provided collection cup.',
    answerVi: 'Không đi tiểu ít nhất 1 giờ trước khi lấy mẫu. Lấy phần nước tiểu đầu dòng (khoảng 10 - 20 mL) vào cốc đựng mẫu chuyên dụng đi kèm trong bộ kit.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 3h12v2H6zm11 3H7c-1.1 0-2 .9-2 2v11c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V8c0-1.1-.9-2-2-2zm1 13c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V8h11v11z" />
      </svg>
    ),
  },
  {
    id: 'faq-9',
    categoryEn: 'LAB COLLECTION INSTRUCTIONS',
    categoryVi: 'HƯỚNG DẪN THU MẪU TẠI NHÀ',
    questionEn: 'How do I collect an oral swab sample?',
    questionVi: 'Làm thế nào để lấy mẫu tăm bông họng (Oral Swab)?',
    answerEn: 'Swab the back of your throat, tonsils, and uvula with the sterile swab for 10-15 seconds, then carefully insert it into the transport tube.',
    answerVi: 'Dùng tăm bông tiệt trùng quệt nhẹ vào vùng thành sau họng và hai bên amiđan trong 10 - 15 giây, sau đó nhẹ nhàng cho vào ống dung dịch bảo quản.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
  {
    id: 'faq-10',
    categoryEn: 'LAB COLLECTION INSTRUCTIONS',
    categoryVi: 'HƯỚNG DẪN THU MẪU TẠI NHÀ',
    questionEn: 'How do I collect a rectal swab sample?',
    questionVi: 'Làm thế nào để lấy mẫu tăm bông trực tràng (Rectal Swab)?',
    answerEn: 'Insert the swab roughly 1-2 inches into the rectum, gently rotate for 5-10 seconds, remove carefully and secure into the collection vial.',
    answerVi: 'Đưa tăm bông nhẹ nhàng vào sâu khoảng 2 - 4 cm, xoay nhẹ trong 5 - 10 giây, rút ra cẩn thận và đóng nắp kín vào lọ bảo quản.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
      </svg>
    ),
  },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const outletCtx = useOutletContext<OutletContextType>() || {};

  const language = outletCtx.language || 'en';
  const rawUsername = outletCtx.rawUsername || 'nguyennhatha303@gmail.com';
  const displayName = outletCtx.displayName || 'Nguyen Nhat Ha';
  const initials = outletCtx.initials || 'NH';
  const handleOpenLangMenu = outletCtx.handleOpenLangMenu || (() => {});

  const isVi = language === 'vi';
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab');

  const [selectedSubTab, setSelectedSubTab] = useState<string | null>(initialTab || null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Counter tạo ID an toàn tránh lỗi React Compiler purity
  const nextIdRef = useRef(1);
  const getNextId = (prefix: string) => {
    const id = `${prefix}-${nextIdRef.current}`;
    nextIdRef.current += 1;
    return id;
  };

  // --- 1. STATE RB-029: PERSONAL INFO ---
  const [personalInfo, setPersonalInfo] = useState({
    chosenName: 'Nhat Ha',
    firstName: 'Ha',
    lastName: 'Nguyen Nhat',
    phone: '(094) 637-5269',
    email: rawUsername,
    dob: '03/20/2004',
    pronouns: 'She/Her',
  });

  // --- 2. STATE RB-030: GOVERNMENT ID ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [idImage, setIdImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setIdImage(imageUrl);
      triggerToast(isVi ? 'Đã tải ảnh giấy tờ tùy thân mới.' : 'New Government ID uploaded.');
    }
  };

  // --- 3. STATE RB-031: ADDRESS ---
  const [addressData, setAddressData] = useState({
    timezone: 'Asia/Ho_Chi_Minh',
    streetAddress: '123 Vo Van Ngan Street',
    aptSuite: 'Linh Chieu Ward',
    cityDistrict: 'Thu Duc City',
    province: 'Ho Chi Minh City',
    postalCode: '700000',
    useAsShipping: true,
  });

  // --- 4. STATE RB-032: INSURANCE ---
  const [insuranceList, setInsuranceList] = useState<InsuranceItem[]>([
    {
      id: 'ins-1',
      insuredName: 'Nguyen Nhat Ha',
      insuranceType: 'BHYT',
      providerName: 'Vietnam Social Security (HCMC)',
      cardNumber: 'HS4797921500303',
      initialHospital: 'Thu Duc Regional General Hospital (Code: 79-027)',
      validFrom: '01/01/2026',
      validTo: '31/12/2026',
      benefitRate: '80%',
      status: 'active',
    },
  ]);

  const [openInsuranceModal, setOpenInsuranceModal] = useState(false);
  const [editingInsuranceId, setEditingInsuranceId] = useState<string | null>(null);
  const [insuranceForm, setInsuranceForm] = useState({
    insuredName: '',
    insuranceType: 'BHYT' as 'BHYT' | 'COMMERCIAL',
    providerName: '',
    cardNumber: '',
    initialHospital: '',
    validFrom: '',
    validTo: '',
    benefitRate: '80%',
    status: 'active' as 'active' | 'expired',
  });
  const [insuranceError, setInsuranceError] = useState(false);

  const frontCardInputRef = useRef<HTMLInputElement>(null);
  const backCardInputRef = useRef<HTMLInputElement>(null);
  const [frontCardName, setFrontCardName] = useState<string | null>(null);
  const [backCardName, setBackCardName] = useState<string | null>(null);

  const handleOpenAddInsurance = () => {
    setEditingInsuranceId(null);
    setInsuranceForm({
      insuredName: '',
      insuranceType: 'BHYT',
      providerName: '',
      cardNumber: '',
      initialHospital: '',
      validFrom: '',
      validTo: '',
      benefitRate: '80%',
      status: 'active',
    });
    setFrontCardName(null);
    setBackCardName(null);
    setInsuranceError(false);
    setOpenInsuranceModal(true);
  };

  const handleOpenEditInsurance = (ins: InsuranceItem) => {
    setEditingInsuranceId(ins.id);
    setInsuranceForm({
      insuredName: ins.insuredName,
      insuranceType: ins.insuranceType,
      providerName: ins.providerName,
      cardNumber: ins.cardNumber,
      initialHospital: ins.initialHospital,
      validFrom: ins.validFrom,
      validTo: ins.validTo,
      benefitRate: ins.benefitRate || '80%',
      status: ins.status,
    });
    setFrontCardName(ins.frontCardImg ? 'front_card.jpg' : null);
    setBackCardName(ins.backCardImg ? 'back_card.jpg' : null);
    setInsuranceError(false);
    setOpenInsuranceModal(true);
  };

  const handleDeleteInsurance = (id: string) => {
    setInsuranceList((prev) => prev.filter((item) => item.id !== id));
    triggerToast(isVi ? 'Đã xóa thông tin bảo hiểm.' : 'Insurance record deleted.');
  };

  const handleSaveInsurance = () => {
    if (!insuranceForm.insuredName.trim() || !insuranceForm.cardNumber.trim()) {
      setInsuranceError(true);
      return;
    }

    if (editingInsuranceId) {
      setInsuranceList((prev) =>
        prev.map((item) =>
          item.id === editingInsuranceId ? { ...item, ...insuranceForm } : item
        )
      );
      triggerToast(isVi ? 'Cập nhật bảo hiểm thành công!' : 'Insurance updated successfully!');
    } else {
      setInsuranceList((prev) => [
        ...prev,
        {
          id: `ins-${prev.length + 1}`,
          ...insuranceForm,
        },
      ]);
      triggerToast(isVi ? 'Đã thêm bảo hiểm y tế mới!' : 'New insurance added successfully!');
    }

    setOpenInsuranceModal(false);
  };

  // --- 5. STATE RB-033: HEALTH ASSISTANCE ---
  const [healthAssistanceData, setHealthAssistanceData] = useState({
    ssnLast4: '4566',
    householdIncome: '15,000,000 VND / month',
    householdMembers: '3',
    medicaid: 'No',
    veteran: 'Yes',
    gileadCode: 'GLD-8820-VN',
  });

  const handleSaveHealthAssistance = () => {
    triggerToast(isVi ? 'Đã cập nhật thông tin hỗ trợ y tế thành công!' : 'Health assistance information updated successfully!');
  };

  // --- 6. STATE RB-034: VITALS ---
  const [weightsList, setWeightsList] = useState<VitalRecord[]>([]);
  const [heightsList, setHeightsList] = useState<VitalRecord[]>([]);
  const [bloodPressureList, setBloodPressureList] = useState<VitalRecord[]>([]);
  const [heartRateList, setHeartRateList] = useState<VitalRecord[]>([]);

  const [showAddWeight, setShowAddWeight] = useState(false);
  const [newWeightVal, setNewWeightVal] = useState('');

  const [showAddHeight, setShowAddHeight] = useState(false);
  const [newHeightVal, setNewHeightVal] = useState(isVi ? '160 cm' : `5' 3"`);

  const [showAddBP, setShowAddBP] = useState(false);
  const [bpSystolic, setBpSystolic] = useState('');
  const [bpDiastolic, setBpDiastolic] = useState('');
  const [bpDate, setBpDate] = useState(isVi ? '17/09/2026' : '09/17/2026');

  const [showAddHR, setShowAddHR] = useState(false);
  const [hrVal, setHrVal] = useState('');
  const [hrDate, setHrDate] = useState(isVi ? '17/09/2026' : '09/17/2026');

  // Custom DOB Calendar Popover
  const [calendarAnchor, setCalendarAnchor] = useState<null | HTMLElement>(null);
  const [calendarTargetField, setCalendarTargetField] = useState<'bp' | 'hr'>('hr');
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(8);
  const [isYearPickerView, setIsYearPickerView] = useState(false);

  const handleOpenCalendar = (e: React.MouseEvent<HTMLElement>, target: 'bp' | 'hr') => {
    setCalendarAnchor(e.currentTarget);
    setCalendarTargetField(target);
    setIsYearPickerView(false);
  };

  const handleCloseCalendar = () => {
    setCalendarAnchor(null);
  };

  const handleSelectDay = (day: number) => {
    const formatted = isVi
      ? `${String(day).padStart(2, '0')}/${String(viewMonth + 1).padStart(2, '0')}/${viewYear}`
      : `${String(viewMonth + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}/${viewYear}`;
    if (calendarTargetField === 'bp') {
      setBpDate(formatted);
    } else {
      setHrDate(formatted);
    }
    handleCloseCalendar();
  };

  const handleAddWeight = () => {
    const cleanNum = newWeightVal.replace(/[^0-9.]/g, '').trim();
    if (!cleanNum) return;
    const unit = isVi ? 'kg' : 'lbs';
    const dateStr = isVi ? '17/09/2026' : 'Sep 17, 2026';
    setWeightsList([{ id: getNextId('w'), value: `${cleanNum} ${unit}`, date: dateStr }, ...weightsList]);
    setNewWeightVal('');
    setShowAddWeight(false);
    triggerToast(isVi ? 'Đã lưu cân nặng mới!' : 'Weight added successfully!');
  };

  const handleAddHeight = () => {
    const dateStr = isVi ? '17/09/2026' : 'Sep 17, 2026';
    setHeightsList([{ id: getNextId('h'), value: newHeightVal, date: dateStr }, ...heightsList]);
    setShowAddHeight(false);
    triggerToast(isVi ? 'Đã lưu chiều cao mới!' : 'Height added successfully!');
  };

  const handleAddBP = () => {
    const sys = bpSystolic.replace(/[^0-9]/g, '').trim();
    const dia = bpDiastolic.replace(/[^0-9]/g, '').trim();
    if (!sys || !dia) return;
    setBloodPressureList([{ id: getNextId('bp'), value: `${sys} / ${dia} mmHg`, date: bpDate }, ...bloodPressureList]);
    setBpSystolic('');
    setBpDiastolic('');
    setShowAddBP(false);
    triggerToast(isVi ? 'Đã lưu chỉ số huyết áp!' : 'Blood pressure recorded successfully!');
  };

  const handleAddHR = () => {
    const cleanHR = hrVal.replace(/[^0-9]/g, '').trim();
    if (!cleanHR) return;
    const unit = isVi ? 'lần/phút' : 'bpm';
    setHeartRateList([{ id: getNextId('hr'), value: `${cleanHR} ${unit}`, date: hrDate }, ...heartRateList]);
    setHrVal('');
    setShowAddHR(false);
    triggerToast(isVi ? 'Đã lưu chỉ số nhịp tim!' : 'Heart rate recorded successfully!');
  };

  // --- 7. STATE RB-035: ABOUT ME ---
  const [aboutMeData, setAboutMeData] = useState({
    gender: 'Female',
    bornAs: 'Female',
    sexuality: 'Straight',
    relationshipStatus: 'Single',
    race: 'Asian',
    ethnicity: 'Not Hispanic or Latino',
  });

  const handleSaveAboutMe = () => {
    triggerToast(isVi ? 'Đã cập nhật thông tin nhân khẩu học thành công!' : 'Demographics updated successfully!');
  };

  // --- 8. STATE RB-036: PRIMARY CARE PROVIDER (PCP) ---
  const [pcpData, setPcpData] = useState({
    clinic: '',
    providerName: '',
    address: '',
    phone: '',
  });
  const [pcpErrors, setPcpErrors] = useState<{
    clinic?: string;
    providerName?: string;
    address?: string;
    phone?: string;
  }>({});

  const handlePcpChange = (field: keyof typeof pcpData, value: string) => {
    setPcpData((prev) => ({ ...prev, [field]: value }));
    if (pcpErrors[field]) {
      setPcpErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCancelPcp = () => {
    const saved = localStorage.getItem('rcare_pcp_data');
    if (saved) {
      try {
        setPcpData(JSON.parse(saved));
      } catch {
        setPcpData({ clinic: '', providerName: '', address: '', phone: '' });
      }
    } else {
      setPcpData({ clinic: '', providerName: '', address: '', phone: '' });
    }
    setPcpErrors({});
    setSelectedSubTab(null);
  };

  const handleSavePcp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newErrors: typeof pcpErrors = {};

    if (!pcpData.clinic.trim()) {
      newErrors.clinic = isVi ? 'Vui lòng nhập tên phòng khám (Clinic).' : 'Please enter clinic name.';
    }
    if (!pcpData.providerName.trim()) {
      newErrors.providerName = isVi ? 'Vui lòng nhập tên bác sĩ phụ trách (Provider Name).' : 'Please enter provider name.';
    }
    if (!pcpData.address.trim()) {
      newErrors.address = isVi ? 'Vui lòng nhập địa chỉ (Address).' : 'Please enter address.';
    }
    if (!pcpData.phone.trim()) {
      newErrors.phone = isVi ? 'Vui lòng nhập số điện thoại (Phone Number).' : 'Please enter phone number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setPcpErrors(newErrors);
      triggerToast(isVi ? 'Vui lòng kiểm tra lại các trường thông tin còn thiếu.' : 'Please fill in all required fields.');
      return;
    }

    setPcpErrors({});
    localStorage.setItem('rcare_pcp_data', JSON.stringify(pcpData));
    triggerToast(isVi ? 'Đã lưu thông tin bác sĩ chăm sóc ban đầu thành công!' : 'Primary care provider details updated successfully!');
  };

  // --- STATE RB-037: SETTINGS / LANGUAGE ---
  const [selectedLanguageSetting, setSelectedLanguageSetting] = useState<string>('English');
  const languageOptions = [
    'American Sign Language',
    'Arabic',
    'Cantonese',
    'English',
    'Haitian',
    'Korean',
    'Mandarin',
    'Portuguese',
    'Spanish',
    'Tagalog',
    'Vietnamese',
    'Other',
  ];

  const handleSaveLanguageSetting = () => {
    localStorage.setItem('rcare_setting_language', selectedLanguageSetting);
    triggerToast(
      isVi
        ? `Đã cập nhật ngôn ngữ ưu tiên thành: ${selectedLanguageSetting}`
        : `Language preference updated to: ${selectedLanguageSetting}`
    );
  };

  // --- STATE RB-038: SETTINGS / NOTIFICATIONS ---
  const [notificationPref, setNotificationPref] = useState<NotificationPrefType>('Text');

  const handleSaveNotificationPref = () => {
    localStorage.setItem('rcare_setting_notifications', notificationPref);
    triggerToast(
      isVi
        ? 'Cập nhật tùy chọn thông báo thành công!'
        : 'Notification preferences updated successfully!'
    );
  };

  // --- STATE RB-039: SETTINGS / CONTACT PREFERENCE ---
  const [contactPref, setContactPref] = useState<ContactPrefType>('Email');

  const handleSaveContactPref = () => {
    localStorage.setItem('rcare_setting_contact_pref', contactPref);
    triggerToast(
      isVi
        ? 'Cập nhật phương thức liên hệ ưu tiên thành công!'
        : 'Contact preference updated successfully!'
    );
  };

  // --- 9. HEALTH HISTORY STATES ---
  const [allergiesList, setAllergiesList] = useState<AllergyItem[]>([]);
  const [noAllergies, setNoAllergies] = useState(true);
  const [openAllergyModal, setOpenAllergyModal] = useState(false);
  const [allergyForm, setAllergyForm] = useState({ name: '', reaction: '', severity: '' });
  const [allergyError, setAllergyError] = useState(false);

  const [openMedications, setOpenMedications] = useState(false);
  const [medicationsList, setMedicationsList] = useState<MedicationItem[]>([
    { name: 'Emtricitabine / Tenofovir DF 200mg/300mg', frequency: 'Daily', dosage: '1 tablet', reason: 'PrEP Protocol', year: '2025' },
    { name: 'Multivitamin Daily', frequency: 'Daily', dosage: '1 tablet', reason: 'General Health', year: '2024' },
    { name: 'Vitamin D3 1000 IU', frequency: 'Daily', dosage: '1 capsule', reason: 'Bone Support', year: '2024' },
  ]);
  const [openMedicationModal, setOpenMedicationModal] = useState(false);
  const [medicationForm, setMedicationForm] = useState({ name: '', frequency: '', dosage: '', reason: '', year: '' });
  const [medicationError, setMedicationError] = useState(false);

  const [openConditions, setOpenConditions] = useState(false);
  const [conditionsList, setConditionsList] = useState<CommonHistoryItem[]>([
    { name: 'Mild Seasonal Allergies', year: '2023' },
    { name: 'Routine Preventive Health / PrEP Protocol', year: '2025' },
  ]);
  const [openConditionModal, setOpenConditionModal] = useState(false);
  const [conditionForm, setConditionForm] = useState({ name: '', year: '' });
  const [conditionError, setConditionError] = useState(false);

  const [noSurgeries, setNoSurgeries] = useState(true);
  const [surgeriesList, setSurgeriesList] = useState<CommonHistoryItem[]>([]);
  const [openSurgeryModal, setOpenSurgeryModal] = useState(false);
  const [surgeryForm, setSurgeryForm] = useState({ name: '', year: '' });
  const [surgeryError, setSurgeryError] = useState(false);

  const [noImmunizations, setNoImmunizations] = useState(true);
  const [immunizationsList, setImmunizationsList] = useState<CommonHistoryItem[]>([]);
  const [openImmunizationModal, setOpenImmunizationModal] = useState(false);
  const [immunizationForm, setImmunizationForm] = useState({ name: '', year: '' });
  const [immunizationError, setImmunizationError] = useState(false);

  // Dropdown năm
  const [yearMenuAnchor, setYearMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeYearCallback, setActiveYearCallback] = useState<((val: string) => void) | null>(null);
  const [activeYearCurrentVal, setActiveYearCurrentVal] = useState<string>('');

  const currentYear = 2026;
  const availableYears = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => String(currentYear - i));

  // Toast
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setToastOpen(true);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSavePersonalInfo = () => {
    triggerToast(isVi ? 'Thông tin cá nhân đã được cập nhật thành công!' : 'Personal information updated successfully!');
  };

  const handleSaveAddress = () => {
    triggerToast(isVi ? 'Địa chỉ đã được lưu thành công!' : 'Address updated successfully!');
  };

  const handleSaveId = () => {
    triggerToast(isVi ? 'Giấy tờ tùy thân đã được lưu thành công!' : 'Government ID saved successfully!');
  };

  const handleOpenYearMenu = (event: React.MouseEvent<HTMLElement>, currentVal: string, onChange: (val: string) => void) => {
    setYearMenuAnchor(event.currentTarget);
    setActiveYearCurrentVal(currentVal);
    setActiveYearCallback(() => onChange);
  };

  const handleSelectYear = (year: string) => {
    if (activeYearCallback) {
      activeYearCallback(year);
    }
    setYearMenuAnchor(null);
    setActiveYearCallback(null);
  };

  const handleOpenAllergy = () => {
    setAllergyForm({ name: '', reaction: '', severity: '' });
    setAllergyError(false);
    setOpenAllergyModal(true);
  };

  const handleOpenMedication = () => {
    setMedicationForm({ name: '', frequency: '', dosage: '', reason: '', year: '' });
    setMedicationError(false);
    setOpenMedicationModal(true);
  };

  const handleOpenCondition = () => {
    setConditionForm({ name: '', year: '' });
    setConditionError(false);
    setOpenConditionModal(true);
  };

  const handleOpenSurgery = () => {
    setSurgeryForm({ name: '', year: '' });
    setSurgeryError(false);
    setOpenSurgeryModal(true);
  };

  const handleOpenImmunization = () => {
    setImmunizationForm({ name: '', year: '' });
    setImmunizationError(false);
    setOpenImmunizationModal(true);
  };

  const handleSaveAllergy = () => {
    if (!allergyForm.name.trim()) {
      setAllergyError(true);
      return;
    }
    setAllergiesList((prev) => [...prev, allergyForm]);
    setNoAllergies(false);
    setOpenAllergyModal(false);
    triggerToast(isVi ? 'Đã thêm dị ứng mới thành công.' : 'New allergy added successfully.');
  };

  const handleSaveMedication = () => {
    if (!medicationForm.name.trim()) {
      setMedicationError(true);
      return;
    }
    setMedicationsList((prev) => [...prev, medicationForm]);
    setOpenMedications(true);
    setOpenMedicationModal(false);
    triggerToast(isVi ? 'Đã thêm thuốc mới thành công.' : 'New medication added successfully.');
  };

  const handleSaveCondition = () => {
    if (!conditionForm.name.trim()) {
      setConditionError(true);
      return;
    }
    setConditionsList((prev) => [...prev, conditionForm]);
    setOpenConditions(true);
    setOpenConditionModal(false);
    triggerToast(isVi ? 'Đã thêm tình trạng bệnh lý mới.' : 'New condition added successfully.');
  };

  const handleSaveSurgery = () => {
    if (!surgeryForm.name.trim()) {
      setSurgeryError(true);
      return;
    }
    setSurgeriesList((prev) => [...prev, surgeryForm]);
    setNoSurgeries(false);
    setOpenSurgeryModal(false);
    triggerToast(isVi ? 'Đã thêm tiền sử phẫu thuật.' : 'New surgery added successfully.');
  };

  const handleSaveImmunization = () => {
    if (!immunizationForm.name.trim()) {
      setImmunizationError(true);
      return;
    }
    setImmunizationsList((prev) => [...prev, immunizationForm]);
    setNoImmunizations(false);
    setOpenImmunizationModal(false);
    triggerToast(isVi ? 'Đã thêm thông tin tiêm chủng.' : 'New immunization added successfully.');
  };

  // Support
  const [openSupportModal, setOpenSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  const handleSendSupportMessage = () => {
    if (!supportMessage.trim()) return;
    setOpenSupportModal(false);
    setSupportMessage('');
    triggerToast(isVi ? 'Tin nhắn hỗ trợ đã được gửi tới Ricky QCare+.' : 'Your message has been sent to Ricky QCare+.');
  };

  const menuSections = [
    {
      groupKey: 'account',
      groupTitleEn: 'ACCOUNT',
      groupTitleVi: 'TÀI KHOẢN',
      items: [
        {
          id: 'personal-profile',
          titleEn: 'Profile',
          titleVi: 'Hồ sơ cá nhân',
          subEn: 'Personal information',
          subVi: 'Thông tin cá nhân cơ bản',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          ),
        },
        {
          id: 'gov-id',
          titleEn: 'Photo of Government Issued ID',
          titleVi: 'Ảnh giấy tờ tùy thân',
          subEn: 'Upload image of Government ID',
          subVi: 'Tải ảnh CCCD / Hộ chiếu',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.1 0 2-.89 2-2V6c0-1.1-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
          ),
        },
        {
          id: 'address',
          titleEn: 'Address',
          titleVi: 'Địa chỉ',
          subEn: 'Your home and shipping address',
          subVi: 'Địa chỉ nơi ở và nhận thuốc kín',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          ),
        },
        {
          id: 'insurance',
          titleEn: 'Insurance',
          titleVi: 'Bảo hiểm y tế',
          subEn: 'Insurance details',
          subVi: 'Chi tiết thông tin bảo hiểm y tế',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          ),
        },
        {
          id: 'health-assistance',
          titleEn: 'Health Assistance',
          titleVi: 'Hỗ trợ y tế & Copay',
          subEn: 'Check copay eligibility',
          subVi: 'Kiểm tra điều kiện hỗ trợ đồng chi trả',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          ),
        },
        {
          id: 'health-history',
          titleEn: 'Health History',
          titleVi: 'Lịch sử sức khỏe',
          subEn: 'Medical records',
          subVi: 'Dị ứng, thuốc, bệnh lý và phẫu thuật',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
            </svg>
          ),
        },
        {
          id: 'vitals',
          titleEn: 'Vitals',
          titleVi: 'Chỉ số sinh tồn',
          subEn: 'Weight, height, blood pressure, heart rate',
          subVi: 'Cân nặng, chiều cao, huyết áp, nhịp tim',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          ),
        },
        {
          id: 'about-me',
          titleEn: 'About Me',
          titleVi: 'Thông tin nhân khẩu học',
          subEn: 'Demographics and identity',
          subVi: 'Nhân khẩu học và bản dạng giới',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          ),
        },
        {
          id: 'pcp',
          titleEn: 'Primary Care Provider',
          titleVi: 'Bác sĩ chăm sóc ban đầu',
          subEn: 'Your primary care provider info',
          subVi: 'Thông tin bác sĩ gia đình / cơ sở y tế',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="12" y1="6" x2="12" y2="12" />
            </svg>
          ),
        },
      ],
    },
    {
      groupKey: 'settings',
      groupTitleEn: 'SETTINGS',
      groupTitleVi: 'CÀI ĐẶT',
      items: [
        {
          id: 'language',
          titleEn: 'Language',
          titleVi: 'Ngôn ngữ',
          subEn: isVi ? 'Tiếng Việt' : 'English',
          subVi: isVi ? 'Tiếng Việt' : 'English',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          ),
        },
        {
          id: 'notifications',
          titleEn: 'Notifications',
          titleVi: 'Thông báo',
          subEn: 'Alert preferences',
          subVi: 'Cài đặt cảnh báo và nhắc lịch',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
            </svg>
          ),
        },
        {
          id: 'contact-preference',
          titleEn: 'Contact Preference',
          titleVi: 'Phương thức liên lạc ưu tiên',
          subEn: 'How we reach you',
          subVi: 'Cách thức đội ngũ liên hệ với bạn',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          ),
        },
      ],
    },
    {
      groupKey: 'support',
      groupTitleEn: 'SUPPORT',
      groupTitleVi: 'HỖ TRỢ',
      items: [
        {
          id: 'faq',
          titleEn: 'F.A.Q.',
          titleVi: 'Câu hỏi thường gặp',
          subEn: 'Frequently asked questions',
          subVi: 'Giải đáp thắc mắc dịch vụ',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
            </svg>
          ),
        },
        {
          id: 'contact-support',
          titleEn: 'Contact Support',
          titleVi: 'Liên hệ Hỗ trợ',
          subEn: 'Chat with Ricky QCare+',
          subVi: 'Nhắn tin chăm sóc trực tiếp',
          icon: (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h4c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
            </svg>
          ),
        },
      ],
    },
  ];

  const handleItemClick = (id: string) => {
    if (id === 'contact-support') {
      setOpenSupportModal(true);
      return;
    }
    setSelectedSubTab(id);
  };

  const renderYearField = (value: string, onChange: (val: string) => void) => (
    <TextField
      fullWidth
      variant="standard"
      placeholder="Year"
      value={value}
      slotProps={{
        input: {
          readOnly: true,
          sx: { cursor: 'default', caretColor: 'transparent' },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={(e) => handleOpenYearMenu(e, value, onChange)}
                sx={{ color: '#666', p: 0.5, cursor: 'pointer', '&:hover': { color: '#111', backgroundColor: 'rgba(0,0,0,0.04)' } }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiInput-root': {
          fontFamily: APP_FONT_FAMILY,
          fontSize: '14px',
          py: 0.5,
          cursor: 'default',
          '&:before': { borderColor: '#e0e0e0' },
          '&:hover:not(.Mui-disabled):before': { borderColor: '#e0e0e0' },
          '&:after': { borderColor: '#111' },
        },
        '& .MuiInputBase-input': { cursor: 'default', userSelect: 'none' },
      }}
    />
  );

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', pt: 0, display: 'flex', flexDirection: 'column' }}>
      {/* HEADER BAR: QCare+ BRANDING (RB-042: Bấm vào icon QCare+ thì back lại Home Hub) */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 0.5 }}>
        <Box
          onClick={() => navigate('/dashboard')}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'transform 0.15s ease',
            '&:hover': { transform: 'scale(1.02)' },
          }}
        >
          <Typography sx={{ fontWeight: 900, fontSize: '22px', color: '#111', fontFamily: APP_FONT_FAMILY, letterSpacing: '-0.5px' }}>
            Qcare<span style={{ color: '#d81b60', fontSize: '20px', fontWeight: 800 }}>⁺</span>
          </Typography>
        </Box>

        <IconButton
          onClick={handleOpenLangMenu}
          sx={{
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
      </Box>

      <Box sx={{ display: 'flex', width: '100%', height: 'calc(100% - 48px)', gap: 3.5 }}>
        {/* CỘT TRÁI: SIDEBAR MENU */}
        <Box
          sx={{
            width: { xs: '100%', md: 330 },
            display: 'flex',
            flexDirection: 'column',
            gap: 1.8,
            flexShrink: 0,
            overflowY: 'auto',
            pr: 0.5,
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#e0e0e0', borderRadius: '4px' },
          }}
        >
          {/* RB-042: Ấn Vào hình avatar profile user thì hiện giao diện tổng profile hub */}
          <Card
            onClick={() => setSelectedSubTab(null)}
            sx={{
              p: '10px 14px',
              borderRadius: '16px',
              backgroundColor: selectedSubTab === null ? '#f2f2f2' : '#fafafa',
              border: selectedSubTab === null ? '1.5px solid #111' : '1px solid #eeeeee',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              boxSizing: 'border-box',
              flexShrink: 0,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              '&:hover': { backgroundColor: '#f2f2f2' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden', width: '100%' }}>
              <Box sx={{ position: 'relative', flexShrink: 0 }}>
                <Avatar sx={{ bgcolor: '#6d6875', color: '#fff', width: 38, height: 38, fontSize: '12.5px', fontWeight: 700 }}>
                  {initials}
                </Avatar>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    width: 15,
                    height: 15,
                    borderRadius: '50%',
                    backgroundColor: '#111',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid #fff',
                  }}
                >
                  <svg width="8.5" height="8.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </Box>
              </Box>

              <Box sx={{ overflow: 'hidden', flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '13px', color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: APP_FONT_FAMILY }}>
                  {displayName}
                </Typography>
                <Typography variant="caption" sx={{ color: '#777', fontSize: '10.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', fontFamily: APP_FONT_FAMILY }}>
                  {rawUsername}
                </Typography>
              </Box>
            </Box>
          </Card>

          {menuSections.map((sec, secIdx) => (
            <Box key={sec.groupKey}>
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.8px', color: '#888', fontSize: '10.5px', fontFamily: APP_FONT_FAMILY, display: 'block', mb: 0.8, px: 0.5 }}>
                {isVi ? sec.groupTitleVi : sec.groupTitleEn}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.35 }}>
                {sec.items.map((item) => {
                  const isSelected = selectedSubTab === item.id;
                  return (
                    <Box
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: '8px 12px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#f2f2f2' : 'transparent',
                        transition: 'all 0.15s ease',
                        '&:hover': { backgroundColor: isSelected ? '#f2f2f2' : '#fafafa' },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, overflow: 'hidden' }}>
                        <Box sx={{ color: isSelected ? '#111' : '#666', display: 'flex', alignItems: 'center' }}>{item.icon}</Box>
                        <Box sx={{ overflow: 'hidden' }}>
                          <Typography sx={{ fontSize: '12.5px', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#111' : '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: APP_FONT_FAMILY }}>
                            {isVi ? item.titleVi : item.titleEn}
                          </Typography>
                          {item.subEn && (
                            <Typography variant="caption" sx={{ color: '#888', fontSize: '10.5px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: APP_FONT_FAMILY }}>
                              {isVi ? item.subVi : item.subEn}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#bbb"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg>
                    </Box>
                  );
                })}
              </Box>

              {secIdx === menuSections.length - 1 && (
                <Box
                  onClick={handleLogout}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    p: '8px 12px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    color: '#d81b60',
                    mt: 0.8,
                    mb: 1.5,
                    transition: 'background-color 0.15s',
                    '&:hover': { backgroundColor: '#fce4ec' },
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                  <Typography sx={{ fontWeight: 800, fontSize: '13px', color: '#d81b60', fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? 'Đăng xuất' : 'Logout'}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* CỘT PHẢI: WORKSPACE */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #eeeeee',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            position: 'relative',
            p: 4,
          }}
        >
          {/* RB-040: NÚT BACK TO PROFILE HUB KHI ĐANG Ở SUB-TAB */}
          {selectedSubTab && (
            <Box sx={{ position: 'absolute', top: 24, left: 24, zIndex: 5 }}>
              <IconButton
                onClick={() => setSelectedSubTab(null)}
                size="small"
                sx={{
                  color: '#111',
                  backgroundColor: '#f5f5f5',
                  '&:hover': { backgroundColor: '#e5e5e5' },
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </IconButton>
            </Box>
          )}

          {/* RB-029: PERSONAL INFO */}
          {selectedSubTab === 'personal-profile' ? (
            <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Hồ sơ' : 'Profile'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.8px', color: '#888', fontSize: '11px', textTransform: 'uppercase', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'THÔNG TIN CÁ NHÂN' : 'Personal information'}
                </Typography>

                <TextField fullWidth size="small" label={isVi ? 'Tên thường gọi' : 'Chosen Name'} value={personalInfo.chosenName} onChange={(e) => setPersonalInfo({ ...personalInfo, chosenName: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField fullWidth size="small" label={isVi ? 'Tên *' : 'First Name *'} value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                  <TextField fullWidth size="small" label={isVi ? 'Họ & Tên đệm *' : 'Last Name *'} value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                </Box>

                <TextField fullWidth size="small" label={isVi ? 'Số điện thoại' : 'Phone Number'} value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                <TextField fullWidth size="small" label={isVi ? 'Email *' : 'Email *'} value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label={isVi ? 'Ngày sinh *' : 'Date of Birth *'}
                    value={personalInfo.dob}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#777"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }}
                  />

                  <FormControl fullWidth size="small">
                    <Select value={personalInfo.pronouns} onChange={(e) => setPersonalInfo({ ...personalInfo, pronouns: e.target.value })} displayEmpty sx={{ borderRadius: '12px', fontSize: '14px' }}>
                      <MenuItem value="He/Him">He/Him</MenuItem>
                      <MenuItem value="She/Her">She/Her</MenuItem>
                      <MenuItem value="They/Them">They/Them</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, mt: 3 }}>
                  <Button variant="outlined" onClick={() => setSelectedSubTab(null)} sx={{ borderRadius: 50, py: 1.1, borderColor: '#e0e0e0', color: '#666', fontWeight: 700, fontSize: '14px', textTransform: 'none', '&:hover': { borderColor: '#111', color: '#111' } }}>
                    {isVi ? 'Hủy' : 'Cancel'}
                  </Button>
                  <Button variant="contained" disableElevation onClick={handleSavePersonalInfo} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff', fontWeight: 700, fontSize: '14px', textTransform: 'none', '&:hover': { backgroundColor: '#333' } }}>
                    {isVi ? 'Cập nhật' : 'Update'}
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : selectedSubTab === 'gov-id' ? (
            /* RB-030: UPLOAD GOVERNMENT ID */
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Tải lên giấy tờ tùy thân' : 'Upload ID'}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: '#555', textAlign: 'center', fontSize: '12.5px', maxWidth: 650, mx: 'auto', mb: 3.5, lineHeight: 1.5, fontFamily: APP_FONT_FAMILY }}>
                {isVi
                  ? 'Để phục vụ mục đích xác minh danh tính y tế, chúng tôi cần ảnh chụp Căn cước công dân (CCCD), Hộ chiếu hoặc Bằng lái xe của bạn.'
                  : "For identification purposes, we need a photo of your government-issued ID such as a national ID card (CCCD), passport, or driver's license."}
              </Typography>

              <Box sx={{ border: '1.5px dashed #cccccc', borderRadius: '20px', p: { xs: 3, sm: '36px 40px' }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: '#ffffff', mb: 4 }}>
                <Typography sx={{ position: 'absolute', top: -11, left: 24, backgroundColor: '#ffffff', px: 1, fontSize: '11px', fontWeight: 700, color: '#777' }}>
                  {isVi ? 'Ảnh CCCD / Giấy tờ tùy thân' : 'Photo of Government Issued ID'}
                </Typography>

                {idImage ? (
                  <Box component="img" src={idImage} alt="Government ID" sx={{ width: '100%', maxWidth: 380, maxHeight: 230, borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: '1px solid #e0e0e0', mb: 2.5 }} />
                ) : (
                  <Box sx={{ width: 280, height: 180, borderRadius: '12px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5, color: '#999' }}>
                    <Typography sx={{ fontSize: '13px' }}>No ID uploaded</Typography>
                  </Box>
                )}

                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <Typography onClick={() => fileInputRef.current?.click()} sx={{ fontSize: '13px', fontWeight: 700, color: '#111', textDecoration: 'underline', cursor: 'pointer', '&:hover': { color: '#d81b60' } }}>
                  {isVi ? 'Tải lên hình ảnh mới' : 'Upload new image'}
                </Typography>
              </Box>

              <Button fullWidth variant="contained" disableElevation onClick={handleSaveId} sx={{ borderRadius: 50, py: 1.2, backgroundColor: '#e0e0e0', color: '#444', fontWeight: 700, fontSize: '14px', textTransform: 'none', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>
                {isVi ? 'Lưu' : 'Save'}
              </Button>
            </Box>
          ) : selectedSubTab === 'address' ? (
            /* RB-031: ADDRESS */
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Địa chỉ' : 'Address'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <FormControl fullWidth size="small">
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Múi giờ *' : 'Timezone *'}</Typography>
                    <Select value={addressData.timezone} onChange={(e) => setAddressData({ ...addressData, timezone: e.target.value })} sx={{ borderRadius: '12px', fontSize: '14px' }}>
                      <MenuItem value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7 - Vietnam)</MenuItem>
                      <MenuItem value="America/Detroit">America/Detroit (EST)</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', mt: 0.5 }}>
                    {isVi ? 'Để chúng tôi có thể hiển thị khung giờ tư vấn/khám phù hợp với bạn.' : 'So we can show you available appointment times.'}
                  </Typography>
                </Box>

                <Typography sx={{ fontWeight: 800, fontSize: '13px', color: '#111', mt: 1 }}>{isVi ? 'Địa chỉ nơi ở' : 'Home Address'}</Typography>
                <TextField fullWidth size="small" label={isVi ? 'Số nhà, Tên đường *' : 'Address *'} value={addressData.streetAddress} onChange={(e) => setAddressData({ ...addressData, streetAddress: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                <TextField fullWidth size="small" label={isVi ? 'Phường / Xã (hoặc Tòa nhà, Căn hộ)' : 'Ward / Apt, Suite'} value={addressData.aptSuite} onChange={(e) => setAddressData({ ...addressData, aptSuite: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                <TextField fullWidth size="small" label={isVi ? 'Quận / Huyện / Thị xã *' : 'District / City *'} value={addressData.cityDistrict} onChange={(e) => setAddressData({ ...addressData, cityDistrict: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 2 }}>
                  <TextField fullWidth size="small" label={isVi ? 'Tỉnh / Thành phố *' : 'Province / State *'} value={addressData.province} onChange={(e) => setAddressData({ ...addressData, province: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                  <TextField fullWidth size="small" label={isVi ? 'Mã bưu chính' : 'Postal Code'} value={addressData.postalCode} onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                </Box>

                <FormControlLabel
                  control={<Checkbox checked={addressData.useAsShipping} onChange={(e) => setAddressData({ ...addressData, useAsShipping: e.target.checked })} size="small" sx={{ color: '#222', '&.Mui-checked': { color: '#111' } }} />}
                  label={<Typography sx={{ fontSize: '12.5px', color: '#333' }}>{isVi ? 'Tôi muốn sử dụng địa chỉ này làm địa chỉ nhận gói thuốc / dụng cụ xét nghiệm kín đáo.' : "I'd like to use this as my discreet shipping address for labs/medications."}</Typography>}
                />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, mt: 3 }}>
                  <Button variant="outlined" onClick={() => setSelectedSubTab(null)} sx={{ borderRadius: 50, py: 1.1, borderColor: '#e0e0e0', color: '#666', fontWeight: 700, fontSize: '14px', textTransform: 'none', '&:hover': { borderColor: '#111', color: '#111' } }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
                  <Button variant="contained" disableElevation onClick={handleSaveAddress} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff', fontWeight: 700, fontSize: '14px', textTransform: 'none', '&:hover': { backgroundColor: '#333' } }}>{isVi ? 'Cập nhật' : 'Update'}</Button>
                </Box>
              </Box>
            </Box>
          ) : selectedSubTab === 'insurance' ? (
            /* RB-032: INSURANCE */
            <Box sx={{ width: '100%', maxWidth: 760, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Bảo hiểm y tế' : 'Insurance'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                {insuranceList.map((ins) => (
                  <Card
                    key={ins.id}
                    sx={{
                      p: '20px 24px',
                      borderRadius: '16px',
                      backgroundColor: '#fafafa',
                      border: '1px solid #eeeeee',
                      boxShadow: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      '&:hover': { backgroundColor: '#f5f5f5', borderColor: '#e0e0e0' },
                    }}
                  >
                    <Box sx={{ flex: 1, pr: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.8 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '15px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
                          {ins.providerName}
                        </Typography>
                        <Chip
                          label={ins.insuranceType === 'BHYT' ? (isVi ? 'BHYT Nhà nước' : 'National Health (BHYT)') : (isVi ? 'Bảo hiểm Thương mại' : 'Private Health')}
                          size="small"
                          sx={{
                            backgroundColor: ins.insuranceType === 'BHYT' ? '#e3f2fd' : '#f3e5f5',
                            color: ins.insuranceType === 'BHYT' ? '#1565c0' : '#7b1fa2',
                            fontWeight: 700,
                            fontSize: '10px',
                            height: 20,
                            borderRadius: '6px',
                          }}
                        />
                        <Chip
                          label={ins.status === 'active' ? (isVi ? 'Hiệu lực' : 'Active') : (isVi ? 'Hết hạn' : 'Expired')}
                          size="small"
                          sx={{
                            backgroundColor: ins.status === 'active' ? '#e8f5e9' : '#ffebee',
                            color: ins.status === 'active' ? '#2e7d32' : '#c62828',
                            fontWeight: 700,
                            fontSize: '10px',
                            height: 20,
                            borderRadius: '6px',
                          }}
                        />
                      </Box>

                      <Typography variant="body2" sx={{ color: '#444', fontSize: '13px', fontFamily: APP_FONT_FAMILY, mb: 0.3 }}>
                        <span style={{ color: '#777', fontWeight: 600 }}>ID Number:</span>{' '}
                        <strong style={{ letterSpacing: '0.5px' }}>{ins.cardNumber}</strong>
                        <span style={{ marginLeft: 16, color: '#777' }}>Insured Name:</span> <strong>{ins.insuredName}</strong>
                      </Typography>

                      <Typography variant="caption" sx={{ color: '#666', fontSize: '11.5px', display: 'block', fontFamily: APP_FONT_FAMILY }}>
                        {isVi ? 'Nơi ĐKKCB ban đầu: ' : 'Initial Hospital: '}
                        <strong>{ins.initialHospital}</strong>
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => handleOpenEditInsurance(ins)} sx={{ color: '#555', '&:hover': { color: '#111', backgroundColor: 'rgba(0,0,0,0.04)' } }}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteInsurance(ins.id)} sx={{ color: '#d81b60', '&:hover': { color: '#c2185b', backgroundColor: '#fce4ec' } }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                      </IconButton>
                    </Box>
                  </Card>
                ))}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" disableElevation onClick={handleOpenAddInsurance} sx={{ borderRadius: 50, px: 3.8, py: 1.2, backgroundColor: '#111111', color: '#ffffff', fontWeight: 700, fontSize: '14px', textTransform: 'none', boxShadow: '0 4px 14px rgba(0,0,0,0.15)', '&:hover': { backgroundColor: '#333333' } }}>
                  + {isVi ? 'Thêm thẻ bảo hiểm mới' : 'Add new insurance'}
                </Button>
              </Box>
            </Box>
          ) : selectedSubTab === 'health-assistance' ? (
            /* RB-033: HEALTH ASSISTANCE */
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Hỗ trợ y tế & Co-pay' : 'Health Assistance'}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '12.5px', maxWidth: 680, mx: 'auto', mb: 3.5, lineHeight: 1.5, fontFamily: APP_FONT_FAMILY }}>
                {isVi
                  ? 'Chúng tôi sử dụng thông tin này để xác định các chương trình tài trợ bên ngoài giúp hỗ trợ chi phí chăm sóc và điều trị của bạn.'
                  : "We use this information to determine if there are external programs to help fund your care."}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? '4 số cuối mã định danh / CCCD' : 'Last 4 of Social Security Number'}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={healthAssistanceData.ssnLast4}
                    onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, ssnLast4: e.target.value })}
                    slotProps={{ htmlInput: { maxLength: 4, autoComplete: 'new-password' } }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? 'Thu nhập hộ gia đình' : 'Household Income'}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={healthAssistanceData.householdIncome}
                    onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, householdIncome: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? 'Số thành viên trong gia đình' : 'Number of household members'}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={healthAssistanceData.householdMembers}
                    onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, householdMembers: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <FormControl fullWidth size="small">
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                      {isVi ? 'Hỗ trợ y tế nhà nước (Medicaid)' : 'Medicaid'}
                    </Typography>
                    <Select
                      value={healthAssistanceData.medicaid}
                      onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, medicaid: e.target.value })}
                      sx={{ borderRadius: '12px', fontSize: '14px', fontFamily: APP_FONT_FAMILY }}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                      {isVi ? 'Cựu chiến binh / Chính sách (Veteran)' : 'Veteran'}
                    </Typography>
                    <Select
                      value={healthAssistanceData.veteran}
                      onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, veteran: e.target.value })}
                      sx={{ borderRadius: '12px', fontSize: '14px', fontFamily: APP_FONT_FAMILY }}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? 'Mã hỗ trợ chương trình đặc biệt (Gilead AA#)' : 'Gilead AA#'}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={healthAssistanceData.gileadCode}
                    onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, gileadCode: e.target.value })}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedSubTab(null)}
                    sx={{ borderRadius: 50, py: 1.1, borderColor: '#e0e0e0', color: '#666', fontWeight: 700, fontSize: '14px', textTransform: 'none', fontFamily: APP_FONT_FAMILY, '&:hover': { borderColor: '#111', color: '#111' } }}
                  >
                    {isVi ? 'Hủy' : 'Cancel'}
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleSaveHealthAssistance}
                    sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff', fontWeight: 700, fontSize: '14px', textTransform: 'none', fontFamily: APP_FONT_FAMILY, '&:hover': { backgroundColor: '#333' } }}
                  >
                    {isVi ? 'Cập nhật' : 'Update'}
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : selectedSubTab === 'vitals' ? (
            /* RB-034: VITALS */
            <Box sx={{ width: '100%', maxWidth: 760, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Chỉ số sinh tồn' : 'Vitals'}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '12.5px', maxWidth: 680, mx: 'auto', mb: 3.5, lineHeight: 1.5, fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Theo dõi các chỉ số sinh tồn của bạn theo thời gian' : 'Track your vital signs over time'}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                {/* 1. WEIGHT */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>
                        {isVi ? 'Cân nặng' : 'Weight'} {weightsList.length > 0 ? `(${weightsList.length})` : ''}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', display: 'block', mb: 1 }}>
                        {weightsList.length > 0 ? `${isVi ? 'Gần nhất' : 'Latest'}: ${weightsList[0].value} - ${weightsList[0].date}` : (isVi ? 'Chưa ghi nhận cân nặng' : 'No weight recorded yet')}
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      onClick={() => setShowAddWeight(!showAddWeight)}
                      sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', '&:hover': { backgroundColor: '#f3f4f6' } }}
                    >
                      {isVi ? 'Thêm' : 'Add'}
                    </Button>
                  </Box>

                  {showAddWeight && (
                    <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: '14px', mt: 1, mb: 2 }}>
                      <Box sx={{ mb: 1.5 }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Cân nặng' : 'Weight'}</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder={isVi ? 'Nhập số cân nặng' : 'Weight'}
                          value={newWeightVal}
                          onChange={(e) => setNewWeightVal(e.target.value.replace(/[^0-9.]/g, ''))}
                          slotProps={{
                            input: {
                              endAdornment: <InputAdornment position="end">{isVi ? 'kg' : 'lbs'}</InputAdornment>,
                            },
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px', backgroundColor: '#fff' } }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                        <Button onClick={() => setShowAddWeight(false)} sx={{ color: '#111', fontWeight: 700, textTransform: 'none', fontSize: '13px' }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
                        <Button variant="contained" disableElevation onClick={handleAddWeight} sx={{ backgroundColor: '#e0e0e0', color: '#111', borderRadius: 50, px: 2.5, fontWeight: 700, textTransform: 'none', fontSize: '13px', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>{isVi ? 'Lưu' : 'Add'}</Button>
                      </Box>
                    </Box>
                  )}

                  {weightsList.length > 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                      {weightsList.map((item) => (
                        <Box key={item.id} sx={{ p: '10px 14px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '13.5px', color: '#111' }}>{item.value}</Typography>
                          <Typography variant="caption" sx={{ color: '#888', fontSize: '11px' }}>{item.date}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Card>

                {/* 2. HEIGHT */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>
                        {isVi ? 'Chiều cao' : 'Height'} {heightsList.length > 0 ? `(${heightsList.length})` : ''}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', display: 'block', mb: 1 }}>
                        {heightsList.length > 0 ? `${isVi ? 'Gần nhất' : 'Latest'}: ${heightsList[0].value} - ${heightsList[0].date}` : (isVi ? 'Chưa ghi nhận chiều cao' : 'No height recorded yet')}
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      onClick={() => setShowAddHeight(!showAddHeight)}
                      sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', '&:hover': { backgroundColor: '#f3f4f6' } }}
                    >
                      {isVi ? 'Thêm' : 'Add'}
                    </Button>
                  </Box>

                  {showAddHeight && (
                    <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: '14px', mt: 1, mb: 2 }}>
                      <Box sx={{ mb: 1.5 }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Chiều cao' : 'Height'}</Typography>
                        <FormControl fullWidth size="small">
                          <Select
                            value={newHeightVal}
                            onChange={(e) => setNewHeightVal(e.target.value)}
                            sx={{ borderRadius: '12px', fontSize: '14px', backgroundColor: '#fff' }}
                          >
                            {isVi ? (
                              <>
                                <MenuItem value="150 cm">150 cm</MenuItem>
                                <MenuItem value="155 cm">155 cm</MenuItem>
                                <MenuItem value="160 cm">160 cm</MenuItem>
                                <MenuItem value="163 cm">163 cm</MenuItem>
                                <MenuItem value="165 cm">165 cm</MenuItem>
                                <MenuItem value="168 cm">168 cm</MenuItem>
                                <MenuItem value="170 cm">170 cm</MenuItem>
                                <MenuItem value="175 cm">175 cm</MenuItem>
                              </>
                            ) : (
                              <>
                                <MenuItem value={`5' 1"`}>5' 1" (155 cm)</MenuItem>
                                <MenuItem value={`5' 2"`}>5' 2" (157 cm)</MenuItem>
                                <MenuItem value={`5' 3"`}>5' 3" (160 cm)</MenuItem>
                                <MenuItem value={`5' 4"`}>5' 4" (163 cm)</MenuItem>
                                <MenuItem value={`5' 5"`}>5' 5" (165 cm)</MenuItem>
                                <MenuItem value={`5' 6"`}>5' 6" (168 cm)</MenuItem>
                                <MenuItem value={`5' 7"`}>5' 7" (170 cm)</MenuItem>
                              </>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                        <Button onClick={() => setShowAddHeight(false)} sx={{ color: '#111', fontWeight: 700, textTransform: 'none', fontSize: '13px' }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
                        <Button variant="contained" disableElevation onClick={handleAddHeight} sx={{ backgroundColor: '#e0e0e0', color: '#111', borderRadius: 50, px: 2.5, fontWeight: 700, textTransform: 'none', fontSize: '13px', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>{isVi ? 'Lưu' : 'Add'}</Button>
                      </Box>
                    </Box>
                  )}

                  {heightsList.length > 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                      {heightsList.map((item) => (
                        <Box key={item.id} sx={{ p: '10px 14px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '13.5px', color: '#111' }}>{item.value}</Typography>
                          <Typography variant="caption" sx={{ color: '#888', fontSize: '11px' }}>{item.date}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Card>

                {/* 3. BLOOD PRESSURE */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>
                        {isVi ? 'Huyết áp' : 'Blood Pressure'} {bloodPressureList.length > 0 ? `(${bloodPressureList.length})` : ''}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', display: 'block', mb: 1 }}>
                        {bloodPressureList.length > 0 ? `${isVi ? 'Gần nhất' : 'Latest'}: ${bloodPressureList[0].value} - ${bloodPressureList[0].date}` : (isVi ? 'Chưa ghi nhận chỉ số huyết áp' : 'No blood pressure recorded yet')}
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      onClick={() => setShowAddBP(!showAddBP)}
                      sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', '&:hover': { backgroundColor: '#f3f4f6' } }}
                    >
                      {isVi ? 'Thêm' : 'Add'}
                    </Button>
                  </Box>

                  {showAddBP && (
                    <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: '14px', mt: 1, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Tâm thu' : 'Systolic'}</Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="120"
                            value={bpSystolic}
                            onChange={(e) => setBpSystolic(e.target.value.replace(/[^0-9]/g, ''))}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px', backgroundColor: '#fff' } }}
                          />
                        </Box>
                        <Typography sx={{ mt: 2.5, fontWeight: 700, color: '#888' }}>/</Typography>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Tâm trương' : 'Diastolic'}</Typography>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="80"
                            value={bpDiastolic}
                            onChange={(e) => setBpDiastolic(e.target.value.replace(/[^0-9]/g, ''))}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px', backgroundColor: '#fff' } }}
                          />
                        </Box>
                        <Typography sx={{ mt: 2.5, fontSize: '13px', color: '#666', fontWeight: 600 }}>mmHg</Typography>
                      </Box>

                      <Box sx={{ mb: 1.5 }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Ngày ghi nhận' : 'Date Recorded'}</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={bpDate}
                          onClick={(e) => handleOpenCalendar(e, 'bp')}
                          slotProps={{
                            input: {
                              readOnly: true,
                              sx: { cursor: 'pointer', caretColor: 'transparent' },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleOpenCalendar(e, 'bp'); }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#777"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px', backgroundColor: '#fff', cursor: 'pointer' } }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                        <Button onClick={() => setShowAddBP(false)} sx={{ color: '#111', fontWeight: 700, textTransform: 'none', fontSize: '13px' }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
                        <Button variant="contained" disableElevation onClick={handleAddBP} sx={{ backgroundColor: '#e0e0e0', color: '#111', borderRadius: 50, px: 2.5, fontWeight: 700, textTransform: 'none', fontSize: '13px', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>{isVi ? 'Lưu' : 'Add'}</Button>
                      </Box>
                    </Box>
                  )}

                  {bloodPressureList.length > 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                      {bloodPressureList.map((item) => (
                        <Box key={item.id} sx={{ p: '10px 14px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '13.5px', color: '#111' }}>{item.value}</Typography>
                          <Typography variant="caption" sx={{ color: '#888', fontSize: '11px' }}>{item.date}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Card>

                {/* 4. HEART RATE */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>
                        {isVi ? 'Nhịp tim' : 'Heart Rate'} {heartRateList.length > 0 ? `(${heartRateList.length})` : ''}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', display: 'block', mb: 1 }}>
                        {heartRateList.length > 0 ? `${isVi ? 'Gần nhất' : 'Latest'}: ${heartRateList[0].value} - ${heartRateList[0].date}` : (isVi ? 'Chưa ghi nhận nhịp tim' : 'No heart rate recorded yet')}
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      onClick={() => setShowAddHR(!showAddHR)}
                      sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', '&:hover': { backgroundColor: '#f3f4f6' } }}
                    >
                      {isVi ? 'Thêm' : 'Add'}
                    </Button>
                  </Box>

                  {showAddHR && (
                    <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: '14px', mt: 1, mb: 2 }}>
                      <Box sx={{ mb: 1.5 }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Nhịp tim' : 'Heart Rate'}</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="75"
                          value={hrVal}
                          onChange={(e) => setHrVal(e.target.value.replace(/[^0-9]/g, ''))}
                          slotProps={{
                            input: {
                              endAdornment: <InputAdornment position="end">{isVi ? 'lần/phút' : 'bpm'}</InputAdornment>,
                            },
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px', backgroundColor: '#fff' } }}
                        />
                      </Box>

                      <Box sx={{ mb: 1.5 }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Ngày ghi nhận' : 'Date Recorded'}</Typography>
                        <TextField
                          fullWidth
                          size="small"
                          value={hrDate}
                          onClick={(e) => handleOpenCalendar(e, 'hr')}
                          slotProps={{
                            input: {
                              readOnly: true,
                              sx: { cursor: 'pointer', caretColor: 'transparent' },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleOpenCalendar(e, 'hr'); }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#777"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            },
                          }}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px', backgroundColor: '#fff', cursor: 'pointer' } }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                        <Button onClick={() => setShowAddHR(false)} sx={{ color: '#111', fontWeight: 700, textTransform: 'none', fontSize: '13px' }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
                        <Button variant="contained" disableElevation onClick={handleAddHR} sx={{ backgroundColor: '#e0e0e0', color: '#111', borderRadius: 50, px: 2.5, fontWeight: 700, textTransform: 'none', fontSize: '13px', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>{isVi ? 'Lưu' : 'Add'}</Button>
                      </Box>
                    </Box>
                  )}

                  {heartRateList.length > 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                      {heartRateList.map((item) => (
                        <Box key={item.id} sx={{ p: '10px 14px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '13.5px', color: '#111' }}>{item.value}</Typography>
                          <Typography variant="caption" sx={{ color: '#888', fontSize: '11px' }}>{item.date}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Card>
              </Box>
            </Box>
          ) : selectedSubTab === 'about-me' ? (
            /* RB-035: ABOUT ME (DEMOGRAPHICS & IDENTITY) */
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Thông tin nhân khẩu học' : 'About Me'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* 1. Gender & Born As (2 cột) */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <FormControl fullWidth size="small">
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                      {isVi ? 'Bản dạng giới *' : 'Gender *'}
                    </Typography>
                    <Select
                      value={aboutMeData.gender}
                      onChange={(e) => setAboutMeData({ ...aboutMeData, gender: e.target.value })}
                      sx={{ borderRadius: '12px', fontSize: '14px', fontFamily: APP_FONT_FAMILY }}
                    >
                      <MenuItem value="Male">{isVi ? 'Nam (Male)' : 'Male'}</MenuItem>
                      <MenuItem value="Female">{isVi ? 'Nữ (Female)' : 'Female'}</MenuItem>
                      <MenuItem value="Transgender Male">{isVi ? 'Nam chuyển giới (Trans Male)' : 'Transgender Male'}</MenuItem>
                      <MenuItem value="Transgender Female">{isVi ? 'Nữ chuyển giới (Trans Female)' : 'Transgender Female'}</MenuItem>
                      <MenuItem value="Non-Binary">{isVi ? 'Phi nhị nguyên giới (Non-Binary)' : 'Non-Binary'}</MenuItem>
                      <MenuItem value="Other">{isVi ? 'Khác (Other)' : 'Other'}</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                      {isVi ? 'Giới tính khi sinh *' : 'Born As *'}
                    </Typography>
                    <Select
                      value={aboutMeData.bornAs}
                      onChange={(e) => setAboutMeData({ ...aboutMeData, bornAs: e.target.value })}
                      sx={{ borderRadius: '12px', fontSize: '14px', fontFamily: APP_FONT_FAMILY }}
                    >
                      <MenuItem value="Male">{isVi ? 'Nam (Male)' : 'Male'}</MenuItem>
                      <MenuItem value="Female">{isVi ? 'Nữ (Female)' : 'Female'}</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* 2. Sexuality */}
                <FormControl fullWidth size="small">
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? 'Xu hướng tính dục *' : 'Sexuality *'}
                  </Typography>
                  <Select
                    value={aboutMeData.sexuality}
                    onChange={(e) => setAboutMeData({ ...aboutMeData, sexuality: e.target.value })}
                    sx={{ borderRadius: '12px', fontSize: '14px', fontFamily: APP_FONT_FAMILY }}
                  >
                    <MenuItem value="Straight">{isVi ? 'Dị tính (Straight)' : 'Straight'}</MenuItem>
                    <MenuItem value="Gay">{isVi ? 'Đồng tính nam (Gay)' : 'Gay'}</MenuItem>
                    <MenuItem value="Lesbian">{isVi ? 'Đồng tính nữ (Lesbian)' : 'Lesbian'}</MenuItem>
                    <MenuItem value="Bisexual">{isVi ? 'Song tính (Bisexual)' : 'Bisexual'}</MenuItem>
                    <MenuItem value="Queer">{isVi ? 'Queer' : 'Queer'}</MenuItem>
                    <MenuItem value="Asexual">{isVi ? 'Vô tính (Asexual)' : 'Asexual'}</MenuItem>
                    <MenuItem value="Other">{isVi ? 'Khác' : 'Other'}</MenuItem>
                  </Select>
                </FormControl>

                {/* 3. Relationship Status */}
                <FormControl fullWidth size="small">
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? 'Tình trạng mối quan hệ' : 'Relationship Status'}
                  </Typography>
                  <Select
                    value={aboutMeData.relationshipStatus}
                    onChange={(e) => setAboutMeData({ ...aboutMeData, relationshipStatus: e.target.value })}
                    sx={{ borderRadius: '12px', fontSize: '14px', fontFamily: APP_FONT_FAMILY }}
                  >
                    <MenuItem value="Single">{isVi ? 'Độc thân (Single)' : 'Single'}</MenuItem>
                    <MenuItem value="In a relationship">{isVi ? 'Đang trong mối quan hệ' : 'In a relationship'}</MenuItem>
                    <MenuItem value="Married">{isVi ? 'Đã kết hôn (Married)' : 'Married'}</MenuItem>
                    <MenuItem value="Open Relationship">{isVi ? 'Mối quan hệ mở (Open Relationship)' : 'Open Relationship'}</MenuItem>
                    <MenuItem value="Other">{isVi ? 'Khác' : 'Other'}</MenuItem>
                  </Select>
                </FormControl>

                {/* 4. Race */}
                <FormControl fullWidth size="small">
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? 'Chủng tộc *' : 'Race *'}
                  </Typography>
                  <Select
                    value={aboutMeData.race}
                    onChange={(e) => setAboutMeData({ ...aboutMeData, race: e.target.value })}
                    sx={{ borderRadius: '12px', fontSize: '14px', fontFamily: APP_FONT_FAMILY }}
                  >
                    <MenuItem value="Asian">{isVi ? 'Châu Á (Asian)' : 'Asian'}</MenuItem>
                    <MenuItem value="White">{isVi ? 'Người da trắng (White)' : 'White'}</MenuItem>
                    <MenuItem value="Black or African American">{isVi ? 'Người da đen / Gốc Phi' : 'Black or African American'}</MenuItem>
                    <MenuItem value="American Indian or Alaska Native">{isVi ? 'Người bản địa Châu Mỹ' : 'American Indian or Alaska Native'}</MenuItem>
                    <MenuItem value="Other">{isVi ? 'Khác' : 'Other'}</MenuItem>
                  </Select>
                </FormControl>

                {/* 5. Ethnicity */}
                <FormControl fullWidth size="small">
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5, fontFamily: APP_FONT_FAMILY }}>
                    {isVi ? 'Dân tộc *' : 'Ethnicity *'}
                  </Typography>
                  <Select
                    value={aboutMeData.ethnicity}
                    onChange={(e) => setAboutMeData({ ...aboutMeData, ethnicity: e.target.value })}
                    sx={{ borderRadius: '12px', fontSize: '14px', fontFamily: APP_FONT_FAMILY }}
                  >
                    <MenuItem value="Not Hispanic or Latino">{isVi ? 'Không phải Hispanic / Latino' : 'Not Hispanic or Latino'}</MenuItem>
                    <MenuItem value="Hispanic or Latino">{isVi ? 'Hispanic hoặc Latino' : 'Hispanic or Latino'}</MenuItem>
                    <MenuItem value="Vietnamese">{isVi ? 'Dân tộc Kinh / Việt Nam' : 'Vietnamese'}</MenuItem>
                    <MenuItem value="Other">{isVi ? 'Khác' : 'Other'}</MenuItem>
                  </Select>
                </FormControl>

                {/* Buttons */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedSubTab(null)}
                    sx={{ borderRadius: 50, py: 1.1, borderColor: '#e0e0e0', color: '#666', fontWeight: 700, fontSize: '14px', textTransform: 'none', fontFamily: APP_FONT_FAMILY, '&:hover': { borderColor: '#111', color: '#111' } }}
                  >
                    {isVi ? 'Hủy' : 'Cancel'}
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleSaveAboutMe}
                    sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff', fontWeight: 700, fontSize: '14px', textTransform: 'none', fontFamily: APP_FONT_FAMILY, '&:hover': { backgroundColor: '#333' } }}
                  >
                    {isVi ? 'Cập nhật' : 'Update'}
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : selectedSubTab === 'pcp' ? (
            /* RB-036: PRIMARY CARE PROVIDER (PCP) */
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Bác sĩ chăm sóc ban đầu' : 'Primary Care Provider'}
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSavePcp} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* 1. Clinic */}
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Clinic"
                    value={pcpData.clinic}
                    onChange={(e) => handlePcpChange('clinic', e.target.value)}
                    error={Boolean(pcpErrors.clinic)}
                    helperText={pcpErrors.clinic}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        fontFamily: APP_FONT_FAMILY,
                        '& fieldset': { borderColor: '#d1d5db' },
                        '&:hover fieldset': { borderColor: '#9ca3af' },
                        '&.Mui-focused fieldset': { borderColor: '#111' },
                      },
                      '& .MuiOutlinedInput-input': {
                        py: 1.6,
                        px: 2,
                        fontSize: '14.5px',
                        color: '#1f2937',
                      },
                    }}
                  />
                </Box>

                {/* 2. Provider Name */}
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Provider Name"
                    value={pcpData.providerName}
                    onChange={(e) => handlePcpChange('providerName', e.target.value)}
                    error={Boolean(pcpErrors.providerName)}
                    helperText={pcpErrors.providerName}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        fontFamily: APP_FONT_FAMILY,
                        '& fieldset': { borderColor: '#d1d5db' },
                        '&:hover fieldset': { borderColor: '#9ca3af' },
                        '&.Mui-focused fieldset': { borderColor: '#111' },
                      },
                      '& .MuiOutlinedInput-input': {
                        py: 1.6,
                        px: 2,
                        fontSize: '14.5px',
                        color: '#1f2937',
                      },
                    }}
                  />
                </Box>

                {/* 3. Address */}
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Address"
                    value={pcpData.address}
                    onChange={(e) => handlePcpChange('address', e.target.value)}
                    error={Boolean(pcpErrors.address)}
                    helperText={pcpErrors.address}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        fontFamily: APP_FONT_FAMILY,
                        '& fieldset': { borderColor: '#d1d5db' },
                        '&:hover fieldset': { borderColor: '#9ca3af' },
                        '&.Mui-focused fieldset': { borderColor: '#111' },
                      },
                      '& .MuiOutlinedInput-input': {
                        py: 1.6,
                        px: 2,
                        fontSize: '14.5px',
                        color: '#1f2937',
                      },
                    }}
                  />
                </Box>

                {/* 4. Phone Number */}
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Phone Number"
                    value={pcpData.phone}
                    onChange={(e) => handlePcpChange('phone', e.target.value)}
                    error={Boolean(pcpErrors.phone)}
                    helperText={pcpErrors.phone}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        fontFamily: APP_FONT_FAMILY,
                        '& fieldset': { borderColor: '#d1d5db' },
                        '&:hover fieldset': { borderColor: '#9ca3af' },
                        '&.Mui-focused fieldset': { borderColor: '#111' },
                      },
                      '& .MuiOutlinedInput-input': {
                        py: 1.6,
                        px: 2,
                        fontSize: '14.5px',
                        color: '#1f2937',
                      },
                    }}
                  />
                </Box>

                {/* Action Buttons: Cancel & Update */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, mt: 3 }}>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancelPcp}
                    sx={{
                      borderRadius: 50,
                      py: 1.3,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '15px',
                      fontFamily: APP_FONT_FAMILY,
                      color: '#666',
                      borderColor: '#e0e0e0',
                      '&:hover': { borderColor: '#bbb', backgroundColor: '#fafafa' },
                    }}
                  >
                    {isVi ? 'Hủy' : 'Cancel'}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    sx={{
                      borderRadius: 50,
                      py: 1.3,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '15px',
                      fontFamily: APP_FONT_FAMILY,
                      backgroundColor: '#e5e7eb',
                      color: '#374151',
                      '&:hover': {
                        backgroundColor: '#111',
                        color: '#fff',
                      },
                    }}
                  >
                    {isVi ? 'Cập nhật' : 'Update'}
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : selectedSubTab === 'language' ? (
            /* RB-037: SETTINGS / LANGUAGE */
            <Box sx={{ width: '100%', maxWidth: 650, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Ngôn ngữ' : 'Language'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4, pl: { xs: 1, sm: 4 } }}>
                {languageOptions.map((lang) => (
                  <Box
                    key={lang}
                    onClick={() => setSelectedLanguageSetting(lang)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      cursor: 'pointer',
                      py: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        border: selectedLanguageSetting === lang ? '5px solid #111' : '2px solid #bbb',
                        backgroundColor: '#fff',
                        boxSizing: 'border-box',
                        transition: 'all 0.15s ease',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14.5px',
                        color: '#222',
                        fontFamily: APP_FONT_FAMILY,
                        fontWeight: selectedLanguageSetting === lang ? 600 : 400,
                      }}
                    >
                      {lang}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={handleSaveLanguageSetting}
                sx={{
                  borderRadius: 50,
                  py: 1.3,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  fontFamily: APP_FONT_FAMILY,
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#111',
                    color: '#fff',
                  },
                }}
              >
                {isVi ? 'Lưu' : 'Save'}
              </Button>
            </Box>
          ) : selectedSubTab === 'notifications' ? (
            /* RB-038: SETTINGS / NOTIFICATIONS */
            <Box sx={{ width: '100%', maxWidth: 650, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Thông báo' : 'Notifications'}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  textAlign: 'center',
                  fontSize: '13px',
                  maxWidth: 580,
                  mx: 'auto',
                  mb: 3.5,
                  lineHeight: 1.5,
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                {isVi
                  ? 'Chúng tôi chỉ gửi thông báo cho bạn về những thông tin quan trọng liên quan đến tài khoản và tình hình chăm sóc y tế của bạn.'
                  : 'We only send notifications to you regarding important information about your account and healthcare.'}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, pl: { xs: 1, sm: 4 } }}>
                {([
                  { key: 'Text and Email', labelEn: 'Text and Email', labelVi: 'Tin nhắn SMS và Email' },
                  { key: 'Email', labelEn: 'Email', labelVi: 'Email' },
                  { key: 'Text', labelEn: 'Text', labelVi: 'Tin nhắn SMS (Text)' },
                ] as const).map((opt) => (
                  <Box
                    key={opt.key}
                    onClick={() => setNotificationPref(opt.key)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      cursor: 'pointer',
                      py: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        border: notificationPref === opt.key ? '5px solid #111' : '2px solid #bbb',
                        backgroundColor: '#fff',
                        boxSizing: 'border-box',
                        transition: 'all 0.15s ease',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14.5px',
                        color: '#222',
                        fontFamily: APP_FONT_FAMILY,
                        fontWeight: notificationPref === opt.key ? 600 : 400,
                      }}
                    >
                      {isVi ? opt.labelVi : opt.labelEn}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={handleSaveNotificationPref}
                sx={{
                  borderRadius: 50,
                  py: 1.3,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  fontFamily: APP_FONT_FAMILY,
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#111',
                    color: '#fff',
                  },
                }}
              >
                {isVi ? 'Lưu' : 'Save'}
              </Button>
            </Box>
          ) : selectedSubTab === 'contact-preference' ? (
            /* RB-039: SETTINGS / CONTACT PREFERENCE */
            <Box sx={{ width: '100%', maxWidth: 650, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Phương thức liên lạc ưu tiên' : 'Contact Preference'}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  textAlign: 'center',
                  fontSize: '13.5px',
                  maxWidth: 600,
                  mx: 'auto',
                  mb: 1.5,
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                {isVi
                  ? 'Vui lòng cho chúng tôi biết cách tốt nhất để liên hệ với bạn'
                  : 'Please let us know the best way to contact you'}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#777',
                  textAlign: 'center',
                  fontSize: '12.5px',
                  maxWidth: 600,
                  mx: 'auto',
                  mb: 4,
                  lineHeight: 1.5,
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                {isVi
                  ? 'Đội ngũ của chúng tôi có thể liên hệ liên quan đến việc chăm sóc của bạn hoặc nếu cần thêm thông tin cho tài khoản, đơn thuốc hoặc kết quả xét nghiệm.'
                  : 'Our team may reach out regarding your care or if additional information is needed for your account, prescriptions, or lab work.'}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, mb: 4 }}>
                {([
                  { key: 'Email', labelEn: 'Email', labelVi: 'Email' },
                  { key: 'Phone', labelEn: 'Phone', labelVi: 'Điện thoại (Phone)' },
                ] as const).map((opt) => (
                  <Box
                    key={opt.key}
                    onClick={() => setContactPref(opt.key)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      cursor: 'pointer',
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        border: contactPref === opt.key ? '5px solid #111' : '2px solid #bbb',
                        backgroundColor: '#fff',
                        boxSizing: 'border-box',
                        transition: 'all 0.15s ease',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '14.5px',
                        color: '#222',
                        fontFamily: APP_FONT_FAMILY,
                        fontWeight: contactPref === opt.key ? 600 : 400,
                      }}
                    >
                      {isVi ? opt.labelVi : opt.labelEn}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={handleSaveContactPref}
                sx={{
                  borderRadius: 50,
                  py: 1.3,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  fontFamily: APP_FONT_FAMILY,
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  '&:hover': {
                    backgroundColor: '#111',
                    color: '#fff',
                  },
                }}
              >
                {isVi ? 'Lưu' : 'Save'}
              </Button>
            </Box>
          ) : selectedSubTab === 'faq' ? (
            /* RB-040: SUPPORT / FAQ & CONTACT SUPPORT ACCORDION */
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  F.A.Q.
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{
                  color: '#666',
                  textAlign: 'center',
                  fontSize: '13px',
                  mb: 4,
                  fontFamily: APP_FONT_FAMILY,
                }}
              >
                {isVi
                  ? 'Bạn có thắc mắc? Hãy duyệt các câu hỏi thường gặp bên dưới hoặc '
                  : 'Have questions? Browse our FAQ below or '}
                <Typography
                  component="span"
                  onClick={() => setOpenSupportModal(true)}
                  sx={{
                    color: '#111',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: APP_FONT_FAMILY,
                    '&:hover': { color: '#d81b60' },
                  }}
                >
                  {isVi ? 'liên hệ trực tiếp đội ngũ hỗ trợ' : 'reach out to our support team'}
                </Typography>
                .
              </Typography>

              {/* Nhóm theo từng Category */}
              {Array.from(new Set(FAQ_LIST.map((item) => item.categoryEn))).map((categoryKey) => {
                const items = FAQ_LIST.filter((i) => i.categoryEn === categoryKey);
                const categoryTitle = isVi ? items[0].categoryVi : items[0].categoryEn;

                return (
                  <Box key={categoryKey} sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 800,
                        letterSpacing: '0.8px',
                        color: '#888',
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        fontFamily: APP_FONT_FAMILY,
                        display: 'block',
                        mb: 1.2,
                        px: 0.5,
                      }}
                    >
                      {categoryTitle}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                      {items.map((faq) => {
                        const isOpen = expandedFaqId === faq.id;
                        return (
                          <Card
                            key={faq.id}
                            sx={{
                              p: '14px 18px',
                              borderRadius: '14px',
                              backgroundColor: '#fbfbfb',
                              border: '1px solid #eeeeee',
                              boxShadow: 'none',
                              transition: 'all 0.15s ease',
                              '&:hover': { backgroundColor: '#f7f7f7', borderColor: '#e0e0e0' },
                            }}
                          >
                            <Box
                              onClick={() => setExpandedFaqId(isOpen ? null : faq.id)}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                userSelect: 'none',
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ color: '#555', display: 'flex', alignItems: 'center' }}>
                                  {faq.icon}
                                </Box>
                                <Typography sx={{ fontSize: '13.5px', fontWeight: 700, color: '#111', fontFamily: APP_FONT_FAMILY }}>
                                  {isVi ? faq.questionVi : faq.questionEn}
                                </Typography>
                              </Box>

                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="#777"
                                style={{
                                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s ease',
                                }}
                              >
                                <path d="M7 10l5 5 5-5z" />
                              </svg>
                            </Box>

                            <Collapse in={isOpen}>
                              <Box sx={{ mt: 1.5, pt: 1.2, borderTop: '1px solid #f0f0f0' }}>
                                <Typography sx={{ fontSize: '13px', color: '#555', lineHeight: 1.6, fontFamily: APP_FONT_FAMILY }}>
                                  {isVi ? faq.answerVi : faq.answerEn}
                                </Typography>
                              </Box>
                            </Collapse>
                          </Card>
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : selectedSubTab === 'health-history' ? (
            /* HEALTH HISTORY */
            <Box sx={{ width: '100%', pt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Lịch sử sức khỏe' : 'Health History'}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '12.5px', maxWidth: 680, mx: 'auto', mb: 3.5, lineHeight: 1.5, fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Vui lòng dành chút thời gian xem lại Lịch sử sức khỏe của bạn bên dưới. Nếu có bất kỳ thông tin mới nào chưa hiển thị, bạn có thể bổ sung thêm.' : "Please take a moment to review your Health History as displayed below. If there's any new information that isn't currently shown, feel free to add it."}
              </Typography>

              <Box sx={{ maxWidth: 760, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                {/* ALLERGIES */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>
                        {allergiesList.length === 0 ? (isVi ? 'Không ghi nhận dị ứng' : 'No Allergies reported') : (isVi ? `Dị ứng (${allergiesList.length})` : `Allergies (${allergiesList.length})`)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', display: 'block', mb: 1 }}>
                        {allergiesList.length === 0 ? (isVi ? 'Nếu bạn không có dị ứng nào, vui lòng xác nhận bên dưới' : "If you don't have any known Allergies, please confirm below") : (isVi ? 'Danh sách dị ứng đã ghi nhận' : 'Recorded allergies in chart')}
                      </Typography>
                      {allergiesList.length === 0 ? (
                        <FormControlLabel control={<Checkbox checked={noAllergies} onChange={(e) => setNoAllergies(e.target.checked)} size="small" sx={{ color: '#222', '&.Mui-checked': { color: '#111' } }} />} label={<Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>{isVi ? 'Tôi không có bất kỳ dị ứng nào' : "I don't have any known Allergies"}</Typography>} />
                      ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                          {allergiesList.map((alg, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '10px 14px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                              <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#111' }}>{alg.name}</Typography>
                                <Typography variant="caption" sx={{ color: '#666', fontSize: '11.5px' }}>{isVi ? 'Phản ứng:' : 'Reaction:'} {alg.reaction || (isVi ? 'Không' : 'None')}</Typography>
                              </Box>
                              {alg.severity && <Box sx={{ backgroundColor: alg.severity === 'Severe' ? '#fee2e2' : alg.severity === 'Moderate' ? '#fef3c7' : '#e0f2fe', color: alg.severity === 'Severe' ? '#b91c1c' : alg.severity === 'Moderate' ? '#b45309' : '#0369a1', px: 1.2, py: 0.3, borderRadius: '8px', fontWeight: 700, fontSize: '11px' }}>{alg.severity}</Box>}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Button variant="text" onClick={handleOpenAllergy} sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', ml: 2, '&:hover': { backgroundColor: '#f3f4f6' } }}>{isVi ? 'Thêm' : 'Add'}</Button>
                  </Box>
                </Card>

                {/* MEDICATIONS */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box onClick={() => setOpenMedications(!openMedications)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', flex: 1 }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>{isVi ? 'Thuốc đang dùng' : 'Medications'} ({medicationsList.length})</Typography>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#777" style={{ transform: openMedications ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><path d="M7 10l5 5 5-5z" /></svg>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px' }}>{isVi ? 'Cập nhật lần cuối: 15 Tháng 10, 2025' : 'Last updated: October 15, 2025'}</Typography>
                      </Box>
                    </Box>
                    <Button variant="text" onClick={handleOpenMedication} sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', '&:hover': { backgroundColor: '#f3f4f6' } }}>{isVi ? 'Thêm' : 'Add'}</Button>
                  </Box>
                  <Collapse in={openMedications}>
                    <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {medicationsList.map((med, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '8px 12px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#43a047' }} />
                            <Box>
                              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>{med.name}</Typography>
                              {(med.frequency || med.dosage) && <Typography variant="caption" sx={{ color: '#777', fontSize: '11px' }}>{med.frequency} {med.dosage ? `• ${med.dosage}` : ''} {med.reason ? `• ${med.reason}` : ''}</Typography>}
                            </Box>
                          </Box>
                          {med.year && <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>{med.year}</Typography>}
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </Card>

                {/* CONDITIONS */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box onClick={() => setOpenConditions(!openConditions)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', flex: 1 }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>{isVi ? 'Tình trạng bệnh lý' : 'Conditions'} ({conditionsList.length})</Typography>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#777" style={{ transform: openConditions ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><path d="M7 10l5 5 5-5z" /></svg>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px' }}>{isVi ? 'Cập nhật lần cuối: 15 Tháng 10, 2025' : 'Last updated: October 15, 2025'}</Typography>
                      </Box>
                    </Box>
                    <Button variant="text" onClick={handleOpenCondition} sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', '&:hover': { backgroundColor: '#f3f4f6' } }}>{isVi ? 'Thêm' : 'Add'}</Button>
                  </Box>
                  <Collapse in={openConditions}>
                    <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {conditionsList.map((cond, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '8px 12px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#0288d1' }} />
                            <Typography sx={{ fontSize: '13px', color: '#333' }}>{cond.name}</Typography>
                          </Box>
                          {cond.year && <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>{cond.year}</Typography>}
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </Card>

                {/* SURGERIES */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>{surgeriesList.length === 0 ? (isVi ? 'Không có phẫu thuật nào' : 'No Surgeries reported') : (isVi ? `Phẫu thuật (${surgeriesList.length})` : `Surgeries (${surgeriesList.length})`)}</Typography>
                      <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', display: 'block', mb: 1 }}>{surgeriesList.length === 0 ? (isVi ? 'Nếu bạn chưa từng phẫu thuật, vui lòng xác nhận bên dưới' : "If you don't have any known Surgeries, please confirm below") : (isVi ? 'Tiền sử phẫu thuật đã lưu' : 'Recorded surgical history')}</Typography>
                      {surgeriesList.length === 0 ? (
                        <FormControlLabel control={<Checkbox checked={noSurgeries} onChange={(e) => setNoSurgeries(e.target.checked)} size="small" sx={{ color: '#222', '&.Mui-checked': { color: '#111' } }} />} label={<Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>{isVi ? 'Tôi chưa từng phẫu thuật' : "I don't have any known Surgeries"}</Typography>} />
                      ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                          {surgeriesList.map((surg, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '8px 12px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>{surg.name}</Typography>
                              {surg.year && <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>{surg.year}</Typography>}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Button variant="text" onClick={handleOpenSurgery} sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', ml: 2, '&:hover': { backgroundColor: '#f3f4f6' } }}>{isVi ? 'Thêm' : 'Add'}</Button>
                  </Box>
                </Card>

                {/* IMMUNIZATIONS */}
                <Card sx={{ p: '20px 24px', borderRadius: '18px', backgroundColor: '#ffffff', border: '1px solid #eeeeee' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>{immunizationsList.length === 0 ? (isVi ? 'Không ghi nhận tiêm chủng' : 'No Immunizations reported') : (isVi ? `Tiêm chủng (${immunizationsList.length})` : `Immunizations (${immunizationsList.length})`)}</Typography>
                      <Typography variant="caption" sx={{ color: '#888', fontSize: '11.5px', display: 'block', mb: 1 }}>{immunizationsList.length === 0 ? (isVi ? 'Nếu bạn không có lịch tiêm chủng cần ghi nhận, vui lòng xác nhận' : "If you don't have any known Immunizations, please confirm below") : (isVi ? 'Hồ sơ tiêm chủng đã lưu' : 'Recorded immunization history')}</Typography>
                      {immunizationsList.length === 0 ? (
                        <FormControlLabel control={<Checkbox checked={noImmunizations} onChange={(e) => setNoImmunizations(e.target.checked)} size="small" sx={{ color: '#222', '&.Mui-checked': { color: '#111' } }} />} label={<Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>{isVi ? 'Tôi không có tiền sử tiêm chủng cần báo cáo' : "I don't have any known Immunizations"}</Typography>} />
                      ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                          {immunizationsList.map((imz, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '8px 12px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                              <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>{imz.name}</Typography>
                              {imz.year && <Typography variant="caption" sx={{ color: '#888', fontWeight: 600 }}>{imz.year}</Typography>}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                    <Button variant="text" onClick={handleOpenImmunization} sx={{ color: '#111', fontWeight: 700, fontSize: '13px', textTransform: 'none', p: '4px 10px', ml: 2, '&:hover': { backgroundColor: '#f3f4f6' } }}>{isVi ? 'Thêm' : 'Add'}</Button>
                  </Box>
                </Card>
              </Box>
            </Box>
          ) : selectedSubTab ? (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', mb: 1, fontFamily: APP_FONT_FAMILY }}>{isVi ? 'Chi tiết thiết lập' : 'Setting Details'}</Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>{isVi ? `Bạn đang mở mô-đun: ${selectedSubTab}. Dữ liệu đã được nạp thành công.` : `Currently viewing: ${selectedSubTab}. Configuration is active.`}</Typography>
            </Box>
          ) : (
            /* RB-042: MÀN HÌNH TỔNG QUAN PROFILE HUB */
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9e9e9e', gap: 1.5, minHeight: 450 }}>
              <Box sx={{ width: 56, height: 56, borderRadius: '18px', backgroundColor: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </Box>
              <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#888', fontFamily: APP_FONT_FAMILY }}>
                {isVi ? 'Chọn một cài đặt để mở tại đây' : 'Pick a setting to open it here'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* CUSTOM DOB CALENDAR POPOVER */}
      <Popover
        open={Boolean(calendarAnchor)}
        anchorEl={calendarAnchor}
        onClose={handleCloseCalendar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 320,
              p: 2.2,
              borderRadius: '20px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              border: '1px solid #eaeaea',
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box
            onClick={() => setIsYearPickerView(!isYearPickerView)}
            sx={{ display: 'flex', alignItems: 'center', gap: 0.8, cursor: 'pointer', px: 1, py: 0.5, borderRadius: '8px', '&:hover': { bgcolor: '#f5f5f5' } }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: '14.5px', color: '#111', fontFamily: APP_FONT_FAMILY }}>
              {isVi ? `${MONTH_NAMES_VI[viewMonth]} năm ${viewYear}` : `${MONTH_NAMES_EN[viewMonth]} ${viewYear}`}
            </Typography>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#666" style={{ transform: isYearPickerView ? 'rotate(180deg)' : 'none' }}>
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </Box>

          {!isYearPickerView && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="small" onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); } else { setViewMonth(viewMonth - 1); } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#666"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
              </IconButton>
              <IconButton size="small" onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); } else { setViewMonth(viewMonth + 1); } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#666"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
              </IconButton>
            </Box>
          )}
        </Box>

        {isYearPickerView ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, maxHeight: 220, overflowY: 'auto' }}>
            {Array.from({ length: 2026 - 1970 + 1 }, (_, i) => 2026 - i).map((yr) => (
              <Button
                key={yr}
                size="small"
                onClick={() => { setViewYear(yr); setIsYearPickerView(false); }}
                sx={{
                  color: viewYear === yr ? '#fff' : '#333',
                  backgroundColor: viewYear === yr ? '#111' : 'transparent',
                  fontWeight: viewYear === yr ? 800 : 500,
                  fontSize: '12.5px',
                  borderRadius: '10px',
                  py: 0.8,
                  '&:hover': { backgroundColor: viewYear === yr ? '#111' : '#f0f0f0' },
                }}
              >
                {yr}
              </Button>
            ))}
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', mb: 1 }}>
              {(isVi ? ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] : ['S', 'S', 'M', 'T', 'W', 'T', 'F']).map((d, i) => (
                <Typography key={i} sx={{ fontSize: '11.5px', fontWeight: 700, color: '#888' }}>
                  {d}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, textAlign: 'center' }}>
              {Array.from({ length: new Date(viewYear, viewMonth, 1).getDay() }).map((_, i) => (
                <Box key={`empty-${i}`} />
              ))}
              {Array.from({ length: new Date(viewYear, viewMonth + 1, 0).getDate() }, (_, i) => i + 1).map((day) => (
                <Box
                  key={day}
                  onClick={() => handleSelectDay(day)}
                  sx={{
                    p: '6px 0',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    color: '#222',
                    transition: 'all 0.15s',
                    '&:hover': { backgroundColor: '#111', color: '#fff' },
                  }}
                >
                  {day}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Popover>

      {/* MODAL BẢO HIỂM */}
      <Dialog
        open={openInsuranceModal}
        onClose={() => setOpenInsuranceModal(false)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { maxWidth: 720, borderRadius: '24px', overflow: 'hidden', backgroundColor: '#ffffff', boxShadow: '0 24px 60px rgba(0,0,0,0.18)' } } }}
      >
        <DialogTitle sx={{ backgroundColor: '#000000', color: '#ffffff', px: 3.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '15.5px', color: '#fff', fontFamily: APP_FONT_FAMILY }}>
            {editingInsuranceId ? (isVi ? 'Cập nhật thẻ bảo hiểm' : 'Update Insurance') : (isVi ? 'Thêm mới thẻ bảo hiểm' : 'New Insurance')}
          </Typography>
          <IconButton onClick={() => setOpenInsuranceModal(false)} size="small" sx={{ color: '#fff', p: 0.5 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: 3, sm: '28px 36px 20px 36px' } }}>
          <Box component="form" autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
            <Typography sx={{ fontSize: '12px', color: '#555', lineHeight: 1.5, fontFamily: APP_FONT_FAMILY }}>
              {isVi
                ? 'Vui lòng cung cấp thông tin thẻ Bảo hiểm Y tế (BHYT) hoặc Bảo hiểm Sức khỏe tư nhân của bạn để cơ sở y tế đối soát quyền lợi hỗ trợ chi phí khám và thuốc.'
                : 'Please enter your health insurance details. This allows us to verify your co-pay coverage for consultations and medication delivery.'}
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <FormControl fullWidth size="small">
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Loại bảo hiểm *' : 'Insurance Type *'}</Typography>
                <Select value={insuranceForm.insuranceType} onChange={(e) => setInsuranceForm({ ...insuranceForm, insuranceType: e.target.value as 'BHYT' | 'COMMERCIAL' })} sx={{ borderRadius: '12px', fontSize: '13.5px' }}>
                  <MenuItem value="BHYT">{isVi ? 'Bảo hiểm Y tế Nhà nước (BHYT / VssID)' : 'National Health Insurance (BHYT)'}</MenuItem>
                  <MenuItem value="COMMERCIAL">{isVi ? 'Bảo hiểm Sức khỏe Thương mại / Tư nhân' : 'Commercial / Private Health Insurance'}</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>{isVi ? 'Trạng thái thẻ *' : 'Status *'}</Typography>
                <Select value={insuranceForm.status} onChange={(e) => setInsuranceForm({ ...insuranceForm, status: e.target.value as 'active' | 'expired' })} sx={{ borderRadius: '12px', fontSize: '13.5px' }}>
                  <MenuItem value="active">{isVi ? 'Còn hiệu lực (Active)' : 'Active'}</MenuItem>
                  <MenuItem value="expired">{isVi ? 'Hết hạn sử dụng (Expired)' : 'Expired'}</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <TextField
                fullWidth
                size="small"
                error={insuranceError && !insuranceForm.insuredName}
                placeholder={isVi ? 'Họ và tên người tham gia bảo hiểm *' : 'Insured Name *'}
                value={insuranceForm.insuredName}
                onChange={(e) => { setInsuranceForm({ ...insuranceForm, insuredName: e.target.value }); if (e.target.value.trim()) setInsuranceError(false); }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }}
              />
              {insuranceError && !insuranceForm.insuredName && <Typography sx={{ color: '#e91e63', fontSize: '11px', mt: 0.5, ml: 0.5, fontWeight: 500 }}>{isVi ? 'Vui lòng nhập họ tên' : 'Required'}</Typography>}
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  size="small"
                  error={insuranceError && !insuranceForm.cardNumber}
                  placeholder={isVi ? 'Mã số thẻ BHYT (10 hoặc 15 ký tự) *' : 'Insurance ID Number *'}
                  value={insuranceForm.cardNumber}
                  onChange={(e) => setInsuranceForm({ ...insuranceForm, cardNumber: e.target.value.toUpperCase() })}
                  slotProps={{
                    htmlInput: {
                      autoComplete: 'new-password',
                      'data-form-type': 'other',
                    },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }}
                />
                <Typography variant="caption" sx={{ color: '#888', fontSize: '11px', display: 'block', mt: 0.4, ml: 0.5 }}>
                  {isVi ? 'Ví dụ: HS4797921500xxx hoặc 10 chữ số BHXH' : 'e.g., 10 or 15-character insurance ID'}
                </Typography>
              </Box>

              <FormControl fullWidth size="small">
                <Select value={insuranceForm.benefitRate} onChange={(e) => setInsuranceForm({ ...insuranceForm, benefitRate: e.target.value })} sx={{ borderRadius: '12px', fontSize: '13.5px' }}>
                  <MenuItem value="80%">{isVi ? 'Mức 4: Hưởng 80% (Người đi làm, HSSV, Hộ gia đình)' : 'Level 4: 80% (Employed, Students)'}</MenuItem>
                  <MenuItem value="95%">{isVi ? 'Mức 3: Hưởng 95% (Hộ cận nghèo, Bảo trợ XH)' : 'Level 3: 95% (Near-poor, Social assistance)'}</MenuItem>
                  <MenuItem value="100%">{isVi ? 'Mức 2: Hưởng 100% (Hưu trí, Hộ nghèo, Dân tộc thiểu số)' : 'Level 2: 100% (Pensioners, Poor households)'}</MenuItem>
                  <MenuItem value="100% - KTC">{isVi ? 'Mức 1: Hưởng 100% không giới hạn (Công an, Quân đội, Trẻ em)' : 'Level 1: 100% Unlimited (Armed forces, Children)'}</MenuItem>
                  <MenuItem value="100% - ĐB">{isVi ? 'Mức 5: Hưởng 100% trọn đời (Bà mẹ VNAH, Cán bộ lão thành)' : 'Level 5: 100% Special'}</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField fullWidth size="small" placeholder={isVi ? 'Đơn vị phát hành' : 'Insurance Provider Company'} value={insuranceForm.providerName} onChange={(e) => setInsuranceForm({ ...insuranceForm, providerName: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '13.5px' } }} />
              <TextField fullWidth size="small" placeholder={isVi ? 'Nơi đăng ký KCB ban đầu' : 'Initial Registered Hospital / Clinic'} value={insuranceForm.initialHospital} onChange={(e) => setInsuranceForm({ ...insuranceForm, initialHospital: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '13.5px' } }} />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>
                  {isVi ? 'Giá trị sử dụng từ ngày' : 'Valid From'}
                </Typography>
                <TextField fullWidth size="small" value={insuranceForm.validFrom} placeholder="DD/MM/YYYY" onChange={(e) => setInsuranceForm({ ...insuranceForm, validFrom: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '13.5px' } }} />
              </Box>

              <Box>
                <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#777', mb: 0.5 }}>
                  {isVi ? 'Đến ngày' : 'Valid To'}
                </Typography>
                <TextField fullWidth size="small" value={insuranceForm.validTo} placeholder="DD/MM/YYYY" onChange={(e) => setInsuranceForm({ ...insuranceForm, validTo: e.target.value })} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '13.5px' } }} />
              </Box>
            </Box>

            <Box
              onClick={() => frontCardInputRef.current?.click()}
              sx={{ border: '1.5px dashed #ccc', borderRadius: '16px', p: '16px', textAlign: 'center', cursor: 'pointer', position: 'relative', '&:hover': { backgroundColor: '#fafafa' } }}
            >
              <Typography sx={{ position: 'absolute', top: -10, left: 16, backgroundColor: '#fff', px: 1, fontSize: '10.5px', fontWeight: 700, color: '#777' }}>
                {isVi ? 'Ảnh mặt trước thẻ BHYT' : 'Front of Insurance Card / VssID QR'}
              </Typography>
              <Box sx={{ color: '#111', mb: 0.3 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </Box>
              <Typography sx={{ fontSize: '12.5px', fontWeight: 700, color: '#111' }}>{frontCardName ? frontCardName : (isVi ? 'Nhấp để tải lên hoặc kéo thả hình ảnh' : 'Click to upload or drag and drop')}</Typography>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '10.5px', display: 'block', mt: 0.2 }}>SVG, PNG, JPG, JPEG, PDF</Typography>
              <input type="file" accept="image/*,.pdf" ref={frontCardInputRef} style={{ display: 'none' }} onChange={(e) => { if (e.target.files && e.target.files[0]) setFrontCardName(e.target.files[0].name); }} />
            </Box>

            <Box
              onClick={() => backCardInputRef.current?.click()}
              sx={{ border: '1.5px dashed #ccc', borderRadius: '16px', p: '16px', textAlign: 'center', cursor: 'pointer', position: 'relative', '&:hover': { backgroundColor: '#fafafa' } }}
            >
              <Typography sx={{ position: 'absolute', top: -10, left: 16, backgroundColor: '#fff', px: 1, fontSize: '10.5px', fontWeight: 700, color: '#777' }}>
                {isVi ? 'Ảnh mặt sau thẻ BHYT (Tùy chọn)' : 'Back of Insurance Card (Optional)'}
              </Typography>
              <Box sx={{ color: '#111', mb: 0.3 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </Box>
              <Typography sx={{ fontSize: '12.5px', fontWeight: 700, color: '#111' }}>{backCardName ? backCardName : (isVi ? 'Nhấp để tải lên hoặc kéo thả hình ảnh' : 'Click to upload or drag and drop')}</Typography>
              <Typography variant="caption" sx={{ color: '#888', fontSize: '10.5px', display: 'block', mt: 0.2 }}>SVG, PNG, JPG, JPEG, PDF</Typography>
              <input type="file" accept="image/*,.pdf" ref={backCardInputRef} style={{ display: 'none' }} onChange={(e) => { if (e.target.files && e.target.files[0]) setBackCardName(e.target.files[0].name); }} />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: { xs: 3, sm: '36px' }, pb: 3.5, pt: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenInsuranceModal(false)} sx={{ borderRadius: 50, py: 1.1, borderColor: '#e0e0e0', color: '#444', fontWeight: 700, fontSize: '14px', textTransform: 'none', '&:hover': { borderColor: '#111', color: '#111' } }}>
            {isVi ? 'Hủy' : 'Cancel'}
          </Button>
          <Button variant="contained" disableElevation onClick={handleSaveInsurance} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111111', color: '#ffffff', fontWeight: 700, fontSize: '14px', textTransform: 'none', '&:hover': { backgroundColor: '#333333' } }}>
            {isVi ? 'Lưu thông tin' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL ALLERGY */}
      <Dialog open={openAllergyModal} onClose={() => setOpenAllergyModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { maxWidth: 680, borderRadius: '24px', overflow: 'hidden', backgroundColor: '#ffffff' } } }}>
        <DialogTitle sx={{ backgroundColor: '#000000', color: '#ffffff', px: 3.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '15.5px', color: '#fff' }}>{isVi ? 'Thêm dị ứng mới' : 'New Allergy'}</Typography>
          <IconButton onClick={() => setOpenAllergyModal(false)} size="small" sx={{ color: '#fff', p: 0.5 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 3, sm: '32px 42px 40px 42px' }, pt: '24px !important', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box><TextField fullWidth size="small" error={allergyError && !allergyForm.name} placeholder="Name *" value={allergyForm.name} onChange={(e) => setAllergyForm({ ...allergyForm, name: e.target.value })} /></Box>
          <TextField fullWidth size="small" placeholder="Reaction *" value={allergyForm.reaction} onChange={(e) => setAllergyForm({ ...allergyForm, reaction: e.target.value })} />
          <FormControl fullWidth size="small">
            <Select value={allergyForm.severity} onChange={(e) => setAllergyForm({ ...allergyForm, severity: e.target.value })} displayEmpty renderValue={(selected) => (!selected ? <span style={{ color: '#9e9e9e' }}>Severity *</span> : selected)}>
              <MenuItem value="Mild">Mild</MenuItem>
              <MenuItem value="Moderate">Moderate</MenuItem>
              <MenuItem value="Severe">Severe</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 3, sm: '32px' }, pb: 4, pt: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
          <Button variant="outlined" onClick={() => setOpenAllergyModal(false)} sx={{ borderRadius: 50, py: 1.1 }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
          <Button variant="contained" disableElevation onClick={handleSaveAllergy} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#000', color: '#fff' }}>{isVi ? 'Lưu' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL MEDICATION */}
      <Dialog open={openMedicationModal} onClose={() => setOpenMedicationModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { maxWidth: 680, borderRadius: '24px', overflow: 'hidden', backgroundColor: '#ffffff' } } }}>
        <DialogTitle sx={{ backgroundColor: '#000000', color: '#ffffff', px: 3.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '15.5px', color: '#fff' }}>{isVi ? 'Thêm thuốc mới' : 'New Medication'}</Typography>
          <IconButton onClick={() => setOpenMedicationModal(false)} size="small" sx={{ color: '#fff', p: 0.5 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 3, sm: '32px 42px 30px 42px' }, pt: '24px !important', display: 'flex', flexDirection: 'column', gap: 2.2 }}>
          <TextField fullWidth size="small" error={medicationError && !medicationForm.name} placeholder="Name *" value={medicationForm.name} onChange={(e) => setMedicationForm({ ...medicationForm, name: e.target.value })} />
          <TextField fullWidth size="small" placeholder="Frequency *" value={medicationForm.frequency} onChange={(e) => setMedicationForm({ ...medicationForm, frequency: e.target.value })} />
          <TextField fullWidth size="small" placeholder="Dosage" value={medicationForm.dosage} onChange={(e) => setMedicationForm({ ...medicationForm, dosage: e.target.value })} />
          <TextField fullWidth size="small" placeholder="Reason for medication *" value={medicationForm.reason} onChange={(e) => setMedicationForm({ ...medicationForm, reason: e.target.value })} />
          {renderYearField(medicationForm.year, (val) => setMedicationForm({ ...medicationForm, year: val }))}
        </DialogContent>
        <DialogActions sx={{ px: { xs: 3, sm: '32px' }, pb: 4, pt: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
          <Button variant="outlined" onClick={() => setOpenMedicationModal(false)} sx={{ borderRadius: 50, py: 1.1 }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
          <Button variant="contained" disableElevation onClick={handleSaveMedication} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#000', color: '#fff' }}>{isVi ? 'Lưu' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL CONDITION */}
      <Dialog open={openConditionModal} onClose={() => setOpenConditionModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { maxWidth: 680, borderRadius: '24px', overflow: 'hidden', backgroundColor: '#ffffff' } } }}>
        <DialogTitle sx={{ backgroundColor: '#000000', color: '#ffffff', px: 3.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '15.5px', color: '#fff' }}>{isVi ? 'Thêm tình trạng bệnh mới' : 'New Condition'}</Typography>
          <IconButton onClick={() => setOpenConditionModal(false)} size="small" sx={{ color: '#fff', p: 0.5 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 3, sm: '32px 42px 30px 42px' }, pt: '24px !important', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField fullWidth size="small" error={conditionError && !conditionForm.name} placeholder="Name *" value={conditionForm.name} onChange={(e) => setConditionForm({ ...conditionForm, name: e.target.value })} />
          {renderYearField(conditionForm.year, (val) => setConditionForm({ ...conditionForm, year: val }))}
        </DialogContent>
        <DialogActions sx={{ px: { xs: 3, sm: '32px' }, pb: 4, pt: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
          <Button variant="outlined" onClick={() => setOpenConditionModal(false)} sx={{ borderRadius: 50, py: 1.1 }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
          <Button variant="contained" disableElevation onClick={handleSaveCondition} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#000', color: '#fff' }}>{isVi ? 'Lưu' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL SURGERY */}
      <Dialog open={openSurgeryModal} onClose={() => setOpenSurgeryModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { maxWidth: 680, borderRadius: '24px', overflow: 'hidden', backgroundColor: '#ffffff' } } }}>
        <DialogTitle sx={{ backgroundColor: '#000000', color: '#ffffff', px: 3.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '15.5px', color: '#fff' }}>{isVi ? 'Thêm phẫu thuật mới' : 'New Surgery'}</Typography>
          <IconButton onClick={() => setOpenSurgeryModal(false)} size="small" sx={{ color: '#fff', p: 0.5 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 3, sm: '32px 42px 30px 42px' }, pt: '24px !important', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField fullWidth size="small" error={surgeryError && !surgeryForm.name} placeholder="Name *" value={surgeryForm.name} onChange={(e) => setSurgeryForm({ ...surgeryForm, name: e.target.value })} />
          {renderYearField(surgeryForm.year, (val) => setSurgeryForm({ ...surgeryForm, year: val }))}
        </DialogContent>
        <DialogActions sx={{ px: { xs: 3, sm: '32px' }, pb: 4, pt: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
          <Button variant="outlined" onClick={() => setOpenSurgeryModal(false)} sx={{ borderRadius: 50, py: 1.1 }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
          <Button variant="contained" disableElevation onClick={handleSaveSurgery} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#000', color: '#fff' }}>{isVi ? 'Lưu' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL IMMUNIZATION */}
      <Dialog open={openImmunizationModal} onClose={() => setOpenImmunizationModal(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { maxWidth: 680, borderRadius: '24px', overflow: 'hidden', backgroundColor: '#ffffff' } } }}>
        <DialogTitle sx={{ backgroundColor: '#000000', color: '#ffffff', px: 3.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '15.5px', color: '#fff' }}>{isVi ? 'Thêm tiêm chủng mới' : 'New Immunization'}</Typography>
          <IconButton onClick={() => setOpenImmunizationModal(false)} size="small" sx={{ color: '#fff', p: 0.5 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 3, sm: '32px 42px 30px 42px' }, pt: '24px !important', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField fullWidth size="small" error={immunizationError && !immunizationForm.name} placeholder="Name *" value={immunizationForm.name} onChange={(e) => setImmunizationForm({ ...immunizationForm, name: e.target.value })} />
          {renderYearField(immunizationForm.year, (val) => setImmunizationForm({ ...immunizationForm, year: val }))}
        </DialogContent>
        <DialogActions sx={{ px: { xs: 3, sm: '32px' }, pb: 4, pt: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5 }}>
          <Button variant="outlined" onClick={() => setOpenImmunizationModal(false)} sx={{ borderRadius: 50, py: 1.1 }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
          <Button variant="contained" disableElevation onClick={handleSaveImmunization} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#000', color: '#fff' }}>{isVi ? 'Lưu' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      {/* DROPDOWN MENU CHỌN NĂM */}
      <Menu
        anchorEl={yearMenuAnchor}
        open={Boolean(yearMenuAnchor)}
        onClose={() => {
          setYearMenuAnchor(null);
          setActiveYearCallback(null);
        }}
        slotProps={{ paper: { sx: { maxHeight: 240, width: 140, borderRadius: '14px' } } }}
      >
        {availableYears.map((yr) => (
          <MenuItem
            key={yr}
            onClick={() => handleSelectYear(yr)}
            selected={yr === activeYearCurrentVal}
            sx={{
              fontSize: '13.5px',
              justifyContent: 'center',
              fontWeight: yr === activeYearCurrentVal ? 700 : 400,
            }}
          >
            {yr}
          </MenuItem>
        ))}
      </Menu>

      {/* MODAL SUPPORT (CONTACT SUPPORT) */}
      <Dialog open={openSupportModal} onClose={() => setOpenSupportModal(false)} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: '24px', p: { xs: 2.5, sm: '32px 36px' }, backgroundColor: '#ffffff' } } }}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 800, fontSize: '18px', color: '#111', p: 0, mb: 2.5, m: 0 }}>{isVi ? 'Nhắn tin cho Chăm sóc Khách hàng' : 'Message Customer Support'}</DialogTitle>
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar src={rickyAvatarImg} alt="Ricky QCare+" sx={{ width: 46, height: 46, borderRadius: '12px', border: '1px solid #eee', bgcolor: '#8d6e63', color: '#fff' }}>RQ</Avatar>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Ricky QCare+</Typography>
              <Typography variant="caption" sx={{ color: '#777', fontSize: '12px' }}>He/Him</Typography>
            </Box>
          </Box>
          <TextField fullWidth multiline rows={4} placeholder={isVi ? 'Viết nội dung tin nhắn...' : 'Write something...'} value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} />
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenSupportModal(false)} sx={{ borderRadius: 50, py: 1.1 }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
          <Button variant="contained" disableElevation disabled={!supportMessage.trim()} onClick={handleSendSupportMessage} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff' }}>{isVi ? 'Gửi' : 'Send'}</Button>
        </DialogActions>
      </Dialog>

      {/* TOAST THÔNG BÁO */}
      <Snackbar open={toastOpen} autoHideDuration={3500} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setToastOpen(false)} severity="success" variant="filled" sx={{ borderRadius: '14px', backgroundColor: '#111', color: '#fff', '& .MuiAlert-icon': { color: '#4caf50' } }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}