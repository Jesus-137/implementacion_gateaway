import { Request, Response } from "express";
import { GetAllUseCase } from "../../aplication/GetAllUseCase";
import { Auditoria } from "../../domian/Auditoria";

export class GetAllController{
    constructor (private getAllUseCase: GetAllUseCase){}

    async run (req: Request, res: Response){
        try {
            const auditorias = await this.getAllUseCase.run();
            if (auditorias){
                res.status(200).send({
                    status: 'Encontrados',
                    data: auditorias.map((auditoria: Auditoria)=>({
                        id: auditoria.uuid,
                        tarjet: auditoria.tarjet,
                        accion: auditoria.accion,
                        creacion: auditoria.fecha_creacion
                    }))
                })
            }else{
                throw ('Ocurio un error desconocido')
            }
        } catch (error) {
            res.status(400).send({
                status: 'Error',
                msn: error
            })
        }
    }
}