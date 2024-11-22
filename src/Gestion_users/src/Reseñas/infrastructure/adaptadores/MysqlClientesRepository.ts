import { query } from "../../../database/mysql";
import { Reseñas } from "../../domain/Reseñas";
import { Repository } from "../../domain/Repository";

export class MysqlReseñasRepository implements Repository {
  async update(
    uuid: string,
    id_usuario: number,
    id_publicacion: number,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas | string> {
    const sql = "UPDATE resenas SET id_usuario=?, id_publicacion=?, comentario=?, estrellas=? WHERE uuid=?";
    const params: any[] = [id_usuario, id_publicacion, comentario, estrellas, uuid];
    try {
      const result = await query(sql, params);
      console.log(result)
      const data = JSON.parse(JSON.stringify(result));
      if(data.status==200){
        return new Reseñas(uuid, id_usuario, id_publicacion, comentario, estrellas);
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }

  async create(
    uuid:string,
    id_usuario: number,
    id_publicacion: number,
    comentario: string,
    estrellas: number
  ): Promise<Reseñas | string> {
    const sql =
"INSERT INTO resenas (uuid, id_usuario, id_publicacion, comentario, estrellas) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [uuid, id_usuario, id_publicacion, comentario, estrellas];
    try {
      const result = await query(sql, params);
      console.log(result)
      const data = JSON.parse(JSON.stringify(result))
      if(data.status==200){
        return new Reseñas(uuid, id_usuario, id_publicacion, comentario, estrellas);
      }else{
        throw(data.message)
      }
    } catch (error) {
      return String(error);
    }
  }
}
