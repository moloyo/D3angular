import { IData } from './data.interface';

export class MonthlySales implements IData {
    constructor (public label, public value) {}
}
