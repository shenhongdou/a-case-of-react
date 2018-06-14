export default class Item extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			isEdit:false,
			value:''
		}
		this.onEdit = this.onEdit.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onEnter = this.onEnter.bind(this);
		this.inputChange = this.inputChange.bind(this);
	}

	onEdit(){
		let {value} = this.props.todo;
		this.setState({
			isEdit:true,
			value
		},()=>this.refs.edtingInput.focus());
	}

	changeTodoValue(value){
		
		let {changeTodoValue,todo} = this.props;
		
		changeTodoValue(todo,value);
		this.setState({isEdit:false});
	}

	onBlur(){
		let {value} = this.state;
		this.changeTodoValue(value);
	}

	onEnter(ev){

		if(ev.keyCode === 13){
			this.changeTodoValue(ev.target.value);
		};

		if(ev.keyCode === 27){
			
			this.changeTodoValue(this.props.todo.value);
			this.setState({value:this.props.todo.value})
		};
		
	}

	inputChange(ev){
		let value = ev.target.value
		this.setState({value});	
	}

	render(){

		let {todo,onDestory,onToggle} = this.props;
		let {isEdit,value} = this.state;

		let liClassName = todo.completed ? 'completed' : '' ;

		if(isEdit){
			liClassName += 'editing';
		}

		return(
			<li className={liClassName} >
				<div className="view">
					<input 
						type="checkbox" 
						className="toggle"
						checked={todo.completed}
						onChange={ev=>{onToggle(todo)}}
					/>
					<label onDoubleClick={this.onEdit} >
						{todo.value}
					</label>
					<button className="destroy" onClick={()=>{onDestory(todo)}}></button>
				</div>
				<input 
					type="text" 
					className="edit" 
					value={value}
					onBlur={this.onBlur}
					onKeyDown={this.onEnter}
					onChange={this.inputChange}
					ref="edtingInput"
				/>
			</li>
		)
	}
}