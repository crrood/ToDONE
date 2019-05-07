// hardcoded tasks for testing
const sampleTaskList = {
	"1": {
		"id": "1",
		"text": "Task 1",
		"completed": false
	},
	"2": {
		"id": "2",
		"text": "Task 2",
		"completed": false
	},
	"3": {
		"id": "3",
		"text": "Task 3",
		"completed": true
	}
};

// list of tasks
function List() {

	// useState hook to store taskList
	const [taskList, setTaskList] = React.useState(sampleTaskList);

	console.log("rendering taskList:");
	console.log(taskList);

	// iterate through taskList to create list HTML
	const taskListHtml = [];
	let task;
	for (let taskId in taskList) {
		task = taskList[taskId];
		taskListHtml.push(
			<Task 
				key={ taskId }
				taskId={ taskId }
				taskList={ taskList }
				setTaskList={ setTaskList }
			></Task>
		);
	}

	// render component
	return (
		<div className="task-list">
			{ taskListHtml }
		</div>
	);
}

// individual task
function Task(props) {

	// whether the user is currently editing the text of the task
	const [editable, setEditable] = React.useState(false);

	// data received from DB
	const taskData = props.taskList[props.taskId];

	// toggles whether a task has been completed
	function toggleTaskCompleted() {
		const newtaskData = {
			...taskData,
			"completed": taskData.completed
		}

		// why is Object.assign required?
		// seems like react doesn't render unless a fresh reference is created
		const newTaskList = Object.assign({}, props.taskList);

		newTaskList[props.taskId] = newtaskData;

		props.setTaskList(newTaskList);
	}

	// change static text to text input
	function toggleEditable(ref) {
		setEditable(!editable);
	}

	// render element
	const className = "task " + (taskData.completed ? "task--completed" : "");
	return (
		<div className={ className }>
			<input 
				type="checkbox" 
				className="task__checkbox"
				checked={ taskData.completed }
				onChange={ toggleTaskCompleted }
			/>
			<TaskText 
				editable={ editable }
				text={ taskData.text }
				toggleEditable={ toggleEditable }
			></TaskText>
		</div>
	);
}

function TaskText(props) {

	// text to diplay for task
	const [text, setText] = React.useState(props.text);

	// reference to DOM element for setting focus when editing text
	const [textInputRef, setTextInputRef] = React.useState(React.createRef);

	// detect rendering and focus text input when applicable
	React.useEffect(() => {
		if (props.editable) {
			textInputRef.current.focus();
		}
	})

	// render element
	if (props.editable) {
		return (
			<input 
				type="text" 
				className="task__text--editable" 
				onChange={ e => setText(e.target.value) }
				onBlur={ e => props.toggleEditable(React.createRef()) }
				ref={ textInputRef }
				value={ text }
			/>
		)
	}
	else {
		return (
			<span 
				className="task__text"
				onClick={ props.toggleEditable }
			>
					{ text }
			</span>
		);
	}
}

// Add to page
const domContainer = document.querySelector("#listContainer");
ReactDOM.render(React.createElement(List), domContainer);