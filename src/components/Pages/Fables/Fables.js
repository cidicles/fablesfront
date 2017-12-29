import React, { Component } from 'react';
import Helmet from "react-helmet";
import { Link } from 'react-router';
import { lang } from '../../../il8n/lang';
import { connect } from 'react-redux';
import { changePosts } from '../../../Actions/Index';
import './Fables.css';
import { truncate, goFetch } from '../../../utils';
import { apiBase } from '../../../const';

class Fables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        page: 1,
        count: 8,
        attributes: {}
      },
      ...props
    };
    this.populatePosts = this.populatePosts.bind(this);
  }
  componentWillMount() {
    this.populatePosts();
  }
  populatePosts(){
    let {filters} = this.state;
    let feedUrl = `${apiBase}fable/en_us/${filters.page}/${filters.count}`;
    goFetch('get', feedUrl).then((res) => {
      if(res.error){
        console.error(res.message);
      } else {
        this.props.dispatch(changePosts(res));
      }
    });
  }
  renderPosts(){
    let {posts} = this.props;
    return(
      <div className='posts'>
        {posts.fables.map((post, index) => (
          <div className='post' key={`post-${index}`}>
            <Link to={`/fables/${post._id}`}>
              <h2>{truncate(post.name, 22)}</h2>
            </Link>
          </div>
        ))}
      </div>
    )
  }
  alterPage(page){
    let filters = {...this.state.filters};
    let {posts} = this.props;
    let lastPage = posts.total / filters.count;

    // Loop Forward
    if(page <= 0){
      page = lastPage;
    }

    // Loop Back
    if(page > lastPage + 1){
      page = 1;
    }

    filters.page = page;
    this.setState(
      {
        filters
      },
      () => this.populatePosts()
    );
  }
  nextPage(){
    this.alterPage(this.state.filters.page + 1);
  }
  prevPage(){
    this.alterPage(this.state.filters.page - 1);
  }
  setPage(pageNo){
    this.alterPage(pageNo);
  }
  getPageNav(){
    let {posts} = this.props;
    let {filters} = this.state;
    let numbers = [];
    for(let i = 0; i < posts.total / filters.count; i++){
      numbers.push(
        <div className={`page${ filters.page - 1 === i ? ' active' : '' }`} key={`page-${i}`} onClick={() => this.setPage(i + 1)}>
          { i + 1 }
        </div>
      )
    }
    return numbers;
  }
  render(){
    let {posts} = this.props;
    return (
      <div className='fables'>
        <Helmet title={lang.fables.title + lang.helmet.siteTitle} />
        <div className='section-heading'>
          <h1>{lang.fables.title}</h1>
          <p>{lang.fables.subtag}</p>
        </div>
        <div className='list'>
          {posts.fables ? this.renderPosts() : <div className="loading">{lang.loading}</div>}
        </div>
        <div className='pagination'>
          { this.getPageNav() }
        </div>
        <div className='transports'>
          <div className='transport' onClick={() => this.nextPage()}>Next Page</div>
          <div className='transport' onClick={() => this.prevPage()}>Prev Page</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  let { lang, posts } = state;
  return {
    lang,
    posts
  };
}

export default connect(mapStateToProps)(Fables);
