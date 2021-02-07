

export default class EMAIL {

	from: string;
	to: string;
	subject: string;
	html: string;
	tipo: string;

	constructor(from: string, to: string, subject: string, html: string, tipo: string){
		this.from = from;
		this.to = to;
		this.subject = subject;
		this.html = html;
		this.tipo = tipo;
	}
	
}
