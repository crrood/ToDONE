// hardcoded tasks for testing
const sampleTaskList = {
	"1": {
		"id": "1",
		"text": "Task 1",
		"active": true
	},
	"2": {
		"id": "2",
		"text": "Task 2",
		"active": true
	},
	"3": {
		"id": "3",
		"text": "Task 3",
		"active": false
	}
};

const sampleTaskList2 = {
	"1": {
		"id": "1",
		"text": "Task 1",
		"active": true
	},
	"2": {
		"id": "2",
		"text": "Task 2",
		"active": false
	},
	"3": {
		"id": "3",
		"text": "Task 3",
		"active": false
	}
};

const sampleTaskListShort = {
	"1": {
		"id": "1",
		"text": "New task", 
		"active": true
	}
}

// list of tasks
function List() {

	// useState hook to store taskList
	const [taskList, setTaskList] = React.useState(sampleTaskList);

	// iterate through taskList to create list HTML
	console.log("rendering taskList:");
	console.log(taskList);
	const taskListHtml = [];
	let task;
	for (let taskId in taskList) {
		task = taskList[taskId];
		taskListHtml.push(
			<Task 
				key={ taskId }
				taskId={ taskId }
				taskList={ taskList }
				setTaskList={ setTaskList }>
			</Task>
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

	const taskObject = props.taskList[props.taskId];

	function toggleTaskActive() {
		const newTaskObject = {
			...taskObject,
			"active": !taskObject.active
		}

		// why is this required?
		// seems like react doesn't render unless a new object is assigned
		const newTaskList = Object.assign({}, props.taskList);

		newTaskList[props.taskId] = newTaskObject;

		props.setTaskList(newTaskList);
	}

	const className = "task " + (taskObject.active ? "task--active" : "task--inactive");
	return (
		<div className={ className }>
			<input 
				type="checkbox" 
				className="task__checkbox"
				checked={ !taskObject.active }
				onClick={ toggleTaskActive }
			/>
			<span 
				className="task__text" 
				onClick={ (e) => editText(taskObject, e) }>
				{ taskObject.text }
			</span>
		</div>
	);
}

function taskCompleted(props) {
	const newTaskObject = {
		...props.taskList[props.taskId],
		"active": !props.taskList[props.taskId].active
	}
	const newTaskList = props.taskList;
	newTaskList[props.taskId] = newTaskObject;

	props.setTaskList(newTaskList);

	console.log("taskCompleted");
}

function editText(taskObject, event) {
	console.log("editText");
	console.log(taskObject);
}

const domContainer = document.querySelector("#listContainer");
ReactDOM.render(React.createElement(List), domContainer);