import { sendDetailRelationShip } from "../common/Until";
import { Command } from "./Command";
import { CommandBuilder } from "./CommandBuilder";

export interface SendRelationShipCommandParams{
    description: string,
    day: any,
    month: any,
    year: any,
    id: number
}

export class SendRelationShipCommand extends CommandBuilder implements Command<SendRelationShipCommandParams>{
    canExecute(params: SendRelationShipCommandParams, callback?: Function | undefined): boolean {
        if(params.id && params?.description && params.day && params.month && params.year) return true;
        return false
    }
    async execute(params: SendRelationShipCommandParams, callback?: Function | undefined): Promise<void> {
        let date = new Date();
        date.setUTCDate(parseInt(params?.day));
        date.setUTCMonth(parseInt(params?.month) - 1);
        date.setUTCFullYear(parseInt(params?.year));
        let r = await sendDetailRelationShip(params.id, params.description, date.toString());
        if (!r){
            if(this.rejectFunction)
                this.rejectFunction(r);
        }
        else {
            if(this.resolveFunction)
                this.resolveFunction(r);
        }
    }
}