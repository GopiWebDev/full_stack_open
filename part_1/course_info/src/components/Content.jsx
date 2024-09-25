import Part from './Part';

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => {
        return <Part key={index} name={part.name} exercises={part.exercises} />;
      })}
    </div>
  );
};

export default Content;
