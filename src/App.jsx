import { Routes, Route } from "react-router-dom";
import Navbar2 from "./Checklist/Composants/Navbar2";
import PageDashboard from "./Checklist/Dashboard/PageDashboard";
import PageForm from "./Checklist/Form/PageForm";
import PageList from "./Checklist/List/PageList";
import FormAddChecklist from "./Checklist/Form/FormAddChecklist";

function App() {
  return (
    <>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<PageDashboard />} />
        <Route path="/form/:id" element={<PageForm />} />
        <Route path="/add-checklist" element={<FormAddChecklist />} />{" "}
        <Route path="/list/:id" element={<PageList />} />
      </Routes>
    </>
  );
}

export default App;
