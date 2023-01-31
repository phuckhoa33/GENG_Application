import { useNavigate } from "react-router-dom"

export const NoPost = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>This page don't have any article. Please post many article so that can create fresh enviroment</h1>
            <small onClick={() => navigate('/createPost')}>Post new Articles</small>
        </div>
    )
}