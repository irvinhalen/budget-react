import React, { Fragment } from 'react';
import { Button } from 'semantic-ui-react';

function ButtonSaveOrCancel({ addEntry }) {
  return (
    <Fragment>
      <div style={{ marginTop: 20 }}>
        <Button>Cancel</Button>
        <Button primary onClick={() => addEntry()}>Save</Button>
      </div>
    </Fragment>
  )
}

export default ButtonSaveOrCancel;