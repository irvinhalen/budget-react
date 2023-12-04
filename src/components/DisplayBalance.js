import React from 'react';
import { Statistic } from 'semantic-ui-react';

function DisplayBalance({ size='tiny', color='black', title, value }) {
  return (
    <Statistic size={size} color={color}>
    <Statistic.Label style={{textAlign: 'center'}}>
        {title}
    </Statistic.Label>
    <Statistic.Value>$ {value}</Statistic.Value>
    </Statistic>
  )
}

export default DisplayBalance;