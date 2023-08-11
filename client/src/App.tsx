import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects/:id' element={<Project />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
}

export default App;
