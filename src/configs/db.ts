import { DataSource,createConnections } from "typeorm";
import { Movimiento } from "../entities/Movimiento";
import { Categoria } from "../entities/Categoria";
import { Producto } from "../entities/Producto";
import { Rol } from "../entities/Rol";
import { RolUser } from "../entities/RolUser";
import { User } from "../entities/User";
import { Marca } from "../entities/Marca";

export const MysqlDataSource = new DataSource({

    type: 'mysql',
    // host: process.env.MYSQLDB_HOST,
    // port: Number(process.env.MYSQLDB_PORT),
    // username: process.env.MYSQLDB_USR,
    // password: process.env.MYSQLDB_PSW,
    // database: process.env.MYSQLDB,
    synchronize: false,
    logging: false,
    url:'mysql://u33ruzlc3cu969f1owkc:pscale_pw_HczwlazLpizUlT3Hg6V3hNecfUmOVVr4SQV1Qf6w4le@aws.connect.psdb.cloud/kiosko?ssl={"rejectUnauthorized":true}',
    // ssl:false,
    extra: {
         ssl: {
             rejectUnauthorized: false,
         },
     },
    entities: [
        // "./src/entities/*.ts"
        Movimiento,Categoria,Producto,Rol,RolUser,User,Marca
    ]
})