class clienTypeObj {
    #id;
    #type;
    #description;

    constructor(id, type, description) {
        this.id = id;
        this.type = type;
        this.description = description;
    }

    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    get description() {
        return this.#description;
    }

    set id(id) {
        this.#id = id;
    }

    set type(type) {
        this.#type = type;
    }

    set description(description) {
        this.#description = description;
    }
}