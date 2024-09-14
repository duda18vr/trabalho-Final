import mysql from 'mysql2/promise';
import 'dotenv/config';

export default class InserirUsuario {
  async execute(input: any) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
      });
      await connection.query(
        'INSERT INTO usuarios (nome, idade, cpf, rg, endereco, estado_civil) VALUES (?, ?, ?, ?, ?, ?)',
        [input.nome, input.idade, input.cpf, input.rg, input.endereco, input.estado_civil]
      );
      return input;
    } catch (e: any) {
      console.log(e.code);
      throw new Error(e.code);
    }
  }
}
type Input = {
  ID:number,
  nome:string,
  idade:number,
  CPF:number,
  RG:number,
  Endereco:string,
  Estado_Civil: string
}
type Output = {
      ID:number,
    nome:string,
    idade:number,
    CPF:number,
    RG:number,
    Endereco:string,
    Estado_Civil: string
}
