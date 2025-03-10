import { Route, Routes } from "react-router";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./Layout";
import { ThemeProvider } from "./theme/theme-provide";
import {
  AttendancePage,
  Dashboard,
  Feedback,
  LeaveTracker,
  Login,
} from "./pages";
import { NotificationProvider } from "./context/NotificationContext";

import RouteModal from "./custom-components/Dialog/Dialog";
import LeaveRequestForm from "./custom-components/LeaveTracker/LeaveRequestForm";

function App() {
  return (
    <AuthProvider>
      <AttendanceProvider>
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
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="leave-tracker" element={<LeaveTracker />}>
                  <Route
                    path="take-leave"
                    element={
                      <RouteModal
                        routePath="/leave-tracker/take-leave"
                        title="Take a leave"
                        description="Fill the form below"
                      >
                        <LeaveRequestForm />
                      </RouteModal>
                    }
                  />
                </Route>
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
        </NotificationProvider>
      </AttendanceProvider>
    </AuthProvider>
  );
}

export default App;
