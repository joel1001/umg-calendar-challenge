import { FC } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import type { VerticalTimeProps } from "./umg-vertical-time-elem-interface";
import './umg-vertical-time-elem.css'

const VerticalTime: FC<VerticalTimeProps> = ({
  reminders,
  umgCalendarState,
  icon,
}) => {
  return (
    <VerticalTimeline layout={"1-column-left"}>
      {reminders[umgCalendarState.selectedYear][umgCalendarState.selectedMonth][
        umgCalendarState.dayNumber
      ].map((reminder: any, i: number) => (
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          iconStyle={{
            background: "rgb(33, 150, 243)",
            color: "#fff",
          }}
          icon={icon}
        >
          <h3 className="vertical-timeline-element-title">
            {reminder.reminderTime}
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            {reminder.reminderDescription}
          </h4>
          <p>{reminder.reminderLocation}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default VerticalTime;
