import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import VerificationPage from './pages/VerificationPage';
import BirthdateConfirmPage from './pages/BirthdateConfirmPage';
import AppLayout from './components/AppLayout';
import DashboardPage from './pages/DashboardPage';
import HealthHubPage from './pages/HealthHubPage';
import AppointmentsPage from './pages/AppointmentsPage';
import AppointmentDetailPage from './pages/AppointmentDetailPage';
import ProfilePage from './pages/ProfilePage';
import LabResultsPage from './pages/LabResultsPage';
import LabResultDetailPage from './pages/LabResultDetailPage';
import PrescriptionsPage from './pages/PrescriptionsPage';
import PrescriptionDetailPage from './pages/PrescriptionDetailPage';
import AssessmentsPage from './pages/AssessmentsPage';
import AssessmentDetailPage from './pages/AssessmentDetailPage';
import DocumentsPage from './pages/DocumentsPage';
import MessagesPage from './pages/MessagesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/verify" element={<VerificationPage />} />
      <Route path="/confirm-birthdate" element={<BirthdateConfirmPage />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/health" element={<HealthHubPage />} />
        <Route path="/health/labs" element={<LabResultsPage />} />
        <Route path="/health/labs/:id" element={<LabResultDetailPage />} />
        <Route path="/health/prescriptions" element={<PrescriptionsPage />} />
        <Route path="/health/prescriptions/:id" element={<PrescriptionDetailPage />} />
        <Route path="/health/assessments" element={<AssessmentsPage />} />
        <Route path="/health/assessments/:id" element={<AssessmentDetailPage />} />
        <Route path="/health/documents" element={<DocumentsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/appointments/:id" element={<AppointmentDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}