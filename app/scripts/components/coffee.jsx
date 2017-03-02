var React = require('react');

var models = require('../models/coffee');

class CoffeeListContainer extends React.Component{
  constructor(props){
    super(props);

    // get coffee and set the state
    var collection = new models.CoffeeCollection();
    collection.fetch().then(() => {
      this.setState({collection});
    });

    this.addCoffee = this.addCoffee.bind(this);
    this.editCoffee = this.editCoffee.bind(this);
    this.saveEdit = this.saveEdit.bind(this);

    this.state = {
      collection,
      editing: false
    };
  }
  addCoffee(data){
    this.state.collection.create(data, {success: () => {
      this.setState({collection: this.state.collection});
    }});
  }
  editCoffee(coffee){
    this.setState({editing: coffee});
  }
  saveEdit(model, data){
    model.set(data);
    model.save().then(()=>{
      console.log('set the state!');
      this.setState({editing: false, collection: this.state.collection});
    });
  }
  render(){
    return (
      <div>
        <h1>Today's Coffee Imports</h1>
        <CoffeeForm
          addCoffee={this.addCoffee}
          edit={this.state.editing}
          saveEdit={this.saveEdit}
        />
        <CoffeeImportList
          collection={this.state.collection}
          editCoffee={this.editCoffee}
        />
      </div>
    );
  }
}

class CoffeeImportList extends React.Component{
  render(){
    var coffeeList = this.props.collection.map((coffee)=>{
      return (
        <li key={coffee.get('objectId')} className="list-group-item">
          {coffee.get('name')}
          <button onClick={()=>{this.props.editCoffee(coffee)}} className="btn btn-warning">Edit</button>
        </li>
      );
    });

    return (
      <ul className="list-group">
        {coffeeList}
      </ul>
    );
  }
}

class CoffeeForm extends React.Component{
  constructor(props){
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);

    this.state ={
      name: '',
      origin: ''
    }
  }
  handleSubmit(e){
    e.preventDefault();
    if(!this.props.edit){
      this.props.addCoffee(this.state);
    }else{
      this.props.saveEdit(this.props.edit, this.state);
    }
  }
  handleNameChange(e){
    this.setState({name: e.target.value});
  }
  handleOriginChange(e){
    this.setState({origin: e.target.value});
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.edit){
      this.setState({
        name: nextProps.edit.get('name'),
        origin: nextProps.edit.get('origin')
      });

    }else{
      this.setState({name: '', origin: ''});

    }
  }
  render(){
    return (
      <form className="form-inline well" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input onChange={this.handleNameChange} value={this.state.name} type="text" className="form-control" name="name" placeholder="Coffee Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="origin">Origin</label>
          <input onChange={this.handleOriginChange} value={this.state.origin} type="text" className="form-control" name="origin" id="origin" placeholder="Where is it from?"/>
        </div>
        <button type="submit" className="btn btn-default">{this.props.edit ? 'Save' : 'Add'}</button>
      </form>
    )
  }
}

module.exports = {
  CoffeeListContainer
};
