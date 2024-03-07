
import { Container } from '@mui/material';
import TVTable from './components/TVTable';
import { tss } from 'tss-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateOrder from './components/CreateOrder';
import Header from './components/Header';
import UpdateUser from './components/UpdateUser';
import UpdateOrder from './components/UpdateOrder';

const useStyles = tss.create({
  content: {
    padding: '0px !important',
    marginTop: '20px',
    borderRadius: '5px',
    boxShadow: '0px 2px 92px 0px rgba(0, 0, 0, 0.20) !important',
    WebkitBoxShadow: '0px 2px 92px 0px rgba(0, 0, 0, 0.20) !important',
    MozBoxShadow: '0px 2px 92px 0px rgba(0, 0, 0, 0.20) !important'
  },
  button: {}
})

function App() {
  const { classes } = useStyles();

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Container className={classes.content}>
            <Routes>
            <Route path='/' element={<TVTable />} />
            <Route path='/create' element={<CreateOrder />} />
            <Route path='/signin' element={<UpdateUser />} />
            <Route path='/update/:orderId' element={<UpdateOrder />} />
            </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
