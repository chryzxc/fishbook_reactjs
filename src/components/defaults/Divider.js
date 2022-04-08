import React from 'react'
import styled from 'styled-components';



const Line = styled.hr`
  border-top: 1pt solid #bbb;
  margin-top: 10px;
`;

export default function Divider() {
  return (
    <Line/>
  )
}
