// epibot Module Base Class

module.exports = class epibot_module_base {

    // Constructor

    constructor() {
    }

    // Create Module Mappings

    module_maps() {
        const modname = this.constructor.name.replace('epibot_','').replace('_module','')
        Object.keys(global.epibot._modules_).forEach(module => {
            if (!['core', modname].includes(module)) {
                this[module] = global.epibot._modules_[module];
            }
        })
    }

    // Create a module link

    link(module) {
        this[module] = global.epibot._modules_[module];
    }


}