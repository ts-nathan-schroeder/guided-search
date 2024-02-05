export enum FieldName {
    STORE = 'Store Name',
    CATEGORY = 'Product',
    GROUP = 'Department',
    DIVISION = 'Store Region',
    DISTRICT = 'Store State',
    UPC = 'Product Full Name'
}
export enum FieldID {
    STORE = 'Store Name',
    CATEGORY = 'Product',
    GROUP = 'Department',
    DIVISION = 'Store Region',
    DISTRICT = 'Store State',
    UPC = 'SKU'
}
export enum FieldLabel {
    STORE = 'STORES',
    CATEGORY = 'DEPARTMENTS',
    GROUP = 'CATEGORIES',
    DIVISION = 'DIVISIONS',
    DISTRICT = 'DISTRICTS',
    UPC = 'PRODUCTS'
}
export const BaseFields: string[] = [
    'Sales',
    encodeURIComponent('Gross Profit ($)')
]
export const StoreFields: string [] = [
    'Store Name'
]
export const DistrictFields: string[] = [
    'Store Region',
]
export const DivisionFields: string[] = [
    'Store State'
]
export const WeekRollupFields: string[] = [

]
export const StoreRollupFields: string[] = [
    'Number of Products'
]
export const GroupFields: string[] = [
    'Department',
]
export const CategoryFields: string[] = [
    'Product',
]
export const UPCFields: string[] = [
    'SKU',
    'Product Full Name',
]