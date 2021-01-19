import {gql} from '@apollo/client'

export const GET_ALL_TODO = gql`
query ($_id:String!) {
    tasksByUser(_id:$_id){
      loginId @client
    
      tasks {
        title
        details
        _id
      }
    }
  }
`

//the @client directive tells apollo that it is a local field