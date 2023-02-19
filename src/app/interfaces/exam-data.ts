export interface ExamData{
    id:number
    name : string
    description : string
    status : string
    grade_name : string
    created : string
}

export interface ExamScheduleData{
    id:number
    exam_date : string
    start_time : string
    end_time : string
    max_marks : string
    classroom_name : string
    subject_name : string
}