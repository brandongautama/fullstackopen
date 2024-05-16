interface Arguments {
    height: number;
    weight: number;
}

export const parseArguments = (args: string[]): Arguments => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight*10000/(height*height)
    switch (true) {
        case (bmi < 18.5):
            return 'underweight'
        case (bmi < 23):
            return 'Normal (healthy weight)'
        case (bmi < 27.5):
            return 'overweight'
        default:
            return 'obese'
    }
}


try {
    const { height, weight} = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage)
}
