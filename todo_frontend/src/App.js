import React, { Component } from "react"
import Modal from "./components/createModal"; 
import axios from "axios";
import './App.css'

class App extends Component {
    state = {
      viewUser: "John",
      activeItem: {
        title: "",
        description: "",
        author: "",
        assigned_to: "",
        completed: false
      },
      todoList: []
    };

    async componentDidMount() {
      try {
        const res = await fetch('http://158.160.49.18/api/tasks/');
        const todoList = await res.json();
        this.setState({
          todoList
        });
      } catch (e) {
        console.log(e);
    }
    }

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
  
    //Responsible for saving the task
    handleSubmit = item => {
      this.toggle();
      if (item.id) {
        axios
          .put(`http://158.160.49.18/api/tasks/${item.id}/`, item)
        return;  
      }
      axios
        .post("http://158.160.49.18/api/tasks/", item).then((response) => this.setState({todoList: [response.data, ...this.state.todoList]}));
    };

    createItem = () => {
      const item = {
        title: "",
        description: "",
        author: "",
        assigned_to: "",
        completed: false
      };
      this.setState({ activeItem: item, modal: !this.state.modal });
    };


    displayUser = name => {
      console.log("message", this.state.viewUser)
      return this.setState({ viewUser: name});
    };

    renderTabList = () => {
      return (
        <div className="my-5 tab-list">
          <button 
            onClick={() => this.displayUser("John")}
            className="tab-button"
          >
            John
          </button>
          <button 
            onClick={() => this.displayUser("Luke")}
            className="tab-button"
          >
            Luke
          </button>
          <button 
            onClick={() => this.displayUser("Matthew")}
            className="tab-button"
          >
            Matthew
          </button>
          <button 
            onClick={() => this.displayUser("Mark")}
            className="tab-button"
          >
            Mark
          </button>
        </div>  
      );
    };

    renderItems = () => {
      const { viewUser } = this.state;
      const newItems = this.state.todoList.filter(
        item => item.assigned_to === viewUser
      );
      return newItems.map(item => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center">
          <div
            className={`todo-title grid-container ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.description}

            >
              <div className="title">{item.title}</div>

              <div className="author">Author: {item.author}</div>

              <div className="created">Created: {new Date(item.pub_date).toLocaleString(`de-DE`, { timeZone: `Europe/Berlin` })}</div>

              <div className="assigned">Assigned to: {item.assigned_to}</div>

              <div className="description" >Description: {item.description} </div>

              <div className="completed" >Completed: {item.completed.toString()} </div>
              
              <div className="due_date" >Due date: {new Date(item.due_date).toLocaleString(`de-DE`, { timeZone: `Europe/Berlin` })} </div>

          </div>
        </li>
      ));
    };

    render() {
      console.log(this.state.todoList)
      return (
        <main className="content" style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80")`,
          backgroundAttachment: "fixed",
          backgroundSize: 'cover',
          opacity: 0.9,
          // height: '100vh'
          }}>
          <div className="titleApp">
            <h1 className="text-white text-uppercase text-center my-4" style={{
              textShadow: '2px 2px 4px black', fontSize: '100px', fontWeight: 'bold'
            }}>Todo App</h1>
          </div>
          <br />
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="" style={{ textAlign: 'center' }}>
                  <button onClick={this.createItem} className="btn"
                  style={{
                    height: "50px",
                    width: "240px",
                    border: "none",
                    boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
                    ":active": { backgroundColor: "red"},
                    borderRadius: "8px",
                    }}
                    >
                      New Task</button>
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ): null}
        </main>
      )
    }
  }
  
export default App;

