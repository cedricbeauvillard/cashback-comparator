import Path from 'path';
import * as React from 'react';
import {SVGProps} from 'react';

const PlusSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    xmlSpace="preserve"
    width={props.width}
    height={props.height}
  >
    <circle
      cx={32}
      cy={32}
      r={32}
      style={{
        fill: '#27a844',
      }}
    />
    <path
      d="M-177.31 491.61H-190v-12.69a.87.87 0 0 0-.87-.87h-6.28a.87.87 0 0 0-.87.87v12.69h-12.69a.87.87 0 0 0-.88.88v6.27a.87.87 0 0 0 .88.88H-198v12.69a.88.88 0 0 0 .87.88h6.28a.88.88 0 0 0 .87-.88v-12.69h12.7a.87.87 0 0 0 .87-.88v-6.27a.87.87 0 0 0-.9-.88Z"
      transform="translate(226.02 -463.63)"
      style={{
        fill: '#fff',
      }}
    />
  </svg>
);

export default PlusSvg;
