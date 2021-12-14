import React, { useState } from "react";
import { withLDConsumer } from "launchdarkly-react-client-sdk";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  editTodo,
  cancelEditTodo,
} from "../redux/todoSlice";

/* 
here is HOC component

*/
const EditCOmponent = ({ id, edit, flags }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(editTodo({ id }));
  };

  const cancelEdit = () => {
    dispatch(cancelEditTodo({ id }));
  };

  console.log(`value:::`, edit);
  console.log( `flags:::`, flags)
  console.log(`flags.featureEditFeature:::`, flags.featureEditFeature);
  return flags.featureEditFeature ? (
    <button
      onClick={edit ? cancelEdit : handleEditClick}
      className={`btn btn-${edit ? "success" : "secondary"}`}
    >
      {edit ? "Cancel" : "Edit"}
    </button>
  ) : (
    <></>
  );
};
let HOC = withLDConsumer()(EditCOmponent);





const TodoItem = ({ id, title, completed, edit }) => {
  const [value, setValue] = useState(title);
	const dispatch = useDispatch();

	const handleCheckboxClick = () => {
		dispatch(toggleComplete({ id, completed: !completed }));
	};

	const handleDeleteClick = () => {
		dispatch(deleteTodo({ id }));
	};

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
        {edit ? (
					<input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="Add todo..."
              value={value}
              onChange={(event) => setValue(event.target.value)}
            ></input>
          ) : (
            <>
              <input
                type="checkbox"
                className="mr-3"
						checked={completed}
						onClick={handleCheckboxClick}
					></input>
					{title}
            </>
          )}
				</span>
        <span>
          <button
            onClick={handleDeleteClick}
            className={`btn btn-${edit ? "primary" : "danger"}`}
          >
            {edit ? "Update" : "Delete"}
				</button>
          {HOC({ id, edit })}
        </span>
			</div>
		</li>
	);
};

export default TodoItem;
