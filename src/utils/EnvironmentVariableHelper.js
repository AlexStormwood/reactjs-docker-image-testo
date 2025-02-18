class Environment {
    constructor() {
        this.BACKEND_CONTAINER_NAME = import.meta.env.VITE_BACKEND_CONTAINER_NAME;
		this.BACKEND_CONTAINER_PORT = import.meta.env.VITE_BACKEND_CONTAINER_PORT;

        console.log(this.VITE_BACKEND_CONTAINER_NAME, this.VITE_BACKEND_CONTAINER_PORT);
    }
}

const environment = new Environment();

export default environment;