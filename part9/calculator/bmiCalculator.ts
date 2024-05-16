const calculateBmi = (height: number, weight: number): string => {
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


console.log(calculateBmi(180, 74));
