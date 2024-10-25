import React, { Component } from "react";
import teamContent from './teamContent.json'
export default class Team extends Component {
  render() {
    return (
      <div>
        <section class="bg-03">
          <div class="container">
            <div class="row">
              <div class="heading">
                <h2>our team</h2>
                <span></span>
              </div>
            {
                teamContent.map((team)=>{
                    return  <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                    <div class="team-main-box">
                      <img src={team.imageAddress}/>
                      <div class="team-content-box">
                        <h3>{team.name}</h3>
                        <b>{team.role}</b>
                      </div>
                    </div>
                  </div>
                })
            }
             
{/* 
              <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                <div class="team-main-box">
                  <img src="assets/images/team/4.jpg" />
                  <div class="team-content-box">
                    <h3>Smith</h3>
                    <b>Dveloper</b>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                <div class="team-main-box">
                  <img src="assets/images/team/3.jpg" />
                  <div class="team-content-box">
                    <h3>Johnsy</h3>
                    <b>SEO</b>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                <div class="team-main-box">
                  <img src="assets/images/team/1.jpg" />
                  <div class="team-content-box">
                    <h3>Albert</h3>
                    <b>Art Designer</b>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
