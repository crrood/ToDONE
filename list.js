console.log("list.js start");

function List() {
	const sampleTask = {
		"text": "Sample task"
	};
	const [ activeTasks, setTasks ] = useState([ sampleTask ]);

	return (
		<div>
			<p>{ activeTasks[0].text }</p>
		</div>
	);
}

const domContainer = document.querySelector('#listContainer');
ReactDOM.render(List, domContainer);
console.log("list.js end");