exports = function(){
    process.on("uncaughtException",(error) => {
        console.log("we got an uncaught exception  ",error);
        process.exit(1);
    });
    process.on("unhandledRejection",(error) => {
        console.log("we got an unhandled rejection",error);
        process.exit(1);
    });
}