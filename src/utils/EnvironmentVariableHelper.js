class Environment {
    constructor() {
        this.BACKEND_CONTAINER_NAME = "VITE_BACKEND_CONTAINER_NAME";
		this.BACKEND_CONTAINER_PORT = "VITE_BACKEND_CONTAINER_PORT";

        console.log(this.BACKEND_CONTAINER_NAME, this.BACKEND_CONTAINER_PORT);
    }
}

const environment = new Environment();

export default environment;