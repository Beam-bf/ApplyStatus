
import { useState } from "react";
import "./App.css";

type Application = {
  id: number;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Rejected" | "Offer";
  date: string;
};

const initialApplications: Application[] = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer Intern",
    status: "Applied",
    date: "2026-10-15",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineer Intern",
    status: "Interview",
    date: "2026-10-14",
  },
  {
    id: 3,
    company: "Careem",
    role: "React Developer Intern",
    status: "Offer",
    date: "2026-10-12",
  },
];

function App() {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const total = applications.length;
  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;
  const pending = applications.filter(
    (app) => app.status === "Applied"
  ).length;
  const deleteApplication = (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this application?"
  );

  if (!confirmed) return;

  setApplications((previous) =>
    previous.filter((app) => app.id !== id)
  );
};

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">ApplyFlow<span>.</span></h2>
        <p className="sidebar-label">WORKSPACE</p>
        <nav>
          <a className="nav-link active" href="#dashboard">
            ▦ Dashboard
          </a>
          <a className="nav-link" href="#applications">
            ▤ Applications
          </a>
        </nav>
        <div className="sidebar-bottom">
          <div className="avatar">BF</div>
          <div>
            <strong>My Workspace</strong>
            <p>Job seeker</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <span>My Workspace / Dashboard</span>
          <span className="today">October 2026</span>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR CAREER, ORGANIZED</p>
            <h1>Job search, simplified.</h1>
            <p className="subtitle">
              Keep track of every opportunity and move forward with confidence.
            </p>
          </div>
          <button
            className="primary-button"
            onClick={() => {
              const company = window.prompt("Enter the company name:");
              if (!company?.trim()) return;

              const role = window.prompt("Enter the job title:");
              if (!role?.trim()) return;

              setApplications((previous) => [
                {
                  id: Date.now(),
                  company: company.trim(),
                  role: role.trim(),
                  status: "Applied",
                  date: new Date().toISOString().slice(0, 10),
                },
                ...previous,
              ]);
            }}
          >
            + Add application
          </button>
        </section>

        <section className="stats">
          <StatCard label="Total applications" value={total} symbol="↗" />
          <StatCard label="Interviews" value={interviews} symbol="◎" />
          <StatCard label="Awaiting response" value={pending} symbol="◷" />
          <StatCard label="Offers received" value={offers} symbol="✦" />
        </section>

        <section className="applications-section" id="applications">
          <div className="section-heading">
            <div>
              <h2>Recent applications</h2>
              <p>Your latest career opportunities at a glance.</p>
            </div>
            <span className="count">{total} applications</span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>COMPANY & ROLE</th>
                  <th>DATE APPLIED</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                 <tr key={app.id}>
                    <td>
                      <strong>{app.company}</strong>
                      <span className="role">{app.role}</span>
                    </td>
                    <td>{app.date}</td>
                    <td>
                      <select
                        className={`status status-${app.status.toLowerCase()}`}
                        value={app.status}
                        onChange={(event) =>
                          setApplications((previous) =>
                            previous.map((item) =>
                              item.id === app.id
                                ? {
                                    ...item,
                                    status: event.target.value as Application["status"],
                                  }
                                : item
                            )
                          )
                        }
                      >
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Rejected</option>
                        <option>Offer</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={3} className="empty-state">
                      No applications yet. Add your first opportunity!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  symbol,
}: {
  label: string;
  value: number;
  symbol: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-symbol">{symbol}</span>
      </div>
      <strong className="stat-value">{value}</strong>
    </div>
  );
}

export default App;
