import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditBlackLivePage extends Component {
    state = {
        invalidForm: false,
        formData: this.props.location.state.blacklive,
        // image:this.props.location.state.blacklive.image,
    }

    formRef = React.createRef();
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.formData)
        const formData = new FormData();
        formData.append('name',this.state.formData.name);
        formData.append('date',this.state.formData.date);
        formData.append('occupation',this.state.formData.occupation);
        formData.append('msg',this.state.formData.msg);
        formData.append('image',this.state.formData.image);
        formData.append('_id',this.state.formData._id);
        //console.log(formData)
        this.props.handleEditLive(formData)
        //this.props.handleEditLive(this.state.formData);
      };
    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]: e.target.value};
        this.setState({
        formData,
        invalidForm: !this.formRef.current.checkValidity()
        });
    };

    handleFileChange = e=>{
        const file = e.target.files[0];
        var f={...this.state.formData};
        f.image = file;
        this.setState({formData:f});
    }

    render() {
        return  (
        <>
           <div className="AddBLackLivePage">
                    <form className="col s12" ref={this.formRef} onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <div className="row">
                            <div className="input-field col s12">
                            <input name="name" id="name" type="text" className="active" value={this.state.formData.name} onChange={this.handleChange} required />
                            <label htmlFor="name">Name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input name="date" id="date" type="text" className="active" value={this.state.formData.date} onChange={this.handleChange} required/>
                            <label htmlFor="date">Date</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input name="occupation" id="occupation" type="text" className="active" value={this.state.formData.occupation} onChange={this.handleChange}/>
                            <label htmlFor="occupation">occupation</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                            <input name="image" id="image" type="file" className="active" accept='image/*' onChange={this.handleFileChange}/>
                            <label htmlFor="image"></label>
                            </div>
                        </div>


                        <div className="row">
                            <div className="input-field col s12">
                            <input name="msg" id="msg" type="text" className="active" value={this.state.formData.msg} onChange={this.handleChange}/>
                            <label htmlFor="msg">How You Matter This Week</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn green"
                            disabled={this.state.invalidForm}
                        ><i class="material-icons left">edit</i>
                            Update BlackLive
                        </button>
                        <Link
                            className="btn blue"
                            to={{
                                pathname: '/blacklives'
                            }}
                        ><i class="material-icons left">undo</i>
                        Cancel
                        </Link>
                    </form>
                </div>
                </>
        )
    }
}
export default EditBlackLivePage;
