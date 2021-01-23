import React , {  useState } from 'react'
import { useMutation, useQuery} from '@apollo/client'
import { Button, Form, FormGroup, Label, Input , Spinner, Alert } from 'reactstrap';
import {LOGIN_USER} from '../graphql/Mutaions'
import {darkMode as ToogleMode , GET_DARK_MODE} from '../graphql/ReactVar'



const Login = () => {
   
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const [login , {data , loading , error}] = useMutation(LOGIN_USER , {

      //here i am doing something after the mutaion finished

      onCompleted({login}) {
        if(login) {
            localStorage.setItem('userId' , login.userId);
            localStorage.setItem('userToken' , login.token);
      }
    }});
    // const token = localStorage.getItem('userToken')

    const {data : {darkMode}} = useQuery(GET_DARK_MODE)
  
    
    const submitForm = (e) => {
       e.preventDefault()
       login({variables: {email:email , password:password}}).then((result) => {

        //this also return promise
        
        // console.log('data in object' , result)
        // const {data : {login  : {msg , token , userId}}} = result
        // console.log('user token ',token)
        // console.log('user message ',msg)
         
       }).catch(err => {
        console.log('shivam error',error)
          console.log(err)
       })
      
    }
    // if(loading) return (<Spinner color="black" />)
    if(loading) {
      console.log('loading....')
      return <Spinner color="black" />
    }

    
   
    const changeDarkMode = () => {
      console.log(darkMode);
      ToogleMode(!darkMode);
    }

    return (
      <div style={{top:"30%" , left:"35%", position:"absolute"}}>
        {error && <Alert color="danger">{error?.message}</Alert>}
        {data && <Alert color="success">{data?.login?.msg}</Alert>}
        {darkMode === true ? (<Button color="primary" onClick={changeDarkMode}>Disable DarkMode</Button>):(<Button color="danger" onClick={changeDarkMode}>Enable DarkMode</Button>)}
        {darkMode === true ? ( <h4 style={{color:"green"}}>Login</h4>) : ( <h4 style={{color:"red"}}>Login</h4>)}
        <Form onSubmit={submitForm}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Password</Label>
          <Input type="password" onChange={(e) => setPassword(e.target.value)}value={password}  name="password" />
        </FormGroup>
        <Button outline color="success">success</Button>{' '}
      </Form>
      </div>
    )
}

export default Login