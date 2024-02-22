import {TextField, Typography, List, ListItem, ListItemText, ListItemIcon, Checkbox} from '@mui/material' // fra pakken vi innstallerte når vi innstalerte mui fra mui.com
import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [todos, setTodos] = useState([]);

  // funksjon som oppdaterer todo, som henter alle todos vi har (currentTodo), finne og sette den oppdaterte todo-listen inn i useState
  // currentTodo pakker ut todos eller alle todo vi har med ... deretter bruker vi currentTodos(index).completed for å finne de ferdige
  function updateTodo(index){
    const currentTodos = [...todos]
    currentTodos[index].completed = !currentTodos[index].completed // denne sier: ta det du er og gjør det du ikke er (er du false, bli true og motsatt)
    setTodos(currentTodos);
  }

  // funksjon som lagrer TODOS
  // appen må oppdateres for at keydown-eventet skal registreres før vi klikker enter, så da legger man hele addEventListner inn i en useEffect
  useEffect(() => {
        document.addEventListener("keydown", function(Event) {
            if(Event.key === "Enter") {
              const todotext = document.getElementById("newtodo").value 
              if(todotext) {
                setTodos([...todos, {title: todotext, completed: false} ]) // ... pakker ut array og legger til nytt objekt til array. false fordi vi akkurat har skrevet den inn. 
                //document.getElementById("newtodo").value = "" // når den er lagt inn så må textfelt i grensesnitt tømmes
              }
            }
        })
        }, [todos])

        console.log(todos) // log UTENfor gir riktig log av array
  
  return (
    <>
     <Typography variant="h2" component="h1">TO DO</Typography>
     <TextField id="newtodo" variant="outlined" label="Ny todo-oppgave" />
      <List>
        {todos.map((todo, index) => (
          todo.completed === false ? 
          // hvor hvert listeItem skal todos oppdateres og da bruker vi .map
          // Checkbox --> avhuket = completed. onChange = i react må man trigge app til å kjøre funksjon: updateTodo(index) slik at vi vet hvilken index som skal oppdateres
          <ListItem key={index}>
          <ListItemIcon>
            <Checkbox checked={todo.completed} onChange={() => {updateTodo(index)}}/>
          </ListItemIcon>
          <ListItemText primary={todo.title} />
        </ListItem> : null
        ))}
      </List>

      <Typography variant="h3" component="h2">Completed</Typography>
      <List>
        {todos.map((todo, index) => (
          todo.completed === true ?
          // her skal vi skrive ut de todos som er utført. Kan bruke samme liste som i TODO men den må
          <ListItem key={index}>
          <ListItemIcon>
            <Checkbox checked={todo.completed} onChange={() => {updateTodo(index)}}/>
          </ListItemIcon>
          <ListItemText sx={{textDecoration: "line-through"}} primary={todo.title} />
        </ListItem> : null
        ))
        }
      </List>
    </>
  )
}


export default App
