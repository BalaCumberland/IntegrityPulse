import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  {
    id: 1,
    name: "Project 1",
    status: "✅ Passed",
    lastRun: "March 15, 2025",
    description: "This is Project 1's CI/CD summary.",
  },
  {
    id: 2,
    name: "Project 2",
    status: "❌ Failed",
    lastRun: "March 16, 2025",
    description: "This is Project 2's CI/CD summary.",
  },
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar / Hamburger Menu */}
      <div className={`bg-gray-800 text-white p-4 ${menuOpen ? "w-64" : "w-16"} transition-all`}>
        <button className="mb-4" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={`p-2 cursor-pointer ${selectedProject.id === project.id ? "bg-gray-700" : ""}`}
              onClick={() => setSelectedProject(project)}
            >
              {menuOpen ? project.name : project.id}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">{selectedProject.name}</h1>
        <Card>
          <CardContent>
            <p><strong>Status:</strong> {selectedProject.status}</p>
            <p><strong>Last Run:</strong> {selectedProject.lastRun}</p>
            <p>{selectedProject.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
