import RegUser from "./pages/AuthPages/Register/RegisterUser";
import RegVol from "./pages/AuthPages/RegisterVolunteer/RegisterVolunteer";
import EMICalculator from "./pages/emiCalculatorPage/emiCalculator";
import Room from "./pages/Room";
import BlogList from "./pages/Blogs/BlogList";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import ExpenseTracker from "./components/Expense Tracker/ExpenseTracker";
import Faq from "./pages/Faq";
import StudentRoutes from "./Routes/StudentRoutes";
import Home from "./pages/Home/Home";
import CourseforStud from "./pages/CoursesforStud/CourseforStud";
import ViewStudCourse from "./pages/Studcourse/ViewStudCourse";
import StudQuiz from "./pages/StudQuiz/StudQuiz";
import TeacherRoutes from "./Routes/TeacherRoutes";
import Addcourse from "./pages/Addcourse/Addcourse";
import ViewCourse from "./pages/ViewCourse/ViewCourse";
import Quiz from "./pages/Quiz/Quiz";
import Analytics from "./pages/Analytics/Analytics";
import Profile from "./pages/Profile/Profile";
import MapBank from "./pages/Map/Map";
import BlogTest from "./pages/Blogs/BlogTest";
import ContactPage from "./pages/Contact/ContactPage";
import LogOut from "./components/Logout";
import Eventpage from "./pages/Events/Eventpage";
import TestHome from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/room" element={<Room />} />
      <Route path="/register/user" element={<RegUser />} />
      <Route path="/register/volunteer" element={<RegVol />} />
      <Route path="/emiCalculator" element={<EMICalculator />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blogs/:id" element={<BlogTest />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/expense-tracker" element={<ExpenseTracker />} />
      <Route path="/student" element={<StudentRoutes />}>
        <Route path="home" element={<Home />} />
        <Route path="courses" element={<CourseforStud />} />
        <Route path="viewCourse/:id" element={<ViewStudCourse />} />
        <Route path="quiz/:id" element={<StudQuiz />} />
      </Route>
      <Route path="/teacher" element={<TeacherRoutes />}>
        <Route path="create" element={<Addcourse />} />
        <Route path="courses" element={<ViewCourse />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="home" element={<Profile />} />
      </Route>
      {/* <Route path="/test" element={<BlogTest />} /> */}
      <Route path="/logout" element={<LogOut />} />
      <Route path="/map-banks" element={<MapBank />} />
      <Route path="/abc" element={<Home />} />
      <Route path="/events" element={<Eventpage />} />
      <Route path="/test" element={<TestHome />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
