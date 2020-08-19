import React from 'react'
import { Task } from '../types'
import { connect } from 'react-redux'
import { AppState } from '../reducer'
import { fetchTasks } from '../actions'

interface StateProps {
  tasks: Task[]
}

interface DispatchProps {
  fetchTasks: () => void
}

interface OwnProps { }

interface AllProps extends StateProps, DispatchProps, OwnProps { }

export class TaskList extends React.Component<AllProps> {

  onClick = () => {
    const { fetchTasks } = this.props
    fetchTasks()
  }

  render() {

    const { tasks } = this.props

    return (
      <div>
        <ul>
          {tasks.map((task, i) => {
            return <li key={i} >{task.title}</li>
          })}
        </ul>
        <button onClick={this.onClick} >Fetch new Task</button>
      </div>
    )
  }
}

export const ConnectedTasksList = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  AppState
>(state => ({
  tasks: state.tasks
}), dispatch => ({
  fetchTasks: () => dispatch(fetchTasks())
}))(TaskList)