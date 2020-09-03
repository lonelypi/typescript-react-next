import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import { TaskFilterContext } from '../pages/[status]'
import {  Task, 
          useDeleteTaskMutation, 
          useChangeStatusMutation,
          TasksQuery, 
          TasksQueryVariables, 
          TasksDocument, 
          TaskStatus } from '../generated/graphql'

interface Props {
  task: Task
}

const TaskListItem: React.FC<Props> = ({ task }) => {
  //useContext to get the status.
  const { status } = useContext(TaskFilterContext)

  //For delete
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    update: (cache, result) => {
      const data = cache.readQuery<TasksQuery, TasksQueryVariables>({
        query: TasksDocument,
        variables: { status }
      })

      if (data) {
        cache.writeQuery<TasksQuery, TasksQueryVariables>({
          query: TasksDocument,
          variables: { status },
          data: {
            tasks: data.tasks.filter(({ id }) => id !== result.data.deleteTask.id )
          }
        })
      }
    }
  })
  const handleDeleteClick = () => {
    deleteTask({
      variables: { id: task.id }
    })
  }

  //To edit the status
  const [changeStatus, { loading: changingStatus, error: changeStatusError }] = useChangeStatusMutation()

  const handleChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = task.status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active
    
    changeStatus({
      variables: { id: task.id, status: newStatus }
    })
  }

  useEffect(() => {
    if (error) {
      alert('An error occurred.')
    }

    if (changeStatusError) {
      alert('Could not change the status variable.')
    }
  }, [error, changeStatusError])


  return (
    <li key={task.id} className='task-list-item'>
      <label className='checkbox'>
        <input 
          type='checkbox' 
          onChange={ handleChangeStatus } 
          checked={ task.status === TaskStatus.Completed } 
          disabled={ changingStatus }
        />
        <span className='checkbox-mark'>&#10003;</span>
      </label>
      <Link href={`/update/[id]`} as={`/update/${task.id}`}><a className='task-list-item-title'>{ task.title }</a></Link>
      <button 
        disabled={ loading } 
        className='task-list-item-delete' 
        onClick={ handleDeleteClick } 
      >
          &times;
      </button>
    </li>
  )
}

export default TaskListItem