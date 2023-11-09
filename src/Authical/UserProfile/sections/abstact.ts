import { Children } from "../../model";


export abstract class Section {
    abstract isAdmin():boolean;
    abstract getID():string;
    abstract getIcon():string;
    abstract getLabel():string;
    abstract getPanel():Children;
}

