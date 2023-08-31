const Header = (props) => {
    return (
    <h2>{props.name}</h2>
    )
  }
  
  
  const Content = ({parts}) => {
    return (
      <div>
          {parts.map(part =>
            <p key={part.id}>{part.name} {part.exercises}</p>
          )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    let totalExercises = parts.reduce(function(total, part) {
      return total + part.exercises
    }, 0)
    
    return (
      <p>
        <b>Number of total exercises is {totalExercises} </b>
      </p>
    )
  }
  
  const Course = ({course}) => {
    console.log(course.parts)
    return (
      <div>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course