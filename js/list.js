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
		"text": "New task", 
		"active": true
	}
}

// list of tasks
function List() {

	// useState hook to store taskList
	const [taskList, setTaskList] = React.useState(sampleTaskList);

	React.useEffect(() => {
		console.log("List useEffect");
	});

	// iterate through taskList to create list HTML
	console.log("rendering taskList:");
	console.log(taskList);
	const taskListHtml = [];
	let task;
	for (let taskId in taskList) {
		task = taskList[taskId];
		if (task.active) {
			taskListHtml.push(
				<Task 
					key={ taskId } 
					taskId={ taskId } 
					taskList={ taskList } 
					setTaskList={ setTaskList }>
				</Task>
			);
		}
	}

	// render component
	return (
		<div className="task-list">
			{ taskListHtml }
			<button onClick={ () => setTaskList(sampleTaskList2) }>reset</button>
		</div>
	);
}

// individual task
function Task(props) {
	React.useEffect(() => {
		console.log("Task useEffect");
	});

	const taskObject = props.taskList[props.taskId]
	return (
		<div className="task">
			<input 
				type="checkbox" 
				className="task__checkbox" 
				onClick={ () => props.setTaskList(toggleTaskActive(props.taskList, props.taskId)) }
			/>
			<span 
				className="task__text" 
				onClick={ (e) => editText(taskObject, e) }>
				{ taskObject.text }
			</span>
		</div>
	);
}

function toggleTaskActive(taskList, taskId) {
	const newTaskObject = {
		...taskList[taskId],
		"active": !taskList[taskId].active
	}

	taskList[taskId] = newTaskObject;

	console.log(taskList);

	return taskList;
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