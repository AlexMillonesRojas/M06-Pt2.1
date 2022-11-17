class accountObj {
    #id;
    #accountType;
    #clientType;
    #fullNameClient;
    #DNIClient;
    #amount;
    #entryDate;

    constructor(id, accountType, clientType, fullNameClient,DNIClient, amount, entryDate){
        this.id = id;
        this.accountType = accountType;
        this.clientType = clientType;
        this.fullNameClient = fullNameClient;
        this.DNIClient = DNIClient;
        this.amount = amount;
        this.entryDate = entryDate;
    }

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

    set id(id){
        this.#id = id;
    }

    set accountType(accountType){
        this.#accountType = accountType;
    }

    set clientType(clientType){
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