import { Route, Routes, useLocation } from "react-router";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./Layout";
import AdminLayout from "./AdminLayout";
import { ThemeProvider } from "./theme/theme-provide";
import {
  AttendancePage,
  Dashboard,
  Feedback,
  LeaveTracker,
  Noticeboard,
  Login,
  SalaryTracker,
  AdminDashboard,
  Organization,
  Employee,
  AccountActivation,
  SetPassword,
  EmployeeUpdate,
  AdminAttendancePage,
} from "./pages";
import { ModalProvider } from "./context/ModalContext";
import Signup from "./pages/Signup/Signup";
import OrganizationRegister from "./pages/Admin/Organization/OrganizationRegister";
import { Toaster } from "./components/ui/sonner";
import React from "react";
import { showToast } from "./lib/toast";
function App() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.message) {
      showToast(location.state.message, location.state.type);
    }
  }, [location.state]);
  return (
    <AuthProvider>
      <ModalProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <PrivateRoute adminOnly={false}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="leave-tracker" element={<LeaveTracker />} />
              <Route path="noticeboard" element={<Noticeboard />} />
              <Route path="salary-tracker" element={<SalaryTracker />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route
                index
                element={
                  <PrivateRoute adminOnly={true}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="organization/"
                element={
                  <PrivateRoute adminOnly={true}>
                    <Organization />
                  </PrivateRoute>
                }
              />
              <Route
                path="employees/"
                element={
                  <PrivateRoute adminOnly={true}>
                    <Employee />
                  </PrivateRoute>
                }
              />
              <Route
                path="employees/:id"
                element={
                  <PrivateRoute adminOnly={true}>
                    <EmployeeUpdate />
                  </PrivateRoute>
                }
              />
              <Route
                path="attendances/"
                element={
                  <PrivateRoute adminOnly={true}>
                    <AdminAttendancePage />
                  </PrivateRoute>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account-activation" element={<AccountActivation />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route
              path="/organization/register"
              element={<OrganizationRegister />}
            />
          </Routes>
        </ThemeProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
