interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: 'special';
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface ContentProps {
  courseParts: CoursePart[];
}

const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      );
      break;
    case 'group':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}{' '}
          {coursePart.groupProjectCount}
        </p>
      );
      break;
    case 'background':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}{' '}
          {coursePart.backgroundMaterial}
        </p>
      );
      break;
    case 'special':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} {coursePart.description}{' '}
          {coursePart.requirements}
        </p>
      );
      break;
    default:
      return assertNever(coursePart);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <>
      {courseParts.map(part => (
        <Part key={part.name} coursePart={part} />
      ))}
    </>
  );
};

const Total = ({ totalExercises }: { totalExercises: number }) => {
  return <p>Number of exercises {totalExercises}</p>;
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
