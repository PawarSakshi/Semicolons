/*import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    heading2: PropTypes.bool
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}`;
  }


  // updateNews = async () => {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({ loading: true });
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false
  //   })
  // }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(50);
    this.setState({ loading: true });
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
    // this.setState({page:1});
    // this.updateNews();
  }
  // handleNext = async () => {
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false
  //     })
  //   }

  // this.setState({page:this.state.page +1});
  // this.updateNews();

  // }
  // handlePrev = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false
  //   })

  //   // this.setState({page:this.state.page -1});
  //   // this.updateNews();
  // }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px'}}>News- Top Headlines</h1>
        <div className="container">
          <h2 className="text-center" style={{ margin: '35px 0px' }}>{this.capitalizeFirstLetter(this.props.category)}</h2>
        </div>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {

                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} discription={element.description ? element.description : ""} ImgUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}

            </div>
          </div>
        </InfiniteScroll>

        { }
      </>

    )
  }
}*/
import React, { Component } from 'react';
import { extractKeywords } from './TextRazorService'; // Assuming TextRazorService is located in the services directory
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    apiKey: "eca790dd945b4e0b919bb9b3665a4b5b" // Replace with your actual API key for the News API
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    heading2: PropTypes.bool,
    apiKey: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      searchQuery: '',
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false
    });
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState(prevState => ({
      articles: prevState.articles.concat(data.articles),
      totalResults: data.totalResults,
      page: nextPage
    }));
  };

  handleSearch = async () => {
    const { searchQuery } = this.state;
    if (!searchQuery) return; // If search query is empty, do nothing
    
    const keywords = searchQuery.split(" "); // Split search query into keywords
    const filteredArticles = this.state.articles.filter(article =>
      keywords.some(keyword => 
        article.title.toLowerCase().includes(keyword.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(keyword.toLowerCase()))
      )
    );
    this.setState({ articles: filteredArticles }); // Update articles with filtered articles
  };

  render() {
    const { loading, articles, searchQuery } = this.state;

    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px'}}>News- Top Headlines</h1>
        <div className="container">
          <h2 className="text-center" style={{ margin: '35px 0px' }}>{this.capitalizeFirstLetter(this.props.category)}</h2>
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search by keyword" style={{ width: '30%' }} value={searchQuery} onChange={e => this.setState({ searchQuery: e.target.value })} />
          <button className="btn btn-outline-danger" type="button" onClick={this.handleSearch}>Search</button>
        </div>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((article, index) => (
                <div className="col-md-4" key={index}>
                  <NewsItem title={article.title || ""} description={article.description || ""} imgUrl={article.urlToImage} newsUrl={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
