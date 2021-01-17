import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_ALL_TODO} from '../graphql/Query'
import { Alert, Spinner , Table } from 'reactstrap';



const TodoItems = () => {
    const userId = localStorage.getItem('userId');

    const {data , error , loading} = useQuery(GET_ALL_TODO , {variables : {_id : userId}});
 
    
    // useEffect(() => {
    //     console.log('tasks by user' , data);
    // })

    if(loading) {
        return <Spinner color="black" />
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
        </tr>
      </thead>
      <tbody>
        {data?.tasksByUser?.tasks.map(task => (<tr key={task._id}>
           <td>{task.title}</td>
           <td>{task.details}</td>
           <td>{task._id}</td>
        </tr>))}
      </tbody>
    </Table>
        </div>
    )
}

export default TodoItems
