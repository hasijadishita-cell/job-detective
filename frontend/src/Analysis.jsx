import { useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import "./Analysis.css";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function Analysis() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [analysis, setAnalysis] = useState(null)
    useEffect(() => {
        fetch("http://127.0.0.1:5000/applications")
            .then(response => response.json())
            .then(data => setApplications(data));
    }, []);
    const applied = applications.filter(
        application => application.stage === "Applied"
    ).length;

    const interviews = applications.filter(
        application => application.stage === "Interview"
    ).length;

    const trials = applications.filter(
        application => application.stage === "Assessment/Trial"
    ).length;
    const offers = applications.filter(
        application => application.stage === "Offer"
    ).length;

    const rejected = applications.filter(
        application => application.outcome === "Rejected"
    ).length;

    const noResponse = applications.filter(
        application => application.outcome === "No Response"
    ).length;
    const pending = applications.filter(
        application => application.outcome === "Pending"
    ).length;

    const hired = applications.filter(
        application => application.outcome === "Hired"
    ).length;

    const chartData = [
        { name: "Applied", value: applied },
        { name: "Interviews", value: interviews },
        { name: "Assessment/Trials", value: trials },
        { name: "Offers", value: offers }

    ];

    function analyseApplications() {
        fetch("http://127.0.0.1:5000/analyse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                applications: applications,
            }),
        })
            .then(response => response.json())
            .then(data => {
                setAnalysis(data.analysis);
            });

    }
    return (
        <div className="analysis-page">
            <div className="analysis-topbar">
                <h2>🔎 Job Detective</h2>
                <button onClick={() => navigate("/")}>← Back to Tracker</button>
            </div>

            <div className="analysis-header">
                <div>
                    <h1>Job Detective Report 🔎</h1>
                    <p className="summary">A summary of your job application journey</p>
                </div>
            </div>


            <div className="stats-grid">
                <div className="stat-card">
                    <h2>{applications.length}</h2>
                    <p>Total Applications</p>
                </div>

                <div className="stat-card">
                    <h2>{rejected}</h2>
                    <p>Rejected</p>
                </div>

                <div className="stat-card">
                    <h2>{pending}</h2>
                    <p>Pending</p>
                </div>

                <div className="stat-card">
                    <h2>{noResponse}</h2>
                    <p>No Response</p>
                </div>

                <div className="stat-card">
                    <h2>{hired}</h2>
                    <p>Hired</p>
                </div>
            </div>

            <div className="analysis-content">
                <div className="chart-container">
                <h2 className="chart-title">📊 Application Stage Breakdown</h2>
<p className="chart-subtitle">
  See where your applications are in the hiring process
</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={105}
                                paddingAngle={4}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={[
                                            "#8b5cf6",
                                            "#f59e0b",
                                            "#10b981",
                                            "#f43f5e",
                                            "#6366f1",
                                            "#14b8a6"
                                        ][index]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="analysis-box">


                    <h2>💡 Key Insights</h2>

                    {analysis ? (
                        <div>
                            <div className="insight-card">
                                <h3>🔎 Pattern Detected</h3>
                                <p>{analysis.pattern}</p>
                            </div>

                            <div className="insight-card">
                                <h3>⚠️ Possible Issue</h3>
                                <p>{analysis.problem}</p>
                            </div>

                            <div className="insight-card">
                                <h3>🎯 Recommendation</h3>
                                <p>{analysis.recommendation}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Your key insights will appear here.</p>
                    )}
                </div>
                <button className="analyse-button"
                    type="button"
                    onClick={analyseApplications}>
                    ✨ Analyse My Applications →
                </button>

            </div>
        </div>
    );
}
export default Analysis;