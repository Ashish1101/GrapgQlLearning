import {gql} from '@apollo/client'

export const GET_ALL_TODO = gql`
query ($_id:String!) {
    tasksByUser(_id:$_id){
      tasks {
        title
        details
        _id
      }
    }
  }
`