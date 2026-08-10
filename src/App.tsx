import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LayoutContainer from './components/LayoutContainer';
import { lazy, Suspense } from 'react';

const TodoListPage = lazy(()=>import('./page/TodoList'))
const TimerPage = lazy(()=>import('./page/Timer'))
const Datable = lazy(()=>import('./page/Datable'))
const NestedCheckBox = lazy(()=>import('./page/NestedCheckbox'))
const OTPInputPage = lazy(()=>import('./page/OTPInput'))

function App() {

  return (
    <Suspense fallback={<h1>...loading</h1>}>
      <Router>
        <Routes>
          <Route path='/' element={<LayoutContainer />} >
            <Route index element={<TodoListPage />} />
            <Route path='todo' element={<TodoListPage />} />
            <Route path='timer' element={<TimerPage />} />
            <Route path='datatable' element={<Datable />} />
            <Route path='otp_input' element={<OTPInputPage />} />
            <Route path='nested_checkbox' element={<NestedCheckBox />} />
          </Route>

          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
