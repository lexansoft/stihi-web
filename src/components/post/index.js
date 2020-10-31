import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useLocation } from 'react-router-dom';

import moment from 'moment';

import './style.scss';

const parseMarkdown = (markdownText) => {
    const htmlText = markdownText
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\> (.*$)/gim, '<p>$1</p>')
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        .replace(/\*(.*)\*/gim, '<i>$1</i>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/\n$/gim, '<br />')

    return { __html: htmlText.trim() };
};

const getTags = (meta) => JSON.parse(meta).tags;

const getComments = ({ data, isMain = false }) => {
    if (!data) {
        return
    }

    return data.map((el) => (
        el.body 
            ?   <div className="post_comments-wrap" key={el.id}>
                    <div className="post_comments">
                        <div><img width="60" src={el.user.avatar || 'https://stihi.io/frontend_assets_stihi/img/avatar_default.png'} /></div>
                        <div>
                            <div>{el.user.names.gls}</div>
                            <div className="post_markdown" dangerouslySetInnerHTML={parseMarkdown(el.body)} />
                        </div>
                    </div>
                    {getComments({ data: el.comments })}
                    {isMain ? <div className="post_comments_end"></div> : null}
                </div>
            : null
    ))
};


const Post = () => {
    const content = useSelector((state) => state.post.content);
    const next = useSelector((state) => state.post.next);
    const prev = useSelector((state) => state.post.prev);
    const comments = useSelector((state) => state.post.comments);
    const dispatch = useDispatch();
    const urlList = useLocation().pathname.split('/');
    const location = urlList.slice(0, urlList.length - 1).join('/');
    const params = useParams();
    const { postId, rubric, id } = params;

    useEffect(() => {
        dispatch.post.fetchPostItem({
            id: Number(postId),
            source_list: {
                desc_order: false,
                list: "list",
                sort_field: "time"
            }
        });
        dispatch.post.fetchListItems({
            count: 20,
            type: id,
            rubrics: rubric ? [rubric] : []
        });
        dispatch.post.fetchCommentsList({
            full: true,
            parent_id: Number(postId)
        })
        
    }, [dispatch, rubric, id, postId]);

    return (
        content.id 
            ?   <div className="post_wrap">
                    <div className="post_content">
                        <div className="post_navigation">
                            {prev ? <Link to={`${location}/${prev}`}>Предыдущий пост</Link> : null}
                            {next ? <Link to={`${location}/${next}`}>Следующий пост</Link> : null}
                        </div>
                        <div className="post_author">
                            <div className="post_avatar">
                                <img src={content.user.avatar} />
                            </div>
                            <div>
                                {content.user.nickname}
                            </div>
                        </div>
                        <div className="post_title">
                            {content.title}
                        </div>
                        <hr />
                        <div className="post_markdown" dangerouslySetInnerHTML={parseMarkdown(content.body)} />
                        <div className="post_tags">
                            {getTags(content.metadata).map((el, key) => key ? <div className="post_tags_item" key={`${el}-${key}`}>{el}</div> : null)}
                        </div>
                        <div className="post_user">
                            <span>{content.user.nickname}</span>
                            <span> {moment(content.time).format('DD/MM/YYYY, HH:mm')}</span>
                            <div><span>{content.votes_count}  Голосов</span> <span>{content.val_golos.toFixed(2)} GOLOS</span> <span>{content.comments_count} Комментарии</span></div>
                        </div>
                        <div className="post_action">Спонсировать</div>
                        <div className="post_navigation">
                            {prev ? <Link to={`${location}/${prev}`}>Предыдущий пост</Link> : null}
                            {next ? <Link to={`${location}/${next}`}>Следующий пост</Link> : null}
                        </div>
                        {content.comments_count && comments
                            ?   <div>
                                    <div>Комментарии</div>
                                    {getComments({ data: comments, isMain: true })}
                                </div>
                            : null}
                    </div>
                </div>
            : null
    )
};

export default Post;