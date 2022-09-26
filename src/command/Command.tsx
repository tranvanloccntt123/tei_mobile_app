export interface Command<Params = any>{
    execute(params?: Params, callback?: Function): Promise<void>,
    canExecute(params?: Params, callback?: Function): boolean
    reject(params?: any, callback?: Function): any
    resolve(params?: any, callback?: Function): any
}

export const CommandInvoker = <Params = any>(command: Command<Params>, params: Params) => {
    if(command.canExecute(params)) command.execute(params);
}