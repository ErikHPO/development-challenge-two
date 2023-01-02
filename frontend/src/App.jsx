import { useState } from 'react'
import './App.css'
import {getAllUsers} from './utils/api.js';
import CollapsibleTable from './components/Table.jsx'
import { useQuery } from "@tanstack/react-query";
import { IconButton, Skeleton, Paper } from '@mui/material';
import {PatientForm} from './components/PatientForm';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ModalWindow } from './components/ModalWindow';


export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["tableData"],
    queryFn: () =>
        getAllUsers()
        .then((res) => res.data),
  });

  if (isLoading) return(
      <Paper>
        <Skeleton variant='rectangular' height={120} width={600}/>
      </Paper>
  );
  return (
    <div className="App">
      <ModalWindow open={modalOpen} setModalOpen={setModalOpen} children={<PatientForm   setModalOpen={setModalOpen} />}/>
      <div className="add-icon">
      <IconButton size='large' color='primary' disabled={isLoading} onClick={() => setModalOpen(true)}>
        <AddCircleIcon fontSize='inherit'/>
      </IconButton>
      </div>
      <div className="main-table">
      <CollapsibleTable row={data.body}/>

      </div>
    </div>
  )
}


