class HashTable {
    constructor(size = 53) {
        this,size = size;
        this.keyMap = [];
    }

    _hash(key) {
        let total = 0;
        const WEIRD_PRIME = 31;

        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }

        return total;
    }

    set(key, value) {
        let index = this._hash(key);

        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }

        this.keyMap[index].push([key, value]);
    }

    get(key) {
        let index = this._hash(key);
        let resultList = [];

        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    resultList.push(this.keyMap[index][i][1]);
                }
            }
            return resultList;
        }

        return undefined;
    }
}

const ht = new HashTable();
ht.set('harry', {
    age: 27,
    job: 'software engineer'
});

ht.set('harry', {
    age: 24,
    job: 'undefined'
})

let harry = ht.get('harry');
console.log(harry);
