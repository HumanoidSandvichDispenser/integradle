export interface IRootState {
    answer: string[];
    expressions: string[][];
    previewExpression: string;
    currentRow: number;
    currentColumn: number;
    isHardmode: boolean;
    isFinished: boolean;
    theme: string;
}
