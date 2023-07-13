import React from "react";

export const LoadingIcon = (props: React.SVGAttributes<SVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" /*xmlns:xlink="http://www.w3.org/1999/xlink"*/
        /*style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;"*/ width="20px"
         height="20px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...props}>
        <circle cx="50" cy="50" fill="none" stroke="#98ef56" strokeWidth="15" r="35"
                strokeDasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.5s"
                              values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
    </svg>)
