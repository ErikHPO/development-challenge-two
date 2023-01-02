import { Backdrop, Fade, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


export const ModalWindow = (props) => {
  const {open, children , setModalOpen} = props

  const handleClose = () => {
    setModalOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    bgcolor: 'white',
    color: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={open}
    onClose={handleClose}
    closeAfterTransition
    // BackdropComponent={Backdrop}
    // BackdropProps={{
    //   timeout: 500,
    // }}
  >
    <Fade in={open}>
      <Box sx={style}>
      {children}    

      </Box>
    </Fade>
  </Modal>
  )
}
