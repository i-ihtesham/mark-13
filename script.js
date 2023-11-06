let inputDate = document.querySelector("#input-date")
let submitBtn = document.querySelector('#submit-btn')
let output = document.querySelector("#output")

function reverseStr(str)
{
    let listOfChar = str.split('');
    let revListOfChar = listOfChar.reverse();
    let joinCharList = revListOfChar.join('');
    return joinCharList;
}

function isPalindrome(str)
{
    if(str === reverseStr(str))
    {
        return true;
    }
    return false;
}

function convertDateToStr(date)
{
    let dateStr = {day : "", month : "", year : ""};
    if(date.day < 10)
    {
        dateStr.day = "0" + date.day;
    }
    else
    {
        dateStr.day = date.day.toString();
    }
    if(date.month < 10)
    {
        dateStr.month = "0" + date.month;
    }
    else
    {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;

}

function dateAllVariation(date)
{
    let dateStr = convertDateToStr(date);
    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.split(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.split(-2)
    let yymmdd = dateStr.year.split(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDate(date)
{
    let dateList = dateAllVariation(date);
    let flag = false;
    for(let i of dateList)
    {
        if(isPalindrome(i))
        {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year)
{
    if(year % 400 === 0) return true;
    if(year % 100 === 0) return false;
    if(year % 4 === 0) return true;
    return false;
}
function getNextDate(date)
{
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month == 2)
    {
        if(isLeapYear(year))
        {
            if(day > 29)
            {
                day = 1;
                month++;
            }
        }
        else
        {
            if(day > 28)
            {
                day = 1;
                month++;
            }
        }
    }
    else
    {
        if(day > daysInMonth[month - 1])
        {
            day = 1;
            month++;
        }
    }
    if(month > 12)
    {
        month = 1;
        year++;
    }

    return {
        day : day,
        month : month,
        year : year
    };
}

function getPreviousDate(date) //1-1-2021 //31-12-2020
{
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    // day = 0, month --;
    if(day < 1)
    {
        month--;
        if(month < 1)
        {
            month = 12;
            year--;
        }
        if(month === 2)
        {
            if(isLeapYear(year))
            {
                day = 29
            }
            else
            {
                day = 28
            }
        }
        else
        {
            day = daysInMonth[month - 1]
        }

    }
    return {
        day : day,
        month : month,
        year : year
    };
}
function getNextPreviousPalindromeDate(date)
{
    let countNext = 0;
    let countPrevious = 0;
    let nextDate = getNextDate(date);
    let previousDate = getPreviousDate(date);
    while(1)
    {
        countNext++;
        if(checkPalindromeForAllDate(nextDate))
        {
            break;
        }
        nextDate = getNextDate(nextDate)
    }
    while(1)
    {
        countPrevious++;
        if(checkPalindromeForAllDate(previousDate))
        {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    if(countPrevious < countNext)
    {
        return [countPrevious, previousDate]
    }
    return [countNext, nextDate];
}

function clickBtn()
{
    let date = inputDate.value;
    let listOfDate = date.split("-");
    let dateObj = {
        day : Number(listOfDate[2]),
        month : Number(listOfDate[1]),
        year : Number(listOfDate[0])
    }
    if(date !== null)
    {
        if(checkPalindromeForAllDate(dateObj))
        {
            output.innerText = `Yay!!! your birthday is a Palindrome`
        }
        else
        {
            let [counter, palindromeDate] = getNextPreviousPalindromeDate(dateObj);
            output.innerText = `The closest palindrome date to your birthday is ${palindromeDate.day}-${palindromeDate.month}-${palindromeDate.year}. 
            You missed it by ${counter} days.`
        }
    }
    else{
        output.innerText = "Invalid Date";
    }

}
submitBtn.addEventListener("click", clickBtn)