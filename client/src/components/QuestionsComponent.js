import React , {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
var q = [];
var o = [[],[],[],[],[]];
var a = [];
export default class QuestionsComponent extends Component
{
  constructor(props)
  {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    //this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      count : [1,2,3,4,5]
      }
    }

  onClick(e)
  {
    console.log("CORRECT ANSWER...",e.target.name);
  }

  onSubmit(e)
{
  e.preventDefault();
  $(".alert-warning").removeClass("hide");
  $(".alert-success").addClass("hide");
  $(".alert-danger").addClass("hide");
  var questions = [];
  var correctAnswers = [];
var options = [[],[],[],[],[]];
const q = document.querySelector('.questions-form');

questions = [q.q1.value,q.q2.value,q.q3.value,q.q4.value,q.q5.value];
correctAnswers = [q.a1.value,q.a2.value,q.a3.value,q.a4.value,q.a5.value];
for(var i = 0;i < 5;i++)
{
 let l1 = "q" + (i+1);
 for(var j = 0;j < 4;j++)
   {
     let l2 = "opt" + (j+1);
     options[i][j] = document.getElementsByName(l1+l2)[0].value;
   }
}
var obj = {
 keyid : this.props.match.params.id,
 q : questions,
 ca : correctAnswers,
 op : options,
 time : new Date()
};
  axios.post('/api/portal/showtech/'+ this.props.match.params.id +'/addquiz', obj)
  .then(res =>
    {
      if(res.status === 200)
      {
        $(".alert-warning").addClass("hide");
        $(".alert-success").removeClass("hide");
        setTimeout(()=>{
          $(".alert-success").addClass("hide");
        },5000);
      }
      else {
        $(".alert-warning").addClass("hide");
        $(".alert-danger").removeClass("hide");
        setTimeout(()=>{
          $(".alert-danger").addClass("hide");
        },5000);
      }
    })
  .catch((err)=>
  {
    $(".alert-warning").addClass("hide");
    $(".alert-danger").removeClass("hide");
    setTimeout(()=>{
      $(".alert-danger").addClass("hide");
    },5000);
  })
  // $("input[type=string], textarea").val("");
  window.scrollTo(0,0);
}


  render()
  {
  return (
    <div className="container" id="main">
    <div className="alert alert-success hide">Questions Added Successfully</div>
    <div className="alert alert-danger hide">Failed to add</div>
    <div className="alert alert-warning hide">Adding Questions...</div>
    <form className="questions-form text-dark" onSubmit={this.onSubmit}>
      {this.state.count.map((i)=>{
        return(
          <div key={i}>
    <div className="my-5">
      <p className="lead font-weight-normal">QUESTION {i}</p>
      <textarea type="string" className="form-control" name={'q'+(i)} placeholder="Question..." required="required"/>
      <div className="form-check my-2 text-white-50">
        <input type="radio" name={'a'+(i)} onClick={this.onClick} value={'A'} required/ >
        <input type="string" className="form-control" onChange={this.onChange} name={'q'+(i)+'opt1'} required placeholder="Option 1"/>
      </div>
      <div className="form-check my-2 text-white-50">
        <input type="radio" name={'a'+(i)} onClick={this.onClick} value={'B'}/>
        <input type="string" className="form-control" onChange={this.onChange} name={'q'+(i)+'opt2'} required placeholder="Option 2"/>
      </div>
      <div className="form-check my-2 text-white-50">
        <input type="radio" name={'a'+(i)} onClick={this.onClick} value={'C'}/>
        <input type="string" className="form-control" onChange={this.onChange} name={'q'+(i)+'opt3'} required placeholder="Option 3"/>
      </div>
      <div className="form-check my-2 text-white-50">
        <input type="radio" name={'a'+(i)} onClick={this.onClick} value={'D'}/>
        <input type="string" className="form-control" onChange={this.onChange} name={'q'+(i)+'opt4'} required placeholder="Option 4"/>
      </div>
    </div>
    <hr />
    </div>
)
      })}
  <div className="text-center my-5">
    <input type="submit" value="SUBMIT" className="btn btn-success"/>
  </div>
  <hr />
</form>
</div>
  )
}
}
