import { Component } from "react";

export class Header extends Component {
  render() {
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
                        <li>
                          <a href="index.html">Home</a>
                        </li>
                        <li>
                          <a href="about-us.html">About Us</a>
                        </li>
                        <li>
                          <a href="services.html">Services</a>
                        </li>
                        <li>
                          <a href="blog.html">Blog</a>
                        </li>
                        <li>
                          <a href="contact-us.html">Contact Us</a>
                        </li>
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
