import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [statistics2, setStatistics2] = useState(null);
  const [employes, setEmployes] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [fiches1, setFiches1] = useState(0);
  const [validators, setValidators] = useState(0);
  const [vnettoyage, setVnettoyage] = useState(0);
  const [vpese, setVpese] = useState(0);
  const [vfabrication, setVfabrication] = useState(0);
  const [vemballage, setVemballage] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data.ok) {
          setEmployes(res.data.employe);
          setAdmin(res.data.admin);
          setFiches1(res.data.fiche1);
          setValidators(res.data.validator);
          setVnettoyage(res.data.vnettoyage);
          setVpese(res.data.vpese);
          setVfabrication(res.data.vfabrication);
          setVemballage(res.data.vemballage);
          setStatistics([
            { name: "Admins", value: res.data.admin },
            { name: "Employees", value: res.data.employe },
            { name: "Validators", value: res.data.validator },
          ]);
          setStatistics2([
            { name: "Pese", vpese: res.data.vpese },
            { name: "Nettoyage", vnettoyage: res.data.vnettoyage },
            {
              name: "Fabrication",
              vfabrication: res.data.vfabrication,
            },
            { name: "Emballage", vemballage: res.data.vemballage },
          ]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    const total = statistics.reduce((acc, entry) => acc + entry.value, 0);
    const percentage = `${((statistics[index].value / total) * 100).toFixed(
      0
    )}%`;

    const xOffset = 60;
    const yOffset = 45;

    const labelX =
      cx + (outerRadius + xOffset) * Math.cos(-midAngle * (Math.PI / 180));
    const labelY =
      cy + (outerRadius + yOffset) * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <>
        <text
          x={labelX}
          y={labelY}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
        >
          {statistics[index].name}
        </text>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
        >
          {percentage}
        </text>
      </>
    );
  };

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div className="dash-up">
            <div className="dashboard">
            
              <div className="dashboard-box">
                <h2>Total Employeés</h2>
                <h2>{employes}</h2>
              </div>
              <div className="dashboard-box">
                <h2>Total Validateurs</h2>
                <h2>{validators}</h2>
              </div>
              <div className="dashboard-box">
                <h2>Fiches d'employeés</h2>
                <h2>{fiches1}</h2>
              </div>
              <div className="dashboard-box">
                <h2>Docs Nettoyage</h2>
                <h2>{vnettoyage}</h2>
              </div>
              <div className="dashboard-box">
                <h2>Docs Pese</h2>
                <h2>{vpese}</h2>
              </div>
              <div className="dashboard-box">
                <h2>Docs Fabrication</h2>
                <h2>{vfabrication}</h2>
              </div>
              <div className="dashboard-box">
                <h2>Docs Emballage</h2>
                <h2>{vemballage}</h2>
              </div>
              
            </div>
          </div>
          <div className="dash-down">
            <div className="sa">
              <div className="cadredash">
                <h2 className="sdl">Dossier des Lots :</h2>

                {statistics2 && (
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={statistics2}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="vpese" barSize={30} fill="#FF0000" />
                      <Bar dataKey="vnettoyage" barSize={30} fill="#82ca9d" />
                      <Bar dataKey="vfabrication" barSize={30} fill="#413ea0" />
                      <Bar dataKey="vemballage" barSize={30} fill="#00FFFF" />
                      <Line type="monotone" dataKey="vpese" stroke="#ff7300" />
                      <Line
                        type="monotone"
                        dataKey="vnettoyage"
                        stroke="#ff7300"
                      />
                      <Line
                        type="monotone"
                        dataKey="vfabrication"
                        stroke="#ff7300"
                      />
                      <Line
                        type="monotone"
                        dataKey="vemballage"
                        stroke="#ff7300"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            <div className="sb">
              <div className="cadredash">
                <h2 className="sdl">
                  Pourcentage d'utilisateurs :
                </h2>

                {statistics && (
                  <div>
                    <div className="pie-chart">
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                          <Pie
                            data={statistics}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={renderCustomizedLabel}
                          >
                            {statistics.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  index === 0
                                    ? "#82ca9d"
                                    : index === 1
                                    ? "#ffc658"
                                    : "#ff7300"
                                }
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="sc">
              <div className="cadredash">
                <h2 className="sdl">Nombre d'utilisateurs :</h2>
                {statistics && (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={statistics}>
                      {" "}
                      {/* Change the index to the desired statistic */}
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" barSize={30} fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
