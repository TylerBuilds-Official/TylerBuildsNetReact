import React, { useState, useEffect, useRef, useCallback } from "react";
import CloseSvg from "../assets/svg/common/CloseSvg";
import InfoCircleSvg from "../assets/svg/common/InfoCircleSvg";
import CheckmarkSvg from "../assets/svg/common/CheckmarkSvg";
import TrendArrowSvg from "../assets/svg/common/TrendArrowSvg";
import UserGroupSvg from "../assets/svg/DemoDashboard/UserGroupSvg";
import CreditCardSvg from "../assets/svg/DemoDashboard/CreditCardSvg";
import BellSvg from "../assets/svg/DemoDashboard/BellSvg";
import WarningTriangleSvg from "../assets/svg/DemoDashboard/WarningTriangleSvg";

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

const ALERT_ICONS = {
  warning: <WarningTriangleSvg />,
  info: <InfoCircleSvg />,
  success: <CheckmarkSvg size={16} />,
} as const;

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

  useEffect(() => {
    const interval = setInterval(() => {
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

      setDailyData((prev) =>
        prev.map((d) =>
          d.isToday ? { ...d, value: d.value + Math.floor(Math.random() * 150) } : d
        )
      );

      setLastUpdated(0);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="dashboard-header">
        <div>
          <h3>Real-Time Sales Dashboard</h3>
          <p className="muted">Live demo: Watch data flow from multiple sources</p>
        </div>
        <button className="btn dashboard-close" onClick={onClose} aria-label="Close demo">
          <CloseSvg />
        </button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-sources">
          <div className="dashboard-sources-label">Data Sources</div>
          <div className="dashboard-sources-grid">
            <DataSourceCard
              name="CRM System"
              status={crmSyncing ? "syncing" : "connected"}
              lastSync={crmSyncing ? "Now" : "12s ago"}
              icon={<UserGroupSvg />}
              metrics={[
                { label: "Active Deals", value: "23" },
                { label: "Pipeline", value: "$142k" },
              ]}
            />
            <DataSourceCard
              name="Payment Processor"
              status={paymentSyncing ? "syncing" : "connected"}
              lastSync={paymentSyncing ? "Now" : "8s ago"}
              icon={<CreditCardSvg />}
              metrics={[
                { label: "Transactions", value: "47" },
                { label: "Volume", value: "$12.8k" },
              ]}
            />
          </div>
        </div>

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
                <TrendArrowSvg direction={kpi.trend >= 0 ? "up" : "down"} />
                {Math.abs(kpi.trend)}%
              </span>
            </div>
          ))}
        </div>

        <div className="dashboard-chart-section">
          <div className="dashboard-chart-header">
            <span className="dashboard-chart-title">Daily Sales This Week</span>
            <span className="dashboard-chart-subtitle">Revenue by day</span>
          </div>
          <SalesChart data={dailyData} maxValue={maxChartValue} />
        </div>

        {alerts.length > 0 && (
          <div className="dashboard-alerts">
            <div className="dashboard-alerts-label">
              <BellSvg />
              Live Alerts
            </div>
            <div className="dashboard-alerts-list">
              {alerts.map((alert) => (
                <div key={alert.id} className={`dashboard-alert ${alert.type}`}>
                  <div className="dashboard-alert-icon">
                    {ALERT_ICONS[alert.type]}
                  </div>
                  <div className="dashboard-alert-content">
                    <span className="dashboard-alert-message">{alert.message}</span>
                    <span className="dashboard-alert-detail">{alert.detail}</span>
                  </div>
                  <span className="dashboard-alert-time">{alert.time}</span>
                  <button className="dashboard-alert-dismiss" onClick={() => dismissAlert(alert.id)}>
                    <CloseSvg size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-footer">
        <div className="dashboard-live-indicator">
          <span className="dashboard-live-dot"></span>
          <span>Live</span>
          <span className="dashboard-live-time">
            Updated {lastUpdated === 0 ? "just now" : `${lastUpdated}s ago`}
          </span>
        </div>
        <div className="dashboard-footer-note">
          <InfoCircleSvg size={14} />
          Compare to: End-of-week spreadsheet reports
        </div>
      </div>
    </div>
  );
};

export default ProjectsSalesDashboard;
