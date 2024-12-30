import moment from "moment"

export const DATE_FORMAT = "DD/MM/YYYY"

export const formatDate = (date?: Date | null, format?: string) => {
    const dateFormat = format || DATE_FORMAT
    return moment(date).format(dateFormat)
}
