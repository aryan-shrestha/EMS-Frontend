import { Route, Routes } from "react-router";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./Layout";
import { ThemeProvider } from "./theme/theme-provide";
import {
  AttendancePage,
  Dashboard,
  Feedback,
  LeaveTracker,
  LeaveRequestForm,
  LeaveBalanceDialog,
  Login,
} from "./pages";
import { NotificationProvider } from "./context/NotificationContext";

import { AttendanceProvider } from "./context/AttendanceContext";

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="attendance"
                element={
                  <AttendanceProvider>
                    <AttendancePage />
                  </AttendanceProvider>
                }
              />
              <Route path="feedback" element={<Feedback />} />
              <Route path="leave-tracker" element={<LeaveTracker />}>
                <Route path="take-leave" element={<LeaveRequestForm />} />
                <Route path="leave-balance" element={<LeaveBalanceDialog />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
