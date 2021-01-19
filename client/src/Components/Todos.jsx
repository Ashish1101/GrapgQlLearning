import React, { useState } from "react";
import {
	Form,
	FormGroup,
	Input,
	Label,
	Button,
	Alert,
	Spinner,
} from "reactstrap";
import {  useMutation } from "@apollo/client";
import {produce} from 'immer'
import { CREATE_TASK } from "../graphql/Mutaions";
import TodoItems from "./TodoItems";
import { GET_ALL_TODO } from "../graphql/Query";
const Todos = () => {
	const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");

    
    //write data back to cache

    //METHOD 1

    //the refatch query in mutation clears that we want to refatch the data
    //after the mutation finished

    //the problem with this is that it requries extra network request
    //so we have to hit that query again on server

	// const [createTask, { data, error, loading }] = useMutation(CREATE_TASK , {
    //     refetchQueries : [{
    //         query : GET_ALL_TODO,
    //         variables : {_id: localStorage.getItem('userId')}
    //     }]
    // });

   
   //alternative is update inside mutation
   //this code write to the cache manually
   //it does not send amy newtwork request again

   //i used immer library to update cache in deep nested object

   //METHOD 2

   const [createTask , {error , loading}] = useMutation(CREATE_TASK , {
       update(cache , {data}) {
           const newTodo = data?.createTask;
           const userId = localStorage.getItem('userId')
           const existingData = cache.readQuery({
               query: GET_ALL_TODO,
               variables: {_id:userId}
           });

           cache.writeQuery({
               query:GET_ALL_TODO,
               variables:{_id:userId},
               data : produce(existingData , x => {
                   x.tasksByUser.tasks.push(newTodo);
               })
           })
       }
   })
    
	
	const submitForm = (e) => {
		e.preventDefault();
		createTask({ variables: { title: title, details: detail }})
			.then((result) => {
				console.log(result);
			})
			.catch((err) => console.log(err));
	};

	// if (loading) {
	// 	return <Spinner color='black' />;
	// }

	return (
		<div style={{ display: "flex", justifyContent: "space-around" }}>
			<Form onSubmit={submitForm}>
				{error && <Alert color='danger'>{error.message}</Alert>}
				{loading && (<Spinner color="success" />)}
				<FormGroup>
					<Label>Title</Label>
					<Input
						type='text'
						name='title'
						id='exampleEmail'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Detail</Label>
					<Input
						type='text'
						name='detail'
						onChange={(e) => setDetail(e.target.value)}
					/>
				</FormGroup>
				<Button color='success' outline block>
					ADD
				</Button>
			</Form>
			<div>
				<TodoItems />
			</div>
		</div>
	);
};

export default Todos;
