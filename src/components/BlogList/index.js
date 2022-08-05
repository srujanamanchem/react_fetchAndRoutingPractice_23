import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedBlogData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      avatarUrl: eachItem.avatar_url,
      imageUrl: eachItem.image_url,
      topic: eachItem.topic,
      author: eachItem.author,
    }))
    this.setState({blogsData: updatedBlogData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    console.log(isLoading)

    return (
      <div className="blogs-list-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachBlog => (
              <BlogItem key={eachBlog.id} eachBlog={eachBlog} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
