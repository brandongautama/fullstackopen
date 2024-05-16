interface Arguments2 {
    dailyExerciseHours: number[];
    target: number
}

const parseArguments2 = (args: string[]): Arguments2 => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const [_first, _second, target, ...dailyExerciseHours] = args;



    if (!isNaN(Number(target)) && dailyExerciseHours.map(h => !isNaN(Number(h)))) {
        return {
            dailyExerciseHours: dailyExerciseHours.map(h => Number(h)),
            target: Number(target)
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

interface Result {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
    const average: number = dailyExerciseHours.reduce((sum, curr) => sum + curr, 0) / dailyExerciseHours.length
    const rating: number = (average - target) > 0 ? 3 : ((average - target) > -1 ? 2 : 1)
    return {
        periodLength: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.filter(h => h !== 0).length,
        target: target,
        average: average,
        success: average >= target,
        rating: rating,
        ratingDescription: rating === 3 ? 'great' : (rating === 2 ? 'not too bad but could be better' : 'try harder')
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

try {
    const {dailyExerciseHours, target} = parseArguments2(process.argv)
    console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage)
}