export interface TimeTableData{
    id:number
    grade:number
    teacher_name:string
    subject_name:string
    classroom_name:string
    schedule_day:string
    start_time:string
    end_time:string
    created:string
}

export interface TimeTableInfoData{
    id:number
    grade:number
    teacher:number
    subject:number
    classroom:number
    schedule_day:string
    start_time:string
    end_time:string
    created:string
    teacher_name:string
    subject_name:string
    classroom_name:string
}