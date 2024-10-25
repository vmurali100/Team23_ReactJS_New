import { Component } from "react";
import bannerContent from "./bannerContent.json";
export class Banner extends Component {
  render() {
    return (
      <section class="banner">
        <div class="banner-wrapper-main"></div>
        <div class="container">
          <div class="row">
            <div class="slider-wrapper">
              <div class="box-01">
                <div class="content">
                  <h1>{bannerContent.heading}</h1>
                  <p>{bannerContent.description}</p>
                  <div class="btn-001">
                    <ul>
                      {bannerContent.buttons.map((btnObj) => {
                        return (
                          <li>
                            <a href="#">{btnObj.btnName}</a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div class="box-01">
                <div class="slider-image">
                  <img src="assets/images/slider/1.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
