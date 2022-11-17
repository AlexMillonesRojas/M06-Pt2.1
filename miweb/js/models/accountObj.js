class accountObj {
    
    //Atributos de la clase
    #id;
    #accountType;
    #clientType;
    #fullNameClient;
    #DNIClient;
    #amount;
    #entryDate;

    //Creacion del constructor de la calse
    constructor(id, accountType, clientType, fullNameClient,DNIClient, amount, entryDate){
        this.id = id;
        this.accountType = accountType;
        this.clientType = clientType;
        this.fullNameClient = fullNameClient;
        this.DNIClient = DNIClient;
        this.amount = amount;
        this.entryDate = entryDate;
    }
    //Getters de la clase accountObj
    get id() {
        return this.#id;
    }

    get accountType() {
        return this.#accountType;
    }

    get clientType() {
        return this.#clientType;
    }

    get fullNameClient() {
        return this.#fullNameClient;
    }

    get DNIClient() {
        return this.#DNIClient;
    }

    get amount() {
        return this.#amount;
    }

    get entryDate() {
        return this.#entryDate;
    }

    //Setters de la clase accountObj
    set id(id){
        this.#id = id;
    }

    set accountType(accountTypeObj){
        this.#accountType = accountType;
    }

    set clientType(clientTypeObj){
        this.#clientType = clientType;
    }

    set fullNameClient(fullNameClient){
        this.#fullNameClient = fullNameClient;
    }

    set DNIClient(DNIClient){
        this.#DNIClient = DNIClient;
    }

    set amount(amount){
        this.#amount = amount;
    }

    set entryDate(entryDate){
        this.#entryDate = entryDate;
    }
    
}