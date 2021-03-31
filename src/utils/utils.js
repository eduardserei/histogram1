const MONTHS = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

export function getMonthlyPostsCountArray(data) {

    const monthlyPostsCount = [];
    const currentObj = {}

    data.allPosts.map(({createdAt}) => createdAt).forEach((dateMs, i) => {
        const currentDate = new Date(parseInt(dateMs)); 
        const currentMonth = currentDate.getMonth()
        
        // daca postarea e din 2019
        if (currentDate.getFullYear() === 2019) {
            // adauga la luna respectiva in obiectul months
            if (currentObj[currentMonth]) {
              currentObj[currentMonth].count += 1 
            } else {
              currentObj[currentMonth] = {count: 1}
              currentObj[currentMonth].month = MONTHS[currentMonth];
              monthlyPostsCount.push(currentObj[currentMonth])
            }

        }
        return null;
    })

    monthlyPostsCount.sort((obj1, obj2) => MONTHS.indexOf(obj1.month) - MONTHS.indexOf(obj2.month))

    // return array to send to drawChart
    return monthlyPostsCount;
}


