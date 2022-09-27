export class CommandBuilder{
    rejectFunction: any
    resolveFunction: any
    beforeExecuteFunction: any
    afterExecuteFunction: any
    context: any
    constructor(context: any) {
        this.context = context
    }

    reject(callback: Function) {
        this.rejectFunction = callback;
    }

    resolve(callback: Function) {
        this.resolveFunction = callback;
    }

    beforeExecute(callback: Function){
        this.beforeExecuteFunction = callback;
    }

    afterExecute(callback: Function){
        this.afterExecuteFunction = callback;
    }

    before(){
        if(this.beforeExecuteFunction)
            this.beforeExecuteFunction();
    }

    after(){
        if(this.afterExecuteFunction)
            this.afterExecuteFunction();
    }

}