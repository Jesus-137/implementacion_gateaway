import express from 'express';
import cors from 'cors';
import { usuariosRouter } from './src/Usuarios/infrastructure/UsuariosRouter';
import { clientesRouter } from './src/Clientes/infrastructure/ClientesRouter';
import { leadsRouter } from './src/Leads/infrastructure/leadsRouter';

const app = express();
app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api/v1/usuarios', usuariosRouter);
app.use('/api/v1/clientes', clientesRouter);
app.use('/api/v1/leads', leadsRouter);


const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server online on port ${port}`);
});
