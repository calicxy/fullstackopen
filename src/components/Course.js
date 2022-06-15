import React from 'react'

const Header = ({text}) => {
    return(
        <h2>
            {text}
        </h2>
    )
}

const Content = ({parts}) => {
    return(
        <div>
            <ul>
                {parts.map(part =>
                    <Part key={part.id} name={part.name} exercises={part.exercises}/>
                )}
            </ul>
        </div>
    )
}

const Part = (props) => {
    return(
        <li>{props.name} {props.exercises}</li>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => {return sum+part.exercises}, 0)
    return (
        <b>total of {total} exercises</b>
    )
}

const Course = (props) => {    
    const course = props.course
    return(
        <div>
            <Header text = {course.name}/>
            <Content parts = {course.parts}/>
            <Total parts = {course.parts}/>
        </div>
    )
}

export default Course