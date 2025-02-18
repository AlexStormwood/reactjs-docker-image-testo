class Environment {
    constructor() {
        if (import.meta.env.dev){
            this.BACKEND_CONTAINER_NAME = "localhost";
            this.BACKEND_CONTAINER_PORT = "5000";
        } else {
            this.BACKEND_CONTAINER_NAME = "VITE_BACKEND_CONTAINER_NAME";
            this.BACKEND_CONTAINER_PORT = "VITE_BACKEND_CONTAINER_PORT";
        }
        

        console.log(this.BACKEND_CONTAINER_NAME, this.BACKEND_CONTAINER_PORT);
    }
}

const environment = new Environment();

export default environment;