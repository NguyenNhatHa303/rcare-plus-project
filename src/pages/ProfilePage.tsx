import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
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

interface InsuranceItem {
  id: string;
  insuredName: string;
  insuranceType: 'BHYT' | 'COMMERCIAL';
  providerName: string;
  cardNumber: string;
  initialHospital: string;
  status: 'active' | 'expired';
}

interface VitalRecord {
  id: string;
  value: string;
  date: string;
}

type NotificationPrefType = 'Text and Email' | 'Email' | 'Text';
type ContactPrefType = 'Email' | 'Phone';

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

  const nextIdRef = useRef(1);
  const getNextId = (prefix: string) => {
    const id = `${prefix}-${nextIdRef.current}`;
    nextIdRef.current += 1;
    return id;
  };

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setToastOpen(true);
  };

  const [personalInfo, setPersonalInfo] = useState({
    chosenName: 'Nhat Ha',
    firstName: 'Ha',
    lastName: 'Nguyen Nhat',
    phone: '(094) 637-5269',
    email: rawUsername,
    dob: '03/20/2004',
    pronouns: 'She/Her',
  });

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

  const [addressData, setAddressData] = useState({
    timezone: 'Asia/Ho_Chi_Minh',
    streetAddress: '123 Vo Van Ngan Street',
    aptSuite: 'Linh Chieu Ward',
    cityDistrict: 'Thu Duc City',
    province: 'Ho Chi Minh City',
    postalCode: '700000',
    useAsShipping: true,
  });

  const [insuranceList, setInsuranceList] = useState<InsuranceItem[]>([
    {
      id: 'ins-1',
      insuredName: 'Nguyen Nhat Ha',
      insuranceType: 'BHYT',
      providerName: 'Vietnam Social Security (HCMC)',
      cardNumber: 'HS4797921500303',
      initialHospital: 'Thu Duc Regional General Hospital (Code: 79-027)',
      status: 'active',
    },
  ]);

  const handleDeleteInsurance = (id: string) => {
    setInsuranceList((prev) => prev.filter((item) => item.id !== id));
    triggerToast(isVi ? 'Đã xóa thông tin bảo hiểm.' : 'Insurance record deleted.');
  };

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

  const [weightsList, setWeightsList] = useState<VitalRecord[]>([]);
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [newWeightVal, setNewWeightVal] = useState('');

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

  const [selectedLanguageSetting, setSelectedLanguageSetting] = useState<string>('English');
  const languageOptions = [
    'American Sign Language', 'Arabic', 'Cantonese', 'English', 'Haitian',
    'Korean', 'Mandarin', 'Portuguese', 'Spanish', 'Tagalog', 'Vietnamese', 'Other',
  ];

  const handleSaveLanguageSetting = () => {
    localStorage.setItem('rcare_setting_language', selectedLanguageSetting);
    triggerToast(isVi ? `Đã cập nhật ngôn ngữ ưu tiên thành: ${selectedLanguageSetting}` : `Language preference updated to: ${selectedLanguageSetting}`);
  };

  const [notificationPref, setNotificationPref] = useState<NotificationPrefType>('Text');
  const handleSaveNotificationPref = () => {
    localStorage.setItem('rcare_setting_notifications', notificationPref);
    triggerToast(isVi ? 'Cập nhật tùy chọn thông báo thành công!' : 'Notification preferences updated successfully!');
  };

  const [contactPref, setContactPref] = useState<ContactPrefType>('Email');
  const handleSaveContactPref = () => {
    localStorage.setItem('rcare_setting_contact_pref', contactPref);
    triggerToast(isVi ? 'Cập nhật phương thức liên hệ ưu tiên thành công!' : 'Contact preference updated successfully!');
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

  const [openSupportModal, setOpenSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  const handleSendSupportMessage = () => {
    if (!supportMessage.trim()) return;
    setOpenSupportModal(false);
    setSupportMessage('');
    triggerToast(isVi ? 'Tin nhắn hỗ trợ đã được gửi tới Ricky RCare+.' : 'Your message has been sent to Ricky RCare+.');
  };

  const [allergyList, setAllergyList] = useState<VitalRecord[]>([]);
  const [openAllergyModal, setOpenAllergyModal] = useState(false);
  const [allergyError, setAllergyError] = useState(false);
  const [allergyForm, setAllergyForm] = useState({
    name: '',
    reaction: '',
    severity: '',
  });

  const handleSaveAllergy = () => {
    if (!allergyForm.name.trim()) {
      setAllergyError(true);
      triggerToast(isVi ? 'Vui lòng nhập tên chất dị ứng.' : 'Please enter the allergen name.');
      return;
    }
    setAllergyError(false);
    const details = [allergyForm.reaction, allergyForm.severity].filter(Boolean).join(' · ');
    setAllergyList((prev) => [
      { id: getNextId('allergy'), value: allergyForm.name, date: details },
      ...prev,
    ]);
    setAllergyForm({ name: '', reaction: '', severity: '' });
    setOpenAllergyModal(false);
    triggerToast(isVi ? 'Đã thêm dị ứng mới.' : 'Allergy added successfully.');
  };

  const handleCloseAllergyModal = () => {
    setOpenAllergyModal(false);
    setAllergyError(false);
    setAllergyForm({ name: '', reaction: '', severity: '' });
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
          subEn: 'Chat with Ricky RCare+',
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

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', pt: 0, display: 'flex', flexDirection: 'column' }}>
      {/* HEADER BAR: RCare+ BRANDING (Đã chuyển từ Qcare sang RCare) */}
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
            RCare<span style={{ color: '#d81b60', fontSize: '20px', fontWeight: 800 }}>⁺</span>
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

      {/* CONTAINER CHỨA SIDEBAR VÀ WORKSPACE */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          height: { xs: 'auto', md: 'calc(100% - 48px)' },
          gap: { xs: 2, md: 3.5 },
        }}
      >
        {/* CỘT TRÁI: SIDEBAR MENU */}
        <Box
          sx={{
            width: { xs: '100%', md: 330 },
            display: {
              xs: selectedSubTab ? 'none' : 'flex',
              md: 'flex',
            },
            flexDirection: 'column',
            gap: 1.8,
            flexShrink: 0,
            overflowY: 'auto',
            pr: 0.5,
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#e0e0e0', borderRadius: '4px' },
          }}
        >
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
            display: {
              xs: selectedSubTab ? 'flex' : 'none',
              md: 'flex',
            },
            flexDirection: 'column',
            overflowY: 'auto',
            position: 'relative',
            p: { xs: 2.5, sm: 3, md: 4 },
          }}
        >
          {selectedSubTab && (
            <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 5 }}>
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

          {selectedSubTab === 'personal-profile' ? (
            <Box sx={{ width: '100%', maxWidth: 720, mx: 'auto', pt: { xs: 3, md: 1 } }}>
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

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField fullWidth size="small" label={isVi ? 'Tên *' : 'First Name *'} value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                  <TextField fullWidth size="small" label={isVi ? 'Họ & Tên đệm *' : 'Last Name *'} value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                </Box>

                <TextField fullWidth size="small" label={isVi ? 'Số điện thoại' : 'Phone Number'} value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />
                <TextField fullWidth size="small" label={isVi ? 'Email *' : 'Email *'} value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '14px' } }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
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

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                  <Button variant="outlined" onClick={() => setSelectedSubTab(null)} sx={{ borderRadius: 50, py: 1.1, borderColor: '#e0e0e0', color: '#666', fontWeight: 700, fontSize: '14px', textTransform: 'none' }}>
                    {isVi ? 'Hủy' : 'Cancel'}
                  </Button>
                  <Button variant="contained" disableElevation onClick={handleSavePersonalInfo} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff', fontWeight: 700, fontSize: '14px', textTransform: 'none' }}>
                    {isVi ? 'Cập nhật' : 'Update'}
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : selectedSubTab === 'gov-id' ? (
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Tải lên giấy tờ tùy thân' : 'Upload ID'}
                </Typography>
              </Box>
              <Box sx={{ border: '1.5px dashed #cccccc', borderRadius: '20px', p: { xs: 2, sm: '36px 40px' }, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: '#ffffff', mb: 3.5 }}>
                {idImage ? (
                  <Box component="img" src={idImage} alt="Government ID" sx={{ width: '100%', maxWidth: 380, maxHeight: 220, borderRadius: '12px', objectFit: 'cover', mb: 2 }} />
                ) : (
                  <Box sx={{ width: '100%', maxWidth: 280, height: 160, borderRadius: '12px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, color: '#999' }}>
                    <Typography sx={{ fontSize: '13px' }}>No ID uploaded</Typography>
                  </Box>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                <Typography onClick={() => fileInputRef.current?.click()} sx={{ fontSize: '13px', fontWeight: 700, color: '#111', textDecoration: 'underline', cursor: 'pointer' }}>
                  {isVi ? 'Tải lên hình ảnh mới' : 'Upload new image'}
                </Typography>
              </Box>
              <Button fullWidth variant="contained" disableElevation onClick={handleSaveId} sx={{ borderRadius: 50, py: 1.2, backgroundColor: '#e0e0e0', color: '#444', fontWeight: 700, fontSize: '14px' }}>
                {isVi ? 'Lưu' : 'Save'}
              </Button>
            </Box>
          ) : selectedSubTab === 'address' ? (
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Địa chỉ' : 'Address'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField fullWidth size="small" label={isVi ? 'Số nhà, Tên đường *' : 'Address *'} value={addressData.streetAddress} onChange={(e) => setAddressData({ ...addressData, streetAddress: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <Button variant="contained" disableElevation onClick={handleSaveAddress} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff', fontWeight: 700 }}>{isVi ? 'Cập nhật' : 'Update'}</Button>
              </Box>
            </Box>
          ) : selectedSubTab === 'insurance' ? (
            <Box sx={{ width: '100%', maxWidth: 760, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Bảo hiểm y tế' : 'Insurance'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {insuranceList.map((ins) => (
                  <Card key={ins.id} sx={{ p: 2, borderRadius: '16px', backgroundColor: '#fafafa', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: '14px' }}>{ins.providerName}</Typography>
                      <Typography variant="body2" sx={{ color: '#555', fontSize: '12.5px' }}>ID: {ins.cardNumber}</Typography>
                    </Box>
                    <IconButton size="small" onClick={() => handleDeleteInsurance(ins.id)} sx={{ color: '#d81b60' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                    </IconButton>
                  </Card>
                ))}
              </Box>
            </Box>
          ) : selectedSubTab === 'health-assistance' ? (
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Hỗ trợ y tế & Co-pay' : 'Health Assistance'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label={isVi ? 'Thu nhập hộ gia đình' : 'Household Income'}
                  value={healthAssistanceData.householdIncome}
                  onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, householdIncome: e.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label={isVi ? 'Số thành viên hộ gia đình' : 'Household Members'}
                  value={healthAssistanceData.householdMembers}
                  onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, householdMembers: e.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <FormControl fullWidth size="small">
                  <Select
                    value={healthAssistanceData.medicaid}
                    onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, medicaid: e.target.value })}
                    sx={{ borderRadius: '12px' }}
                  >
                    <MenuItem value="Yes">{isVi ? 'Medicaid: Có' : 'Medicaid: Yes'}</MenuItem>
                    <MenuItem value="No">{isVi ? 'Medicaid: Không' : 'Medicaid: No'}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <Select
                    value={healthAssistanceData.veteran}
                    onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, veteran: e.target.value })}
                    sx={{ borderRadius: '12px' }}
                  >
                    <MenuItem value="Yes">{isVi ? 'Cựu chiến binh: Có' : 'Veteran: Yes'}</MenuItem>
                    <MenuItem value="No">{isVi ? 'Cựu chiến binh: Không' : 'Veteran: No'}</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  label={isVi ? 'Mã Gilead' : 'Gilead Code'}
                  value={healthAssistanceData.gileadCode}
                  onChange={(e) => setHealthAssistanceData({ ...healthAssistanceData, gileadCode: e.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <Button variant="contained" disableElevation onClick={handleSaveHealthAssistance} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff', fontWeight: 700 }}>{isVi ? 'Cập nhật' : 'Update'}</Button>
              </Box>
            </Box>
          ) : selectedSubTab === 'vitals' ? (
            <Box sx={{ width: '100%', maxWidth: 760, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Chỉ số sinh tồn' : 'Vitals'}</Typography>
              </Box>
              <Card sx={{ p: 2, borderRadius: '18px', mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>{isVi ? 'Cân nặng' : 'Weight'}</Typography>
                  <Button variant="text" onClick={() => setShowAddWeight(!showAddWeight)} sx={{ color: '#111', fontWeight: 700 }}>{isVi ? 'Thêm' : 'Add'}</Button>
                </Box>
                {showAddWeight && (
                  <Box sx={{ mt: 2 }}>
                    <TextField fullWidth size="small" placeholder="Weight" value={newWeightVal} onChange={(e) => setNewWeightVal(e.target.value)} sx={{ mb: 1.5 }} />
                    <Button variant="contained" onClick={handleAddWeight} sx={{ backgroundColor: '#111', color: '#fff', borderRadius: 50 }}>{isVi ? 'Lưu' : 'Save'}</Button>
                  </Box>
                )}
                {weightsList.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {weightsList.map((w) => (
                      <Box key={w.id} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#444' }}>
                        <span>{w.value}</span>
                        <span>{w.date}</span>
                      </Box>
                    ))}
                  </Box>
                )}
              </Card>
            </Box>
          ) : selectedSubTab === 'about-me' ? (
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Thông tin nhân khẩu học' : 'About Me'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                <FormControl fullWidth size="small">
                  <Select
                    value={aboutMeData.gender}
                    onChange={(e) => setAboutMeData({ ...aboutMeData, gender: e.target.value })}
                    sx={{ borderRadius: '12px' }}
                  >
                    <MenuItem value="Female">{isVi ? 'Giới tính: Nữ' : 'Gender: Female'}</MenuItem>
                    <MenuItem value="Male">{isVi ? 'Giới tính: Nam' : 'Gender: Male'}</MenuItem>
                    <MenuItem value="Non-binary">{isVi ? 'Giới tính: Phi nhị giới' : 'Gender: Non-binary'}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <Select
                    value={aboutMeData.sexuality}
                    onChange={(e) => setAboutMeData({ ...aboutMeData, sexuality: e.target.value })}
                    sx={{ borderRadius: '12px' }}
                  >
                    <MenuItem value="Straight">{isVi ? 'Xu hướng tính dục: Dị tính' : 'Sexuality: Straight'}</MenuItem>
                    <MenuItem value="Gay">{isVi ? 'Xu hướng tính dục: Đồng tính' : 'Sexuality: Gay'}</MenuItem>
                    <MenuItem value="Bisexual">{isVi ? 'Xu hướng tính dục: Song tính' : 'Sexuality: Bisexual'}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <Select
                    value={aboutMeData.relationshipStatus}
                    onChange={(e) => setAboutMeData({ ...aboutMeData, relationshipStatus: e.target.value })}
                    sx={{ borderRadius: '12px' }}
                  >
                    <MenuItem value="Single">{isVi ? 'Tình trạng: Độc thân' : 'Relationship: Single'}</MenuItem>
                    <MenuItem value="Married">{isVi ? 'Tình trạng: Đã kết hôn' : 'Relationship: Married'}</MenuItem>
                    <MenuItem value="Partnered">{isVi ? 'Tình trạng: Có bạn đời' : 'Relationship: Partnered'}</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  label={isVi ? 'Chủng tộc' : 'Race'}
                  value={aboutMeData.race}
                  onChange={(e) => setAboutMeData({ ...aboutMeData, race: e.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <TextField
                  fullWidth
                  size="small"
                  label={isVi ? 'Dân tộc' : 'Ethnicity'}
                  value={aboutMeData.ethnicity}
                  onChange={(e) => setAboutMeData({ ...aboutMeData, ethnicity: e.target.value })}
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <Button variant="contained" disableElevation onClick={handleSaveAboutMe} sx={{ borderRadius: 50, py: 1.1, backgroundColor: '#111', color: '#fff', fontWeight: 700 }}>{isVi ? 'Cập nhật' : 'Update'}</Button>
              </Box>
            </Box>
          ) : selectedSubTab === 'pcp' ? (
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Bác sĩ chăm sóc ban đầu' : 'Primary Care Provider'}</Typography>
              </Box>
              <Box component="form" onSubmit={handleSavePcp} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
                <TextField fullWidth placeholder="Clinic" value={pcpData.clinic} onChange={(e) => handlePcpChange('clinic', e.target.value)} error={Boolean(pcpErrors.clinic)} helperText={pcpErrors.clinic} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <TextField fullWidth placeholder="Provider Name" value={pcpData.providerName} onChange={(e) => handlePcpChange('providerName', e.target.value)} error={Boolean(pcpErrors.providerName)} helperText={pcpErrors.providerName} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <TextField fullWidth placeholder="Address" value={pcpData.address} onChange={(e) => handlePcpChange('address', e.target.value)} error={Boolean(pcpErrors.address)} helperText={pcpErrors.address} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />
                <TextField fullWidth placeholder="Phone Number" value={pcpData.phone} onChange={(e) => handlePcpChange('phone', e.target.value)} error={Boolean(pcpErrors.phone)} helperText={pcpErrors.phone} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
                  <Button type="button" variant="outlined" onClick={handleCancelPcp} sx={{ borderRadius: 50, py: 1.2, color: '#666' }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
                  <Button type="submit" variant="contained" disableElevation sx={{ borderRadius: 50, py: 1.2, backgroundColor: '#e5e7eb', color: '#374151', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>{isVi ? 'Cập nhật' : 'Update'}</Button>
                </Box>
              </Box>
            </Box>
          ) : selectedSubTab === 'language' ? (
            <Box sx={{ width: '100%', maxWidth: 650, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Ngôn ngữ' : 'Language'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3.5, pl: { xs: 1, sm: 4 } }}>
                {languageOptions.map((lang) => (
                  <Box key={lang} onClick={() => setSelectedLanguageSetting(lang)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', py: 0.4 }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: selectedLanguageSetting === lang ? '5px solid #111' : '2px solid #bbb', backgroundColor: '#fff', boxSizing: 'border-box' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: selectedLanguageSetting === lang ? 600 : 400 }}>{lang}</Typography>
                  </Box>
                ))}
              </Box>
              <Button fullWidth variant="contained" disableElevation onClick={handleSaveLanguageSetting} sx={{ borderRadius: 50, py: 1.3, backgroundColor: '#e5e7eb', color: '#374151', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>{isVi ? 'Lưu' : 'Save'}</Button>
            </Box>
          ) : selectedSubTab === 'notifications' ? (
            <Box sx={{ width: '100%', maxWidth: 650, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Thông báo' : 'Notifications'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, pl: { xs: 1, sm: 4 } }}>
                {([
                  { key: 'Text and Email', labelEn: 'Text and Email', labelVi: 'Tin nhắn SMS và Email' },
                  { key: 'Email', labelEn: 'Email', labelVi: 'Email' },
                  { key: 'Text', labelEn: 'Text', labelVi: 'Tin nhắn SMS (Text)' },
                ] as const).map((opt) => (
                  <Box key={opt.key} onClick={() => setNotificationPref(opt.key)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer', py: 0.4 }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: notificationPref === opt.key ? '5px solid #111' : '2px solid #bbb', backgroundColor: '#fff', boxSizing: 'border-box' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: notificationPref === opt.key ? 600 : 400 }}>{isVi ? opt.labelVi : opt.labelEn}</Typography>
                  </Box>
                ))}
              </Box>
              <Button fullWidth variant="contained" disableElevation onClick={handleSaveNotificationPref} sx={{ borderRadius: 50, py: 1.3, backgroundColor: '#e5e7eb', color: '#374151', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>{isVi ? 'Lưu' : 'Save'}</Button>
            </Box>
          ) : selectedSubTab === 'contact-preference' ? (
            <Box sx={{ width: '100%', maxWidth: 650, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>{isVi ? 'Phương thức liên lạc' : 'Contact Preference'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, mb: 4 }}>
                {([
                  { key: 'Email', labelEn: 'Email', labelVi: 'Email' },
                  { key: 'Phone', labelEn: 'Phone', labelVi: 'Điện thoại' },
                ] as const).map((opt) => (
                  <Box key={opt.key} onClick={() => setContactPref(opt.key)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', border: contactPref === opt.key ? '5px solid #111' : '2px solid #bbb', backgroundColor: '#fff', boxSizing: 'border-box' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: contactPref === opt.key ? 600 : 400 }}>{isVi ? opt.labelVi : opt.labelEn}</Typography>
                  </Box>
                ))}
              </Box>
              <Button fullWidth variant="contained" disableElevation onClick={handleSaveContactPref} sx={{ borderRadius: 50, py: 1.3, backgroundColor: '#e5e7eb', color: '#374151', '&:hover': { backgroundColor: '#111', color: '#fff' } }}>{isVi ? 'Lưu' : 'Save'}</Button>
            </Box>
          ) : selectedSubTab === 'faq' ? (
            <Box sx={{ width: '100%', maxWidth: 740, mx: 'auto', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px' }}>F.A.Q.</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', fontSize: '12.5px', mb: 3 }}>
                {isVi ? 'Bạn có thắc mắc? Duyệt câu hỏi bên dưới hoặc ' : 'Have questions? Browse our FAQ below or '}
                <Typography component="span" onClick={() => setOpenSupportModal(true)} sx={{ color: '#111', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '12.5px', '&:hover': { color: '#d81b60' } }}>
                  {isVi ? 'liên hệ đội ngũ hỗ trợ' : 'reach out to our support team'}
                </Typography>
                .
              </Typography>
              {Array.from(new Set(FAQ_LIST.map((item) => item.categoryEn))).map((categoryKey) => {
                const items = FAQ_LIST.filter((i) => i.categoryEn === categoryKey);
                const categoryTitle = isVi ? items[0].categoryVi : items[0].categoryEn;
                return (
                  <Box key={categoryKey} sx={{ mb: 2.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.8px', color: '#888', fontSize: '10.5px', textTransform: 'uppercase', display: 'block', mb: 1, px: 0.5 }}>
                      {categoryTitle}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {items.map((faq) => {
                        const isOpen = expandedFaqId === faq.id;
                        return (
                          <Card key={faq.id} sx={{ p: '12px 16px', borderRadius: '12px', backgroundColor: '#fbfbfb', border: '1px solid #eee', boxShadow: 'none', cursor: 'pointer' }}>
                            <Box onClick={() => setExpandedFaqId(isOpen ? null : faq.id)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                                <Box sx={{ color: '#555', display: 'flex', alignItems: 'center' }}>{faq.icon}</Box>
                                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{isVi ? faq.questionVi : faq.questionEn}</Typography>
                              </Box>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="#777" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}><path d="M7 10l5 5 5-5z" /></svg>
                            </Box>
                            <Collapse in={isOpen}>
                              <Box sx={{ mt: 1.2, pt: 1, borderTop: '1px solid #f0f0f0' }}>
                                <Typography sx={{ fontSize: '12.5px', color: '#555', lineHeight: 1.6 }}>{isVi ? faq.answerVi : faq.answerEn}</Typography>
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
            <Box sx={{ width: '100%', pt: { xs: 3, md: 1 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#111', fontSize: '18px', fontFamily: APP_FONT_FAMILY }}>
                  {isVi ? 'Lịch sử sức khỏe' : 'Health History'}
                </Typography>
                <Button variant="text" onClick={() => setOpenAllergyModal(true)} sx={{ color: '#111', fontWeight: 700 }}>
                  {isVi ? '+ Thêm dị ứng' : '+ Add Allergy'}
                </Button>
              </Box>
              {allergyList.length === 0 ? (
                <Card sx={{ p: 2, borderRadius: '18px', backgroundColor: '#fff', border: '1px solid #eee', mt: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>{isVi ? 'Không ghi nhận dị ứng' : 'No Allergies reported'}</Typography>
                </Card>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
                  {allergyList.map((a) => (
                    <Card key={a.id} sx={{ p: 2, borderRadius: '16px', backgroundColor: '#fafafa', border: '1px solid #eee' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>{a.value}</Typography>
                      {a.date && <Typography variant="body2" sx={{ color: '#555', fontSize: '12.5px' }}>{a.date}</Typography>}
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9e9e9e', gap: 1.5, minHeight: { xs: 250, md: 400 } }}>
              <Box sx={{ width: 56, height: 56, borderRadius: '18px', backgroundColor: '#f8f8f8', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </Box>
              <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: '#888' }}>
                {isVi ? 'Chọn một cài đặt để mở tại đây' : 'Pick a setting to open it here'}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* MODAL ALLERGY */}
      <Dialog open={openAllergyModal} onClose={handleCloseAllergyModal} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: '24px', p: { xs: 2, sm: '28px 32px' } } } }}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 800, fontSize: '18px', color: '#111', p: 0, mb: 2 }}>{isVi ? 'Thêm dị ứng mới' : 'New Allergy'}</DialogTitle>
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            error={allergyError && !allergyForm.name}
            helperText={allergyError && !allergyForm.name ? (isVi ? 'Vui lòng nhập tên chất dị ứng.' : 'Please enter an allergen name.') : ''}
            placeholder="Tên chất dị ứng / Name *"
            value={allergyForm.name}
            onChange={(e) => setAllergyForm({ ...allergyForm, name: e.target.value })}
          />
          <TextField fullWidth size="small" placeholder="Biểu hiện phản ứng / Reaction" value={allergyForm.reaction} onChange={(e) => setAllergyForm({ ...allergyForm, reaction: e.target.value })} />
          <FormControl fullWidth size="small">
            <Select
              value={allergyForm.severity}
              onChange={(e) => setAllergyForm({ ...allergyForm, severity: e.target.value })}
              displayEmpty
              renderValue={(selected) => (!selected ? <span style={{ color: '#9e9e9e' }}>Mức độ nghiêm trọng / Severity</span> : (selected as string))}
            >
              <MenuItem value="Mild">Nhẹ (Mild)</MenuItem>
              <MenuItem value="Moderate">Trung bình (Moderate)</MenuItem>
              <MenuItem value="Severe">Nặng (Severe)</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Button variant="outlined" onClick={handleCloseAllergyModal} sx={{ borderRadius: 50, py: 1 }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
          <Button variant="contained" disableElevation onClick={handleSaveAllergy} sx={{ borderRadius: 50, py: 1, backgroundColor: '#111', color: '#fff' }}>{isVi ? 'Lưu' : 'Save'}</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL SUPPORT */}
      <Dialog open={openSupportModal} onClose={() => setOpenSupportModal(false)} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: '24px', p: { xs: 2, sm: '28px 32px' } } } }}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 800, fontSize: '18px', color: '#111', p: 0, mb: 2 }}>{isVi ? 'Nhắn tin cho Chăm sóc Khách hàng' : 'Message Customer Support'}</DialogTitle>
        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar src={rickyAvatarImg} alt="Ricky RCare+" sx={{ width: 44, height: 44, borderRadius: '12px' }}>RR</Avatar>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>Ricky RCare+</Typography>
              <Typography variant="caption" sx={{ color: '#777', fontSize: '12px' }}>He/Him</Typography>
            </Box>
          </Box>
          <TextField fullWidth multiline rows={4} placeholder={isVi ? 'Viết nội dung tin nhắn...' : 'Write something...'} value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} />
        </DialogContent>
        <DialogActions sx={{ p: 0, mt: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenSupportModal(false)} sx={{ borderRadius: 50, py: 1 }}>{isVi ? 'Hủy' : 'Cancel'}</Button>
          <Button variant="contained" disableElevation disabled={!supportMessage.trim()} onClick={handleSendSupportMessage} sx={{ borderRadius: 50, py: 1, backgroundColor: '#111', color: '#fff' }}>{isVi ? 'Gửi' : 'Send'}</Button>
        </DialogActions>
      </Dialog>

      {/* TOAST THÔNG BÁO */}
      <Snackbar open={toastOpen} autoHideDuration={3500} onClose={() => setToastOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setToastOpen(false)} severity="success" variant="filled" sx={{ borderRadius: '14px', backgroundColor: '#111', color: '#fff' }}>
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}