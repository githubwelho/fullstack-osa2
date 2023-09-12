import courses from './components/Course'

const Header = ({ course }) =>{
  console.log(course)
  return(
    <h2>
    {course.name}
    </h2>
  )
}

const Part = ({ part }) => {
  console.log(part)
  return(
    <><li>
      {part.name} {part.exercises}
      </li></>
  )
}
const Content = ({ course }) => {
  return(
    <>
    {course.parts.map(part => <Part  key={part.id} part={part}/>)}
    </>
  )
}

const Course = ({course}) =>{
  return(
    <>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
    </>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce( (s, p) => {
    return s + p.exercises
  },0)

  return(
    <>
    <p>
      Number of exercises {total}
    </p>
    </>
  )
}

const App = () => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <div key={course.id}><Course course={course}/></div>)}
    </div>
  )
}

export default App