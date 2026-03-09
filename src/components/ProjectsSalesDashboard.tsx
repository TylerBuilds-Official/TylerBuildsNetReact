import React, { useState, useEffect, useRef, useCallback } from "react";

type KPI = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: number;
  format?: "currency" | "number" | "percent";
};

type DailyData = {
  day: string;
  value: number;
  isToday?: boolean;
};

type Alert = {
  id: number;
  type: "warning" | "info" | "success";
  message: string;
  detail: string;
  time: string;
};

const initialKPIs: KPI[] = [
  { label: "Today's Revenue", value: 12847, prefix: "$", trend: 12, format: "currency" },
  { label: "Orders", value: 47, trend: 8, format: "number" },
  { label: "Avg Order Value", value: 273, prefix: "$", trend: -3, format: "currency" },
  { label: "Conversion Rate", value: 3.2, suffix: "%", trend: 5, format: "percent" },
];

const initialDailyData: DailyData[] = [
  { day: "Mon", value: 9450 },
  { day: "Tue", value: 11230 },
  { day: "Wed", value: 8970 },
  { day: "Thu", value: 13100 },
  { day: "Fri", value: 10850 },
  { day: "Sat", value: 7620 },
  { day: "Today", value: 12847, isToday: true },
];

const scheduledAlerts: Omit<Alert, "id" | "time">[] = [
  { type: "warning", message: "West Region sales down 18%", detail: "vs. same day last week" },
  { type: "info", message: "New high-value order received", detail: "$2,340 from Acme Corp" },
  { type: "success", message: "Daily target reached", detail: "Revenue goal hit at 2:34 PM" },
];

