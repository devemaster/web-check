import React from 'react'
import './Widget.css';
import axios from 'axios';
import publicIp from "public-ip";

class Widget extends React.Component {
  constructor(props) {
    super(props);
}
componentDidMount() {
    if(this.props.apiKey){
        
        this.getSiteDetail();
    }
}
async getSiteDetail() {
        let clientIp = await publicIp.v4();
        if(clientIp){

            let windowDetail = this.props.window;

            var nAgt = windowDetail.navigator.userAgent;
            var browserName  = windowDetail.navigator.appName;
            var fullVersion  = ''+parseFloat(windowDetail.navigator.appVersion); 
            var nameOffset,verOffset,ix;

            // In Opera, the true version is after "Opera" or after "Version"
            if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
                browserName = "Opera";
                fullVersion = nAgt.substring(verOffset+6);
                if ((verOffset=nAgt.indexOf("Version"))!=-1) 
                    fullVersion = nAgt.substring(verOffset+8);
                }
            // In MSIE, the true version is after "MSIE" in userAgent
            else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
                browserName = "Microsoft Internet Explorer";
                fullVersion = nAgt.substring(verOffset+5);
            }
            // In Chrome, the true version is after "Chrome" 
            else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
                browserName = "Chrome";
                fullVersion = nAgt.substring(verOffset+7);
            }
            // In Safari, the true version is after "Safari" or after "Version" 
            else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
                browserName = "Safari";
                fullVersion = nAgt.substring(verOffset+7);
                if ((verOffset=nAgt.indexOf("Version"))!=-1) 
                    fullVersion = nAgt.substring(verOffset+8);
                }
            // In Firefox, the true version is after "Firefox" 
            else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
                browserName = "Firefox";
                fullVersion = nAgt.substring(verOffset+8);
            }
            // In most other browsers, "name/version" is at the end of userAgent 
            else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
                (verOffset=nAgt.lastIndexOf('/')) ) 
            {
                browserName = nAgt.substring(nameOffset,verOffset);
                fullVersion = nAgt.substring(verOffset+1);
                if (browserName.toLowerCase()==browserName.toUpperCase()) {
                    browserName = windowDetail.navigator.appName;
                }
            }
            let formData = {
                "unique_key": this.props.apiKey,
                "url_page_path": windowDetail.location.pathname, 
                "browser_name": browserName,
                "browser_version": fullVersion,
                "ip": clientIp
            }
            axios.post('http://duniyawale.com/webapp.php', formData)
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        if (response.data.result) {
                            console.log('success')
                        }
                    }

                })
                .catch((error) => {
                    console.log(error);                    
                });
                }
    
}


render() {
    return (
        <div className="widget-setting"></div>       
        
    )
}
};

export default Widget;