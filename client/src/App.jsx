import Item from "./components/Item";
import { useEffect, useState } from "react";
import axios from 'axios'

const App = () => {

const [todo , setTodo] = useState('')
const [alltodo  , setAlltodo] = useState([]);
const [updateui , setUpdateui] = useState(false)
console.log(todo)

const add_Todo=async(ev)=>{
ev.preventDefault();
await axios.post('http://localhost:4000/create',{todo})
setUpdateui((state)=>state =! state)
setTodo('');
}

useEffect(()=>{
 axios.get('http://localhost:4000/gettodo').then((e)=>{
  setAlltodo(e.data);
 })
},[updateui])

console.log(alltodo);

  return (
    <div className="p-10 bg-slate-300 flex justify-center items-center ">
      <div className="flex justify-center items-center bg-red-300 w-[60vw] flex-col gap-4 shadow-lg">
        <h2 className="text-xl">To-Do</h2>

        <div className="mb-2 flex flex-col gap-4 justify-center items-center">
          <form className="flex justify-center items-center gap-4">
            <input
              className="w-[40vw] p-3"
              type="text"
              placeholder="Add what to-do"
              onChange={ev=>{
                setTodo(ev.target.value)
              }}
              value={todo}
            />
            
            <button onClick={add_Todo}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </form>
         
        </div>

        <div className="bg-slate-300 p-3 mb-2 flex flex-col gap-4">
       {alltodo.map((e)=>{
        return <Item key={e._id} todo={e.todo} id={e._id} setUpdateui={setUpdateui}/>
       })}
      
        </div>
      </div>
    </div>
  );
};

export default App;
