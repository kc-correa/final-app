var div  = React.DOM.div,
button = React.DOM.button,
input  = React.DOM.input,
label  = React.DOM.label,
form   = React.DOM.form,
span   = React.DOM.span,
ul     = React.DOM.ul,
h1     = React.DOM.h1,
i      = React.DOM.i;

var ToDo = React.createClass({
render: function() {
  var defaultClass = 'callout';

  defaultClass += this.props.done ? ' callout-success' : ' callout-info';

  return (
    div({ className: defaultClass },
      i({
        className: 'ficon ficon-checkmark mark-done',
        onClick: this.props.onClickDone
      }),
      span(null, this.props.value),
      i({
        className: 'close',
        onClick: this.props.onClickClose
      }, '\u00D7')
    )
  )
}
});

var ToDoList = React.createClass({
getInitialState: function() {
  return {
    todos: [
      { value:'Learn Angular', done: false },
      { value:'Learn React', done: false },
      { value:'Be awesome', done: false }
    ]
  }
},
addTodo: function() {
  var todos = this.state.todos;

  todos.push({
    value: this.state.inputValue,
    done: false
  });

  this.setState({
    todos: todos,
    inputValue: ''
  });

  // Return false for form
  return false;
},
handleChange: function(e) {
  this.setState({
    inputValue: e.target.value
  });
},
removeTodo: function(index) {
  this.state.todos.splice(index, 1);

  this.setState({
    todos: this.state.todos
  });
},
markTodoDone: function(index) {
  var todos = this.state.todos;
  var todo = this.state.todos[index];
  todos.splice(index, 1);
  todo.done = !todo.done;

  todo.done ? todos.push(todo) : todos.unshift(todo);

  this.setState({
    todos: todos
  });
},
render: function() {

  var todos = this.state.todos.map(function(todo, index) {
    return ToDo({
      value: todo.value,
      done:  todo.done,
      onClickClose: this.removeTodo.bind(this, index),
      onClickDone:  this.markTodoDone.bind(this, index)
    })
  }.bind(this));

  return (
    div({ className: 'container' },
      div({ className: 'col-xs-6 col-xs-offset-3'},
        h1(null, 'My Todo List'),
        todos,
        React.DOM.form({
          className: 'form-inline todo-form col-xs-8 col-xs-offset-2',
          role: 'form',
          onSubmit: this.addTodo,
          },
          div({ className: 'input-group'},
            label({className: 'sr-only', for:'todoInput'}),
            input({
              type: 'text',
              value: this.state.inputValue,
              onChange: this.handleChange,
              className: 'form-control',
              placeholder: 'What do you need to do?'
            }),
            span({ className: 'input-group-btn'}, 
              button({ className: 'btn btn-default' },
                'Add Todo'
              )
            )
          )
        )
      )
    )
  );
}
});

React.renderComponent(ToDoList(), document.getElementById('main'));