import React, { useState, useEffect, useCallback } from "react";

type InventoryItem = {
  sku: string;
  name: string;
  warehouse: number;
  accounting: number;
};

const initialInventory: InventoryItem[] = [
  { sku: "WH-1001", name: "Steel Brackets (Box)", warehouse: 150, accounting: 142 },
  { sku: "WH-1002", name: "Copper Fittings (Pack)", warehouse: 89, accounting: 89 },
  { sku: "WH-1003", name: "PVC Connectors", warehouse: 234, accounting: 219 },
  { sku: "WH-1004", name: "Aluminum Rails (10ft)", warehouse: 45, accounting: 52 },
  { sku: "WH-1005", name: "Rubber Gaskets (100pc)", warehouse: 512, accounting: 498 },
];

type SyncLogEntry = {
  time: string;
  message: string;
  type: "info" | "success" | "warning";
};

const ProjectsInvSyncAutomation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncLog, setSyncLog] = useState<SyncLogEntry[]>([]);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [stats, setStats] = useState({ itemsSynced: 0, conflictsResolved: 0, timeElapsed: 0 });

  // Calculate mismatches
  const mismatches = inventory.filter((item) => item.warehouse !== item.accounting);
  const totalItems = inventory.length;

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const addLogEntry = useCallback((message: string, type: SyncLogEntry["type"] = "info") => {
    setSyncLog((prev) => [...prev, { time: getTimestamp(), message, type }]);
  }, []);

  const runSync = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    setSyncComplete(false);
    setSyncProgress(0);
    setSyncLog([]);

    const startTime = Date.now();

    // Step 1: Connecting
    addLogEntry("Connecting to Warehouse API...", "info");
    await delay(400);
    setSyncProgress(10);

    addLogEntry("Connecting to Accounting System...", "info");
    await delay(300);
    setSyncProgress(20);

    addLogEntry("Connection established ✓", "success");
    await delay(200);

    // Step 2: Fetching data
    addLogEntry("Fetching inventory records...", "info");
    await delay(500);
    setSyncProgress(35);

    addLogEntry(`Found ${totalItems} items to compare`, "info");
    await delay(300);
    setSyncProgress(45);

    // Step 3: Comparing and syncing
    addLogEntry(`Detected ${mismatches.length} discrepancies`, mismatches.length > 0 ? "warning" : "success");
    await delay(400);
    setSyncProgress(55);

    // Animate each item syncing
    const newInventory = [...inventory];
    let conflictsResolved = 0;

    for (let i = 0; i < newInventory.length; i++) {
      const item = newInventory[i];
      if (item.warehouse !== item.accounting) {
        addLogEntry(`Syncing ${item.sku}: ${item.accounting} → ${item.warehouse}`, "info");
        await delay(300);

        // Animate the number changing
        newInventory[i] = { ...item, accounting: item.warehouse };
        setInventory([...newInventory]);
        conflictsResolved++;

        addLogEntry(`${item.sku} synchronized ✓`, "success");
        await delay(150);
      }
      setSyncProgress(55 + ((i + 1) / newInventory.length) * 35);
    }

    // Step 4: Finalizing
    setSyncProgress(95);
    addLogEntry("Validating data integrity...", "info");
    await delay(400);

    addLogEntry("Sync completed successfully ✓", "success");
    setSyncProgress(100);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    setStats({
      itemsSynced: totalItems,
      conflictsResolved,
      timeElapsed: parseFloat(elapsed),
    });

    setLastSynced("Just now");
    setSyncComplete(true);
    setIsSyncing(false);
  };

  const resetDemo = () => {
    setInventory(initialInventory);
    setSyncComplete(false);
    setSyncProgress(0);
    setSyncLog([]);
    setLastSynced(null);
    setStats({ itemsSynced: 0, conflictsResolved: 0, timeElapsed: 0 });
  };

  // Update "last synced" text
  useEffect(() => {
    if (!lastSynced) return;
    const interval = setInterval(() => {
      setLastSynced((prev) => {
        if (prev === "Just now") return "1 minute ago";
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [lastSynced]);

  return (
    <div className="inv-sync-demo">
      {/* Header */}
      <div className="inv-sync-header">
        <div>
          <h3>Inventory Sync Automation</h3>
          <p className="muted">Live demo: Watch data sync between systems in real-time</p>
        </div>
        <button className="btn inv-sync-close" onClick={onClose} aria-label="Close demo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="inv-sync-content">
        {/* Systems Row */}
        <div className="inv-sync-systems">
          {/* Warehouse System */}
          <div className="inv-sync-system">
            <div className="inv-sync-system-header">
              <div className="inv-sync-system-icon warehouse">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <span className="inv-sync-system-title">Warehouse System</span>
                <span className="inv-sync-system-subtitle">Source of Truth</span>
              </div>
            </div>
            <div className="inv-sync-items">
              {inventory.map((item) => (
                <div key={item.sku} className="inv-sync-item">
                  <span className="inv-sync-item-name">{item.name}</span>
                  <span className="inv-sync-item-value">{item.warehouse}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Arrow */}
          <div className={`inv-sync-arrow ${isSyncing ? "syncing" : ""}`}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            {isSyncing && <div className="inv-sync-pulse"></div>}
          </div>

          {/* Accounting System */}
          <div className="inv-sync-system">
            <div className="inv-sync-system-header">
              <div className="inv-sync-system-icon accounting">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div>
                <span className="inv-sync-system-title">Accounting System</span>
                <span className="inv-sync-system-subtitle">
                  {lastSynced ? `Synced: ${lastSynced}` : "Last synced: 3 days ago"}
                </span>
              </div>
            </div>
            <div className="inv-sync-items">
              {inventory.map((item) => {
                const isMismatch = item.warehouse !== item.accounting;
                return (
                  <div key={item.sku} className={`inv-sync-item ${isMismatch ? "mismatch" : "synced"}`}>
                    <span className="inv-sync-item-name">{item.name}</span>
                    <span className={`inv-sync-item-value ${isMismatch ? "mismatch" : ""}`}>
                      {item.accounting}
                      {isMismatch && <span className="inv-sync-item-diff">≠ {item.warehouse}</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {(isSyncing || syncComplete) && (
          <div className="inv-sync-progress-container">
            <div className="inv-sync-progress-track">
              <div
                className={`inv-sync-progress-fill ${syncComplete ? "complete" : ""}`}
                style={{ width: `${syncProgress}%` }}
              ></div>
            </div>
            <span className="inv-sync-progress-text">
              {syncComplete ? "Sync Complete" : `Syncing... ${Math.round(syncProgress)}%`}
            </span>
          </div>
        )}

        {/* Stats Row */}
        {syncComplete && (
          <div className="inv-sync-stats">
            <div className="inv-sync-stat">
              <span className="inv-sync-stat-value">{stats.itemsSynced}</span>
              <span className="inv-sync-stat-label">Items Synced</span>
            </div>
            <div className="inv-sync-stat">
              <span className="inv-sync-stat-value">{stats.conflictsResolved}</span>
              <span className="inv-sync-stat-label">Conflicts Resolved</span>
            </div>
            <div className="inv-sync-stat">
              <span className="inv-sync-stat-value">{stats.timeElapsed}s</span>
              <span className="inv-sync-stat-label">Time Elapsed</span>
            </div>
          </div>
        )}

        {/* Sync Log */}
        {syncLog.length > 0 && (
          <div className="inv-sync-log">
            <div className="inv-sync-log-header">Sync Log</div>
            <div className="inv-sync-log-entries">
              {syncLog.map((entry, idx) => (
                <div key={idx} className={`inv-sync-log-entry ${entry.type}`}>
                  <span className="inv-sync-log-time">{entry.time}</span>
                  <span className="inv-sync-log-message">{entry.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="inv-sync-footer">
        <div className="inv-sync-status">
          {!isSyncing && !syncComplete && mismatches.length > 0 && (
            <span className="inv-sync-status-warning">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {mismatches.length} item{mismatches.length !== 1 ? "s" : ""} out of sync
            </span>
          )}
          {syncComplete && mismatches.length === 0 && (
            <span className="inv-sync-status-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              All systems synchronized
            </span>
          )}
        </div>
        <div className="inv-sync-actions">
          {syncComplete && (
            <button className="btn" onClick={resetDemo}>
              Reset Demo
            </button>
          )}
          <button
            className="btn primary"
            onClick={runSync}
            disabled={isSyncing || (syncComplete && mismatches.length === 0)}
          >
            {isSyncing ? (
              <>
                <span className="inv-sync-spinner"></span>
                Syncing...
              </>
            ) : syncComplete ? (
              "Synced ✓"
            ) : (
              "Run Sync"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Utility function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default ProjectsInvSyncAutomation;
