interface iResult{
    periodLength:number,
    trainingDays:number,
    success:boolean,
    rating:number,
    ratingDescription:string,
    target:number,
    average:number
}

interface exerciseValues {
    arr:number[],
    target:number
}

const parseExerciseArgs = (args: Array<string>): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    for(var i = 2; i<args.length; i++){
        if(isNaN(Number(args[i]))){
            throw new Error('Provided values are not of the correct types!')
        }
    }

    const exerciseArray = args.slice(3).map(i => Number(i))

    return { arr: exerciseArray, target: Number(args[2])};
}

const calculateExercises = (arr: number[], target:number) : iResult => {
    
    const av = arr.reduce((sum, i) => sum+i, 0)/arr.length
    var rating:number;
    var ratingDescription:string;
    if(av/target < 0.5){
        rating = 1
        ratingDescription = "fail"
    }
    else if (av/target > 1){
        rating = 3
        ratingDescription = "excellent"
    }
    else{
        rating = 2
        ratingDescription = "not too bad"
    }
    
    return{
        periodLength: arr.length,
        trainingDays: arr.filter(i => i!==0).length,
        success: (rating > 2),
        rating: rating,
        ratingDescription:ratingDescription,
        target: target,
        average: av,
    }
}

try{
    const {arr, target} = parseExerciseArgs(process.argv);
    console.log(calculateExercises(arr, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
