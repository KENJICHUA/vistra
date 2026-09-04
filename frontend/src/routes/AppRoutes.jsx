import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTES } from "/@/config/RoutePaths";
import PublicLayout from "/@/layouts/PublicLayout";
import AdminLayout from "/@/layouts/AdminLayout.tsx";
import LandingPage from "/@/pages/public/landingpage";
import StaffLandingPage from "/@/pages/admin/home";
import StaffLoginPage from "/@/pages/admin/login";
import OverviewTab from "/@/pages/admin/overview/overview";
import MedicalTab from "/@/pages/admin/medical/medicalTab";
import PatientRecordForm from "/@/pages/admin/medical/medicalRecForm";
import PatientRecordView from "/@/pages/admin/medical/medicalViewRec";
import DentalTab from "/@/pages/admin/dental/dentalTab";
import DentalRecordForm from "/@/pages/admin/dental/dentalForm";
import DentalRecordView from "/@/pages/admin/dental/dentalViewRec";
import AppointmentsTab from "/@/pages/admin/appointments/appointmentsTab";
import PageNotFound from "/@/pages/public/PageNotFound";
import ProtectedRoute from "/@/components/ProtectedRoute.jsx"
import PatientsTab from "/src/pages/admin/patients/patientsTab.jsx"
import NewPatientRecordForm from "/@/pages/admin/patients/patientNewRec.jsx"
import ViewStudentRecord from "/@/pages/admin/patients/ViewStudentRecord.jsx"
import AppointmentDetailView from "/@/pages/admin/appointments/appointmentView.jsx"
import {PatientProvider} from "/@/context/PatientContext.tsx";


function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Admin Showcase / Login */}
        <Route path={ROUTES.admin.home} element={<StaffLandingPage />} />
        <Route path={ROUTES.admin.login} element={<StaffLoginPage />} />

        {/* Admin */}

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.admin.dashboard.overview} element={<OverviewTab />} />
            <Route path={ROUTES.admin.dashboard.medical} element={<MedicalTab />} />
            <Route path={ROUTES.admin.medical.createNewRecord} element={<PatientRecordForm />} />
            <Route path={ROUTES.admin.medical.viewRecord} element={<PatientRecordView />} />

            <Route path={ROUTES.admin.dashboard.dental} element={<DentalTab />} />
            <Route path={ROUTES.admin.dental.createNewRecord} element={<DentalRecordForm />} />
            <Route path={ROUTES.admin.dental.viewRecord} element={<DentalRecordView />} />

            <Route path={ROUTES.admin.dashboard.appointments} element={<AppointmentsTab />} />
            <Route path={ROUTES.admin.appointment.viewAppointment} element={<AppointmentDetailView/>}/>

            <Route path={ROUTES.admin.dashboard.patients} element={
              <PatientProvider>
                <PatientsTab/>
              </PatientProvider>
            }/>
            <Route path={ROUTES.admin.patient.createNewRecord} element={
              <PatientProvider>
                <NewPatientRecordForm />
              </PatientProvider>
            } />
            <Route path={`${ROUTES.admin.patient.patientRecordTab}/:id`} element={
              <PatientProvider>
                <ViewStudentRecord />
              </PatientProvider>
            } />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;