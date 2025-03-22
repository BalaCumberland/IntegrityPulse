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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [homeOpen, setHomeOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

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
    setDetailsOpen(true);
    setChartOpen(false);
  };

  const handleHomeClick = () => {
    setHomeOpen(!homeOpen);
    setSelectedProject(null);
    setDetailsOpen(false);
    setChartOpen(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f0f2f5", color: "#333" }}>
      <div style={{ background: "#222", color: "white", padding: "16px", width: menuOpen ? "220px" : "60px", transition: "width 0.3s ease-in-out", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ marginBottom: "16px", background: "none", border: "none", color: "white", cursor: "pointer" }}>
          <Menu size={24} />
        </button>
        <ul style={{ listStyle: "none", padding: 0, width: "100%" }}>
          <li style={{ padding: "12px", cursor: "pointer", background: homeOpen ? "#555" : "transparent", textAlign: "center", borderRadius: "4px", marginBottom: "4px" }}
              onClick={handleHomeClick}> {menuOpen ? "Home" : "🏠"} </li>
          {homeOpen && (
            <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
              {projects.map((project) => (
                <li key={project.id} style={{ padding: "8px", cursor: "pointer", background: selectedProject?.id === project.id ? "#777" : "transparent", textAlign: "center", borderRadius: "4px", marginBottom: "4px" }}
                    onClick={() => handleProjectClick(project)}>
                  {menuOpen ? project.name : `P${project.id}`}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <h1 style={{ fontSize: "32px", color: "#007bff", textAlign: "center" }}>Integrity Pulse</h1>
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
                    View Project Health
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
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
  );
}
