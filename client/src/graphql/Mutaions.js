import { gql } from '@apollo/client'
export const REGISTER_USER = gql`
  mutation addUser($email:String! , $password : String!) {
    addUser(email : $email , password : $password) {
       email
       msg
       _id
    }
  }
`

export const LOGIN_USER = gql`
 mutation login($email:String! , $password:String!) {
       login(email:$email , password:$password) {
         token
         msg
         userId
       }
     }
`

export const CREATE_TASK = gql`
   mutation createTask($title:String! , $details:String!) {
       createTask(title:$title , details:$details) {
         title
         details
         user {
           email
           _id
         }
       }
   }
`