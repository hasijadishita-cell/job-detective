import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [outcome, setOutcome] = useState("");
  const [jobType, setJobType] = useState("");
  const [stage, setStage] = useState("");
  const [notes, setNotes] = useState("");
  const navigate=useNavigate();
  const [applications, setApplications] = useState([])
  useEffect(() => {
    fetch("http://127.0.0.1:5000/applications")
    .then(response => response.json())
    .then(data => setApplications(data));
  }, []);

  function validate(){
    if (company.trim()==="" || role.trim()==="" || outcome.trim()==="" || jobType.trim()==="" || stage.trim()===""){
      alert("Please fill all fields")
      return false;
    }
    return true;
  }

  function addApplication() {
    if (!validate()){
      return;
    }
    const newApplication = {
      company: company,
      role: role,
      jobType: jobType,
      stage: stage,
      outcome: outcome,
      notes: notes

    };
    fetch("http://127.0.0.1:5000/applications", 
      {method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApplication)
      });


    setApplications([...applications, newApplication])
    setCompany("");
    setRole("");
    setJobType("");
    setStage("");
    setOutcome("");
    setNotes("");
  }
  return (
    <div className="app">
      <header className="header">
        <h1>Job Detective 🔎</h1>
        <p>Turn Job Search Into Useful Feedback.</p>
      </header>

      <main className="workspace">
        <section className="Add-applications">
          <h2>Add Application</h2>
          <label>Company</label>
          <input
            type="text"
            placeholder="e.g. Oporto"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />

          <label>Role</label>
          <input
            type="text"
            placeholder="e.g. Team Member"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />

          <label>Job Type</label>
          <select
          value={jobType}
          onChange={(event) => setJobType(event.target.value)}>
            <option value="">Select Job Type</option>
            <option value="Casual">Casual</option>
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
            <option value="Internship">Internship</option>
          </select>

          <label>Stage</label>
          <select
          value={stage}
          onChange={(event) => setStage(event.target.value)}>
            <option value="">Select Stage</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Assessment/Trial">Assessment/Trial</option>
            <option value="Offer">Offer</option>
          </select>

          <label>Outcome</label>
          <select
          value={outcome}
          onChange={(event) => setOutcome(event.target.value)}>
            <option value="">Select outcome</option>
            <option value="Pending">Pending</option>
            <option value="No Response">No Response</option>
            <option value="Rejected">Rejected</option>
            <option value="Withdrawn">Withdrawn</option>
            <option value="Hired">Hired</option>
          </select>

          <label>Notes (optional)</label>
          <textarea
          placeholder="e.g. Manager mentioned limited availaibility."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}>
          </textarea>

          <button onClick={addApplication}>
            Add Application
          </button>
        </section>

        <section className="Application-history">
          <h2>Application History</h2>
          {applications.length==0 ? (
            <p className="No-Application">No applications added yet.</p>
          ) : (
            applications.map((application,index) => (
            <div className="application-card" key={index}>
              <h3>Company: {application.company}</h3>
              <p>Role: {application.role}</p>
              <p>Job Type: {application.jobType}</p>
              <p>Stage: {application.stage}</p>
              <span>Outcome: {application.outcome}</span>
              {application.notes && (
              <p>Notes: {application.notes}</p>)}
            </div>
          ))
          )}
        </section>
      </main>
      <section className="Diagnosis">
        <h2>🔎 Job Detective Analysis</h2>
        <p>
          Add a few applications and later the AI will investigate your job serch ptterns here.
        </p>
        <button className="analyse-button"
        onClick={() => navigate("/analysis")}>
          Analyse My Applications
        </button>
        
       
      </section>
     </div>

  );
}
export default App;