import React from "react";
import ReactDOM from "react-dom";
import Masonry from "react-masonry-component";

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("bd6c75ce07f548c495161947b459a3de");

class App extends React.Component {
  constructor(Props) {
    super(Props);
    this.state = {
      articles: [],
      country: "",
      language: "en",
      q: "",
      category: "",
      sources: ""
    };
    this.searcheverything = this.searcheverything.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // var url = new URL("https://newsapi.org/v2/top-headlines"),
    //   params = {
    //     apiKey: "bd6c75ce07f548c495161947b459a3de",
    //     country: "in",
    //     category: "health",
    //     pageSize: 50
    //   };
    // Object.keys(params).forEach(key =>
    //   url.searchParams.append(key, params[key])
    // );

    const query = {
      language: this.state.language,
      country: this.state.country,
      q: this.state.q,
      category: this.state.category,
      sources: this.state.sources
    };
    newsapi.v2.topHeadlines(query).then(data => {
      console.log(data);
      let news = data.articles.map((article, i) => {
        return <Pop2 key={article.url} article={article} />;
      });

      this.setState({ articles: news });
      this.setState({ className: "masonry-container" });
    });
  }

  handleChange(e) {
    this.setState({ q: e.target.value });
  }

  searcheverything(e) {
    e.preventDefault();
    if (this.state.q) {
      const query = {
        language: this.state.language,
        q: this.state.q,
        category: this.state.category,
        sources: this.state.sources
      };
      newsapi.v2.everything(query).then(data => {
        let search = data.articles.map(article => {
          return <Pop2 key={article.url} article={article} />;
        });
        this.setState({ articles: search });
        this.setState({ className: "masonry-container" });
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.searcheverything}>
          <div className="row" id="search">
            <div className="col-md-4 col-sm-4" />
            <div className="col-md-4 col-sm-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for..."
                  onChange={this.handleChange}
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-btn btn-default"
                    type="button"
                    onClick={this.searcheverything}
                  >
                    Go!
                  </button>
                </span>
              </div>
            </div>
            <div className="col-md-4 col-sm-4" />
          </div>
        </form>
        <div className="container">
          <Masonry className={"my-gallery-class"}>
            {this.state.articles}
          </Masonry>
        </div>
      </div>
    );
  }
}

const Pop2 = Props => {
  return (
    <div className="card-box col-md-4 col-sm-6">
      <div className="card">
        <div
          className="header"
          style={{
            backgroundImage: "url(" + Props.article.urlToImage + ")",
            backgroundPosition: "center center",
            backgroundSize: "cover"
          }}
        >
          <div className="filter" />

          <div className="actions">
            <button className="btn btn-round btn-fill btn-neutral btn-modern">
              <a href={Props.article.url}>Read Article</a>
            </button>
          </div>
        </div>

        <div className="content">
          <h6 className="category">{Props.article.source.name}</h6>
          <h4 className="title">
            <a>{Props.article.title}</a>
          </h4>
          <p className="description">{Props.article.content}</p>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
