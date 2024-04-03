import { Add_Transation, Delete_Transation, Modify_Transaction, clearAllTransation } from "./ActionsType"



export const AddTransaction=(payload)=>{
  debugger
    return{
      type:Add_Transation,
      payload
    }
}

export const DeleteTransaction=(payload)=>{
  debugger
    return{
      type:Delete_Transation,
      payload
    }
}
export const ModifyTransaction=(payload)=>{
  debugger
    return{
      type:Modify_Transaction,
      payload
    }
}
