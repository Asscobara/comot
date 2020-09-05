export class Format {

    public static formatDate(date: Date, seperator: string = `/`)  {        
        let returnDate = "";        
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();

        if (dd < 10) {
            returnDate += `0${dd}${seperator}`;
        } else {
            returnDate += `${dd}${seperator}`;
        }

        if (mm < 10) {
            returnDate += `0${mm}${seperator}`;
        } else {
            returnDate += `${mm}${seperator}`;
        }
        returnDate += yyyy;
        return returnDate;
    }
}