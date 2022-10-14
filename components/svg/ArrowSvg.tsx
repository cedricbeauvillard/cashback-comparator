import * as React from 'react';
import {SVGProps} from 'react';

const ArrowSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke={'#FFFF'}
    fill={'#FFFF'}
    width={props.width}
    height={props.height}
    {...props}
  >
    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Z" />
    <path d="M13 13.586V8h-2v5.586l-2.293-2.293-1.414 1.414L12 17.414l4.707-4.707-1.414-1.414L13 13.586z" />
  </svg>
);

export default ArrowSvg;
