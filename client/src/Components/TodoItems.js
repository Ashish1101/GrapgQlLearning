import React , {useEffect} from 'react'
import {useMutation, useQuery } from '@apollo/client'
import {GET_ALL_TODO} from '../graphql/Query'
import { Alert, Spinner , Table , Button } from 'reactstrap';
import {DELETE_TASK} from '../graphql/Mutaions'
import image from '../upload.png'


const TodoItems = () => {
    const userId = localStorage.getItem('userId');


    //the problem is same in refatch extra network request
    
    //will try to do that using cache write

    //fetchMore function return by query is used in case where app demands infinte scrolling

    // const {data , error , fetchMore  } = useQuery(GET_ALL_TODO , {variables : {_id : userId} , fetchPolicy:'cache-and-network'});

    //the fetchPolicy provides policy for query
    //it says from which source we want our data
    //from the cache or network or both


    const {data , error   } = useQuery(GET_ALL_TODO , {variables : {_id : userId}});
    const [deleteTask , {loading}] = useMutation(DELETE_TASK , {
      refetchQueries : [{query : GET_ALL_TODO , variables : {_id :userId }}]
    })
  
 
    
    useEffect(() => {
        console.log('tasks by user' , data);
    })

  

    const deleteItem = (postId) => {
      console.log('iam deleted');
      deleteTask(
        {variables : {_id : postId , userId:userId}}
      ).then((result) => {
         console.log('from deleteItem ',result)
        //  fetchMore();
        //fetchmore function is used for pagination in graphql
      }).catch(err => console.log(err))
    }
    
    return (
        <div>
            {error && (<Alert color="danger">{error.message}</Alert>)}
            {/* <p>{data?.tasksByUser?.loginId}</p> */}
            <h4>Total Task : {}</h4>
            
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
    {data?.tasksByUser?.tasks.length <= 0 ?  <img width="200" height="200" src={image}  alt="illustraion"/> : ""}
    {loading && (<Spinner color="primary" />)}
        </div>
    )
}

export default TodoItems
