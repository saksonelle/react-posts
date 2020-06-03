import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost, showAlert } from '../redux/actions';
import { Alert } from './Alert';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  submitHandler = (e) => {
    e.preventDefault();

    // console.log(this.state.title);

    const { title } = this.state;

    if (!title.trim()) {
      return this.props.showAlert('Название поста не пожет быть пустым');
    }

    const newPost = {
      title,
      id: Date.now().toString(),
    };

    this.props.createPost(newPost);

    this.setState({ title: '' });
  };

  changeInputHandler = (e) => {
    e.persist();

    this.setState((prev) => ({
      ...prev,
      ...{
        [e.target.name]: e.target.value,
      },
    }));
  };

  render() {
    return (
      <form onSubmit={this.submitHandler} className="mb-2">
        {this.props.textAlert && <Alert text={this.props.textAlert} />}

        <div className="forn-group mb-2">
          <label htmlFor="title">Заголовок поста</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={this.state.title}
            onChange={this.changeInputHandler}
            name="title"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Создать
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createPost,
  showAlert,
};

const mapStateToProps = (state) => {
  return {
    textAlert: state.app.alert,
  };
};

// export default connect(null, { createPost })(PostForm);
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
