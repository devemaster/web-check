import React from 'react';
import './Widget.css';
import axios from 'axios';
import Logo from '../logo.png';
import SpinnerImg from '../spinner.gif';
import { Player, ControlBar } from 'video-react';
import VolumeUpIcon from '../../assets/images/volume-up.png';
import RepeatIcon from '../../assets/images/repeat-icon.png';

class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apikey: null,
            isLoading: false,
            videoList: [],
            errorMsg: '',
            showVideoBox: false,
            position: 'bottom-right',
            volumeUp: true,
            bgColor : 'rgb(24, 39, 247)'
        };
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        });
    }
    getVideos(apiKey) {
        const formData = new FormData();
        formData.append('api_key', apiKey);
        axios.post('https://www.feedfleet.com/Home/videoListByApiKey', formData)
            .then((response) => {
                // console.log(response);
                if (response.status === 200) {
                    if (response.data.success === true) {
                        this.setState({
                            videoList: response.data.data,
                            isLoading: false
                        });
                    }
                    if (response.data.success === false) {
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
            showVideoBox: !this.state.showVideoBox
        });
    }
    load() {
        this.player.load();
    }
    setMuted() {
        return () => {
          this.player.muted = !this.state.volumeUp;
        };
    }
    render() {
        const { showVideoBox, position, bgColor } = this.state;
        return (
            <div className="widget-setting">
                {
                    position === 'top-right' &&
                    <div>
                        {
                            (!showVideoBox) &&
                            <div className="widget-setting-position-top-right widget-box-positions" onClick={() => this.showVideo()}>
                                <Player
                                    src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                    height={'100vh'}
                                    width={'100%'}
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    autoPlay
                                    muted="false"
                                ><ControlBar></ControlBar></Player>
                                <div className="overlay-content-video-widget">Try this now!</div>
                            </div>
                        }
                        {
                            (showVideoBox) &&
                            <div className="widget-setting-position-open-box-top-right video-box-widget">
                                <div className="widget-setting-position-open-box-content">
                                    <div className="widget-setting-position-open-box-heading">
                                        <div className="widget-setting-position-open-box-close-btn">
                                            <button className="btn" onClick={() => this.showVideo()}><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="widget-setting-position-open-box-btns">
                                            <button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><img src={VolumeUpIcon} style={{width: 20}} /></span></button>
                                            <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><img src={RepeatIcon} style={{width: 26}} /></span></button>
                                        </div>
                                    </div>
                                    <Player
                                        src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                        height={'100vh'}
                                        width={'100%'}
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    ><ControlBar></ControlBar></Player>
                                    <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                                        <a style={{backgroundColor: bgColor}} className=""><span aria-hidden="true">&times;</span> Email Us </a>
                                    </div>
                                    <div className="widget-setting-position-open-box-powered">
                                        <div>Powered by&nbsp;&nbsp;<img alt="Feedfleet Logo" height="18" title="Feedfleet" src={Logo}></img></div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
                {
                    position === 'bottom-right' &&
                    <div>
                        {
                            (!showVideoBox) &&
                            <div className="widget-setting-position-bottom-right widget-box-positions" onClick={() => this.showVideo()}>
                                <Player
                                    src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                    height={'100vh'}
                                    width={'100%'}
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    autoPlay
                                    muted="false"
                                ><ControlBar></ControlBar></Player>
                                <div className="overlay-content-video-widget">Try this now!</div>
                            </div>
                        }
                        {
                            (showVideoBox) &&
                            <div className="widget-setting-position-open-box-bottom-right video-box-widget">
                                <div className="widget-setting-position-open-box-content">
                                    <div className="widget-setting-position-open-box-heading">
                                        <div className="widget-setting-position-open-box-close-btn">
                                            <button className="btn" onClick={() => this.showVideo()}><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="widget-setting-position-open-box-btns">
                                            <button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><img src={VolumeUpIcon} style={{width: 20}} /></span></button>
                                            <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><img src={RepeatIcon} style={{width: 26}} /></span></button>
                                        </div>
                                    </div>
                                    <Player
                                        src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                        height={'100vh'}
                                        width={'100%'}
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    ><ControlBar></ControlBar></Player>
                                    <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                                        <a style={{backgroundColor: bgColor}} className=""><span aria-hidden="true">&times;</span> Email Us </a>
                                    </div>
                                    <div className="widget-setting-position-open-box-powered">
                                        <div>Powered by&nbsp;&nbsp;<img alt="Feedfleet Logo" height="18" title="Feedfleet" src={Logo}></img></div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
                
                {
                    position === 'top-left' &&
                    <div>
                        {
                            (!showVideoBox) &&
                            <div className="widget-setting-position-top-left widget-box-positions" onClick={() => this.showVideo()}>
                                {/* <div className="widget-setting-position-icon" onClick={() => this.showVideo()}>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-camera-reels-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8z"/>
                                        <circle cx="3" cy="3" r="3"/>
                                        <circle cx="9" cy="3" r="3"/>
                                    </svg>
                                </div> */}
                                <Player
                                    src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                    height={'100vh'}
                                    width={'100%'}
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    autoPlay
                                    muted="false"
                                ><ControlBar></ControlBar></Player>
                                <div className="overlay-content-video-widget">Try this now!</div>
                            </div>
                        }
                        {
                            (showVideoBox) &&
                            <div className="widget-setting-position-open-box-top-left video-box-widget">
                                <div className="widget-setting-position-open-box-content">
                                    <div className="widget-setting-position-open-box-heading">
                                        <div className="widget-setting-position-open-box-close-btn">
                                            <button className="btn" onClick={() => this.showVideo()}><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="widget-setting-position-open-box-btns">
                                            <button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><img src={VolumeUpIcon} style={{width: 20}} /></span></button>
                                            <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><img src={RepeatIcon} style={{width: 26}} /></span></button>
                                        </div>
                                    </div>
                                    <Player
                                        src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                        height={'100vh'}
                                        width={'100%'}
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    ><ControlBar></ControlBar></Player>
                                    <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                                        <a style={{backgroundColor: bgColor}} className=""><span aria-hidden="true">&times;</span> Email Us </a>
                                    </div>
                                    <div className="widget-setting-position-open-box-powered">
                                        <div>Powered by&nbsp;&nbsp;<img alt="Feedfleet Logo" height="18" title="Feedfleet" src={Logo}></img></div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
                
                {
                    position === 'bottom-left' &&
                    <div>
                        {
                            (!showVideoBox) &&
                            <div className="widget-setting-position-bottom-left widget-box-positions" onClick={() => this.showVideo()}>
                                <Player
                                    src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                    height={'100vh'}
                                    width={'100%'}
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    autoPlay
                                    muted="false"
                                ><ControlBar></ControlBar></Player>
                                <div className="overlay-content-video-widget">Try this now!</div>
                            </div>
                        }
                        {
                            (showVideoBox) &&
                            <div className="widget-setting-position-open-box-bottom-left video-box-widget">
                                <div className="widget-setting-position-open-box-content">
                                    <div className="widget-setting-position-open-box-heading">
                                        <div className="widget-setting-position-open-box-close-btn">
                                            <button className="btn" onClick={() => this.showVideo()}><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="widget-setting-position-open-box-btns">
                                            <button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><img src={VolumeUpIcon} style={{width: 20}} /></span></button>
                                            <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><img src={RepeatIcon} style={{width: 26}} /></span></button>
                                        </div>
                                    </div>
                                    <Player
                                        src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                        height={'100vh'}
                                        width={'100%'}
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    ><ControlBar></ControlBar></Player>
                                    <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                                        <a style={{backgroundColor: bgColor}} className=""><span aria-hidden="true">&times;</span> Email Us </a>
                                    </div>
                                    <div className="widget-setting-position-open-box-powered">
                                        <div>Powered by&nbsp;&nbsp;<img alt="Feedfleet Logo" height="18" title="Feedfleet" src={Logo}></img></div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }

                {
                    position === 'center-left' &&
                    <div>
                        {
                            (!showVideoBox) &&
                            <div className="widget-setting-position-center-left widget-box-positions" onClick={() => this.showVideo()}>
                                <Player
                                    src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                    height={'100vh'}
                                    width={'100%'}
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    autoPlay
                                    muted="false"
                                ><ControlBar></ControlBar></Player>
                                <div className="overlay-content-video-widget">Try this now!</div>
                            </div>
                        }
                        {
                            (showVideoBox) &&
                            <div className="widget-setting-position-open-box-center-left  video-box-widget">
                                <div className="widget-setting-position-open-box-content">
                                    <div className="widget-setting-position-open-box-heading">
                                        <div className="widget-setting-position-open-box-close-btn">
                                            <button className="btn" onClick={() => this.showVideo()}><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="widget-setting-position-open-box-btns">
                                            <button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><img src={VolumeUpIcon} style={{width: 20}} /></span></button>
                                            <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><img src={RepeatIcon} style={{width: 26}} /></span></button>
                                        </div>
                                    </div>
                                    <Player
                                        src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                        height={'100vh'}
                                        width={'100%'}
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    ><ControlBar></ControlBar></Player>
                                    <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                                        <a style={{backgroundColor: bgColor}} className=""><span aria-hidden="true">&times;</span> Email Us </a>
                                    </div>
                                    <div className="widget-setting-position-open-box-powered">
                                        <div>Powered by&nbsp;&nbsp;<img alt="Feedfleet Logo" height="18" title="Feedfleet" src={Logo}></img></div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
                {
                    position === 'center-right' &&
                    <div>
                        {
                            (!showVideoBox) &&
                            <div className="widget-setting-position-center-right widget-box-positions" onClick={() => this.showVideo()}>
                                <Player
                                    src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                    height={'100vh'}
                                    width={'100%'}
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    autoPlay
                                    muted="false"
                                ><ControlBar></ControlBar></Player>
                                <div className="overlay-content-video-widget">Try this now!</div>
                            </div>
                        }
                        {
                            (showVideoBox) &&
                            <div className="widget-setting-position-open-box-center-right video-box-widget">
                                <div className="widget-setting-position-open-box-content">
                                    <div className="widget-setting-position-open-box-heading">
                                        <div className="widget-setting-position-open-box-close-btn">
                                            <button className="btn" onClick={() => this.showVideo()}><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="widget-setting-position-open-box-btns">
                                            <button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><img src={VolumeUpIcon} style={{width: 20}} /></span></button>
                                            <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><img src={RepeatIcon} style={{width: 26}} /></span></button>
                                        </div>
                                    </div>
                                    <Player
                                        src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                        height={'100vh'}
                                        width={'100%'}
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    ><ControlBar></ControlBar></Player>
                                    <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                                        <a style={{backgroundColor: bgColor}} className=""><span aria-hidden="true">&times;</span> Email Us </a>
                                    </div>
                                    <div className="widget-setting-position-open-box-powered">
                                        <div>Powered by&nbsp;&nbsp;<img alt="Feedfleet Logo" height="18" title="Feedfleet" src={Logo}></img></div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
                {
                    position === 'center-top' &&
                    <div>
                        {
                            (!showVideoBox) &&
                            <div className="widget-setting-position-center-top widget-box-positions" onClick={() => this.showVideo()}>
                                <Player
                                    src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                    height={'100vh'}
                                    width={'100%'}
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    autoPlay
                                    muted="false"
                                ><ControlBar></ControlBar></Player>
                                <div className="overlay-content-video-widget">Try this now!</div>
                            </div>
                        }
                        {
                            (showVideoBox) &&
                            <div className="widget-setting-position-open-box-center-top video-box-widget">
                                <div className="widget-setting-position-open-box-content">
                                    <div className="widget-setting-position-open-box-heading">
                                        <div className="widget-setting-position-open-box-close-btn">
                                            <button className="btn" onClick={() => this.showVideo()}><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="widget-setting-position-open-box-btns">
                                            <button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><img src={VolumeUpIcon} style={{width: 20}} /></span></button>
                                            <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><img src={RepeatIcon} style={{width: 26}} /></span></button>
                                        </div>
                                    </div>
                                    <Player
                                        src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                        height={'100vh'}
                                        width={'100%'}
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    ><ControlBar></ControlBar></Player>
                                    <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                                        <a style={{backgroundColor: bgColor}} className=""><span aria-hidden="true">&times;</span> Email Us </a>
                                    </div>
                                    <div className="widget-setting-position-open-box-powered">
                                        <div>Powered by&nbsp;&nbsp;<img alt="Feedfleet Logo" height="18" title="Feedfleet" src={Logo}></img></div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
                {
                    position === 'center-bottom' &&
                    <div>
                        {
                            (!showVideoBox) &&
                            <div className="widget-setting-position-center-bottom widget-box-positions" onClick={() => this.showVideo()}>
                                <Player
                                    src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                    height={'100vh'}
                                    width={'100%'}
                                    ref={player => {
                                        this.player = player;
                                    }}
                                    autoPlay
                                    muted="false"
                                ><ControlBar></ControlBar></Player>
                                <div className="overlay-content-video-widget">Try this now!</div>
                            </div>
                        }
                        {
                            (showVideoBox) &&
                            <div className="widget-setting-position-open-box-center-bottom video-box-widget">
                                
                                <div className="widget-setting-position-open-box-content">
                                    <div className="widget-setting-position-open-box-heading">
                                        <div className="widget-setting-position-open-box-close-btn">
                                            <button className="btn" onClick={() => this.showVideo()}><span aria-hidden="true">&times;</span></button>
                                        </div>
                                        <div className="widget-setting-position-open-box-btns">
                                            <button style={{marginRight: 8}} className="btn" onClick={() => this.setMuted()}><span className="volume-up-icon"><img src={VolumeUpIcon} style={{width: 20}} /></span></button>
                                            <button className="btn" onClick={() => this.load()}><span className="repeat-icon"><img src={RepeatIcon} style={{width: 26}} /></span></button>
                                        </div>
                                    </div>
                                    <Player
                                        src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                                        height={'100vh'}
                                        width={'100%'}
                                        ref={player => {
                                            this.player = player;
                                        }}
                                        autoPlay
                                    ><ControlBar></ControlBar></Player>
                                    <div className="widget-setting-position-open-box-bottom-btn mb-5 pb-2">
                                        <a style={{backgroundColor: bgColor}} className=""><span aria-hidden="true">&times;</span> Email Us </a>
                                    </div>
                                    <div className="widget-setting-position-open-box-powered">
                                        <div>Powered by&nbsp;&nbsp;<img alt="Feedfleet Logo" height="18" title="Feedfleet" src={Logo}></img></div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }
            </div>
        )
    }

    setMessage(apikey){
        // this.setState({apikey: apikey});
    }
    setPosition(pos) {
        this.setState({position: pos});
    }
    setApiKey(key) {
        this.setState({apikey: key});
    }
};

export default Widget;