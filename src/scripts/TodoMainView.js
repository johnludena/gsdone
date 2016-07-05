import React from 'react'


const TodoMainView = React.createClass({ 
    getInitialState: function(){ 
        return{
            todoColl: this.props.todoColl
        }
    },
    componentWillMount: function(){
        
        this.props.todoColl.on('update', () => { 
            this.setState({
                todoColl: this.state.todoColl
               
            })
        })
    },
    _addTodo: function(todo) { 
        this.props.todoColl.add({
            name: todo
        })
    },

    render: function() { 
        return (
            <div id="inner-container">
                <TodoAdd _addTodoFunc={this._addTodo} />
                <TodoList todoColl={this.state.todoColl} />
            </div>
            )
    }
})

const TodoAdd = React.createClass({

    _handleTodoAdd: function(e) {
        if (e.keyCode === 13) {
            this.props._addTodoFunc(e.target.value)
            e.target.value = ''
        }
    },

    render: function() {
        return (
            <input id="user-input" placeholder="Enter your task" onKeyDown={this._handleTodoAdd} />
            )
    }
})

const TodoList = React.createClass({

    _getTodoComponent: function(todoColl) {
        return todoColl.map((mod) => <SingleTodo todoModel={mod} />) 
    },

    render: function() {
        return (
            <div id="todo-list">
                {this._getTodoComponent(this.props.todoColl)} 
            </div>
            )
    }
})

const SingleTodo = React.createClass({

   getInitialState: function() {
        return ({
            class: 'undone'
        })
   },

   _markComplete: function(){
        if (this.state.class === "undone") {
            this.setState({class:'done'})
        }
        else {
            this.setState({class:'undone'})
        }
   },

    // _destroyTodo: function() {
    //     this.props.todoModel.destroy() 
    // },

    render: function() {

        return (
            
                <div className={this.state.class}>
                    
                    {/*<button onClick={this._destroyTodo}>X</button>*/}
                    <input className="todo-check" type="checkbox" onClick={this._markComplete} />
                    <span className="todo">{this.props.todoModel.get('name')}</span>
                    
                </div>
            )
    }
})


export default TodoMainView 