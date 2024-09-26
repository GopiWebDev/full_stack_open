const Total = ({ parts }) => {
  let total = parts.reduce((prev, curr) => (prev += curr.exercises), 0);

  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

export default Total;
