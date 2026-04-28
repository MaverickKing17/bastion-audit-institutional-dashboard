export enum Severity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  SAFE = 'SAFE'
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: Severity;
  message: string;
  sourceModel: string;
  confidence: number;
  regulatoryCode?: string;
  metadata?: Record<string, any>;
}

export interface ComplianceScore {
  framework: string;
  score: number;
  status: 'COMPLIANT' | 'NON-COMPLIANT' | 'UNDER REVIEW';
  lastAudit: string;
}

export interface AgentStatus {
  id: string;
  name: string;
  version: string;
  status: 'ACTIVE' | 'HIBERNATING' | 'TERMINATED';
  riskLevel: Severity;
  lastAudit: string;
}

export interface ComponentHealth {
  name: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE';
  uptime: string;
  latency: number;
  cpu: number;
  memory: number;
  lastPulse: string;
  type?: string;
}

export interface HealthMetric {
  timestamp: string;
  value: number;
}
