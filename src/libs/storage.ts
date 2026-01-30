import type { IRowsError } from "@/interfaces/ErrorTS";
import type { LiquidacionRowTS } from "@/interfaces/LiquidacionesTS";

export const deleteSavedRows = (): void => {
    localStorage.removeItem('settlements-rows');
}
export const getSavedRows = (): IRowsError | null => {
    try {
        const rows = localStorage.getItem('settlements-rows');
        if(rows){
            return JSON.parse(rows);
        }
        return null;
    } catch (error) {
        return null;
    }
}
export const saveRows = (data: IRowsError): boolean => {
    try {
        localStorage.setItem('settlements-rows', JSON.stringify(data));
        return true
    } catch (error) {
        return false;
    }
}
export const saveLiquidatorRows  = (data: LiquidacionRowTS[]) => {
    try {
        localStorage.setItem('liquidator-rows', JSON.stringify(data));
        return true
    } catch (error) {
        return false;
    }
}
export const removeLiquidatorRows = (): void => {
    localStorage.removeItem('liquidator-rows');
}
export const getLiquidatorRows = (): LiquidacionRowTS[] | null => {
    try {
        const rows = localStorage.getItem('liquidator-rows');
        if(rows){
            return JSON.parse(rows);
        }
        return null;
    } catch (error) {
        return null;
    }
}