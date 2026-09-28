import {BrowserRouter, Routes, Route} from "react-router-dom";

import {ROUTES} from "/@/config/RoutePaths";
import PublicLayout from "/@/layouts/PublicLayout";
import AdminLayout from "/@/layouts/AdminLayout";
import LandingPage from "/@/pages/public/landingpage";
import StaffLandingPage from "/@/pages/admin/home";
import StaffLoginPage from "/@/pages/admin/login";
import OverviewTab from "/@/pages/admin/overview/Overview";
import MedicalTab from "/@/pages/admin/medical/medicalTab";
import PatientRecordForm from "/@/pages/admin/medical/medicalRecForm";
import PatientRecordView from "/@/pages/admin/medical/medicalViewRec";
import DentalTab from "/@/pages/admin/dental/dentalTab";
import DentalRecordForm from "/@/pages/admin/dental/dentalForm";
import DentalRecordView from "/@/pages/admin/dental/dentalViewRec";
import PageNotFound from "/@/pages/public/PageNotFound";
import ProtectedRoute from "/@/routes/ProtectedRoute.jsx";
import NewPatientRecordForm from "/@/pages/admin/patients/patientNewRec.jsx";
import {PatientsPage, ViewPatientRecord} from "/@/pages/admin/patients/PatientPages";
import ProtectedPatientRoute from "/@/components/ProtectedPatientRoute";
import PatientLayout from "/@/layouts/PatientLayout";
import PatientOverviewTab from "/@/pages/patient/overview/overview";
import PatientAppointmentsTab from "/@/pages/patient/appointments/appointmentsTab";
import PatientBookAppointment from "/@/pages/patient/appointments/appointmentBook";
import PatientAppointmentView from "/@/pages/patient/appointments/appointmentView";
import PatientMedicalTab from "/@/pages/patient/medical/medicalTab";
import PatientDentalTab from "/@/pages/patient/dental/dentalTab";
import PatientProfilePage from "/@/pages/patient/profile/profile";
import {AppointmentDetailPage, AppointmentPage} from "/@/pages/admin/appointments/AppointmentPage";
import {DentalPage} from "/@/pages/admin/dental/DentalPage";



function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route element={<PublicLayout/>}>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                    {/*<Route path="/DEMO/" element={<DemoPage />} />*/}
                </Route>

                {/* Admin Showcase / Login */}
                <Route path={ROUTES.staff.home} element={<StaffLandingPage/>}/>
                <Route path={ROUTES.staff.login} element={<StaffLoginPage/>}/>

                {/* Admin */}

                <Route element={<ProtectedRoute/>}>
                    <Route element={<AdminLayout/>}>
                        <Route path={ROUTES.staff.dashboard.overview} element={<OverviewTab/>}/>
                        <Route path={ROUTES.staff.dashboard.medical} element={<MedicalTab/>}/>
                        <Route path={ROUTES.staff.medical.createNewRecord} element={<PatientRecordForm/>}/>
                        <Route path={ROUTES.staff.medical.viewRecord} element={<PatientRecordView/>}/>

                        <Route path={ROUTES.staff.dashboard.dental} element={<DentalPage/>}/>
                        <Route path={ROUTES.staff.dental.createNewRecord} element={<DentalRecordForm/>}/>
                        <Route path={ROUTES.staff.dental.view.route} element={<DentalRecordView/>}/>

                        <Route
                            path={ROUTES.staff.dashboard.appointments}
                            element={<AppointmentPage/>}
                        />
                        <Route
                            path={ROUTES.staff.appointments.view.route}
                            element={<AppointmentDetailPage/>}
                        />

                        <Route
                            path={ROUTES.staff.dashboard.patients}
                            element={<PatientsPage/>}
                        />
                        <Route
                            path={ROUTES.staff.patient.createNewRecord}
                            element={<NewPatientRecordForm/>}
                        />
                        <Route
                            path={`${ROUTES.staff.patient.patientRecordTab}/:id`}
                            element={<ViewPatientRecord/>}
                        />
                    </Route>
                </Route>

                <Route element={<ProtectedPatientRoute />}>
                    <Route element={<PatientLayout />}>
                        <Route path={ROUTES.patient.dashboard.overview} element={<PatientOverviewTab />} />
                        <Route path={ROUTES.patient.dashboard.appointments} element={<PatientAppointmentsTab />} />
                        <Route path={ROUTES.patient.appointment.bookAppointment} element={<PatientBookAppointment />} />
                        <Route path={ROUTES.patient.appointment.viewAppointment} element={<PatientAppointmentView />} />
                        <Route path={ROUTES.patient.dashboard.medical} element={<PatientMedicalTab />} />
                        <Route path={ROUTES.patient.dashboard.dental} element={<PatientDentalTab />} />
                        <Route path={ROUTES.patient.profile} element={<PatientProfilePage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;