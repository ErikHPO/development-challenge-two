import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { removeUser } from '../utils/api';
import { ModalWindow } from './ModalWindow';
import { PatientForm } from './PatientForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';





export default function OptionsMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const open = Boolean(anchorEl);
  const queryClient = useQueryClient();
  const { id } = props;
  const { mutate } = useMutation({
    mutationFn: (id) => removeUser(id),
    onMutate: (values) => {
      console.log('onMutate',values);
      },
      onError: (error) => {
        console.log('onError',error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries()
        console.log('onSuccess',data);
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <ModalWindow open={modalOpen} setModalOpen={setModalOpen} children={<PatientForm {...props}  setModalOpen={setModalOpen} />}/>
      <IconButton
        id="positioned-button"
        aria-controls={open ? 'positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ManageAccountsIcon/>
      </IconButton>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => setModalOpen(!modalOpen)}>
           <EditIcon/>Editar
        </MenuItem>
        <MenuItem onClick={() => mutate(id) && setAnchorEl(null)}>
        <DeleteIcon/>Deletar
        </MenuItem>
      </Menu>
    </div>
  );
}
