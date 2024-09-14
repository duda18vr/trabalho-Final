import mysql, { RowDataPacket } from 'mysql2/promise';
import 'dotenv/config'
type Output = {
    ID:number,
    nome:string,
    idade:number,
    CPF:number,
    RG:number,
    Endereco:string,
    Estado_Civil: string
}

interface ProdutoRowDataPacket extends RowDataPacket{
    ID:number,
    nome:string,
    idade:number,
    CPF:number,
    RG:number,
    Endereco:string,
    Estado_Civil: string
}

class ListaProdutos{
    async execute(){
        try{
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USUARIO,
                database: process.env.DB_BANCO,
            });
            const [rows, filds] = await connection.query("SELECT * from produtos");
            const dados = rows as ProdutoRowDataPacket[]
            const produtosDoBanco:Output[] = []
            for( let linha of dados){
                const {ID,nome,idade,CPF,RG,Endereco,Estado_Civil} = {...linha}
                const produto = {
                    ID,
                    nome,
                    idade,
                    CPF,
                    RG,
                    Endereco,
                    Estado_Civil
                }
                produtosDoBanco.push(produto)
            }
            return produtosDoBanco
        }
        catch(e:any){
            if(e.code === 'ER_NO_SUCH_TABLE'){
                console.log("A tabela produtos não foi criada, "
                +"Crie a tabela no workbench! :D");
            }else if(e.code==="ER_PARSE_ERROR"){
                console.log("Sua query está com algo errado:")
                console.log("Verifique: virgulas, pontos e nome de colunas.")
            }
            else if(e.code === 'ECONNREFUSED'){
                console.log("LIGAR O LARAGON!! MANÉ!");
            }else if(e.code === 'ER_BAD_DB_ERROR'){
                console.log("Deve criar o banco de DADOS {test}");
            }
            else{
                console.log("Erro ao conectar no banco",e);
            }
        }    
    }
}
export default ListaProdutos
