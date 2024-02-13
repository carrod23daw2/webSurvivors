/*
import {Control} from "./control.js";
import {Hitbox} from "./hitbox.js";
*/

class Obj{

    constructor(x, y, area) {
        this.hitbox = new Hitbox(area);
        this.control = new Control(x, y);
        
    }
}

export {Obj};
