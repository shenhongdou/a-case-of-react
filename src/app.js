import Footer from './components/Footer';
import Item from './components/Item';
import {BrowserRouter as Router, Route} from 'react-router-dom';

require('style/base.css');
require('style/index.css');



export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			todosData:[],
			inputVal:'',
			view:'all'
		}

		this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
		this.onDestory = this.onDestory.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.onToggle = this.onToggle.bind(this);
		this.destoryAll = this.destoryAll.bind(this);
		// this.changeView = this.changeView.bind(this);
		this.changeTodoValue = this.changeTodoValue.bind(this);
		
	}

	inputChange(ev){
		let {inputVal} = this.state;
		inputVal = ev.target.value.trim();
		this.setState({inputVal});
	}

	handleKeyDownPost(ev){

		if(ev.keyCode !== 13) return;

		let {inputVal,todosData} = this.state; 
	
		if(inputVal ==='') return;

		let todo = {};
		todo.value = inputVal;
		todo.id = new Date().getTime();
		todo.completed = false;

		todosData.push(todo);

		this.setState({
			todosData,
			inputVal:''
		});

	}

	onDestory(todo){
		let {todosData} = this.state;

		todosData = todosData.filter((item)=>{
			
			return item.id !== todo.id
		});
		
		this.setState({todosData});
		
	}

	destoryAll(){
		let {todosData} = this.state;

		todosData = todosData.filter((item)=>{
			
			return !item.completed
		});
		
		this.setState({todosData});
	}

	toggleAll(ev){

		let {todosData} = this.state;
		let {checked} = ev.target;
		todosData = todosData.map((item)=>{
			item.completed = checked;
			return item;
		});
		this.setState({todosData});
	}

	onToggle(todo){
		let {todosData} = this.state;
		
		todosData = todosData.map((item)=>{
			if(item.id === todo.id){
				item.completed = !item.completed
			}
			
			return item;
		});
		this.setState({todosData});
	}

	// changeView(view){
	// 	this.setState({view});	
	// }

	changeTodoValue(todo,value){
		let {todosData} = this.state;
		todosData = todosData.map((item)=>{
			
			if(item.id === todo.id){
				item.value = value;
			};
			
			return item;
		})

		this.setState({todosData})
		
	}

	render(){
		
		let {todosData,inputVal,view} = this.state;
		let {
				handleKeyDownPost,
				onDestory,
				inputChange,
				toggleAll,
				onToggle,
				destoryAll,
				// changeView,
				changeTodoValue
			} = this;

		let itemBox = null,
			footer = null;

		let leftCount = todosData.length;
		let showClearBtn = false;

		let {location:{pathname}} = this.props;


		let item = todosData.filter((item)=>{

			if(item.completed){
				leftCount--;
			}

			switch(pathname){
				case '/active':
					return !item.completed;
					break;
				case '/completed':
					return item.completed;
					break;
				default:
					return true;
			}
		})
		
		item = item.map((item,index)=>{
			
			

			return (
				<Item 
					{...{
						todo:item,
						onDestory,
						onToggle,
						changeTodoValue
					}}
					key={index} 
				/>
			)
		});

		if(leftCount<todosData.length){
			showClearBtn = true;
		}

		if(todosData.length){
			itemBox = (
				<section className="main">
					<input 
						type="checkbox" 
						className="toggle-all"
						onClick={toggleAll}
					 />
					<ul className="todo-list">
						{item}
					</ul>
				</section>
			)

			footer = (
				<Footer 
					{...{
						leftCount,
						showClearBtn,
						destoryAll,
						// changeView,
						// view
						pathname

					}}
				/>
			)
		}



		return(
			<div>
				<header>
					<h1>todos</h1>
					<input 
						type="text" 
						className="new-todo" 
						onKeyDown={handleKeyDownPost}
						onChange={inputChange} 
						value={inputVal}
					/>
				</header>
				{itemBox}
				{footer}
			</div>
		)
	}
}


ReactDOM.render(
	<Router>
		<Route path="/" component={App} />
	</Router>,
  document.getElementById('root')
)

if(module.hot){
	module.hot.accept();
}

