import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {


  return (
    <ul>
      {props.days.map((dayItem) => {
        return (
          <DayListItem
          key={dayItem.id}
          name={dayItem.name}
          spots={dayItem.spots}
          selected={dayItem.name === props.value}
          setDay={props.onChange}
        />
        )
      })}

    
    </ul>
  );
}
