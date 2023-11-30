import { NavLink, Routes, Route } from "react-router-dom";
import Navbar2 from "./Checklist/Composants/Navbar2";
import PageDashboard from "./Checklist/Dashboard/PageDashboard";
import PageForm from "./Checklist/Form/PageForm";
import PageList from "./Checklist/List/PageList";

function App() {
  return (
    <>
      <Navbar2 />
      <div>
        {/* <NavLink to="/">Dashboard</NavLink>{" "}
        <NavLink to="/newForm">Form</NavLink> */}
      </div>
      <Routes>
        <Route path="/" element={<PageDashboard />} />
        <Route path="/form" element={<PageForm />} />
        <Route path="/newForm" element={<PageForm />} />
        <Route path="/list/:id" element={<PageList />} />
      </Routes>
    </>
  );
}

export default App;
