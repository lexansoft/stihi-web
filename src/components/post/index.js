import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useLocation } from 'react-router-dom';

import './style.scss';

const Post = () => {
    const content = useSelector((state) => state.post.content);
    const dispatch = useDispatch();
    const location = useLocation();
    const urlList = location.pathname.split('/');
    const category = urlList[urlList ?  urlList.length - 1 : ''];

    // const navigation = () => {
    
    //     this.next_id = 0;
    //     this.prev_id = 0;
    
    //     if (this.listCache.list.length == 0) return;
    
    //     for (let i=0; i < this.listCache.list.length; i ++) {
    //       if (this.listCache.list[i].id == this.object.id) {
    //         if (i > 0) this.next_id = this.listCache.list[i - 1].id;
    //         if (this.listCache.list[i + 1]) this.prev_id = this.listCache.list[i + 1].id;
    
    //         if (!this.listCache.list[i + 3]) {
    //           if (this.lastListCnt != this.listCache.list.length) {
    //             this.headerService.eventPostListChanged({posts_load_count: 20});
    //             this.lastListCnt = this.listCache.list.length;
    //           }
    //         }
    
    //         return;
    //       }
    //     }
    //   }
    

    useEffect(() => {
        dispatch.post.fetchPostItem({
            id: Number(category),
            source_list: {
                desc_order: false,
                list: "list",
                sort_field: "time"
            }
        });
    }, [dispatch]);

    return (
        content.id 
            ?   <div className="post_wrap">
                    <div className="post_content">
                        <div className="post_author">
                            <div className="post_avatar">
                                <img src={content.user.avatar} />
                            </div>
                            <div>
                                {content.user.nickname}
                            </div>
                        </div>
                        <div>
                            {content.title}
                        </div>
                        <hr />
                        <div>
                            <div>
                                <img src={content.image} />
                            </div>
                            <div>
                                {content.body}
                            </div>
                            <div>
                                <div>Prev</div>
                                <div>Next</div>
                            </div>
                        </div>
                    </div>
                </div>
            : null
    )
};

export default Post;