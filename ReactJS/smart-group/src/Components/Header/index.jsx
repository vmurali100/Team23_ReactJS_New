import { Component } from "react";
import content from './content.json'
export class Header extends Component {
  render() {
    console.log(content)
    return (
      <div>
        <header>
          <div class="my-nav">
            <div class="container">
              <div class="row">
                <div class="nav-items">
                  <div class="menu-toggle"></div>
                  <div class="logo">
                    <img class="hide-scrol" src="assets/images/logo.png" />
                    <img class="fixed-scrol" src="assets/images/logo-01.png" />
                  </div>
                  <div class="menu-items">
                    <div class="menu">
                      <ul>
                        {content.map((val)=>{
                          return <li>
                            <a href="">{val.name}</a>
                          </li>
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
