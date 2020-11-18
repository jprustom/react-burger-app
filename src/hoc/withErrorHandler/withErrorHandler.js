import React,{Component} from 'react';
import Modal from "../../components/UI/Modal/Modal.js";

const withErrorHandler=(WrappedComponent,axios)=>
    class extends Component{
        state={
            error:null
        }
        closeModal(){
            this.setState({
                error:null
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor)
        }
        componentWillMount(){
            this.resInterceptor=axios.interceptors.response.use(null,error=>{
                console.log("error inside withErrorHandler")
                this.setState({
                    error
                })
            });
            this.reqInterceptor=axios.interceptors.request.use(req=>{
                this.setState({
                    error:null
                });
                return req
            },error=>{
                console.log('error while requesting:',error)
            })
        }
        render(){
            return (
                <React.Fragment>
                    <Modal modalClosed={this.closeModal.bind(this)} showModal={this.state.error}>
                        {
                            this.state.error
                                &&this.state.error.message
                        }
                    </Modal>   
                <WrappedComponent {...this.props}/>
                </React.Fragment>
                )
        }
    }

    export default withErrorHandler;