class clienTypeObj {
    
    //Atributos de la clase
    #id;
    #type;
    #description;

    //Creacion del constructor de la calse
    constructor(id, type, description) {
        this.id = id;
        this.type = type;
        this.description = description;
    }

    //Getters de la clase clienTypeObj
    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    get description() {
        return this.#description;
    }

    //Setters de la clase clienTypeObj
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