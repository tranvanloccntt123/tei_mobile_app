import { Command } from "./Command";
import { CommandBuilder } from "./CommandBuilder";

interface SaveAvatarCommandParams{
    uri: String,
    name: String,
    type: String
}

export class SaveAvatarCommand extends CommandBuilder implements Command<SaveAvatarCommandParams>{
    async execute(params: SaveAvatarCommandParams, callback?: Function | undefined): Promise<void> {
        
    }

    canExecute(params: SaveAvatarCommandParams, callback?: Function | undefined): boolean {
        if(params.uri && params.name && params.type) return true;
        return false;
    }
}