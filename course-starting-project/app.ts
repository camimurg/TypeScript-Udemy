function add(
    n1: number,
    n2: number,
    showResult: boolean,
    phrase: string) {
    /* if (typeof n1 !== 'number' || typeof n2 !== 'number') {
        throw new Error('incorrect input!');
    } 
    This is not the practice we want with TS!!
    */ 
    let result = n1 + n2
    if (showResult) {
        console.log(phrase + result);
    } else {
        return result
    }

}
let number0: number; // this is possible
const number1: number = 5; // this is reduntant, not necessary
const number2 = 2.8; // Typescript here infer the type of number2 automatically
const printResult = true;
let resultPhrase = 'Result is: '
resultPhrase = 'Result is the following: '


add(number1, number2, printResult, resultPhrase);
