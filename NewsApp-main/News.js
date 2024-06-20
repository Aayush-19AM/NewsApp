import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const  News=(props)=>{
    const [articles, setarticles] = useState([])
    const [loading, setloading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults]= useState(0)
    

    const capitalizefirstletter = (string) => {
        return string.charAt(0).toUpperCase(0) + string.slice(1)
    }
    const UpdateNews=async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    
        setloading( true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        console.log(parsedData);
        props.setProgress(70);
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)
        props.setProgress(100);
    }
 
    useEffect(() => {
        document.title = `${capitalizefirstletter(props.category)}-NewsMonkey`
        UpdateNews();
    }, [])

    // async componentDidMount() {
        // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae192f4fac7d4722bb68a1f57b81e41f&page=1&pageSize=${props.pageSize}`;
        // this.setState({loading:true})
        // let data=await fetch(url);
        // let parsedData=await data.json()
        // console.log(parsedData);
        // this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
        // OR
        // this.UpdateNews();
    // }
    // const handlePrevClick=async()=>{
    // console.log("previous");
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae192f4fac7d4722bb68a1f57b81e41f&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parsedData=await data.json()
    // console.log(parsedData);
    // this.setState({
    //     page:this.state.page-1,
    //     articles:parsedData.articles,
    //     loading:false
    // })
    // OR
    //     setpage(page-1)
    //    UpdateNews();
    // }

    // const handleNextClick=async ()=>{
    // console.log("Next");
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {             
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae192f4fac7d4722bb68a1f57b81e41f&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    // let data=await fetch(url);
    // let parsedData=await data.json()
    // this.setState({
    //     page:this.state.page+1,
    //     articles:parsedData.articles,
    //     loading:false
    // })}
    //     // OR
    //     setpage(page+1)
    //     UpdateNews();
    // }
    const fetchMoreData = async () => {
     
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setpage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setarticles(articles.concat(parsedData.articles))
        settotalResults( totalResults.parsedData.totalResults)
    };
    
        return (
            <>
                <h1 className="text-center" style={{ margin: "35px 0px",marginTop:"90px"}}>
                    NewsMonkey-Top {capitalizefirstletter(props.category)} Headlines</h1>
                {loading &&<Spinner/>}

                {/* {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className='col-md-4'  key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                })
            } */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !==totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className='col-md-4' key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })
                            }</div>
                    </div>
                </InfiniteScroll>
            </>
                /* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-warning" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)}  type="button" className="btn btn-warning" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */         
        )
    }
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News;
