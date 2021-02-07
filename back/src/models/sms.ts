

export class SMS {

	from: string;
	to: string;
	msg: string;
	callbackOption: string;
	id: string;
	aggregateId: string;
	flashSms: boolean;

	constructor(to: string, msg: string, callbackOption: string, id: string){
		this.from = "SafraPay";
		this.to = to;
		this.msg = msg;
		this.callbackOption = callbackOption;
		this.id = id;
		this.aggregateId = "54989";
		this.flashSms = false;
	}
	
}

export class SMSZenvia {

	sendSmsRequest: SMS;

	constructor(sendSmsRequest: SMS){
		this.sendSmsRequest = sendSmsRequest;
	}

}
