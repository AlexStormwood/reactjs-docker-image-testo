class Environment {
    constructor() {
        if (import.meta.env.dev){
            this.BACKEND_NETWORK_HOSTNAME = "localhost";
            this.BACKEND_NETWORK_PORT = "5000";
        } else {
            this.BACKEND_NETWORK_HOSTNAME = "VITE_BACKEND_NETWORK_HOSTNAME";
            this.BACKEND_NETWORK_PORT = "VITE_BACKEND_NETWORK_PORT";
        }
        

        console.log(this.BACKEND_NETWORK_HOSTNAME, this.BACKEND_NETWORK_PORT);
    }
}

const environment = new Environment();

export default environment;