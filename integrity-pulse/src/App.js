import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { green, blueGrey, orange, grey, red } from '@mui/material/colors';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const primaryColor = blueGrey[800]; // Dark blue-grey, professional
const secondaryColor = green[500]; // Green, suggesting efficiency and success
const accentColor = orange[700]; // Orange, for attention and warnings
const successColor = green[500];
const failureColor = red[500];

function App() {
  const [menuOpen, setMenuOpen] = useState(true); // Sidebar is open by default
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [homeOpen, setHomeOpen] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [hideSummary, setHideSummary] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate if using React Router

  useEffect(() => {
    if (selectedProject) {
      setChartData([
        { name: "Vulnerabilities", value: 30, color: failureColor },
        { name: "Up-to-date", value: 50, color: successColor },
        { name: "To-be-Updated", value: 20, color: accentColor },
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
    setMenuOpen(false); // Close sidebar on project click
    // If using React Router, you can navigate to a specific project route
    // navigate(`/projects/${project.id}`);
  };

  const handleHomeClick = () => {
    setSelectedProject(null);
    setDetailsOpen(false);
    setChartOpen(false);
    setHideSummary(false);
    setMenuOpen(false); // Close sidebar on home click
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: grey[100], color: grey[800] }}>
      {/* Sidebar */}
      <aside style={{
        width: menuOpen ? '250px' : '60px',
        backgroundColor: primaryColor,
        color: grey[50],
        paddingTop: '20px',
        transition: 'width 0.3s ease-in-out',
        overflowX: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px', marginBottom: '20px' }}>
          <a href="#" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: grey[50],
            textDecoration: 'none',
            display: 'flex', // Use flex to align logo and text
            alignItems: 'center',
          }}>
            <span style={{
              fontSize: '28px',
              marginRight: '8px',
              display: menuOpen ? 'block' : 'none', // Show only when expanded
              fontWeight: '900',
              color: secondaryColor, // Green for integrity/efficiency
            }}>
              <span style={{ color: accentColor }}>I</span>P
            </span>
            <span style={{ display: menuOpen ? 'block' : 'none' }}>Integrity Pulse</span>
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: grey[50], cursor: 'pointer', padding: 0 }}>
            <Menu size={24} />
          </button>
        </div>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '10px 15px', cursor: 'pointer', display: menuOpen ? 'block' : 'none' }}>
              <a href="#" onClick={() => handleHomeClick()} style={{ display: 'block', color: grey[50], textDecoration: 'none', fontSize: '18px' }}>
                Home
              </a>
            </li>
            {menuOpen && (
              <>
                <li style={{ padding: '10px 15px', cursor: 'pointer' }}>
                  <strong style={{ display: 'block', color: grey[50], paddingLeft: '10px' }}>Projects</strong>
                </li>
                {projects.map((project) => (
                  <li key={project.id} style={{ padding: '10px 15px', cursor: 'pointer' }}>
                    <a
                      href="#"
                      onClick={() => handleProjectClick(project)}
                      style={{
                        display: 'block',
                        color: grey[50],
                        textDecoration: 'none',
                        fontSize: '16px',
                        paddingLeft: '20px',
                        cursor: 'pointer', // Add cursor pointer to indicate clickability
                      }}
                    >
                      {project.name}
                    </a>
                  </li>
                ))}
                <li style={{ padding: '10px 15px', cursor: 'pointer' }}>
                  <a href="#" onClick={() => setMenuOpen(false)} style={{ display: 'block', color: grey[50], textDecoration: 'none', fontSize: '18px' }}>
                    About
                  </a>
                </li>
                <li style={{ padding: '10px 15px', cursor: 'pointer' }}>
                  <a href="#" onClick={() => setMenuOpen(false)} style={{ display: 'block', color: grey[50], textDecoration: 'none', fontSize: '18px' }}>
                    Contact
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {!detailsOpen && (
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
            <h2>Project Summary</h2>
            <table style={{ margin: "0 auto", borderCollapse: "collapse", border: `1px solid ${grey[300]}` }}>
              <thead>
                <tr style={{ background: primaryColor, color: grey[50] }}>
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
                      <a
                        href="#"
                        onClick={() => handleProjectClick(projects[index])}
                        style={{
                          textDecoration: 'underline', // Add underline for clickability
                          color: primaryColor,
                          cursor: 'pointer', // Add cursor pointer
                        }}
                      >
                        {project.name}
                      </a>
                    </td>
                    <td style={{ padding: "10px", textAlign: "left", border: `1px solid ${grey[300]}` }}>{project.thirdPartyLibraries}</td>
                    <td style={{ padding: "10px", textAlign: "left", border: `1px solid ${grey[300]}` }}>{project.vulnerabilities}</td>
                    <td style={{ padding: "10px", textAlign: "left", border: `1px solid ${grey[300]}` }}>{project.upToDate}</td>
                    <td style={{ padding: "10px", textAlign: "left", border: `1px solid ${grey[300]}` }}>{project.toBeUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedProject && detailsOpen && (
          <div style={{ marginTop: "20px", backgroundColor: grey[50], padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            <h2>{selectedProject.name}</h2>
            <p><strong>Status:</strong> {selectedProject.status === "✅ Passed" ? <span style={{ color: successColor }}>{selectedProject.status}</span> : <span style={{ color: failureColor }}>{selectedProject.status}</span>}</p>
            <p><strong>Last Run:</strong> {selectedProject.lastRun}</p>
            {projectDetails && (
              <div style={{ marginTop: "30px", background: grey[200], padding: "16px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                <h3>Project Details</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", border: `1px solid ${grey[300]}` }}>
                  <thead>
                    <tr style={{ background: primaryColor, color: grey[50] }}>
                      {Object.keys(projectDetails).map((key) => (
                        <th key={key} style={{ border: `1px solid ${grey[300]}`, padding: "10px", textAlign: "left" }}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.values(projectDetails).map((value, index) => (
                        <td key={index} style={{ border: `1px solid ${grey[300]}`, padding: "10px", textAlign: "left" }}>{value}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
                <div style={{ marginTop: "40px", textAlign: "center" }}>
                  <button onClick={() => setPopupOpen(true)} style={{ padding: "10px 20px", cursor: "pointer", border: "none", backgroundColor: primaryColor, color: grey[50], borderRadius: "4px" }}>
                    View Project Healths
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {popupOpen && (
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: grey[50], padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            <h3 style={{ textAlign: "center", color: grey[800] }}>Project Health</h3>
            <PieChart width={300} height={250}>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <button onClick={() => setPopupOpen(false)} style={{ marginTop: "16px", padding: "10px 20px", cursor: "pointer", border: "none", backgroundColor: failureColor, color: grey[50], borderRadius: "4px", display: "block", margin: "0 auto" }}>Close</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;