'use client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import React from 'react';

export default function page({ params }: Params) {
  console.log(params.tipo);

  return <div></div>;
}
