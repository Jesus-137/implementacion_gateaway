import { Historial } from "../domain/Historial";
import { Repository } from "../domain/Repository";

export class UpdateUseCase {
  constructor(readonly Repo: Repository) {}

  async run(
    uuid:string,
    id_usuario: number,
    busqueda: string
  ): Promise<Historial | string> {
    try {
      const cliente = await this.Repo.update(
        uuid,
        id_usuario,
        busqueda
      );
      return cliente;
    } catch (error) {
      return String(error);
    }
  }
}
