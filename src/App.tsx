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
  Login,
} from "./pages";
import { NotificationProvider } from "./context/NotificationContext";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
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
                <Route path="leave-tracker" element={<LeaveTracker />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
        </NotificationProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
