import Header from './components/Header';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import Clients from './components/Clients';
import AddClientModal from './components/AddClients';

const client = new ApolloClient({
    uri:'http://localhost:3000/graphql',
   cache: new InMemoryCache(),
});

function App() {
  return (
<>
<ApolloProvider client={client}>
<Header/>
<div className='container'>
  <AddClientModal/>
  <Clients/>
</div>
</ApolloProvider>
</>
  );
}

export default App;
