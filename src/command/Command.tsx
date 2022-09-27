export interface Command<Params = any>{
    execute(params?: Params, callback?: Function): Promise<void>
    canExecute(params?: Params, callback?: Function): boolean
    reject?(callback?: Function): any
    resolve?(callback?: Function): any
    beforeExecute(callback: Function): void
    afterExecute(callback: Function): void
    before(): any
    after(): any
}

export const CommandInvoker = async <Params = any>(command: Command<Params>, params: Params) => {
    command.before();
    if(command.canExecute(params)){
        await command.execute(params);
    }
    command.after();
}