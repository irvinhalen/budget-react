import React from 'react';
import EntryLine from './EntryLine';
import { Container } from 'semantic-ui-react';

function EntryLines({ entries, deleteEntry, editEntry }) {
  return (
  <Container>
    {entries.map(entry => (
    <EntryLine
      key={entry.id}
      {...entry}
      deleteEntry={deleteEntry}
      editEntry={editEntry}
    />
    ))}
  </Container>
  )
}

export default EntryLines;