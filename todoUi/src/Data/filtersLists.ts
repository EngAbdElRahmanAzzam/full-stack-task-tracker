import { IOption } from "../interfaces/ui";

export const creationTimeFilter :IOption[] = [
    {
        "key":'Any Time',
        "value":0
    },
    {
        "key":'Last Week',
        "value":7
    },
    {
        "key":'Last Month',
        "value":30
    },
    {
        "key":'Last Year',
        "value":365
    }
]

export const numberOfTasksFilter :IOption[] = [
    {
        "key":'10',
        "value":10
    },
    {
        "key":'20',
        "value":20
    },
    {
        "key":'30',
        "value":30
    },
]