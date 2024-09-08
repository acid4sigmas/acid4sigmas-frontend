import React, { useEffect } from 'react';

import TopBar from './Topbar';
import { Container } from '../components/Container';


function App() {
  return (
  <div>
    <TopBar/>
    <Container>
      <h1>Nothing to see here :)</h1>
      <p>come back sooner or later as this page is in active development</p>  
    </Container>
  </div>
  );
}

export default App;
