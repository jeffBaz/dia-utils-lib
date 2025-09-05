export interface IDossierItem {
    id: string | number;
    name: string;
    description?: string;
    icon?: string;
    selected?: boolean;
    disabled?: boolean;
    children?: IDossierItem[];
}
 