import React from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';
import './Widget.css';
import Slider from 'react-slick';
import axios from 'axios';
import { Player, Shortcut } from 'video-react';
import StarRatingComponent from 'react-star-rating-component';
import "video-react/dist/video-react.css";

const widgetName = Config.name;

class Widget extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          isLoading: false,
          nav1: null,
          nav2: null,
          videoList: [],
          widgetSetting: '2',
          errorMsg: '',
          rating: 0,
          videoPlay:{}
        }
      }
      componentDidMount() {
        this.setState({
          nav1: this.slider1,
          nav2: this.slider2,
          isLoading: true
        });
        if(this.props.apiKey){
            this.getVideos();
        }else{
            this.setState({
                errorMsg: 'Unauthorized access!',
                isLoading: false
              }); 
        }
      }
      getVideos(){
        const formData = new FormData();
        formData.append('api_key', this.props.apiKey);
        axios.post('https://www.feedfleet.com/Home/videoListByApiKey', formData)
        .then( (response) => {
          if (response.status === 200) {
            if (response.data.success === true) {
              this.setState({
                videoList: response.data.data,
                videoPlay:response.data.data[0],
                widgetSetting: response.data.widget_setting,
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
        .catch( (error) => {
          this.setState({
            isLoading: false
          });
        });
      }
      
      play() {
        this.player.play();
      }
    
      pause() {
        this.player.pause();
      }

      getVideoLink(e){
        console.log(e)
        this.setState({
          videoPlay:e
        })
      }

      render() {
        const settings = {
          arrows: true,
          infinite: false,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 512,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
    
          ]
        };
        const settingsAgain = {
          arrows: true,
          infinite: false,
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
          focusOnSelect: true,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 512,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
    
          ]
        };
        const { videoList, widgetSetting } = this.state;
        return (
          <div className="App">
            
            {
              this.state.errorMsg !== '' &&
              <div className="error-msg">{this.state.errorMsg}</div>
            }
            
            {
              widgetSetting === '2' &&
              <div className="container-fluid mt-4">
                <div className="row no-gutters">
                  <div className="col-xs-12 col-md-12 col-lg-12" >
                    <div>
                      <div  className="double-slider">
                        <div className="thumbnail card">
                          <div className="img-event" >
                              {/* <video style={{width: '100%'}} controls>
                                <source  src={op.video_url} type="video/mp4" />
                              </video> */}
                              <Player
                                fluid={false}
                                playsInline
                                src={this.state.videoPlay.video_url}
                                height={400}
                                width={'100%'}
                                ref={player => {
                                  this.player = player;
                                }}
                              />
                          </div>
                        </div>
                      </div>
    
                      <Slider
                        asNavFor={this.state.nav1}
                        ref={slider => (this.slider2 = slider)}
                        {...settingsAgain}
                      >
                        {
                          videoList && videoList.map((op, i) =>
                          <div className="slider-main-box" key={i}>
                            <div className="thumbnail card"                              
                            onClick={()=>this.getVideoLink(op)}>
                              <div className="img-event" style={{pointerEvents: 'none'}} >
                                  {/* <video style={{width: '100%', height: '100%', minHeight: '250px', maxHeight: '350px'}} controls>
                                    <source  src={op.video_url} type="video/mp4" />
                                  </video> */}
                                    <Player
                                      fluid={false}
                                      playsInline
                                      src={op.video_url}
                                      height={320}
                                      width={'100%'}
                                      ref={player => {
                                        this.player = player;
                                      }}
    
                                    />
                              </div>
                              <div className="card-body">
                                <p className="card-title">{op.customer_name}</p>
                                <StarRatingComponent 
                                  name="rating" 
                                  starCount={5}
                                  editing={false}
                                  value={Number(op.rating)}
                                />
                                {/* <p className="card-caption"> Campians designation</p> */}
                              </div>
                            </div>
                          </div>
                          )
                        }
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            }
            {
              widgetSetting === '3' &&
              <div className="container-fluid mt-4">
                <div className="row no-gutters">
                  <div className="col-xs-12 col-md-12 col-lg-12" >
                    <div className="mt-5">
                      <Slider {...settings}>
                        {
                            videoList && videoList.map((op, i) =>
                          <div className="slider-main-box" key={i}>
                            <div className="thumbnail card">
                              <div className="img-event">
                                  {/* <video style={{width: '100%', height: '100%', minHeight: '250px', maxHeight: '350px'}} controls>
                                    <source  src={op.video_url} type="video/mp4" />
                                  </video> */}
                                  <Player
                                      fluid={false}
                                      playsInline
                                      src={op.video_url}
                                      height={320}
                                      width={'100%'}
                                      ref={player => {
                                        this.player = player;
                                      }}
                                    ><Shortcut clickable={false} /></Player>
                              </div>
                              <div className="card-body">
                                <p className="card-title">{op.customer_name}</p>
                                <StarRatingComponent 
                                  name="rating" 
                                  starCount={5}
                                  editing={false}
                                  value={Number(op.rating)}
                                />
                              </div>
                            </div>
                          </div>
                          )
                        }
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            }
            {
              widgetSetting === '1' &&
          
              <div className="container-fluid mt-4">
                <div className="row view-group list-view-grid">
                  {
                    videoList && videoList.map((op, i) =>
                      <div className="item col-xs-12 col-lg-3 col-md-3" key={i}>
                        <div className="thumbnail card">
                            <div className="img-event">
                                {/* <video style={{width: '100%', height: '320px'}} controls>
                                  <source  src={op.video_url} type="video/mp4" />
                                </video> */}
                                  <Player
                                    fluid={false}
                                    playsInline
                                    src={op.video_url}
                                    height={320}
                                    width={'100%'}
                                  />
                            </div>
                            <div className="card-body">
                              <p className="card-title">{op.customer_name}</p>
                                <StarRatingComponent 
                                  name="rating" 
                                  starCount={5}
                                  editing={false}
                                  value={Number(op.rating)}
                                />
                            </div>
                        </div>
                    </div>
                    )
                  }
                </div>
              </div>
          }
            <div className="container-fluid mt-2" style={{ position: 'absolute', bottom: 0, marginTop: 20 }}>
              <div className="row">
                <div className="col-md-12">
                  <div style={{ textAlign: 'right', paddingBottom: '1rem' }}>
                   <a href="https://www.feedfleet.com" target="_blank" style={{ color: '#000' }}> <span style={{ fontSize: '10px' }}>Poweredby <span><img src="https://www.feedfleet.com/assests/frotnend/assets/img/logo/logo.png" alt="logo" style={{ width: 75 }} /></span></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
};

export default Widget;