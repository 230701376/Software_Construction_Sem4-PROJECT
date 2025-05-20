
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import PropertyListingPage from "@/pages/PropertyListingPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import BuilderLoginPage from "@/pages/BuilderLoginPage";
import BuilderDashboardPage from "@/pages/BuilderDashboardPage";
import NotFound from "@/pages/NotFound";
import UserDashboardPage from "@/pages/UserDashboardPage";
import AddPropertyPage from "@/pages/AddPropertyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="properties" element={<PropertyListingPage />} />
              <Route path="properties/:id" element={<PropertyDetailPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="builder/login" element={<BuilderLoginPage />} />
              <Route path="builder/dashboard" element={<BuilderDashboardPage />} />
              <Route path="dashboard" element={<UserDashboardPage />} />
              <Route path="add-property" element={<AddPropertyPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
