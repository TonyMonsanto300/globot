//Create a base type for tables with "create()" function to create themselves, and a name
//
class ITable {
    constructor() {
        this.name = '';
    }

    async create() {
        throw new Error('Not implemented');
    }
}
