import { IncidentStatus, Priority } from '../types/incident';
import { priorityLabels, statusLabels } from '../types/options';

type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

const statusTone: Record<IncidentStatus, BadgeTone> = {
  OPEN: 'warning',
  IN_PROGRESS: 'info',
  RESOLVED: 'success',
  CANCELED: 'neutral'
};

const priorityTone: Record<Priority, BadgeTone> = {
  LOW: 'neutral',
  MEDIUM: 'info',
  HIGH: 'warning',
  CRITICAL: 'danger'
};

interface BadgeProps {
  label: string;
  tone?: BadgeTone;
}

function Badge({ label, tone = 'neutral' }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{label}</span>;
}

export function StatusBadge({ status }: { status: IncidentStatus }) {
  return <Badge label={statusLabels[status]} tone={statusTone[status]} />;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge label={priorityLabels[priority]} tone={priorityTone[priority]} />;
}
