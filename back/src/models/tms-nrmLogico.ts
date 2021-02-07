

export class Detalhe {

		numLogico: number;
		descTecnologia: string;

		constructor(numLogico: number , descTecnologia: string){
			this.numLogico = numLogico;
			this.descTecnologia = descTecnologia;

		}
};


export class NumeroLogico {

	isSiteDigital: boolean;
	terminais: Array<Detalhe>;

	constructor(isSiteDigital: boolean, terminais: Array<Detalhe>){
		this.isSiteDigital = isSiteDigital;
		this.terminais = terminais;
	
	}
}

