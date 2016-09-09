import React from 'react';

export function Gooey() {
  return (

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="fancy-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 29 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
        </svg>

  );
}
