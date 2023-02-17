export interface StudentPaymentData {
    id : number
    name : string
    month : string
    year : string
    status : string
    amount_due : string
    amount_paid : string
    payment_ref : string
    created : string
  }

export interface AllPaymentData {
    refno : string
    mode : string
    txn_id : string
    amount : number
    status : string
    reason : string
    isallocated : boolean
    created : string
  }  