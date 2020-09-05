import React, { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import * as blackliveAPI from '../../services/blacklives-api'
import * as commentApi from '../../services/comments-api'
import * as likeApi from '../../services/likes-api'
import AddBlackLivePage from '../AddBlackLivePage/AddBlackLivePage';
import EditBlackLivePage from '../EditBlackLivePage/EditBlackLivePage';

import BlackLivePage from '../BlackLivePage/BlackLivePage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import userService from '../../services/userService';

class App extends Component {
  state = {
    blacklives: [],
    comments:[],
    likes:[],
    user: userService.getUser()
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }


  handleAddBlackLive = async newBlackLiveData => {
    const newBlackLive = await blackliveAPI.createwithImg(newBlackLiveData);
    console.log(newBlackLive)
    this.setState(state => ({
      blacklives: [...state.blacklives, newBlackLive]
    }), ()=> this.props.history.push('/blacklives'));
    //console.log("blacklives............")
    //console.log(this.state.blacklives)
  }

   handleAddComment = async newCommentData => {
    const newComment = await commentApi.create(newCommentData);
    this.setState(state => ({
      comments: [...state.comments, newComment]
    }), ()=> this.props.history.push('/blacklives'));
  }

  handleAddLike = async newLikeData => {
    const newLike = await likeApi.create(newLikeData);
    this.setState(state => ({
      likes: [...state.likes, newLike]
    }), ()=> this.props.history.push('/blacklives'));
  }

  handleDeleteLike = async id => {
    if(userService.getUser()){
    await likeApi.deleteOne(id);
    this.setState(state => ({
      likes: state.likes.filter(like => like.blackliveid !== id)
    }), () => this.props.history.push('/blacklives'));
  }
  else {
    this.props.history.push('/login')
  }
}

    handleDeleteComment = async id => {
    if(userService.getUser()){
    await commentApi.deleteOne(id);
    this.setState(state => ({
      comments: state.comments.filter(comment => comment._id !== id)
    }), () => this.props.history.push('/blacklives'));
  }
  else {
    this.props.history.push('/login')
  }
}

  handleDeleteLive = async id => {
    if(userService.getUser()){
    await blackliveAPI.deleteOne(id);
    this.setState(state => ({
      blacklives: state.blacklives.filter(black => black._id !== id)
    }), () => this.props.history.push('/blacklives'));
  }
  else {
    this.props.history.push('/login')
  }
}

 handleEditLive = async BlackLiveData => {
    if(userService.getUser()){
        const updatedBlackLive = await blackliveAPI.edit(BlackLiveData);
        const newBlackLivesArray = this.state.blacklives.map(b =>
    b._id === updatedBlackLive._id ? updatedBlackLive : b)
 this.setState(
      {blacklives: newBlackLivesArray},
      () => this.props.history.push('/blacklives')
    )
  }
  else {
    this.props.history.push('/login')
  }
}
  

  async componentDidMount() {
    const blacklives = await blackliveAPI.getAll();
    const comments = await commentApi.getAll();
    const likes=await likeApi.getAll();
    this.setState({blacklives,comments,likes})
  }

  render() {
    return (
      <>
      <NavBar
        user={this.state.user}
        handleLogout={this.handleLogout}
        pageName={"Your Life Matter This Week!"}
        />
      <Route exact path='/blacklives' render={() =>
        <BlackLivePage
        blacklives={this.state.blacklives}
        comments={this.state.comments}
        likes={this.state.likes}
        handleAddComment={this.handleAddComment}
        handleDeleteComment={this.handleDeleteComment}
        handleDeleteLive={this.handleDeleteLive}
        handleEditLive={this.handleEditLive}
        handleAddLike={this.handleAddLike}
        handleDeleteLike={this.handleDeleteLike}
        user={this.state.user}
        />
      }>
      </Route>

      <Route exact path='/blacklives/add' render={() =>
      userService.getUser() ?
        <AddBlackLivePage
        handleAddBlackLive={this.handleAddBlackLive}
        user={this.state.user}
        />
        :
        <Redirect to='/login' />
      }>
      </Route>

       <Route exact path='/edit' render={({location}) =>
         userService.getUser() ?
          <EditBlackLivePage
          handleEditLive={this.handleEditLive}
          location={location}
          user={this.state.user}
          />
          :
          <Redirect to='/login' />
        } />

      <Route exact path='/signup' render={({ history }) => 
        <SignupPage
          history={history}
          handleSignupOrLogin={this.handleSignupOrLogin}
        />
      }/>
      <Route exact path='/login' render={({ history }) => 
        <LoginPage
          history={history}
          handleSignupOrLogin={this.handleSignupOrLogin}
        />
      }/>
      </>
    );
  }
  }

  export default App;
