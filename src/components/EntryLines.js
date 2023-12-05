import React from 'react';
import EntryLine from './EntryLine';
import { Container } from 'semantic-ui-react';

function EntryLines({ entries }) {
  return (
  <Container>
    {entries.map(entry => (
    <EntryLine
      key={entry.id}
      {...entry}
    />
    ))}
  </Container>
  )
}

export default EntryLines;