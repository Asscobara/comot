export class Format {

    public static formatDate(date: Date, seperator: string = `/`, inputFormat: boolean = false)  {        
        let returnDate = "";        
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();

        if (inputFormat) {
            returnDate += `${yyyy}${seperator}`;

            if (mm < 10) {
                returnDate += `0${mm}${seperator}`;
            } else {
                returnDate += `${mm}${seperator}`;
            }
    
            if (dd < 10) {
                returnDate += `0${dd}`;
            } else {
                returnDate += `${dd}`;
            }
        } else {            
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

            returnDate += `${yyyy}`;
        }
        
        return returnDate;
    }
}