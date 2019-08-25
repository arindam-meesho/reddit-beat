import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import { Box } from "../Animation";
import { decodeHTMLEntities, timeSince } from "../../utils/helpers";
import Truncate from "react-truncate";
import unescape from "lodash/unescape";

export default class ListView extends Component {
  state = {
    toggle: false,
    imgToggle: false
  };
  static propTypes = {
    prop: PropTypes
  };

  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  toggelImage = () => {
    this.setState({ imgToggle: !this.state.imgToggle });
  };

  render() {
    const {
      title,
      selftext,
      selftext_html,
      author,
      ups,
      downs,
      hide,
      id,
      created_utc,
      hidden,
      num_comments,
      permalink,
      preview,
      url
    } = this.props;
    let { thumbnail } = this.props;

    let originalImg;
    let originalImgUrl = url;
    try {
      originalImg = preview.images[0].resolutions.pop();
      originalImgUrl = unescape(originalImg.url);
    } catch (error) {}
    if (hidden) return <Box />;
    if(thumbnail === 'self' || thumbnail === 'default') {
      thumbnail = '/reddit2.png'
    }
    const renderer = (
      <>
        <div className="card list-view ">
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-lg-9" onClick={this.toggelImage}>
                <div className="padding-20">
                  <span className="small-view">
                    Posted by{" "}
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://www.reddit.com/user/${author}`}
                    >
                      u/{author}
                    </a>
                    ・{timeSince(created_utc * 1000)} ago
                  </span>
                  <div className="title padding-t-15">{title}</div>
                  <div>
                    {this.state.toggle ? (
                      <p
                        className="content"
                        dangerouslySetInnerHTML={{
                          __html: decodeHTMLEntities(selftext_html)
                        }}
                      />
                    ) : (
                      <p className="content">
                        <Truncate
                          lines={3}
                          ellipsis={
                            <>
                              ...{" "}
                              <a
                                href="!#"
                                className="text-primary pointer"
                                onClick={this.toggle}
                              >
                                Read more
                              </a>
                            </>
                          }
                        >
                          {selftext || selftext_html}
                        </Truncate>
                      </p>
                    )}
                  </div>
                  {/* <p className="content" dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(selftext)}} /> */}
                  <div className="small-view">
                    {num_comments ? (
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={`https://www.reddit.com/${permalink}`}
                        className="padding-r-10"
                      >
                        <i className="far fa-comment" /> {num_comments} Comments
                      </a>
                    ) : null}
                    <a
                      href="#!"
                      onClick={() => hide(id)}
                      className="padding-r-10"
                    >
                      <i className="fas fa-ban" /> Hide
                    </a>
                    <a
                      href="#!"
                      onClick={() =>
                        window.open(
                          `https://embed.redditmedia.com/widgets/embed?url=https://www.reddit.com/${permalink}`,
                          "",
                          "width=600,height=500"
                        )
                      }
                      className="padding-r-10"
                    >
                      <i className="fas fa-share" /> Share
                    </a>
                  </div>
                </div>
                {this.state.imgToggle && !(selftext_html && selftext) ? (
                  <div className="col-12 text-center padding-y-20">
                    <img 
                      src={originalImgUrl}
                      className="img-fluid w-75"
                      alt="・"
                    />
                  </div>
                ) : null}
              </div>
              <div className="col-lg-2  d-none d-sm-block">
                {!this.state.imgToggle ? (
                  <div className="outer-div">
                    <div className="inner-div" onClick={this.toggelImage}>
                      {thumbnail ? (
                        <img 
                          src={thumbnail}
                          className="img-fluid screen text-right"
                          alt="・"
                        />
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <div className="col-lg-1 d-none d-sm-block padding-0">
                <div className="outer-div rectangle">
                  <div className="inner-div">
                    <i className="fas fa-chevron-circle-up" />
                    <div className="count">
                      {ups || (downs ? <>-{downs}</> : 0)}
                    </div>
                    <i className="fas fa-chevron-circle-down" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-5" />
      </>
    );
    if (this.state.imgToggle || this.state.toggle) return renderer;
    return <Box>{renderer}</Box>;
  }
}

ListView.propTypes = {
  title: PropTypes.string,
  selftext: PropTypes.string,
  selftext_html: PropTypes.string,
  author: PropTypes.string,
  ups: PropTypes.number,
  downs: PropTypes.number,
  hide: PropTypes.func,
  id: PropTypes.string,
  created_utc: PropTypes.any,
  hidden: PropTypes.any,
  thumbnail: PropTypes.string,
  num_comments: PropTypes.number,
  permalink: PropTypes.string
};

ListView.defaultProps = {
  title: "NA",
  author: "NA",
  thumbnail: '/reddit2.png'
};
