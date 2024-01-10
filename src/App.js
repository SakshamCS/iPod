import React from "react";
import './App.css';
import ZingTouch from 'zingtouch';

var mainscreen="../mainscreen.webp";
var menu=["Cover Flow","Music","Games","Settings"];
var submenu=["All Songs","Artists","Albums"];

class App extends React.Component{

  constructor(props)
  {
    super(props);
    this.wheel=null;
    this.activeRegion=null;
    this.angle=0;
    this.state={
      index:0,
      items:menu,
      dropdown:false,
      back:mainscreen,
      text:"",
      picture:"",
      flag:0,
      header:"iPod.js",
    }
  }
  
  /* To change index of menu dropdown using zingtouch*/

  changeIndex=(e)=>{
    if(this.state.dropdown)
    {
    this.angle+=e.detail.distanceFromLast;
    // console.log(this.angle);
    if(Math.abs(this.angle)>=15)
    {
      if(this.state.flag===0)
      {
         if(this.angle>0)
         {
           this.setState({
           index:(this.state.index+1)%4
         })
         }
         else{
         this.setState({
          index:(this.state.index-1+4)%4
         })
         }
     }
     else
     {
        if(this.angle>0)
        {
          this.setState({
          index:(this.state.index+1)%3
        })
        }
        else{
        this.setState({
        index:(this.state.index-1+3)%3
        })
        }
     }
      this.angle=0;
    }
  }

  }

/* To change main screen using index on click of select button*/

  changeScreen=()=>{
    if(this.state.dropdown)
    {
    if(this.state.flag===0)
    {
    switch(this.state.index)
    {
      case 0:
        this.setState({
          dropdown:false,
          back:"",
          text:"Coverflow",
          picture:"",
          items:menu
        })
        break;
      case 1:
        this.setState({
          items:submenu,
          index:0,
          flag:1,
          header:"Music"
        })
        break;
      case 2:
        this.setState({
          dropdown:false,
          back:"",
          text:"Games",
          items:menu,
          picture:"../dice.jpg"
        })
        break;
      case 3:
        this.setState({
          dropdown:false,
          back:"",
          text:"Settings",
          items:menu,
          picture:"../settings.png"
        })
        break;
      default:
    }
    }
    else if(this.state.flag===1){
      switch(this.state.index)
      {
      case 0:
        this.setState({
          dropdown:false,
          back:"",
          text:"",
          picture:"",
          flag:2
        })
        break;
      default:
      }
    }
    }
  }

/* To change Dropdown menu to submenu on click of music item */

  changeMenu=()=>{
    if(this.state.flag===0)
    {
    this.setState({
      dropdown:!this.state.dropdown,
      back:mainscreen,
      text:""
    })
    }
    else if(this.state.flag===2)
    {
      this.setState({
        dropdown:true,
        back:mainscreen,
        text:"",
        flag:1,
        items:submenu
      })
    }
    else{
      this.setState({
        items:menu,
        index:0,
        flag:0,
        header:"iPod.js"
      })
    }
  }

/* Component Did Mount for using ZingTouch */

  componentDidMount()
  {
    this.wheel=document.getElementById("control");
    this.activeRegion=new ZingTouch.Region(this.wheel);
    this.activeRegion.bind(this.wheel,"rotate",this.changeIndex);
  }

  render()
  {
    const element=(this.state.flag===0 || this.state.flag===1)?<>
    <img style={{display:`${this.state.picture===""?"none":"block"}`}} alt="pic" height="60%" width="50%" src={this.state.picture}/>
    <h3>{this.state.text}</h3>
    </>:<>
    <div style={{display:"flex",justifyContent:"space-around",width:"100%",height:"60%"}}>
      <img style={{paddingLeft:"2%"}} alt="music" height="100%" width="40%" src="../kygopic.jpg"/>
      <div style={{height:"100%",width:"60%",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <h3>01 FireStone</h3>
      <span>kygo,Conrad Sewell</span>
      </div>
    </div>
    <audio style={{width:"100%",height:"30%"}} type="audio/mp3" ref="audio_tag" src="../kygo.mp3" controls autoPlay/>
    </>;

    return(
      <div className="container">
        
        <div style={{background:`url(${this.state.back}) center/cover`}} className="screen">

          <div style={{display:`${this.state.dropdown?"flex":"none"}`}} className="dropdown">
            <h3 style={{paddingLeft:"5%"}}>{this.state.header}</h3>
            {
              this.state.items.map((item,id)=>{
                return(
                  <div className={`${id===this.state.index?"active":"none"}`} style={{padding:"2%"}} key={id}>
                    <span style={{paddingLeft:"5%"}}>{item}</span><span style={{float:"right",marginRight:"10%",color:"white"}} className="fas fa-chevron-right"></span>
                  </div>
                );
              })
            }
          </div>

          <div style={{display:`${this.state.back===""?"flex":"none"}`,flexDirection:"column",background:"white",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
              {
              element
              }
          </div>

        </div>

        <div id="control" className="control">
          <div style={{cursor:"pointer"}} onClick={this.changeMenu}>MENU</div>
          <div className="horizontal">
          <span className="fas fa-fast-backward"></span>
          <div onClick={this.changeScreen} className="select"></div>
          <span className="fas fa-fast-forward"></span>
          </div>
          <div>
          <span className="fas fa-play"></span>&nbsp;<span className="fas fa-pause"></span>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
