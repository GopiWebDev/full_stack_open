export type Course = {
  name: string;
  exerciseCount: number;
};

const Content = ({ courses }: { courses: Course[] }) => {
  return (
    <div>
      {courses.map((course, i) => (
        <p key={`${course}${i}`}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
