class accountTypeObj {
   
    //Atributos de la clase
    #id;
    #type;

    //Creacion del constructor de la calse
    constructor(id, type) {
        this.#id = id;
        this.#type = type;
    }

    //Getters de la calse accountTypeObj
    get id() {
        return this.#id;
    }

    get type() {
        return this.#type;
    }

    //Setters de la calse accountTypeObj
    set id(id) {
        this.#id =  id;
    }

    set type(type) {
        this.#type =  type;
    }
}