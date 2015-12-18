
class Settings {
    constructor (defaults) {
        this["_data"] = defaults
    }
    
    data(value) {
        if (this["_data"]) {
            if (typeof value === 'string') {
                return this["_data"][value];
            } else {
                Object.assign(this["_data"], value);
            }
        }
    }
    
}


function foo(defaults){
    return new Settings(defaults);
}

export {Settings, foo as settings}