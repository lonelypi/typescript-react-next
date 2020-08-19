import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from '../reducer'
import { ConnectedTasksList } from '../components/TasksList'

const store = createStore(reducer)

export default () => (
  <Provider store={store}>
    <div>
      Hello World
    </div>

    <ConnectedTasksList />
  </Provider>
)