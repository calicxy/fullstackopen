/*interface BmiValues {
    value1: number,
    value2: number
}

const parseBmiArgs = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
*/

const calculateBmi = (height : number, mass : number) => {
    const bmi = mass/((height/100)^2)
    if (bmi < 16.0){
        return "Underweight (Severe Thinness)"
    }
    else if (bmi > 40.0){
        return "Obese (Class III)"
    }
    else return ("Normal")
}

/*
try{
    const { value1, value2 } = parseBmiArgs(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
*/

export {calculateBmi};