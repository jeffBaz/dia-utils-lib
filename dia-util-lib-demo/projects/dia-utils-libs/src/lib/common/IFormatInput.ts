
export interface IFormatInput {
    // formatName: string;
    parse: (_: any) => any;
    transform: (_: any) => any;
}