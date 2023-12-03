const root = document.querySelector("#root");

function App() {
  const [activity, setActivity] = React.useState("");
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState("");

  function generateId() {
    return Date.now();
  }

  function saveTodoHandler(event) {
    event.preventDefault();

    if (!activity) {
      return setMessage("Nama aktivitas jangan kosong");
    }

    setMessage("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
        // done: false,
      };

      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id == edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;

      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([...todos, { id: generateId(), activity, done: false }]);
    setActivity("");
  }

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id != todoId;
    });

    setTodos(filteredTodos);

    if (edit.id) cancelEditHandler();
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler() {
    setEdit({});
    setActivity("");
  }

  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Simple Todolist</h1>
      {message && <div style={{ color: "red" }}>{message}</div>}
      <form onSubmit={saveTodoHandler}>
        <input
          type="text"
          placeholder="Nama aktifitas"
          value={activity}
          onChange={function (event) {
            setActivity(event.target.value);
          }}
        />
        <button type="submit">{edit.id ? "Simpan" : "Tambah"}</button>
        {edit.id && <button onClick={cancelEditHandler}>Batal</button>}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map(function (todo) {
            return (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={doneTodoHandler.bind(this, todo)}
                />
                {todo.activity} ({todo.done ? "Selesai" : "Belum Selesai"})
                <button onClick={editTodoHandler.bind(this, todo)}>Ubah</button>
                <button onClick={removeTodoHandler.bind(this, todo.id)}>
                  Hapus
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>Tidak ada todo</i>
        </p>
      )}
    </>
  );
}

ReactDOM.render(<App />, root);
