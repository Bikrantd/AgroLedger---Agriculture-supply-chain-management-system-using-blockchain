import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './News.css';

function News() {
    const history = useHistory();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Your API key is now included here
    const API_KEY = 'pub_c2e4c2da1e864cabb56d03edb514455d';
    
    // The query is set to fetch only "agriculture" news from Nepal in Nepali
    const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=np&language=ne&q=agriculture`;

    useEffect(() => {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok. Check your API key or network connection.');
                }
                return response.json();
            })
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setArticles(data.results);
                } else {
                    setError('No news articles found for the specified query.');
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [API_URL]);

    const redirect_to_home = () => {
        history.push('/');
    };

    if (loading) {
        return <div className="loading">Loading news...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Latest Agriculture News</h2>
                <button onClick={redirect_to_home} className="btn btn-outline-danger">Home</button>
            </div>
            <div className="news-container">
                {articles.map((article, index) => (
                    <div key={index} className="news-card card mb-3">
                        {article.image_url && <img src={article.image_url} className="card-img-top" alt={article.title} />}
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.description}</p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
                        </div>
                        <div className="card-footer text-muted">
                            Published at: {new Date(article.pubDate).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;