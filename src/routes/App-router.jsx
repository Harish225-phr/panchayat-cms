import { Routes, Route, Navigate  } from 'react-router-dom';
import Home from '../pages/homepage/Home';
import About from '../pages/about-us/About';
import Whowas from '../pages/whoswho/Whoswho';
import Photo from '../pages/media/photo/Photodata';
import Video from '../pages/media/video/Videos';
import Media from '../pages/media/photo/Picture'
import State from '../pages/profile/state/State';
import Department from '../pages/profile/department/Department';
import Notification from '../pages/annoucement/Notification';
import Circule from '../pages/annoucement/Circule';
import Guidelines from '../pages/annoucement/Guidelines';
import Transfers from '../pages/annoucement/Transfers';
import Act from '../pages/publication/Act'; 
import TrainingMaterial from '../pages/publication/TrainingMaterial';
import Reports from '../pages/publication/Reports';
import CetralProgram from '../pages/schemes/CetralProgram';
import StateProgram from '../pages/schemes/StateProgram';
import OtherProgram from '../pages/schemes/OtherProgram';
import Directory from '../pages/download/Directory';
import Otherimportant from '../pages/download/Otherimportant';
import Contact from '../pages/contact/Contact';
import Rti from '../pages/rti/Rti';
import PrivacyPolicy from '../pages/quick-links/Privacy-Policy';
import Terms from '../pages/quick-links/Terms-and-Condition';
import CopyrightPolicy from '../pages/quick-links/Copyright-Policy';
import Accessibility from '../pages/quick-links/Accessbility-Option';
import Disclaimer from '../pages/quick-links/Disclaimer';
// import EditContent from '../pages/admin/edit-content/EditContent';
import Tender from '../pages/quick-links/Tender';
import TrainingMaterials from '../pages/quick-links/Training-Materials';
import SeniorityList from '../pages/quick-links/Seniority-List';
import PropertyReturns from '../pages/quick-links/Property-Returns';
import OrganizationOfPanchayat from '../../src/pages/quick-links/Organization-of-Panchayat';
import AssetsAndLiabilities from '../pages/employee-corner/Assets-and-Liabilities';
import RAndPRules from '../pages/employee-corner/R-and-P-Rules';
import ProtectedRoute from '../protected-routes/ProtectedRoute';
import Login from '../pages/admin/userlogin/Login'
import Admin from '../pages/admin/home/Home';
import OrganizationCharts from '../pages/whoswho/Organization-Chart';
import Pri from '../pages/pri/Pri';
import HomepageModal from '../pages/homepage-modal/Homepage-Modal';
import OperationalManual from '../pages/operational-manual/Operational-Manual';
import VideoSection from '../pages/video-section/Video-Section';
const AppRoutes = () => {
    const role = sessionStorage.getItem("userRole");
  const location = window.location.pathname;
  const effectiveRole = location === "/" ? null : role;
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/whoswho" element={<Whowas />} />
      <Route path="/photo" element={<Photo />} />
      <Route path="/video" element={<Video />} />
      <Route path="/media" element={<Media />} />
      <Route path="/state" element={<State />} />
      <Route path="/department" element={<Department />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/circulars" element={<Circule />} />
      <Route path="/guidelines" element={<Guidelines />} />  
      <Route path="/transfers" element={<Transfers />} />
      <Route path="/act" element={<Act />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/trainingmaterial" element={<TrainingMaterial />} />
      <Route path="/cetralprogram" element={<CetralProgram />} />
      <Route path="/stateprogram" element={<StateProgram />} />
      <Route path="/otherprogram" element={<OtherProgram />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/otherimportant" element={<Otherimportant />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/rti" element={<Rti />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-condition" element={<Terms />} />
      <Route path="/copyright-policy" element={<CopyrightPolicy />} />
      <Route path="/accessibility-options" element={<Accessibility />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/tender" element={<Tender />} />
      {/* <Route path="/training-materials" element={<TrainingMaterials />} /> */}
      <Route path="/seniority-list" element={<SeniorityList />} />
      <Route path="/property-returns" element={<PropertyReturns />} />
      <Route path="/assets-and-liabilities" element={<AssetsAndLiabilities />} />
      <Route path="/r-and-p-rules" element={<RAndPRules/>} />
      <Route path="/organization-charts" element={<OrganizationCharts />} />
      <Route path="/pri" element={<Pri/>} />
      <Route path="/homepage-modal" element={<HomepageModal/>} />
      <Route path="/operational-manual" element={<OperationalManual/>} />
      <Route path="/video-section" element={<VideoSection/>} />

      <Route path="/panchayat-org" element={<OrganizationOfPanchayat />} />

      <Route path="/login" element={<Login />} />
      {/* <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><Admin /></ProtectedRoute>}/> */}
      <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            effectiveRole === 'ADMIN'
              ? <Navigate to="/admin" replace />
              : <Navigate to="/" replace />
          }
        />
    </Routes>
  );
};

export default AppRoutes;
