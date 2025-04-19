export interface EquipForm {
    id :number
    name :string
    icon :string
    picture: string
    decoration:string
    species:number
    part:number
    quality:number
    expire_in:number
    expire_unit:number
    benefit: Benefit
}

interface Benefit {
    gold_speed:number
    attrs:Attrs
}

interface Attrs {
    keys :number[] //复选框
    values :number[] //复选框对应的值
}

export interface Option {
    value :Number
    label :string
    disabled:boolean
}


export interface EquipInfo {
    id :number
    bind:boolean
}