// Animated number component
const AnimatedNumber: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  format?: "currency" | "number" | "percent";
}> = ({ value, prefix = "", suffix = "", format = "number" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValue = useRef(value);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const duration = 800;
    const steps = 30;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(start + (end - start) * eased);

      if (current >= steps) {
        clearInterval(timer);
        setDisplayValue(end);
        prevValue.current = end;
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  const formatValue = (val: number) => {
    if (format === "currency") {
      return val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    if (format === "percent") {
      return val.toFixed(1);
    }
    return Math.round(val).toLocaleString();
  };

  return (
    <span className="dashboard-kpi-value">
      {prefix}{formatValue(displayValue)}{suffix}
    </span>
  );
};

// Bar chart component
const SalesChart: React.FC<{ data: DailyData[]; maxValue: number }> = ({ data, maxValue }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-chart">
      <div className="dashboard-chart-bars">
        {data.map((d, idx) => (
          <div key={d.day} className="dashboard-chart-bar-container">
            <div
              className={`dashboard-chart-bar ${d.isToday ? "today" : ""}`}
              style={{
                height: animated ? `${(d.value / maxValue) * 100}%` : "0%",
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              <span className="dashboard-chart-bar-value">${(d.value / 1000).toFixed(1)}k</span>
            </div>
            <span className="dashboard-chart-bar-label">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Data source card component
const DataSourceCard: React.FC<{
  name: string;
  icon: React.ReactNode;
  status: "connected" | "syncing";
  lastSync: string;
  metrics: { label: string; value: string }[];
}> = ({ name, icon, status, lastSync, metrics }) => {
  return (
    <div className={`dashboard-source ${status}`}>
      <div className="dashboard-source-header">
        <div className="dashboard-source-icon">{icon}</div>
        <div className="dashboard-source-info">
          <span className="dashboard-source-name">{name}</span>
          <span className="dashboard-source-status">
            {status === "syncing" ? (
              <>
                <span className="dashboard-sync-spinner"></span>
                Syncing...
              </>
            ) : (
              <>
                <span className="dashboard-status-dot"></span>
                Connected
              </>
            )}
          </span>
        </div>
        <span className="dashboard-source-time">{lastSync}</span>
      </div>
      <div className="dashboard-source-metrics">
        {metrics.map((m) => (
          <div key={m.label} className="dashboard-source-metric">
            <span className="dashboard-source-metric-value">{m.value}</span>
            <span className="dashboard-source-metric-label">{m.label}</span>
          </div>
        ))}
      </div>
      {status === "syncing" && <div className="dashboard-source-sync-bar"></div>}
    </div>
  );
};

const ProjectsSalesDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [kpis, setKpis] = useState(initialKPIs);
  const [dailyData, setDailyData] = useState(initialDailyData);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [crmSyncing, setCrmSyncing] = useState(false);
  const [paymentSyncing, setPaymentSyncing] = useState(false);
  const alertIndex = useRef(0);

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  };

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random changes to KPIs
      setKpis((prev) =>
        prev.map((kpi) => {
          if (kpi.format === "percent") {
            return { ...kpi, value: kpi.value + (Math.random() - 0.4) * 0.1 };
          }
          if (kpi.label === "Orders") {
            return Math.random() > 0.7 ? { ...kpi, value: kpi.value + 1 } : kpi;
          }
          if (kpi.label === "Today's Revenue") {
            const increase = Math.random() > 0.5 ? Math.floor(Math.random() * 200) + 50 : 0;
            return { ...kpi, value: kpi.value + increase };
          }
          return kpi;
        })
      );

      // Update today's value in chart
      setDailyData((prev) =>
        prev.map((d) =>
          d.isToday ? { ...d, value: d.value + Math.floor(Math.random() * 150) } : d
        )
      );

      setLastUpdated(0);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Last updated counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Trigger alerts
  useEffect(() => {
    const triggerAlert = () => {
      if (alertIndex.current < scheduledAlerts.length) {
        const alert = scheduledAlerts[alertIndex.current];
        setAlerts((prev) => [
          { ...alert, id: Date.now(), time: getTimestamp() },
          ...prev,
        ].slice(0, 2));
        alertIndex.current++;
      }
    };

    const timers = [
      setTimeout(triggerAlert, 3000),
      setTimeout(triggerAlert, 8000),
      setTimeout(triggerAlert, 14000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Simulate periodic syncing
  useEffect(() => {
    const syncCRM = () => {
      setCrmSyncing(true);
      setTimeout(() => setCrmSyncing(false), 2000);
    };

    const syncPayment = () => {
      setPaymentSyncing(true);
      setTimeout(() => setPaymentSyncing(false), 1500);
    };

    syncCRM();
    const crmInterval = setInterval(syncCRM, 12000);
    const paymentInterval = setInterval(syncPayment, 15000);

    setTimeout(syncPayment, 5000);

    return () => {
      clearInterval(crmInterval);
      clearInterval(paymentInterval);
    };
  }, []);

  const maxChartValue = Math.max(...dailyData.map((d) => d.value)) * 1.1;

  const dismissAlert = useCallback((id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <div className="sales-dashboard-demo">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h3>Real-Time Sales Dashboard</h3>
          <p className="muted">Live demo: Watch data flow from multiple sources</p>
        </div>
        <button className="btn dashboard-close" onClick={onClose} aria-label="Close demo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="dashboard-content">
        {/* Data Sources */}
        <div className="dashboard-sources">
          <div className="dashboard-sources-label">Data Sources</div>
          <div className="dashboard-sources-grid">
            <DataSourceCard
              name="CRM System"
              status={crmSyncing ? "syncing" : "connected"}
              lastSync={crmSyncing ? "Now" : "12s ago"}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              }
              metrics={[
                { label: "Active Deals", value: "23" },
                { label: "Pipeline", value: "$142k" },
              ]}
            />
            <DataSourceCard
              name="Payment Processor"
              status={paymentSyncing ? "syncing" : "connected"}
              lastSync={paymentSyncing ? "Now" : "8s ago"}
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              }
              metrics={[
                { label: "Transactions", value: "47" },
                { label: "Volume", value: "$12.8k" },
              ]}
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="dashboard-kpis">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="dashboard-kpi">
              <span className="dashboard-kpi-label">{kpi.label}</span>
              <AnimatedNumber
                value={kpi.value}
                prefix={kpi.prefix}
                suffix={kpi.suffix}
                format={kpi.format}
              />
              <span className={`dashboard-kpi-trend ${kpi.trend >= 0 ? "up" : "down"}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {kpi.trend >= 0 ? (
                    <polyline points="18 15 12 9 6 15"></polyline>
                  ) : (
                    <polyline points="6 9 12 15 18 9"></polyline>
                  )}
                </svg>
                {Math.abs(kpi.trend)}%
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="dashboard-chart-section">
          <div className="dashboard-chart-header">
            <span className="dashboard-chart-title">Daily Sales This Week</span>
            <span className="dashboard-chart-subtitle">Revenue by day</span>
          </div>
          <SalesChart data={dailyData} maxValue={maxChartValue} />
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="dashboard-alerts">
            <div className="dashboard-alerts-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Live Alerts
            </div>
            <div className="dashboard-alerts-list">
              {alerts.map((alert) => (
                <div key={alert.id} className={`dashboard-alert ${alert.type}`}>
                  <div className="dashboard-alert-icon">
                    {alert.type === "warning" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    )}
                    {alert.type === "info" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    )}
                    {alert.type === "success" && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <div className="dashboard-alert-content">
                    <span className="dashboard-alert-message">{alert.message}</span>
                    <span className="dashboard-alert-detail">{alert.detail}</span>
                  </div>
                  <span className="dashboard-alert-time">{alert.time}</span>
                  <button className="dashboard-alert-dismiss" onClick={() => dismissAlert(alert.id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        <div className="dashboard-live-indicator">
          <span className="dashboard-live-dot"></span>
          <span>Live</span>
          <span className="dashboard-live-time">
            Updated {lastUpdated === 0 ? "just now" : `${lastUpdated}s ago`}
          </span>
        </div>
        <div className="dashboard-footer-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Compare to: End-of-week spreadsheet reports
        </div>
      </div>
    </div>
  );
};

export default ProjectsSalesDashboard;
