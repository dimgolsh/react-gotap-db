import React, { Component } from "react";
import "./itemDetails.css";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const Field = ({ char, field, label }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{char[field]}</span>
    </li>
  );
};

export { Field };

export default class ItemDetails extends Component {

  state = {
    char: null,
    loading: true,
    error: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }
  
  updateItem() {
    const { itemId } = this.props;
    const { getData } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId)
      .then((char) => {
        console.log(char);
        this.setState({ char, loading: false });
      })
      .catch(() => this.setState({ error: true }));
  }
  render() {

    if (!this.state.char) {
      return <span>Erororor</span>;
    }
    if (this.state.error) {
      return <ErrorMessage />;
    }
    if (this.state.loading) {
      return <Spinner />;
    }
    const { char } = this.state;
    const { name } = char;
    return (
      <div className="char-details rounded">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { char });
          })}
        </ul>
      </div>
    );
  }
}
