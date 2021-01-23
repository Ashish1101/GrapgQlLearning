import {makeVar , gql} from '@apollo/client'

export const darkMode = makeVar(false)

//write Query for Reactvar
//this query is independent of server graphql

//react var name and field name must be same

export const GET_DARK_MODE = gql`
  query getDarkMode {
      darkMode @client
  }
     
`