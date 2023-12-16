export type MyTuitionDebtInformation = {
    id: number;
    note: string | null;
    classInfo: Class;
}

export type Class = {
    id?: number;
    className: string;
    classStartDate: string;
    classEndDate: string | null;
    numberOfStudents: number;
    numberOfSessions: number;
    credit: number;
  };

export interface GetMyTuitionDebtInformation {
    data: MyTuitionDebtInformation[];
}

export interface FinanceState {
    tuitionDebts: GetMyTuitionDebtInformation | null;
}