import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const projects = [
  { id: 1, name: "Project 1", status: "✅ Passed", lastRun: "March 15, 2025" },
  { id: 2, name: "Project 2", status: "❌ Failed", lastRun: "March 16, 2025" },
];

const fetchProjectDetails = (projectId) => {
  return {
    Library: "option1",
    CurrentVersion: "option2",
    Date: "option3",
    Vulnerabilities: "option4",
    Column5: "option5",
    Column6: "option6",
    Column7: "option7",
    Column8: "option8",
    Column9: "option9",
    Status: "option10",
  };
};

const projectSummary = [
  { name: "Project 1", thirdPartyLibraries: 5, vulnerabilities: 3, upToDate: 7, toBeUpdated: 2 },
  { name: "Project 2", thirdPartyLibraries: 8, vulnerabilities: 5, upToDate: 4, toBeUpdated: 6 },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [homeOpen, setHomeOpen] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [hideSummary, setHideSummary] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setChartData([
        { name: "Vulnerabilities", value: 30, color: "#ff4d4f" },
        { name: "Up-to-date", value: 50, color: "#52c41a" },
        { name: "To-be-Updated", value: 20, color: "#faad14" },
      ]);
    }
  }, [selectedProject]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setProjectDetails(fetchProjectDetails(project.id));
    setHomeOpen(!homeOpen);
    setDetailsOpen(true);
    setChartOpen(false);
    setHideSummary(true);
  };

  const handleHomeClick = () => {
    
    setSelectedProject(null);
    setDetailsOpen(false);
    setChartOpen(false);
    setHideSummary(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f0f2f5", color: "#333", position: "relative" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Integrity Pulse</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={handleHomeClick}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    <style>
        {`
          body {
              font-family: 'Arial', sans-serif;
              background-color: #f7f7f7;
              color: #333;
              height: 100vh;
              margin: 0;
          }

          .navbar {
              background-color: #0044cc !important;
          }

          .navbar-brand {
              color: white !important;
              font-size: 24px;
              font-weight: bold;
          }

          .navbar-nav .nav-link {
              color: white !important;
              font-size: 16px;
              margin-right: 15px;
          }

          .navbar-nav .nav-link:hover {
              color: #ffd700 !important;
          }

          .header-text {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 20vh;
              text-align: center;
              color: #0044cc;
          }
        `}
      </style>
    <div style={{ display: "flex", height: "100vh", background: "#f0f2f5", color: "#333" }}>

      <div style={{ flex: 1, padding: "20px" }}>
        {selectedProject && detailsOpen && (
          <div style={{ marginTop: "20px" }}>
            <h2>{selectedProject.name}</h2>
            <p><strong>Status:</strong> {selectedProject.status}</p>
            <p><strong>Last Run:</strong> {selectedProject.lastRun}</p>
            {projectDetails && (
              <div style={{ marginTop: "16px", background: "white", padding: "16px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                <h3>Project Details</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
                  <thead>
                    <tr style={{ background: "#007bff", color: "white" }}>
                      {Object.keys(projectDetails).map((key) => (
                        <th key={key} style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(projectDetails).map((value, index) => (
                        <td key={index} style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>{value}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button onClick={() => setPopupOpen(true)} style={{ position: "absolute", top: "20px", right: "20px", padding: "10px 20px", cursor: "pointer", border: "none", background: "#007bff", color: "white", borderRadius: "4px" }}>
                    View Project Healths
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
    
      </div>
      
        {!detailsOpen && (
          <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -30%)", textAlign: "center" }}>
            <h2>Project Summary</h2>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", border: "1px solid #ddd" }}>
              <thead>
                <tr style={{ background: "#007bff", color: "white" }}>
                  <th style={{ padding: "10px", textAlign: "left" }}>Project Name</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Third-Party Libraries</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Vulnerabilities</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Up-to-date</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>To-be-Updated</th>
                </tr>
              </thead>
              <tbody>
                {projectSummary.map((project, index) => ( 
                  <tr key={index}>
                  <td>
                    <a href={`#/project/${projects[index].id}`} style={{ textDecoration: "none", color: "#007bff" }} onClick={() => handleProjectClick(projects[index])}>
                      {project.name}
                    </a>
                  </td>
                    <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>{project.thirdPartyLibraries}</td>
                    <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>{project.vulnerabilities}</td>
                    <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>{project.upToDate}</td>
                    <td style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>{project.toBeUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {popupOpen && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
          <h3 style={{ textAlign: "center" }}>Project Health</h3>
          <PieChart width={300} height={250}>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <button onClick={() => setPopupOpen(false)} style={{ marginTop: "16px", padding: "10px 20px", cursor: "pointer", border: "none", background: "#ff4d4f", color: "white", borderRadius: "4px", display: "block", margin: "0 auto" }}>Close</button>
        </div>
      )}
    </div>

    </div>
  );
}
