import React from 'react'
import './Widget.css';
import axios from 'axios';
import publicIp from "public-ip";
import uuid from 'react-uuid';
import Cookies from 'js-cookie';

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

        //get client IP address
        let clientIp = await publicIp.v4();
        if(clientIp){

            // get and set cookie userId and session user id
            let userUniqueId = '';
            let SessionId = '';
            if(!this.getCookie('user_unique_id')){
                userUniqueId = "user_unique_id="+uuid()
                document.cookie = "user_unique_id="+uuid();
            }else{
                userUniqueId = this.getCookie('user_unique_id')
            }
            if(!sessionStorage.getItem('user_unique_id')){
                sessionStorage.setItem('user_unique_id', uuid());
                SessionId = uuid()
            }else{
                SessionId = sessionStorage.getItem('user_unique_id')
            }

            // get window detail
            let windowDetail = this.props.window;
            // console.log(windowDetail)

            // parameter for browser detail
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

            // get pages url and product page url
            let pageUrl = '';
            let productUrl = '';
            if(window.location.href.indexOf("pages") > -1) {
                pageUrl = windowDetail.location.href
            }
            if(window.location.href.indexOf("product") > -1) {
                productUrl = windowDetail.location.href
            }

            // get vendor detail (search engine)
            let vendor = windowDetail.clientInformation.vendor;

            // get timestamp
            var timeStamp = windowDetail.performance && windowDetail.performance.now && windowDetail.performance.timing && windowDetail.performance.timing.navigationStart ? windowDetail.performance.now() + windowDetail.performance.timing.navigationStart : Date.now();
            

            // function for getting UTM param
            let utmQuery = decodeURIComponent(windowDetail.location.search.substring(1)),
            utmVariables = utmQuery.split('&'),
            ParameterName,
            i;
            const getUTMValue = (inputParameter) => {
                for (i = 0; i < utmVariables.length; i++) {
                    ParameterName = utmVariables[i].split('=');
                    if (ParameterName[0] === inputParameter) {
                    return ParameterName[1] === null ? null : ParameterName[1];
                    }
                }
            }
            
            const valueExists = (value) => {
                return (value != null && value != '' && value != undefined)
            }


            // UTM paramm 
            const utmParams = [
                {key:'utm_source',value:''},
                {key:'utm_medium',value:''},
                {key:'utm_campaign',value:''},
                {key:'utm_content',value:''},
                {key:'utm_term',value:''}
              ];
              
              utmParams.forEach(param => {
                var pValue = getUTMValue(param.key);              
                if (valueExists(pValue)) {
                  Cookies.set(param.key, pValue, {
                    domain: cookieDomain,
                    expires: 90
                  });
                };
                let cValue = Cookies.get(param.key);
                if (valueExists(cValue)) {
                  param.value = cValue;
                }
              });


            // api request
            let formData = {
                "unique_key": this.props.apiKey,
                "url_page_path": windowDetail.location.pathname, 
                "browser_name": browserName,
                "browser_version": fullVersion,
                "full_url":windowDetail.location.href,
                "ip": clientIp,
                "user_uid":userUniqueId,
                "session_uid":SessionId,
                "product_url":productUrl,
                "source":vendor,
                "time_stamp":timeStamp,
                "utm_source":utmParams[0].value,
                "utm_medium":utmParams[1].value,
                "utm_campaign":utmParams[2].value,
                "utm_content":utmParams[3].value,
                "utm_term":utmParams[4].value
            }
            axios.post('https://duniyawale.com/webapp.php', formData)
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

// get data from cookie
getCookie(name){
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}

render() {
    return (
        <div className="widget-setting"></div>       
        
    )
}
};

export default Widget;