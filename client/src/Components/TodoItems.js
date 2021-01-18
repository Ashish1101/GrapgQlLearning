import React , {useEffect} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {GET_ALL_TODO} from '../graphql/Query'
import { Alert, Spinner , Table , Button } from 'reactstrap';
import {DELETE_TASK} from '../graphql/Mutaions'



const TodoItems = () => {
    const userId = localStorage.getItem('userId');


    //the problem is same in refatch extra network request
    
    //will try to do that using cache write

    const {data , error , loading} = useQuery(GET_ALL_TODO , {variables : {_id : userId}});
    const [deleteTask] = useMutation(DELETE_TASK , {
      refetchQueries : [{query : GET_ALL_TODO , variables : {_id :userId }}]
    })
 
    
    useEffect(() => {
        console.log('tasks by user' , data);
    })

    if(loading) {
        return <Spinner color="black" />
    }

    const deleteItem = (postId) => {
      console.log('iam deleted');
      deleteTask(
        {variables : {_id : postId , userId:userId}}
      ).then((result) => {
         console.log('from deleteItem ',result)
      }).catch(err => console.log(err))
    }
    
    return (
        <div>
            {error && (<Alert color="danger">{error.message}</Alert>)}
        <Table borderless>
      <thead>
        <tr>
        
          <th>Title</th>
          <th>Detail</th>
          <th>Id</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {data?.tasksByUser?.tasks.map(task => (<tr key={task._id}>
           <td>{task.title}</td>
           <td>{task.details}</td>
           <td>{task._id}</td>
           <td><Button color="danger" onClick={() => deleteItem(task._id)}>Delete</Button></td>
        </tr>))}
      </tbody>
    </Table>
        </div>
    )
}

export default TodoItems
