import React from 'react';

class Question extends React.Component{
    
    render(props) {
        const {title, options, id, next, previous} = this.props;
        return (
            <div>
                <h1>Question component</h1>
                <h1>{title}</h1>
                <h1>{props}</h1>

                <button onClick={ () => next(id)}>Submit</button>
                <button onClick={ () => previous(id)}>Prevoius</button>
            </div>
        )
    }
}

export default Question;
