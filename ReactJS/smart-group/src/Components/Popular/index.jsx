import { Component } from "react";
import popularContent from "./popularContent.json";
export class Popular extends Component {
  render() {
    return (
      <section class="bg-01">
        <div class="container">
          <div class="row">
            <div class="heading">
              <h2>{popularContent.heading}</h2>
              <span></span>
            </div>

            {popularContent.items.map((item) => {
              return (
                <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                  <div class="category-box">
                    <div class="my-card">
                      <ul>
                        <li>
                          <img src={item.imageName} />
                          <h3>{item.service}</h3>
                          <p>{item.description}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}
