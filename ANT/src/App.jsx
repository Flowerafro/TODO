import { Checkbox, List, Input, Typography } from "antd";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  function updateTodo(index) {
    const currentTodos = [...todos];
    currentTodos[index].completed = !currentTodos[index].completed;
    setTodos(currentTodos);
  }

  useEffect(() => {
    document.addEventListener("keydown", function (Event) {
      if (Event.key === "Enter") {
        const todotext = document.getElementById("newtodo").value;
        if (todotext) {
          setTodos([...todos, { title: todotext, completed: false }]);
          document.getElementById("newtodo").value = "";
        }
      }
    });
  }, [todos]);

  return (
    <>
      <Typography.Title level={2}>To Do</Typography.Title>
      <Input id="newtodo" placeholder="Ny todo-oppgave" />
      {todos.length === 0 ? (
        <Typography.Text></Typography.Text>
      ) : (
        <>
          <List
            dataSource={todos.filter((todo) => !todo.completed)}
            renderItem={(todo, index) => (
              <List.Item>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => {
                    updateTodo(index);
                  }}
                />
                <Typography.Text>{todo.title}</Typography.Text>
              </List.Item>
            )}
          />
          <Typography.Title level={3}>Completed</Typography.Title>
          <List
            dataSource={todos.filter((todo) => todo.completed)}
            renderItem={(todo, index) => (
              <List.Item>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => {
                    updateTodo(index);
                  }}
                />
                <Typography.Text delete>{todo.title}</Typography.Text>
              </List.Item>
            )}
          />
        </>
      )}
    </>
  );
}

export default App;