import ReactDOM from 'react-dom'
import React from 'react'
import Backbone from 'backbone'
import TodoMainView from './TodoMainView'


const app = function() {

    const TodoModel = Backbone.Model.extend({ 
        defaults: { 
            status: 'pending'
        }
    })

    const TodoCollection = Backbone.Collection.extend({ 
        model: TodoModel 
    })

	ReactDOM.render(<TodoMainView todoColl={new TodoCollection()} />, document.querySelector('.container'))
}

app()