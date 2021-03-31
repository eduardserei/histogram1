import './App.css';
import Graph from './components/graph/graph.component';

import { useQuery } from '@apollo/client';

import { GET_ALL_POSTS } from "./graphql/resolvers";

function App() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

    return (
      <div className="App">
        <Graph data={data}/>
      </div>
    )
}  
  
export default App;
