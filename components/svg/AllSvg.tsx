import * as React from 'react';
import {SVGProps} from 'react';

const AllSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 170.2 147.47"
    stroke={'#FFFF'}
    fill={'#FFFF'}
    width={props.width}
    height={props.height}
    {...props}
  >
    <path
      d="M205 327h79.62a5 5 0 0 0 0-10H205a5 5 0 1 0 0 10ZM205 366.54h79.62a5 5 0 0 0 0-10H205a5 5 0 0 0 0 10ZM205 407.74h79.62a5 5 0 0 0 0-10H205a5 5 0 1 0 0 10ZM205 447.26h79.62a5 5 0 0 0 0-10H205a5 5 0 1 0 0 10Z"
      transform="translate(-200.02 -310.9)"
      style={{
        fill: '#FFFF',
      }}
    />
    <text
      transform="matrix(1.1 0 0 1 119.89 54.73)"
      style={{
        fontSize: '63.345821380615234px',
        fill: '#FFFF',
        fontFamily: 'ArialRoundedMTBold,Arial Rounded MT Bold',
      }}
    >
      {'A'}
    </text>
    <text
      transform="matrix(1.1 0 0 1 123.48 134.11)"
      style={{
        fontSize: '63.345821380615234px',
        fill: '#FFFF',
        fontFamily: 'ArialRoundedMTBold,Arial Rounded MT Bold',
      }}
    >
      {'Z'}
    </text>
  </svg>
);

export default AllSvg;
