// src/components/Timeline.js
import React from 'react'

const TimelineItem = ({ title, date, description }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-gray-600 text-sm">{date}</div>
      <div className="text-gray-800">{description}</div>
    </div>
  )
}

const CustomTimeline = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <TimelineItem key={index} {...item} />
      ))}
    </div>
  )
}

export default CustomTimeline