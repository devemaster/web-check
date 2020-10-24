import React from 'react'
import './Widget.css';
import axios from 'axios';
import { Player, ControlBar } from 'video-react';
import "video-react/dist/video-react.css";


class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        apikey: null,
        isLoading: false,
        videoList: undefined,
        errorMsg: '',
        showVideoBox: false,
        position: 'bottom-right',
        volumeUp: true,
        bgColor : 'rgb(24, 39, 247)',
        videoBoxPosition:'widget-setting-position-open-box-bottom-right',
        videoBoxdrawer:'widget-setting-position-bottom-right',
        txtColor:'white',
        wStyle:'widget-box-positions'
    };
}
componentDidMount() {
    if(this.props.apiKey){
        this.getVideos();
        this.setState({
            isLoading:true
        })
    }else{
        this.setState({
            errorMsg: 'Unauthorized access!',
            isLoading: false
          }); 
    }
}
getVideos(apiKey) {
    const formData = new FormData();
    formData.append('api_key', this.props.apiKey);
    axios.post('https://www.feedfleet.com/Widget/getWidgetCode', formData)
        .then((response) => {
            // console.log(response);
            if (response.status === 200) {
                if (response.data.msg === "Success") {
                    this.setState({
                        videoList: response.data.data,
                        isLoading: false
                    },()=>{
                        //Dynamicaly set overlay text color code
                        // hexa color to rgba
                        let c;
                        let bg = [0,0,0,0]
                        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.state.videoList.border_color)){
                            c= this.state.videoList.border_color.substring(1).split('');
                            if(c.length== 3){
                                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                            }
                            c= '0x'+c.join('');
                            bg = [(c>>16)&255, (c>>8)&255, c&255,1];
                        }

                        //get text color according to bacground color
                        let color = Math.round((((bg[0]) * 299) + 
                            (parseInt(bg[1]) * 587) + 
                            (parseInt(bg[2]) * 114)) / 1000); 
                        let textColor = (color > 125) ? 'black' : 'white';
                        

                        //set video widget style class
                        this.state.videoList.widget_style === "circle" &&
                        this.setState({wStyle:'widget-box-positions'});
                        this.state.videoList.widget_style === "sqaure" &&
                        this.setState({wStyle:'widget-box-positions-square'});
                        this.state.videoList.widget_style === "oval" &&
                        this.setState({wStyle:'widget-box-positions-label',txtColor:textColor});
                        
                        //set video widget position class
                        this.state.videoList.widget_position === 'top_right'&&
                        this.setState({ videoBoxPosition:'widget-setting-position-open-box-top-right',
                                        videoBoxdrawer:'widget-setting-position-top-right'});
                        this.state.videoList.widget_position === 'top_left'&&
                        this.setState({ videoBoxPosition:'widget-setting-position-open-box-top-left',
                                        videoBoxdrawer:'widget-setting-position-top-left'});
                        this.state.videoList.widget_position === 'bottom_left'&&
                        this.setState({ videoBoxPosition:'widget-setting-position-open-box-bottom-left',
                                        videoBoxdrawer:'widget-setting-position-bottom-left'});
                        this.state.videoList.widget_position === 'bottom_right'&&
                        this.setState({ videoBoxPosition:'widget-setting-position-open-box-bottom-right',
                                        videoBoxdrawer:'widget-setting-position-bottom-right'});
                        
                    });
                    
                }else {
                    this.setState({
                        errorMsg: response.data.data,
                        isLoading: false
                    });
                }
            } else {
                this.setState({
                    isLoading: false
                });
            }

        })
        .catch((error) => {
            // console.log(error);
            this.setState({
                isLoading: false
            });
        });
}
showVideo() {
    this.setState({
        showVideoBox: !this.state.showVideoBox,
        volumeUp:false
    });
}
hideVideo(){
    this.setState({
        showVideoBox: !this.state.showVideoBox,
        volumeUp:true
    });
}
load() {
    this.player.load();
}
setMuted() {    
        this.setState({
            volumeUp:!this.state.volumeUp
        })
    
}
render() {
    const { showVideoBox } = this.state;
    return (
        
            
            <div className="widget-setting">
            {
                this.state.videoList &&
                <div>
                {
                    //video widget toggle
                    (!showVideoBox) &&
                    <div style={{borderColor: `${this.state.videoList && this.state.videoList.border_color}`,backgroundColor: `${this.state.videoList && this.state.videoList.border_color}`}} className={`widget-toggle ${this.state.wStyle} ${this.state.videoBoxdrawer}` } onClick={() => this.showVideo()}>
                        <Player
                            
                            src={this.state.videoList && this.state.videoList.video_url}
                            height={'100vh'}
                            width={'100%'}
                            ref={player => {
                                this.player = player;
                            }}
                            autoPlay
                            loop={true}
                            muted={this.state.volumeUp}
                        ><ControlBar></ControlBar></Player>
                        <div className="overlay-content-video-widget" style={{color:`${this.state.txtColor}`}}>{this.state.videoList && this.state.videoList.widget_label}</div>
                    </div>
                }
                {
                    // vidoe widget
                    (showVideoBox) &&
                    <div className={`video-box-widget ${this.state.videoBoxPosition}` }>
                        <div className="widget-setting-position-open-box-content">
                            <div className="widget-setting-position-open-box-heading">
                                <div className="widget-setting-position-open-box-close-btn">
                                    <button className="btn" onClick={() => this.hideVideo()}><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div className="widget-setting-position-open-box-btns btn-group">
                                {
                                    this.state.volumeUp?<button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><i className="fa fa-volume-down"></i></span></button>
                                    :<button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><i className="fa fa-volume-up"></i></span></button>
                                    
                                }
                                     <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><i className="fa fa-undo"></i></span></button>
                                </div>
                            </div>
                            <div className="overlay-text">
                                <h3>{this.state.videoList && this.state.videoList.video_overlay_text}</h3>
                            </div>
                            <Player
                                src={this.state.videoList && this.state.videoList.video_url}
                                height={'100vh'}
                                width={'100%'}
                                ref={player => {
                                    this.player = player;
                                }}
                                autoPlay
                                loop={true}
                                muted={this.state.volumeUp}
                            ><ControlBar></ControlBar></Player>
                            <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                            {
                                this.state.videoList && this.state.videoList.button_type === 'Email' &&
                                <a href={`mailto:${this.state.videoList && this.state.videoList.Email.email}`} style={{backgroundColor: `${this.state.videoList && this.state.videoList.button_backgound_color}`}} className=""><span aria-hidden="true"><i className="fa fa-envelope"></i>&nbsp;&nbsp;</span>{this.state.videoList && this.state.videoList.button_label} </a>
                            }
                            {
                                this.state.videoList && this.state.videoList.button_type === 'Call_Me' &&
                                <a href={`tel:${this.state.videoList && this.state.videoList.Call_Me.phone}`} style={{backgroundColor: `${this.state.videoList && this.state.videoList.button_backgound_color}`}} className=""><span aria-hidden="true"><i className="fa fa-phone"></i>&nbsp;&nbsp;</span>{this.state.videoList && this.state.videoList.button_label} </a>
                            }
                            {
                                this.state.videoList && this.state.videoList.button_type === 'Calendly' &&
                                <a target="_blank" href={`${this.state.videoList && this.state.videoList.Calendly.calendly_link}`} style={{backgroundColor: `${this.state.videoList && this.state.videoList.button_backgound_color}`}} className=""><span aria-hidden="true"><i className="fa fa-calendar"></i>&nbsp;&nbsp;</span>{this.state.videoList && this.state.videoList.button_label} </a>
                            }                            
                            {
                                this.state.videoList && this.state.videoList.button_type === 'Link' &&
                                <a target="_blank" href={`${this.state.videoList && this.state.videoList.Link.website_link}`} style={{backgroundColor: `${this.state.videoList && this.state.videoList.button_backgound_color}`}} className=""><span aria-hidden="true"><i className="fa fa-external-link"></i>&nbsp;&nbsp;</span>{this.state.videoList && this.state.videoList.button_label} </a>
                            }
                            {
                                this.state.videoList && this.state.videoList.button_type === 'Follow_me' &&
                                <div className="btn-group">
                                    <a  target="_blank" 
                                        href={`${this.state.videoList && this.state.videoList.facebook_link}`} 
                                        style={{backgroundColor: '#1d4a94'}} 
                                        className="">
                                        <span aria-hidden="true">
                                        <i className="fa fa-facebook"></i></span>
                                    </a>
                                    <a  target="_blank" 
                                        href={`${this.state.videoList && this.state.videoList.insta_link}`} 
                                        style={{backgroundColor: '#609'}} 
                                        className="">
                                        <span aria-hidden="true">
                                        <i className="fa fa-instagram"></i></span>
                                    </a>
                                    <a  target="_blank" 
                                        href={`${this.state.videoList && this.state.videoList.twitter_link}`} 
                                        style={{backgroundColor: '#29a5d9'}} 
                                        className="">
                                        <span aria-hidden="true">
                                        <i className="fa fa-twitter"></i></span>
                                    </a>
                                    <a  target="_blank" 
                                        href={`${this.state.videoList && this.state.videoList.youtube_link}`} 
                                        style={{backgroundColor: '#f70000'}} 
                                        className="">
                                        <span aria-hidden="true">
                                        <i className="fa fa-youtube"></i></span>
                                    </a>
                                </div>
                            }
                            </div>
                            {
                                (this.state.videoList.plan_type === 'Basic' ||  this.state.videoList.plan_type === 'PRO') &&
                            <div className="widget-setting-position-open-box-powered">
                                <div><a href="https://www.feedfleet.com" target="_blank" style={{ color: '#000' }}> <span style={{ fontSize: '10px' }}>Poweredby <span><img src="https://www.feedfleet.com/assests/frotnend/assets/img/logo/logo.png" alt="logo" style={{ width: 75 }} /></span></span></a></div>
                            </div>
                            }
                        </div>
                    </div>
                }

                </div>
       
            }
             </div>
        
        
    )
}
};

export default Widget;