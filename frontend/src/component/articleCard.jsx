import { useArticleApi } from "../api/article.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setArticleToUpdate } from "../features/articles/articles.slice";
const ArticleCard = ({ article }) => {
    const { DeleteArticle } = useArticleApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <div style={{ border: "2px solid black", marginBlock: "1rem", padding: "1rem" }}>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <button onClick={() => dispatch(DeleteArticle(article._id))}>Delete</button>
        <button onClick={() => { dispatch(setArticleToUpdate(article)); navigate(`/update/${article._id}`) }}>Update</button>
    </div>
}
export default ArticleCard;