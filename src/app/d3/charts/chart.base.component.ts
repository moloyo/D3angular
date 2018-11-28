import { IData } from '../models/data.interface';

export abstract class ChartBase {
    abstract draw(data: IData[]);
}
