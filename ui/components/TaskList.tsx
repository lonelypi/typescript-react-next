import React from 'react'
import { Task, TaskStatus } from '../generated/graphql'
import Link from 'next/link'
import TaskListItem from './TaskListItem'

interface Props {
  tasks: Task[]
}

const TaskList: React.FC<Props> = ({ tasks, status }) => {
  return (
    <ul className='task-list'>
      { tasks.map(task => <TaskListItem task={ task } />)} 
    </ul>
    )
}

export default TaskList