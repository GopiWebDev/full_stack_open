import { CoursePart } from '../App';

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case 'basic':
      return (
        <>
          <div style={{ fontWeight: 'bold' }}>
            {course.name} {course.exerciseCount}
          </div>
          <div>{course.description}</div>
          <br />
        </>
      );
    case 'group':
      return (
        <>
          <div style={{ fontWeight: 'bold' }}>
            {course.name} {course.exerciseCount}
          </div>
          <div>project exercises {course.groupProjectCount}</div>
          <br />
        </>
      );
    case 'background':
      return (
        <>
          <div style={{ fontWeight: 'bold' }}>
            {course.name} {course.exerciseCount}
          </div>
          <div>{course.description}</div>
          <div>submit to {course.backgroundMaterial}</div>
          <br />
        </>
      );
    default:
      return (
        <>
          <div style={{ fontWeight: 'bold' }}>
            {course.name} {course.exerciseCount}
          </div>
          <div>{course.description}</div>
          <div>
            required skills:{' '}
            {course.requirements.map((r, i) => (
              <span>{i === 0 ? r : `, ${r}`}</span>
            ))}
          </div>
        </>
      );
  }
};

export default Part;
