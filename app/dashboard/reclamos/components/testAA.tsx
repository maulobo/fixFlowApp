'use client';
import React from 'react';

export default function TestAA({ dataNew, data }: any) {
  console.log(data);
  console.log(data.averageResolutionTime[0].averageResolutionTimeHours);
  return <div>testAA</div>;
}
