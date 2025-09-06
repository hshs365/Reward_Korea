import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import MyQuestsPage from '../pages/MyQuestsPage';
import PartyPage from '../pages/PartyPage';
import AnnouncementsPage from '../pages/AnnouncementsPage';
import AnnouncementDetailPage from '../pages/AnnouncementDetailPage';
import MyInfoPage from '../pages/MyInfoPage';
import ContactPage from '../pages/ContactPage';
import CorporateQuestsPage from '../pages/CorporateQuestsPage'; // Import CorporateQuestsPage
import RegisterQuestPage from '../pages/RegisterQuestPage'; // Import RegisterQuestPage
import CommissionedQuestDetailPage from '../pages/CommissionedQuestDetailPage'; // Import CommissionedQuestDetailPage
import MainLayout from '../layout/MainLayout';
import { MapProvider } from '../store/MapContext';
import { useUser } from '../store/UserContext'; // Import useUser

const AppRouter = () => {
  const { user, loading } = useUser(); // Get user and loading state from context

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      
      {/* Protected routes */}
      <Route
        path="/*"
        element={
          user ? ( // Only render MainLayout if user is logged in
            <MapProvider>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/party" element={<PartyPage />} />
                  <Route path="/announcements" element={<AnnouncementsPage />} />
                  <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
                  <Route path="/my-info" element={<MyInfoPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {user.userType === 'NPC' ? (
                    <>
                      <Route path="/corporate-quests" element={<CorporateQuestsPage />} />
                      <Route path="/corporate-quests/:id" element={<CommissionedQuestDetailPage />} />
                      <Route path="/register-quest" element={<RegisterQuestPage />} />
                      {/* Redirect general user pages to NPC appropriate pages or home */}
                      <Route path="/my-quests" element={<Navigate to="/corporate-quests" replace />} />
                    </>
                  ) : (
                    <>
                      <Route path="/my-quests" element={<MyQuestsPage />} />
                      {/* Redirect NPC-specific pages to user appropriate pages or home */}
                      <Route path="/corporate-quests" element={<Navigate to="/my-quests" replace />} />
                      <Route path="/register-quest" element={<Navigate to="/" replace />} />
                    </>
                  )}
                  {/* Redirect any unmatched paths to home if logged in */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </MainLayout>
            </MapProvider>
          ) : (
            <Navigate to="/login" replace /> // Redirect to login if not logged in
          )
        }
      />
    </Routes>
  );
};

export default AppRouter;
