import Part from './Part';
import { CoursePart } from '../App';

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {courses.map((course, i) => (
        <Part course={course} key={`${course}${i}`} />
      ))}
    </div>
  );
};

export default Content;
