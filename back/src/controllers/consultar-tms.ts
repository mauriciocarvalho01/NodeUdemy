import { TmsService } from '../services/tms';
import { EstabComercial } from '../models/tms-ecs';
import { Detalhe, NumeroLogico } from '../models/tms-nrmLogico';
import { Terminal } from '../models/tms-terminal';
import { Request, Response } from 'express';

class ConsultaController {
	
	public async listEcByCnpjCpf(req: Request, res: Response) {
	
		try {
			let listaEcs = new Array<EstabComercial>();
			let doc = req.params.cnpjcpf;
			let flagDigital = req.params.flagDigital;
			let zeroEsq = ""
			let isSiteDigital = false;
			let ecs = new Array<string>();

			// if(doc.length < 14){
			// 	for(let i = 0 ; i < (14 - doc.length); i++){
			// 		zeroEsq += '0';
			// 	}
			// 	doc = zeroEsq + doc;
			// }
		
			let retorno = await TmsService.listEcByCnpjCpf(doc);
			let jsonRetorno = JSON.parse(retorno.toString());
		
			if(parseInt(jsonRetorno.CodRetorno) != 0){
				return res.status(428).json({erro: 'CNPJ / CPF informado é invalido ou não existe'});
			} else{
					for(var i = 0; i < jsonRetorno.Estabelecimentos.length; i++){
						listaEcs.push(new EstabComercial(parseInt(jsonRetorno.Estabelecimentos[i].CodEstab),jsonRetorno.Estabelecimentos[i].Nome));
						ecs.push(jsonRetorno.Estabelecimentos[i].CodEstab);
					}
					if(flagDigital == 'S'){
						for(var iEcs = 0; iEcs < ecs.length; iEcs++){
							 let ec = ecs[iEcs].toString();
							 console.log(ec)
							 let retorno = await TmsService.listNumberLogicByEc(ec);
							 let jsonRetornoEC = JSON.parse(retorno.toString());
							 for(var i = 0; i < jsonRetornoEC.Terminais.length; i++){
							 	if(parseInt(jsonRetornoEC.Terminais[i].IdTecnologia) == 11 && 
							 						jsonRetornoEC.Terminais[i].NumLogico.toString().substring(0,2) == '88'){
							 			isSiteDigital = true;
							 			break;
							 	}
							 }
						}
						return res.status(200).send({isSiteDigital : isSiteDigital, listaEcs});	
					}else{
						return res.status(200).send(listaEcs);	
					}

			}
		}catch (e){
			return res.status(500).json({ e });
		}
		
	}

	public async listNumberLogicByEc(req: Request, res: Response) {
		
		try {
			let ec = req.params.ec;
			let zeroEsq = ""
			let isSiteDigital = false;
			if(ec.length < 15){
				for(let i = 0 ; i < (15 - ec.length); i++){
					zeroEsq += '0';
				}
				ec = zeroEsq + ec;
				console.log(ec)
			}
			let retorno = await TmsService.listNumberLogicByEc(ec);
			let jsonRetorno = JSON.parse(retorno.toString());
			let detalhes = new Array<Detalhe>();

			for(var i = 0; i < jsonRetorno.Terminais.length; i++){
				console.log(jsonRetorno.Terminais[i].NumLogico.toString().substring(0,2));
				if(parseInt(jsonRetorno.Terminais[i].IdTecnologia) == 11 && 
										jsonRetorno.Terminais[i].NumLogico.toString().substring(0,2) == '88'){
					isSiteDigital = true;
				}
				let detalheNmrLogico = new Detalhe(jsonRetorno.Terminais[i].NumLogico, jsonRetorno.Terminais[i].DescTecnologia);
					detalhes.push(detalheNmrLogico);
			}
			return res.status(200).send(new NumeroLogico(isSiteDigital, detalhes));
		}catch (e){
			return res.status(500).json({ e });
		}
		
	}

	public async listInfoTerminal(req: Request, res: Response) {
		
		try {
			let numberLogic = req.params.numberLogic;
			let retorno = await TmsService.listInfoTerminal(numberLogic);
			let jsonRetorno = JSON.parse(retorno.toString());

			let terminal = new Terminal();
			let data = jsonRetorno.DataInstalacao.toString();
			data = data.substring(6,8) + "/" + data.substring(4,6) + "/" + data.substring(0,4) + " "  
					 + data.substring(8,10) + ":"  + data.substring(10,12)  + ":"  + data.substring(12,14);

			terminal.dataInstalacao = data;
			terminal.mid = parseInt(jsonRetorno.CodEstab);
			terminal.modelo = jsonRetorno.Modelo
			terminal.nmrSerie = jsonRetorno.NumSerial
			terminal.status = parseInt(jsonRetorno.StatusTerm)
		
			return res.status(200).send(terminal);
		}catch (e){
			return res.status(500).json({ e });
		}
		
	}

}
export default new ConsultaController();
