import React , { useState } from 'react'
import { useMutation} from '@apollo/client'
import { Button, Form, FormGroup, Label, Input , Spinner, Alert } from 'reactstrap';
import {REGISTER_USER} from '../graphql/Mutaions'



const Register = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const [addUser , {data , loading , error}] = useMutation(REGISTER_USER);
    const submitForm = (e) => {
       e.preventDefault()
       addUser({variables: {email:email , password:password}}).then(data => {
         console.log(data);
        //  return (<Alert color="success">{data.addUser.msg}</Alert>)
       }).catch(err => {
         console.log(err)
       })
    }

    if(loading) {
      console.log('loading....')
      return <Spinner color="black" />
    }

    return (
      <div style={{top:"30%" , left:"40%", position:"absolute"}}>
        {error && (<Alert color="danger">{error?.message}</Alert>)}
        {data && (<Alert color="success">{data?.addUser?.msg}</Alert>)}
        <h4>Register</h4>
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

export default Register