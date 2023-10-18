const instrumentarNewRelic = (newrelic:any,moduleName:string,moduleInstance:any) =>{
newrelic.instrumentLoadedModule(
    moduleName,
    moduleInstance
  );
}

export {instrumentarNewRelic}