import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinish, setshowFinish] = useState(true);

  useEffect(() => {
    let todosString = localStorage.getItem("todos");
    if (todosString) {
      let todos = JSON.parse(todosString);
      settodos(todos);
    }
  }, []);
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    settodo(t[0].todo); //means at the t array 0th index the todo value
    // console.log(t)
    // Now i have got the specific index for edit then delete that so that user saves it again with new values
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLS();
  };
  // Method  1
  // const handleDelete = (e) => {
  //   let id=e.target.name;
  //   console.log(id);

  // };

  // Method 2

  const handleDelete = (e, id) => {
    // let id = e.target.name;
    console.log(id);
    // console.log(id);

    // now exceptfrom that todo all todos should be added

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    settodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    // in this in the todos list passing two things
    // one is todo object and other is isCompleted parameter
    settodo("");
    saveToLS();
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    console.log(`What is the id: ${id}`);
    let newtodos = [...todos];
    console.log(`New todo list: ${newtodos}`);
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveToLS();
  };

  const toggleFinished = (e) => {
    setshowFinish(!showFinish);
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-3 ">
        <div className="bg-[#50727B] rounded-xl p-3 min-h-[80vh]">
          <div className="addTodo my-5 flex flex-col gap-4">
            <h1 className="text-lg font-bold text-white w-full text-center">
              My Todos React-App
            </h1>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className=" w-full  rounded-md py-4 px-3 text-xl"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-[#78A083] hover:bg-slate-950 rounded-md px-2 py-1  disabled:bg-[#344955] text-white text-sm"
            >
              Save
            </button>
          </div>
          <input
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinish}
          />{" "}
          <h2 className="text-white inline">Show finished</h2>
          <h2 className="font-bold text-white my-3 text-center">Your Todos</h2>
          <div className="todos">
            {todos.length === 0 && (
              <div className="container my-4 text-xl text-white">
                {" "}
                + Add Todos
              </div>
            )}
            {todos.map((item) => {
              return (
                (showFinish || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex w-full  border-2 p-3 justify-between my-2 text-white"
                  >
                    <div className="flex gap-5">
                      <input
                        onChange={handleCheckbox}
                        type="checkbox"
                        name={item.id}
                      />

                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex h-full ">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="bg-slate-500 hover:bg-slate-950 rounded-md px-2 py-1 mx-1 text-white text-sm"
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        name={item.id}
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-slate-500 hover:bg-slate-950 rounded-md px-2 py-1 mx-1 text-white text-sm"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
