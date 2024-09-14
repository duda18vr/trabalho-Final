import {test,expect,describe,beforeAll} from 'vitest'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import ListaUsuarios from './lista-usuarios';

beforeAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM produtos");
    await connection.query("insert into produtos values(?,?,?,?,?)",
        ['1','João','18','036.547.382-10','002.874.325', 'Rua das flores, Bairro dos Planetas, Número 10, Naviraí - MS', 'casado'])
})
test("Deve listar os produtos do banco de dados",async()=>{
    //GIVEN   -> dado alguma coisa
    const usuariosPreCadastrados = {
        id:1,
        nome:"João",
        idade:18,
        CPF:'03654738210',
        RG:'002874325',
        Endereco:"Rua das flores, Bairro dos Planetas, Número 10, Naviraí - MS",
        Estado_CIvil:"Casado"
    }   
    const listaUsuarios = new ListaUsuarios();
  // WHEN
  const usuarios = await listaUsuarios.execute();
  // THEN
  expect(usuarios).toEqual(usuariosPreCadastrados);
});
