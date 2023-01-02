import * as React from 'react';
import PropTypes from 'prop-types';
import {Box, Button} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OptionsMenu from './OptionsMenu';

function createData({name, birthdate, id, address, email , updatedAt, createdAt}) {
  return {
    name,
    birthdate,
    id,
    address,
    email,
    updatedAt,
    createdAt,
  };
}

function Row(props) {
    // memoize with useMemo the row
    const row = React.useMemo(() => props.row, null);

  // const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="right">{row.id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ display: 'flex', gap: 2, flexDirection: 'row' , py: 2}}>
                Perfil do paciente
                <OptionsMenu {...props.row} />
              </Typography>
                
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome completo: {row.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data de nascimento: {row.birthdate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>E-mail: {row.email}</TableCell>
                  </TableRow>
                    <TableRow>
                    <TableCell>Endereço: {row.address} </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell>Registrado em: {new Date(row.createdAt).toLocaleDateString('pt-BR') } </TableCell>
                    </TableRow>
                    {row.updatedAt && <TableRow>
                      <TableCell>Atualizado em: {new Date(row.updatedAt).toLocaleDateString('pt-BR') } </TableCell>
                    </TableRow>}
                </TableHead>
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    birthdate: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {
    const rows = props.row?.map((item) => createData(item)) ?? null;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><b>Nome</b></TableCell>
            <TableCell align="center"><b>E-mail</b></TableCell>
            <TableCell align="right"><b>ID</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row) => (
            <Row key={row.id} row={row} />
          )) :
            <TableRow>
                <TableCell/>
                <TableCell>
                    Nenhum paciente encontrado...
                </TableCell>
            </TableRow>
         
          } 
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
