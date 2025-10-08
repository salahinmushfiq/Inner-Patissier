import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { AccessTime, DoneAll, ErrorOutline } from '@mui/icons-material';

const statusIcons = {
  pending: <AccessTime />,
  confirmed: <AccessTime />,
  processing: <AccessTime />,
  shipped: <AccessTime />,
  delivered: <DoneAll />,
  cancelled: <ErrorOutline />,
  failed: <ErrorOutline />,
};

const StatusTimeline = ({ statusLogs = [] }) => {
  const sortedLogs = [...statusLogs].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  return (
    <div className="mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Status Change History</h3>
      <Timeline position="right">
        {sortedLogs.map((log, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary">
                {statusIcons[log.new_status?.toLowerCase()] || <AccessTime />}
              </TimelineDot>
              {index !== sortedLogs.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent className="text-sm text-gray-800 dark:text-gray-200">
              <div><strong>Status:</strong> {log.new_status}</div>
              <div><strong>By:</strong> {log.changed_by || 'System'}</div>
              <div><strong>At:</strong> {new Date(log.timestamp).toLocaleString()}</div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default StatusTimeline;
