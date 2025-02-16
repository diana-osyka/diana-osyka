export const formatDate = (dateString: string) => {
	if (dateString) {
		const [day, month, yearAndTime] = dateString.split('.')
    if(yearAndTime === undefined) return '';
		const [year] = yearAndTime.split(' ')

		const formattedDay = day.padStart(2, '0')
		const formattedMonth = month.padStart(2, '0')
		// console.log(`${formattedDay}/${formattedMonth}/${year}`);
		return `${formattedDay}/${formattedMonth}/${year}`
	}
}
