class Environment {
    constructor() {
        if (import.meta.env.dev){
            this.BACKEND_NETWORK_HOSTNAME = "localhost";
            this.environment = "5000";
        } else {
            this.BACKEND_NETWORK_HOSTNAME = "VITE_BACKEND_NETWORK_HOSTNAME";
            this.environment = "VITE_BACKEND_NETWORK_PORT";
        }
        

        console.log(this.BACKEND_NETWORK_HOSTNAME, this.environment);
    }
}

const environment = new Environment();

export default environment;