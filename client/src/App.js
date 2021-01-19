import React from 'react'
import {ApolloClient, InMemoryCache , ApolloProvider , createHttpLink } from '@apollo/client'
import {BrowserRouter as Router , Redirect, Route , Switch } from 'react-router-dom'
import Register from './Components/Register'
import { setContext } from '@apollo/client/link/context';
import Login from './Components/Login'
import Navigation from './Components/Navigation'
import Todos from './Components/Todos'


const httpLink = createHttpLink({
  uri:"http://localhost:5000/graphql"
})

const authLink = setContext((_ , {headers}) => {
  const token = localStorage.getItem('userToken');
  return {
    headers: {
      ...headers,
      authorization : token ? `Bearer ${token}` : ""
    }
  }
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache : new InMemoryCache({
    typePolicies :{
       User: {  //typename from the backend
         fields : {  //fields we want to include
           loginId: { /*
            field we included or we can say that local field 
            not coming from the server
             */
             read(_ , {variables}){
                return localStorage.getItem('userId')
             }
           },       
          }
       },
       Task: {  //we can manupulate data before calling the query
          fields: { //here i converted the title property
            title:{  //of Task typename to UpperCase 
              read(title) {
                return title.toUpperCase()
              }
            }
          }
       }
    }
  }),
  connectToDevTools:true
})






function App() {

  const token = localStorage.getItem('userToken')
  return (
    <ApolloProvider client={client}>
      <Router>
      <Navigation />
         <Switch>
            {/* {token && <Redirect from="/login" to="/todo" />} */}
            {/* {!token && <Redirect to="/login" />} */}
            {!token && (<Route exact path="/" component={Register} />)}
            {token && (<Route path="/todo" component={Todos} />)}
            {!token && (<Redirect from="/todo" to="/login" />)}
            {token && (<Redirect from="/register" to="/todo" />)}
            {token && (<Redirect from="/" to="/todo" />)}
            <Route path="/login" component={Login} />
         </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
