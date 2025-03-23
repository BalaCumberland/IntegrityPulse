import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { green, blueGrey, orange, grey, red } from '@mui/material/colors';
import { Menu } from 'lucide-react';


const primaryColor = blueGrey[800];
const secondaryColor = green[500];
const accentColor = orange[700];
const successColor = green[500];
const failureColor = red[500];

const commonTableStyles = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
};

const commonTableHeaderRowStyle = {
  backgroundColor: primaryColor,
  color: grey[50],
  fontWeight: 'bold',
};

const commonTableHeaderCellStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: `1px solid ${grey[400]}`,
};

const commonTableCellStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: `1px solid ${grey[200]}`,
};

const vulnerableCellStyle = {
  ...commonTableCellStyle,
  color: failureColor,
  fontWeight: "bold",
};

function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [chartData, setChartData] = useState();
  const [homeOpen, setHomeOpen] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [hideSummary, setHideSummary] = useState(false);
  const [projectSummary, setProjectSummary] = useState([]);

  useEffect(() => {
    const fetchProjectSummary = async () => {
      try {
        const response = await fetch("http://35.164.192.237:9090/dBoard/project/all");
        const data = await response.json();

        const formattedData = Object.values(data).map(project => ({
          name: project.project,
          thirdPartyLibraries: project.new + project.old + project.vulnerable,
          vulnerabilities: project.vulnerable,
          upToDate: project.new,
          toBeUpdated: project.old,
        }));

        setProjectSummary(formattedData);
      } catch (error) {
        console.error("Error fetching project summary:", error);
      }
    };

    fetchProjectSummary();
  }, []);

    useEffect(() => {
      if (selectedProject && projectSummary.length > 0) {
        const projectData = projectSummary.find(proj => proj.name === selectedProject);
        console.log("Selected Project:", selectedProject);
        if (projectData) {
          setChartData([
            { name: "Vulnerabilities", value: projectData.vulnerabilities || 0, color: failureColor },
            { name: "Up-to-date", value: projectData.upToDate || 0, color: successColor },
            { name: "To-be-Updated", value: projectData.toBeUpdated || 0, color: accentColor },
          ]);
        }
      }
    }, [selectedProject, projectSummary]);
  


  useEffect(() => {
    if (projectSummary) {
      setChartData([
        { name: "Vulnerabilities", value: projectSummary.vulnerable, color: failureColor },
        { name: "Up-to-date", value: projectSummary.new, color: successColor },
        { name: "To-be-Updated", value: projectSummary.old, color: accentColor },
      ]);
    }
  }, [projectSummary]);


  const handleProjectClick = async (project) => {
    setSelectedProject(project);
    setHomeOpen(false);
    setDetailsOpen(true);
    setChartOpen(false);
    setHideSummary(true);
    setMenuOpen(false);

    try {
      console.log("Fetching details for project:", project);
      const response = await fetch(`http://35.164.192.237:9090/dBoard/project?projectName=${project}`);
      const data = await response.json();

      setProjectDetails(data.dependency);
      setChartData(data.dasgboard);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };



  const handleHomeClick = () => {
    setSelectedProject(null);
    setDetailsOpen(false);
    setChartOpen(false);
    setHideSummary(false);
    setMenuOpen(false);
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                fontSize: '28px',
                marginRight: '8px',
                display: menuOpen ? 'block' : 'none',
                fontWeight: '900',
                color: secondaryColor,
              }}>
                <span style={{ color: accentColor }}>I</span>P
              </span>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: grey[50], cursor: 'pointer', padding: 0 }}>
              <Menu size={24} />
            </button>
          </a>
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
                {projectSummary.map((project, index) => (
                  <li key={project.id || index} style={{ padding: '10px 15px', cursor: 'pointer' }}>
                    <a
                      href="#"
                      onClick={() => handleProjectClick(project.name)}
                      style={{
                        display: 'block',
                        color: grey[50],
                        textDecoration: 'none',
                        fontSize: '16px',
                        paddingLeft: '20px',
                        cursor: 'pointer',
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
        {/* Integrity Pulse Title */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '30px' }}>
          <span style={{ fontSize: '28px', fontWeight: 'bold', color: primaryColor }}>Integrity Pulse</span>
        </div>

        {!detailsOpen && (
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
            <h2>Project Summary</h2>
            <table style={{ ...commonTableStyles, width: 'auto' }}>
              <thead>
                <tr style={commonTableHeaderRowStyle}>
                  <th style={commonTableHeaderCellStyle}>Project Name</th>
                  <th style={commonTableHeaderCellStyle}>Third-Party Libraries</th>
                  <th style={commonTableHeaderCellStyle}>Vulnerabilities</th>
                  <th style={commonTableHeaderCellStyle}>Up-to-date</th>
                  <th style={commonTableHeaderCellStyle}>To-be-Updated</th>
                </tr>
              </thead>
              <tbody>
                {projectSummary.map((project, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? grey[50] : grey[100] }}>
                    <td style={commonTableCellStyle}>
                      <a
                        href="#"
                        onClick={() => handleProjectClick(project.name)}
                        style={{
                          textDecoration: 'underline',
                          color: primaryColor,
                          cursor: 'pointer',
                        }}
                      >
                        {project.name}
                      </a>
                    </td>
                    <td style={commonTableCellStyle}>{project.thirdPartyLibraries}</td>
                    <td style={commonTableCellStyle}>{project.vulnerabilities}</td>
                    <td style={commonTableCellStyle}>{project.upToDate}</td>
                    <td style={commonTableCellStyle}>{project.toBeUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedProject && detailsOpen && (
          <div style={{ marginTop: "20px", backgroundColor: grey[50], padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
            <h2 style={{ marginBottom: '20px', color: primaryColor }}>{selectedProject.name}</h2>
            <div style={{ marginBottom: '15px' }}>
              <strong>Status:</strong>
              <span style={{ color: selectedProject.status === "✅ Passed" ? successColor : failureColor, fontWeight: 'bold', marginLeft: '5px' }}>
                {selectedProject.status}
              </span>
            </div>
            <p><strong>Last Run:</strong> {selectedProject.lastRun}</p>

            {projectDetails && (
              <div style={{ marginTop: "30px", padding: "20px", borderRadius: "8px" }}>
                <h3 style={{ marginBottom: '15px', color: primaryColor }}>Project Dependencies</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={commonTableStyles}>
                    <thead>
                      <tr style={commonTableHeaderRowStyle}>
                        <th style={commonTableHeaderCellStyle}>Released Date</th>
                        <th style={commonTableHeaderCellStyle}>Library</th>
                        <th style={commonTableHeaderCellStyle}>Dependency</th>
                        <th style={commonTableHeaderCellStyle}>Group ID</th>
                        <th style={commonTableHeaderCellStyle}>Project</th>
                        <th style={commonTableHeaderCellStyle}>Description</th>
                        <th style={commonTableHeaderCellStyle}>New Version</th>
                        <th style={commonTableHeaderCellStyle}>New Release Date</th>
                        <th style={commonTableHeaderCellStyle}>Version</th>
                        <th style={commonTableHeaderCellStyle}>URL</th>
                        <th style={commonTableHeaderCellStyle}>Vulnerable</th>
                        <th style={commonTableHeaderCellStyle}>Artifact ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectDetails.map((item, index) => (
                        <tr key={item.depId || item.lib || index} style={{ backgroundColor: index % 2 === 0 ? grey[50] : grey[100] }}>
                          <td style={commonTableCellStyle}>{item.releasedDate}</td>
                          <td style={commonTableCellStyle}>{item.lib}</td>
                          <td style={commonTableCellStyle}>{item.dependency}</td>
                          <td style={commonTableCellStyle}>{item.groupId}</td>
                          <td style={commonTableCellStyle}>{item.project}</td>
                          <td style={commonTableCellStyle}>{item.description}</td>
                          <td style={commonTableCellStyle}>{item.new_version}</td>
                          <td style={commonTableCellStyle}>{item.new_release_date}</td>
                          <td style={commonTableCellStyle}>{item.version}</td>
                          <td style={commonTableCellStyle}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: secondaryColor, textDecoration: 'underline' }}>Link</a>
                          </td>
                          <td style={item.isVulnerable ? vulnerableCellStyle : commonTableCellStyle}>
                            {item.isVulnerable ? "Yes" : "No"}
                          </td>
                          <td style={commonTableCellStyle}>{item.artifactId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: "40px", textAlign: "center" }}>
                  <button onClick={() => setPopupOpen(true)} style={{ padding: "12px 24px", cursor: "pointer", border: "none", backgroundColor: primaryColor, color: grey[50], borderRadius: "6px", fontSize: '16px', fontWeight: 'medium', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                    View Project Healths
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

          {popupOpen && chartData && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: grey[50],
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
          >
            <h3 style={{ textAlign: "center", color: primaryColor, marginBottom: '20px' }}>
              Project Health
            </h3>

            <PieChart width={250} height={200}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                innerRadius={30}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            <button
              onClick={() => setPopupOpen(false)}
              style={{
                marginTop: "24px",
                padding: "12px 24px",
                cursor: "pointer",
                border: "none",
                backgroundColor: failureColor,
                color: grey[50],
                borderRadius: "6px",
                display: "block",
                margin: "0 auto",
                fontSize: '16px',
                fontWeight: 'medium',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              Close
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;