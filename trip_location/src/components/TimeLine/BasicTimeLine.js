import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';

export default function BasicTimeline({startDay, endDay, scheduleDays}) {

  const days = endDay.diff(startDay, 'day') + 1;
  const timelineItems = Array.from({ length: days }, (_, i) => {
    const scheduleDay = startDay.add(i, 'day');
    const daySchedule = Array.isArray(scheduleDays) && scheduleDays.find(day => day.date.isSame(scheduleDay, 'day'));
    return (
      <TimelineItem key={scheduleDay.toString()}>
        <TimelineSeparator>
          <TimelineDot />
          {i !== days - 1 && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <div>{scheduleDay.format('YYYY-MM-DD')}</div>
          <div>{daySchedule && daySchedule.schedule}</div>
        </TimelineContent>
      </TimelineItem>
    );
  });

  return (
    <Timeline>
      {timelineItems}
    </Timeline>
  );
}
