import { Request, Response } from 'express';

class ZenviaSmsController {

	public async sendHalfCheck(req: Request, res: Response) {
    try{
      return res.status(200).send({status: 200, description: "OK"});
    }catch(e){
      console.log(e);
      return res.status(500).send({menssagem: e.message});
    }

  }
}
export default new ZenviaSmsController();