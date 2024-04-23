const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({ exercises }) => {
  return (
    <div>
      <Part part={exercises.part1} exercises={exercises.exercises1} />
      <Part part={exercises.part2} exercises={exercises.exercises2} />
      <Part part={exercises.part3} exercises={exercises.exercises3} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const exercises = {
    part1,
    exercises1,
    part2,
    exercises2,
    part3,
    exercises3,
  };

  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
