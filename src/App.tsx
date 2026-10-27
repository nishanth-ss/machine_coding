import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LayoutContainer from './components/LayoutContainer';
import { lazy, Suspense } from 'react';
import { TabFormProvider } from './context/TabFormContext';

const TodoListPage = lazy(()=>import('./page/TodoList'))
const TimerPage = lazy(()=>import('./page/Timer'))
const Datable = lazy(()=>import('./page/Datable'))
const NestedCheckBox = lazy(()=>import('./page/NestedCheckbox'))
const OTPInputPage = lazy(()=>import('./page/OTPInput'))
const FileFolderPage = lazy(()=>import('./page/FileFolderExplorer'))
const ProgressBarPage = lazy(()=>import('./page/ProgressBar'))
const AccordianPage = lazy(()=>import('./page/Accordian'))
const ProductCatalogPage = lazy(()=>import('./page/ProductCatalog'))
const EmployeeDetailsPage = lazy(()=>import('./page/EmployeeDetails'))
const TabsFormPage = lazy(()=>import('./page/TabsForm'))
const StarRatingPage = lazy(()=>import('./page/StarRating'))





const PractisePage = lazy(()=>import('./page/Practise'))

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
            <Route path='file_folder_explorer' element={< FileFolderPage/>} />
            <Route path='progress_bar' element={< ProgressBarPage/>} />
            <Route path='accordian' element={< AccordianPage/>} />
            <Route path='product_catalog' element={< ProductCatalogPage/>} />
            <Route path='employee_details' element={< EmployeeDetailsPage/>} />
            <Route path='tab_form' element={<TabFormProvider>< TabsFormPage/></TabFormProvider>} />
            <Route path='star_rating' element={<StarRatingPage />} />
            <Route path='practise' element={< PractisePage/>} />
          </Route>

          <Route path='*' element={<h1>Not found</h1>} />
        </Routes>
      </Router>
    </Suspense>
  )
}

export default App
